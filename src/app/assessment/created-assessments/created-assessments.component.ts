import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from "@angular/core";
import { AssessmentDto, AssignmentDto, AssignmentsService, AssessmentsService } from "../../../../api";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { ActivatedRoute } from "@angular/router";

@Component({
	selector: "app-created-assessments",
	templateUrl: "./created-assessments.component.html",
	styleUrls: ["./created-assessments.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreatedAssessmentsComponent implements OnInit {

	assessments: AssessmentDto[];

	courseId: string;
	assignmentId: string;

	displayedColumns: string[] = ["view", "for", "achievedPoints", "creator"];
	dataSource: MatTableDataSource<AssessmentDto>;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	stateEnum = AssignmentDto.StateEnum;

	constructor(private assignmentService: AssignmentsService,
				private assessmentService: AssessmentsService,
				private route: ActivatedRoute) { }

	ngOnInit(): void {
		this.courseId = this.route.snapshot.params.courseId;
		this.assignmentId = this.route.snapshot.params.assignmentId;
		this.loadAssessments();
	}

	loadAssessments(): void {
		this.assessmentService.getAllAssessmentsForAssignment(this.courseId, this.assignmentId).subscribe(
			result => {
				this.assessments = result;
				this.dataSource = new MatTableDataSource(this.assessments);
				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
			},
			error => console.log(error)
		);
	}

}
