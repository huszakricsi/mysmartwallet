import { Component, OnInit, ViewChild } from "@angular/core";
import { TransactionQuery } from "../state/transaction.query";
import { TransactionService } from "../state/transaction.service";
import { CategoryQuery } from "../../categories/state/category.query";
import { createTransaction, Transaction } from "../state/transaction.model";
import { AccountQuery } from "../../accounts/state/account.query";
import { CurrencyQuery } from "../../currency/state/currency.query";
import { MatDialog } from "@angular/material/dialog";
import { EditDialogComponent } from "../edit-dialog/edit-dialog.component";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-transactions-page",
  templateUrl: "./transactions-page.component.html",
  styleUrls: ["./transactions-page.component.css"]
})
export class TransactionsPageComponent implements OnInit {
  pageEvent = { pageIndex: 0, pageSize: 5 };
  displayedColumns: string[] = [
    "account_id",
    "category_id",
    "amount",
    "comment",
    "created_at",
    "edit"
  ];
  new = createTransaction({
    id: null,
    amount: 0,
    comment: "",
    category_id: null,
    account_id: null,
    created_at: null
  });

  constructor(
    public transactionQuery: TransactionQuery,
    public transactionService: TransactionService,
    public categoryQuery: CategoryQuery,
    public accountQuery: AccountQuery,
    public currencyQuery: CurrencyQuery,
    public translate: TranslateService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {}
  formatDate(date: string) {
    let mdate = new Date(date);
    return (
      mdate.getFullYear() +
      "-" +
      (mdate.getMonth() + 1) +
      "-" +
      mdate.getDate() +
      " " +
      mdate.getHours() +
      ":" +
      mdate.getMinutes()
    );
  }
  editTransaction(transaction: Transaction) {
    this.dialog.open(EditDialogComponent, {
      data: {
        account_id: transaction.account_id.valueOf(),
        amount: transaction.amount.valueOf(),
        category_id: transaction.category_id.valueOf(),
        comment: transaction.comment.valueOf(),
        created_at: transaction.created_at.valueOf(),
        id: transaction.id.valueOf()
      }
    });
  }
  createTransaction(transaction: Transaction) {
    this.transactionService.createTransaction(transaction);
  }
}
