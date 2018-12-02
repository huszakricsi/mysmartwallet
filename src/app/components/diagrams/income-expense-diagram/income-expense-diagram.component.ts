import { Component, OnInit, Input } from "@angular/core";
import { NgxChartsModule } from "@swimlane/ngx-charts";
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
export class IncomeExpenseDiagramComponent implements OnInit {
  ngOnInit() {
    this.translate.get("COMPONENT.ACCOUNTS.NAME").subscribe((msg: string) => {
      this.yAxisLabel = msg + ": " + this.account.name;
    });
    this.translate.get("INCOME").subscribe((msg: string) => {
      this.content[0].series[0].name = msg;
      this.content[1].series[0].name = msg;
      this.content[2].series[0].name = msg;
    });
    this.translate.get("EXPENSE").subscribe((msg: string) => {
      this.content[0].series[1].name = msg;
      this.content[1].series[1].name = msg;
      this.content[2].series[1].name = msg;
    });
    this.translate.get("SAVING").subscribe((msg: string) => {
      this.content[0].series[2].name = msg;
      this.content[1].series[2].name = msg;
      this.content[2].series[2].name = msg;
    });
    this.translate.get("MONTHS.MONTH").subscribe((msg: string) => {
      this.xAxisLabel = msg;
    });

    let CurrentMonth = new Date();
    this.translate
      .get("MONTHS." + CurrentMonth.getMonth())
      .subscribe((msg: string) => {
        this.content[2].name = msg;
      });
    let MonthBefore = new Date();
    MonthBefore.setMonth(CurrentMonth.getMonth() - 1);
    this.translate
      .get("MONTHS." + MonthBefore.getMonth())
      .subscribe((msg: string) => {
        this.content[1].name = msg;
      });
    let MonthBeforePrevious = new Date();
    MonthBeforePrevious.setMonth(MonthBefore.getMonth() - 1);
    this.translate
      .get("MONTHS." + MonthBeforePrevious.getMonth())
      .subscribe((msg: string) => {
        this.content[0].name = msg;
      });
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
          if (new Date(entity.created_at).getMonth() == CurrentMonth.getMonth()) {
            if (
              entity.isIncome
            ) {
              this.content[2].series[0].value += entity.amount;
              this.content[2].series[2].value += entity.amount;
            } else {
              this.content[2].series[1].value += entity.amount;
              this.content[2].series[2].value -= entity.amount;
            }
          } else if (
            new Date(entity.created_at).getMonth() == MonthBefore.getMonth()
          ) {
            if (
              entity.isIncome
              )
            {
              this.content[1].series[0].value += entity.amount;
              this.content[1].series[2].value += entity.amount;
            } else {
              this.content[1].series[1].value += entity.amount;
              this.content[1].series[2].value -= entity.amount;
            }
          } else {
            if (entity.isIncome)
             {
              this.content[0].series[0].value += entity.amount;
              this.content[0].series[2].value += entity.amount;
            } else {
              this.content[0].series[1].value += entity.amount;
              this.content[0].series[2].value -= entity.amount;
            }
          }
        }
      });
  }

  @Input() account: Account;

  content = [
    {
      name: "1",
      series: [
        {
          name: "income",
          value: 0
        },
        {
          name: "expense",
          value: 0
        },
        {
          name: "savings",
          value: 0
        }
      ]
    },

    {
      name: "2",
      series: [
        {
          name: "income",
          value: 0
        },
        {
          name: "expense",
          value: 0
        },
        {
          name: "savings",
          value: 0
        }
      ]
    },

    {
      name: "3",
      series: [
        {
          name: "income",
          value: 0
        },
        {
          name: "expense",
          value: 0
        },
        {
          name: "savings",
          value: 0
        }
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
