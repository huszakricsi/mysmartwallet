import { QueryEntity } from "@datorama/akita";
import { Account } from "./account.model";
import { AccountState, AccountStore } from "./account.store";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AccountQuery extends QueryEntity<AccountState, Account> {  
  Accounts$ = this.selectAll();
  constructor(protected store: AccountStore) {
    super(store);
  }
}