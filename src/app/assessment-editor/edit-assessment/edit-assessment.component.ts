import { Location } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject } from "rxjs";
import {
	AssessmentDto,
	AssessmentEventDto,
	AssessmentService,
	AssessmentUpdateDto,
	AssignmentDto,
	GroupDto,
	ParticipantDto
} from "../../../../api";
import { DialogService } from "../../shared/services/dialog.service";
import { ParticipantFacade } from "../../shared/services/participant.facade";
import { ToastService } from "../../shared/services/toast.service";
import { AssessmentForm } from "../forms/assessment-form/assessment-form.component";

@Component({
	selector: "app-edit-assessment",
	templateUrl: "./edit-assessment.component.html",
	styleUrls: ["./edit-assessment.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditAssessmentComponent implements OnInit {
	@ViewChild(AssessmentForm, { static: true }) form: AssessmentForm;

	assessment$ = new Subject<AssessmentDto>();

	events: AssessmentEventDto[];
	showEvents = false;

	assignment: AssignmentDto;
	group: GroupDto;
	targetedParticipant: ParticipantDto;

	courseId: string;
	assignmentId: string;
	assessmentId: string;

	stateEnum = AssignmentDto.StateEnum;

	constructor(
		public participantFacade: ParticipantFacade,
		private assessmentService: AssessmentService,
		private route: ActivatedRoute,
		private router: Router,
		private location: Location,
		private dialog: DialogService,
		private toast: ToastService
	) {}

	ngOnInit(): void {
		this.courseId = this.route.snapshot.params.courseId;
		this.assignmentId = this.route.snapshot.params.assignmentId;
		this.assessmentId = this.route.snapshot.params.assessmentId;
		this.loadAssessment();
	}

	/** Loads the assessment. Uses the current route params to determine courseId, assignmentId and assessmentId. */
	loadAssessment(): void {
		this.assessmentService
			.getAssessmentById(this.courseId, this.assignmentId, this.assessmentId)
			.subscribe(
				result => {
					this.assignLoadAssessmentResult(result);
				},
				error => {
					this.toast.apiError(error);
				}
			);
	}

	private assignLoadAssessmentResult(assessment: AssessmentDto): void {
		this.assignment = assessment.assignment;
		this.group = assessment.group;
		this.targetedParticipant = assessment.participant;

		// Empty the form
		this.form.form.reset();
		this.form.getPartialAssessments().clear();

		// Apply update to form
		this.form.patchModel(assessment);
		assessment.partialAssessments?.forEach(partial => {
			this.form.addPartialAssessment(partial);
		});

		this.assessment$.next(assessment);
	}

	loadAssessmentEvents(): void {
		if (!this.showEvents) {
			this.assessmentService
				.getEventsOfAssessment(this.courseId, this.assessmentId, this.assessmentId)
				.subscribe(
					result => {
						this.events = result;
						this.showEvents = true;
					},
					error => {
						this.toast.apiError(error);
					}
				);
		}
	}

	onSave(saveAsDraft = false): void {
		const model = this.form.getModel();
		const update: AssessmentUpdateDto = {
			achievedPoints: model.achievedPoints,
			comment: model.comment?.length > 0 ? model.comment : null,
			isDraft: saveAsDraft,
			partialAssessments: model.partialAssessments
		};

		this.assessmentService
			.updateAssessment(update, this.courseId, this.assignmentId, this.assessmentId)
			.subscribe(
				result => {
					this.router.navigate([
						"/courses",
						this.courseId,
						"assignments",
						this.assignmentId,
						"assessments",
						"view",
						result.id
					]);
					this.toast.success("Message.Saved");
				},
				error => {
					this.toast.apiError(error);
				}
			);
	}
}
