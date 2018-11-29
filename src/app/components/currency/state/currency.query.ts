import { QueryEntity } from "@datorama/akita";
import { Currency } from "./currency.model";
import { CurrencyState, CurrencyStore } from "./currency.store";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class CurrencyQuery extends QueryEntity<CurrencyState, Currency> {  
  Currencies$ = this.selectAll();
  constructor(protected store: CurrencyStore) {
    super(store);
  }
}