import { Component, OnInit, Input } from "@angular/core";
import { Account } from "../../accounts/state/account.model";
import { TranslateService } from "@ngx-translate/core";
import { TransactionQuery } from "../../transactions/state/transaction.query";
import { CategoryQuery } from "../../categories/state/category.query";

@Component({
  selector: "app-balance-diagram",
  templateUrl: "./balance-diagram.component.html",
  styleUrls: ["./balance-diagram.component.css"]
})
export class BalanceDiagramComponent implements OnInit {
  ngOnInit() {
    this.translate.get("COMPONENT.ACCOUNTS.NAME").subscribe((msg: string) => {
      this.yAxisLabel = msg + ": " + this.account.name;
    });
    this.translate.get("DATE").subscribe((msg: string) => {
      this.xAxisLabel = msg;
    });
    this.content[0].name=this.account.name;
    let d = new Date();
    d.setMonth(d.getMonth() - 3);
    this.transactionQuery
      .selectAll({
        filterBy: entity =>
          new Date(entity.created_at) >= d &&
          entity.account_id == this.account.id
      })
      .subscribe(entities => {
        let val = this.account.balance.valueOf();
        for (let entity of entities) {
          this.content[0].series.unshift({name: this.formatDate(entity.created_at.toString()), value: val})
          if (entity.isIncome) {
            val -= entity.amount;
          } else {
            val += entity.amount;
          }
        }
      });
  }
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
  @Input() account: Account;

  content = [
    {
      name: "",
      series: [
      ]
    }
  ];


  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = "";
  showYAxisLabel = true;
  yAxisLabel = "";
  legendTitle = "";

  colorScheme = {
    domain: ["#5AA454", "#A10A28", "#C7B42C", "#AAAAAA"]
  };

  constructor(
    public translate: TranslateService,
    public transactionQuery: TransactionQuery,
    public categoryQuery: CategoryQuery
  ) {}

  onSelect(event) {
  }
}
