import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { combineLatest, Observable, of, throwError } from "rxjs";
import { catchError, map, switchMap, take } from "rxjs/operators";
import { CourseParticipantsService, GroupDto, GroupService } from "../../../../api";
import { Participant } from "../../domain/participant.model";
import { DialogService } from "../../shared/services/dialog.service";
import { ToastService } from "../../shared/services/toast.service";
import { AuthSelectors } from "../../state/auth";
import { CourseSelectors } from "../../state/course";
import { ParticipantActions, ParticipantSelectors } from "../../state/participant";

@Injectable({ providedIn: "root" })
export class ParticipantFacade {
	userId: string;
	courseId: string;
	participant$ = this.store.select(ParticipantSelectors.selectParticipant);

	constructor(
		private store: Store,
		private groupService: GroupService,
		private courseParticipants: CourseParticipantsService,
		private dialogService: DialogService,
		private toast: ToastService
	) {
		this.store
			.select(CourseSelectors.selectCourse)
			.subscribe(course => (this.courseId = course?.id));

		this.store.select(AuthSelectors.selectUser).subscribe(user => (this.userId = user?.id));
	}

	/** Fetches the current participant from the API and dispatches an `updateParticipant` action. */
	reload(): void {
		this.courseParticipants
			.getParticipant(this.courseId, this.userId)
			.subscribe(participant => {
				this.store.dispatch(ParticipantActions.updateParticipant({ changes: participant }));
			});
	}

	/**
	 * Changes the participants group to the given group.
	 */
	changeGroup(group: GroupDto): void {
		this.setGroup(group);
	}

	/**
	 * Opens the `ConfirmDialog` and if confirmed causes the participant to leave the group.
	 */
	leaveGroup(group: GroupDto, message?: string): Observable<boolean> {
		return this.dialogService
			.openConfirmDialog({
				title: "Action.Custom.LeaveGroup",
				message,
				params: [group.name]
			})
			.pipe(
				take(1),
				switchMap(confirmed => {
					if (confirmed) {
						return combineLatest([
							this.store.select(CourseSelectors.selectCourse),
							this.participant$
						]).pipe(
							take(1),
							switchMap(([course, participant]) => {
								return this.groupService
									.removeUserFromGroup(course.id, group.id, participant.userId)
									.pipe(
										take(1),
										map(() => {
											this.setGroup(null);
											this.toast.success(
												group.name,
												"Action.Custom.LeaveGroup"
											);
											return true;
										}),
										catchError(error => {
											this.toast.apiError(error);
											return throwError(error);
										})
									);
							})
						);
					} else {
						return of(false);
					}
				})
			);
	}

	/**
	 * Sets the current group of the participant.
	 */
	private setGroup(group?: GroupDto): void {
		this.store.dispatch(
			ParticipantActions.updateParticipant({
				changes: {
					group: group,
					groupId: group?.id
				}
			})
		);
	}

	/**
	 * Displays warnings about missing or invalid group of participant.
	 * // TODO: Should not be hardcoded
	 */
	private displayGroupSettingsViolationWarnings(p: Participant): void {
		if (!p.groupId) {
			this.toast.warning("Text.Group.ParticipantHasNoGroup");
		} else if (p.group.members.length < 2) {
			this.toast.warning("Text.Group.NotEnoughMembers", p.group.name, { minSize: 2 });
		}
	}
}
