import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CourseListComponent } from "./course-list/course-list.component";
import { CourseComponent } from "./course/course/course.component";

const routes: Routes = [
	{ path: ":semester/:name", component: CourseComponent, pathMatch: "full" },
	{ path: "", component: CourseListComponent, pathMatch: "full" }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CoursesRoutingModule { }