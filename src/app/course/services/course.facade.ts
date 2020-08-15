import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { CourseDto, CoursesService, CourseConfigService, GroupSettingsDto } from "../../../../api";

@Injectable()
export class CourseFacade {

	private courseSubject = new BehaviorSubject<CourseDto>(undefined);
	/** Emits the currently loaded course. */
	course$ = this.courseSubject.asObservable();

	private groupSettingsSubject = new BehaviorSubject<GroupSettingsDto>(undefined);
	/** Emits the group settings of the currently loaded course. */
	groupSettings$ = this.groupSettingsSubject.asObservable();

	constructor(private courseService: CoursesService,
				private courseConfigService: CourseConfigService,
				private router: Router,
				private dialog: MatDialog) { }

	loadCourse(courseId: string): Observable<CourseDto> {
		return this.courseService.getCourseById(courseId).pipe(
			tap(course => {
				this.courseSubject.next(course);
				//console.log("Current course:", course);
			})
		);
	}

	/**
	 * Loads the group settings of a course and emits them via `groupSettings$`.
	 * @param courseId
	 * @param [noCache=false] Will reload from API if `true`. Defaults to `false`.
	 */
	loadGroupSettings(courseId: string, noCache = false): Observable<GroupSettingsDto> {
		return this.courseConfigService.getGroupSettings(courseId).pipe(
			tap(settings => {
				this.groupSettingsSubject.next(settings);
				//console.log("Current course:", course);
			})
		);
	}
}