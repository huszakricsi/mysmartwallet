import { QueryEntity, QueryConfig, Order } from "@datorama/akita";
import { Transaction } from "./transaction.model";
import { TransactionState, TransactionStore } from "./transaction.store";
import { Injectable } from "@angular/core";

@QueryConfig({
  sortBy: 'created_at',
  sortByOrder: Order.DESC
})
@Injectable({
  providedIn: "root"
})
export class TransactionQuery extends QueryEntity<TransactionState, Transaction> {  
  public Transactions$ = this.selectAll();
  public TransactionsCount$ = this.selectCount();
  public LastTransactions$ = this.selectAll({limitTo: 5});
  constructor(protected store: TransactionStore) {
    super(store);
  }
}