import { Component, OnInit } from "@angular/core";
import { TransactionQuery } from "../state/transaction.query";
import { TransactionService } from "../state/transaction.service";
import { CategoryQuery } from "../../categories/state/category.query";
import { createTransaction, Transaction } from "../state/transaction.model";
import { AccountQuery } from "../../accounts/state/account.query";
import { CurrencyQuery } from "../../currency/state/currency.query";

@Component({
  selector: "app-transactions-page",
  templateUrl: "./transactions-page.component.html",
  styleUrls: ["./transactions-page.component.css"]
})
export class TransactionsPageComponent implements OnInit {
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
    public translate: TransactionService
  ) {}

  ngOnInit() {}

  
  create(transaction: Transaction) {
    this.transactionService.createTransaction(transaction);
  }
}
