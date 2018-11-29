import { Component, OnInit, Inject } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

export interface DeleteDialogData {
  name: string;
  nameConfirmation: string;
}

@Component({
  selector: "app-delete-confirmation-dialog",
  templateUrl: "./delete-confirmation-dialog.component.html",
  styleUrls: ["./delete-confirmation-dialog.component.css"]
})
export class DeleteConfirmationDialogComponent implements OnInit {
  constructor(
    public translate: TranslateService,
    public dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DeleteDialogData
  ) {}

  ngOnInit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
