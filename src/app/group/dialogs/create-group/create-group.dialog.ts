import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { GroupService, GroupDto } from "../../../../../api";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CreateGroupMultipleComponent } from "./create-group-multiple/create-group-multiple.component";
import { MatTabGroup } from "@angular/material/tabs";
import { SnackbarService } from "../../../shared/services/snackbar.service";

@Component({
	selector: "app-create-group",
	templateUrl: "./create-group.dialog.html",
	styleUrls: ["./create-group.dialog.scss"]
})
export class CreateGroupDialog implements OnInit {
	@ViewChild("createMultiple") createMultiple: CreateGroupMultipleComponent;
	@ViewChild("tabs") tabGroup: MatTabGroup;
	form: FormGroup;

	constructor(
		public dialogRef: MatDialogRef<CreateGroupDialog>,
		@Inject(MAT_DIALOG_DATA) public courseId: string,
		private groupService: GroupService,
		private fb: FormBuilder,
		private snackbar: SnackbarService
	) {
		this.form = this.fb.group({
			courseId: [this.courseId, Validators.required],
			name: [null, Validators.required],
			password: [null],
			isClosed: [false]
		});
	}

	ngOnInit(): void {}

	onCancel(): void {
		this.dialogRef.close();
	}

	onGroupsCreatedHandler(groups: GroupDto[]): void {
		this.snackbar.openSuccessMessage("Groups created!");
		this.dialogRef.close(groups);
	}

	/** Calls the onSave-Method of the selected tab. */
	onSave(): void {
		if (this.tabGroup.selectedIndex == 0) {
			// Single-Tab
			this.onSaveSingle();
		} else if (this.tabGroup.selectedIndex == 1) {
			// Multiple-Tab
			this.createMultiple.onSave();
		}
	}

	onSaveSingle(): void {
		const group: GroupDto = this.form.value;

		this.groupService.createGroup(group, this.courseId).subscribe(
			result => {
				this.snackbar.openSuccessMessage("Group created!");
				this.dialogRef.close(result);
			},
			error => {
				console.log(error);
				this.snackbar.openErrorMessage();
			}
		);
	}
}
