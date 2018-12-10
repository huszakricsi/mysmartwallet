import { QueryEntity, QueryConfig, Order } from "@datorama/akita";
import { Transaction } from "./transaction.model";
import { TransactionState, TransactionStore } from "./transaction.store";
import { Injectable } from "@angular/core";

@QueryConfig({
  sortBy: "created_at",
  sortByOrder: Order.DESC
})
@Injectable({
  providedIn: "root"
})
export class TransactionQuery extends QueryEntity<
  TransactionState,
  Transaction
> {
  public Transactions$ = this.selectAll();
  public TransactionsCount$ = this.selectCount();
  public LastTransactions$ = this.selectAll({ limitTo: 5 });
  constructor(protected store: TransactionStore) {
    super(store);
  }
  public filterTransactions(filter) {
    if (!!filter) {
      let accepted_account_ids = filter.Accounts.filter(x => x.include).map(
        x => x.id
      );
      let accepted_category_ids = [];
      for (let cat of filter.Categories) {
        for (let child of cat.childs) {
          if (child.include) {
            accepted_category_ids.push(child.id);
          }
        }
      }
      return this.selectAll({
        filterBy: entity =>
          entity.comment.toLowerCase().includes(filter.Comment.toLowerCase()) &&
          entity.amount > filter.Price.min &&
          entity.amount < filter.Price.max &&
          new Date(entity.created_at) >= filter.Date.from &&
          new Date(entity.created_at) <= filter.Date.to &&
          accepted_account_ids.includes(entity.account_id) &&
          accepted_category_ids.includes(entity.category_id)
      });
    } else {
      return this.selectAll();
    }
  }
}
