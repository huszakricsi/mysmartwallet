import { Component, OnInit } from "@angular/core";
import { AccountQuery } from "../../accounts/state/account.query";

@Component({
  selector: "app-statistics-page",
  templateUrl: "./statistics-page.component.html",
  styleUrls: ["./statistics-page.component.css"]
})
export class StatisticsPageComponent implements OnInit {
  constructor(public accountQuery: AccountQuery) {}
  public selected = 2;
  public nums = [2, 3, 5, 7, 10, 12];
  ngOnInit() {}
  array(n: number): any[] {
    return Array(n);
  }
}
