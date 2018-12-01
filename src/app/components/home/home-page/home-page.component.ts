import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { TranslateService } from "@ngx-translate/core";
import { CurrencyQuery } from "../../currency/state/currency.query";
import { AccountQuery } from "../../accounts/state/account.query";
import { CategoryQuery } from "../../categories/state/category.query";
import { TransactionService } from "../../transactions/state/transaction.service";
import { TransactionQuery } from "../../transactions/state/transaction.query";
import { Transaction, createTransaction } from "../../transactions/state/transaction.model";
import { EditDialogComponent } from "../../transactions/edit-dialog/edit-dialog.component";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.css"]
})
export class HomePageComponent implements OnInit {
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
