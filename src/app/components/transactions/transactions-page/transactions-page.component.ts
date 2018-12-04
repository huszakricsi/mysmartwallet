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
import { convertInjectableProviderToFactory } from "@angular/core/src/di/injectable";

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
  filters = this.defaultFilters();
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
  defaultFilters() {
    return {
      Accounts: this.accountQuery.getAll().map(acc => {
        return { id: acc.id, name: acc.name, include: true };
      }),
      Categories: this.categoryQuery.getAll().map(cat => {
        return {
          label: cat.label,
          include: true,
          indeterminate: false,
          childs: cat.childs.map(child => {
            return {
              label: child.label,
              parent: cat,
              id: child.id,
              include: true
            };
          })
        };
      }),
      Price: {
        min: 0,
        max: 999999999
      },
      Comment: ""
    };
  }
  groupCategoryIncludeChanged(groupCategory) {
    for (let child of groupCategory.childs) {
      child.include = groupCategory.include;
    }
  }
  childCategoryIncludeChanged(childCategory) {
    let trues = 0;
    let falses = 0;
    let parent = null;
    for (let cat of this.filters.Categories) {
      if (cat.childs.includes(childCategory)) {
        parent = cat;
      }
    }
    for (let child of parent.childs) {
      if (child.include) {
        trues++;
      } else {
        falses++;
      }
    }
    if (trues != 0 && falses != 0) {
      parent.indeterminate = true;
    } else if (trues == 0) {
      parent.indeterminate = false;
      parent.include = false;
    } else {
      parent.indeterminate = false;
      parent.include = true;
    }
  }
  resetfilters() {
    this.filters = this.defaultFilters();
  }
  toggleAll() {
    let next = !this.filters.Categories[0].include;
    for (let cat of this.filters.Categories) {
      cat.include = next;
      for (let child of cat.childs) {
        child.include = next;
      }
    }
  }
}
