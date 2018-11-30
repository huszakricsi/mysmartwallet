import { QueryEntity, QueryConfig, Order, ID } from "@datorama/akita";
import { Category } from "./category.model";
import { CategoryState, CategoryStore } from "./category.store";
import { Injectable } from "@angular/core";

@QueryConfig({
  sortBy: "id",
  sortByOrder: Order.ASC
})
@Injectable({
  providedIn: "root"
})
export class CategoryQuery extends QueryEntity<CategoryState, Category> {
  public Categories$ = this.selectAll();
  public childs = {};
  constructor(protected store: CategoryStore) {
    super(store);
    this.selectAll().subscribe(entities => {
      for (let entry of entities) {
        entry.childs.forEach(
          function(current) {
            this.childs[current.id] = current.label;
          }.bind(this)
        );
      }
    });
  }
}
