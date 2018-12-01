import { Component, OnInit } from '@angular/core';
import { AccountQuery } from '../../accounts/state/account.query';

@Component({
  selector: 'app-statistics-page',
  templateUrl: './statistics-page.component.html',
  styleUrls: ['./statistics-page.component.css']
})
export class StatisticsPageComponent implements OnInit {

  constructor(
    public accountQuery: AccountQuery) { }

  ngOnInit() {
  }

}
