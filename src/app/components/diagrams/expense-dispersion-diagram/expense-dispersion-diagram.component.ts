import { Component, OnInit, Input } from "@angular/core";
import { Account } from "../../accounts/state/account.model";
import { TranslateService } from "@ngx-translate/core";
import { TransactionQuery } from "../../transactions/state/transaction.query";
import { CategoryQuery } from "../../categories/state/category.query";

@Component({
  selector: "app-expense-dispersion-diagram",
  templateUrl: "./expense-dispersion-diagram.component.html",
  styleUrls: ["./expense-dispersion-diagram.component.css"]
})
export class ExpenseDispersionDiagramComponent implements OnInit {
  ngOnInit() {
    let d = new Date();
    d.setMonth(d.getMonth() - 3);
    this.transactionQuery
      .selectAll({
        filterBy: entity =>
          new Date(entity.created_at) >= d &&
          entity.account_id == this.account.id
      })
      .subscribe(entities => {
        for (let entity of entities) {
          if (!entity.isIncome) {
            let found = false;
            for (let pie of this.content) {
              if (pie.name == entity.category_id) {
                found = true;
                pie.value += entity.amount.valueOf();
              }
            }
            if (!found) {
              this.content.push({ name: entity.category_id, value: entity.amount.valueOf() })
            }
          }
        }
        for (let pie of this.content) {

          this.translate.get("CATEGORIES." + this.categoryQuery.childs[pie.name].toUpperCase()).subscribe((msg: string) => {
            pie.name = msg;
          });
        }
      });
  }
  @Input() account: Account;

  content = [];


  // options
  gradient = false;
  showLegend = false;
  showLabels = true;
  legendTitle = "";

  colorScheme = {
    domain: ["#5AA454", "#A10A28", "#C7B42C", "#AAAAAA"]
  };

  constructor(
    public translate: TranslateService,
    public transactionQuery: TransactionQuery,
    public categoryQuery: CategoryQuery
  ) { }

  onSelect(event) {
  }
}