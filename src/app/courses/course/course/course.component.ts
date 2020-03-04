import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CourseDto, CoursesService } from "../../../../../api/typescript-angular-client-generated";

@Component({
	selector: "app-course",
	templateUrl: "./course.component.html",
	styleUrls: ["./course.component.scss"]
})
export class CourseComponent implements OnInit {

	course: CourseDto;

	constructor(private route: ActivatedRoute,
				private router: Router,
				private courseService: CoursesService) { }

	ngOnInit(): void {
		const semester = this.route.snapshot.paramMap.get("semester");
		const name = this.route.snapshot.paramMap.get("name");
		this.courseService.getCourseByNameAndSemester(name, semester).subscribe(
			result => this.course = result,
			error => this.router.navigate(["/404"])
		);
	}

}