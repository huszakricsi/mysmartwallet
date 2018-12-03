import { Component, OnInit, Input, ViewChild, OnChanges } from "@angular/core";
import { NgxChartsModule, BarVertical2DComponent } from "@swimlane/ngx-charts";
import { Account } from "../../accounts/state/account.model";
import { TranslateService } from "@ngx-translate/core";
import { TransactionService } from "../../transactions/state/transaction.service";
import { TransactionQuery } from "../../transactions/state/transaction.query";
import { CategoryQuery } from "../../categories/state/category.query";

@Component({
  selector: "app-income-expense-diagram",
  templateUrl: "./income-expense-diagram.component.html",
  styleUrls: ["./income-expense-diagram.component.css"]
})
export class IncomeExpenseDiagramComponent implements OnInit, OnChanges {
  ngOnInit(): void {
    this.ngOnChanges();
  }
  ngOnChanges():void {
    this.translate.get("COMPONENT.ACCOUNTS.NAME").subscribe((msg: string) => {
      this.yAxisLabel = msg + ": " + this.account.name;
    });
    this.translate.get("MONTHS.MONTH").subscribe((msg: string) => {
      this.xAxisLabel = msg;
    });
    let d = new Date();
    d.setMonth(d.getMonth() - this.months_back);
    d.setDate(1)
    d.setHours(0,0,0,0);
    this.transactionQuery
      .selectAll({
        filterBy: entity =>
          new Date(entity.created_at) >= d &&
          entity.account_id == this.account.id
      })
      .subscribe(entities => {
        let month = new Date();
        this.content = [];
        for (let current_ = 0; current_ <= this.months_back; current_++) {
          this.content.unshift({
            name: "",
            series: [
              { name: "", value: 0 },
              { name: "", value: 0 },
              { name: "", value: 0 }
            ]
          });
          this.translate.get("INCOME").subscribe((msg: string) => {
            this.content[0].series[0].name = msg;
          });
          this.translate.get("EXPENSE").subscribe((msg: string) => {
            this.content[0].series[1].name = msg;
          });
          this.translate.get("SAVING").subscribe((msg: string) => {
            this.content[0].series[2].name = msg;
          });

          this.translate
            .get("MONTHS." + month.getMonth())
            .subscribe((msg: string) => {
              this.content[0].name = msg;
            });
          for (let entity of entities) {
            if (new Date(entity.created_at).getMonth() == month.getMonth()) {
              if (entity.isIncome) {
                this.content[0].series[0].value += entity.amount;
                this.content[0].series[2].value += entity.amount;
              } else {
                this.content[0].series[1].value += entity.amount;
                this.content[0].series[2].value -= entity.amount;
              }
            }
          }
          month.setMonth(month.getMonth() - 1);
        }
        this._chart.results = this.content;
        this._chart.update();
      });
  }

  @Input() months_back: number;
  @Input() account: Account;

  @ViewChild(BarVertical2DComponent) private _chart;
  content = [];

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

  onSelect(event) {}
}
