import { Component, OnInit, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Transaction } from '../state/transaction.model';
import { TransactionQuery } from '../state/transaction.query';
import { TransactionService } from '../state/transaction.service';
import { CategoryQuery } from '../../categories/state/category.query';
import { AccountQuery } from '../../accounts/state/account.query';
import { CurrencyQuery } from '../../currency/state/currency.query';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {
  constructor(
    public transactionQuery: TransactionQuery,
    public transactionService: TransactionService,
    public categoryQuery: CategoryQuery,
    public accountQuery: AccountQuery,
    public currencyQuery: CurrencyQuery,
    public translate: TranslateService,
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Transaction
  ) {}

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onSaveClick(): void {
    this.transactionService.patchTransaction(this.data);
    this.dialogRef.close();
  }
  onDeleteClick(): void {
    this.transactionService.deleteTransaction(this.data);
    this.dialogRef.close();
  }
}
