import { Component, OnInit } from '@angular/core';
import { AccountService } from '../state/account.service';
import { AccountQuery } from '../state/account.query';

@Component({
  selector: 'app-accounts-page',
  templateUrl: './accounts-page.component.html',
  styleUrls: ['./accounts-page.component.css']
})
export class AccountsPageComponent implements OnInit {

  constructor(public accountQuery:AccountQuery,public accountService:AccountService) {}

  ngOnInit() {
  }

}
