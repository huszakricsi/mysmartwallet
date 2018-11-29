import axios from "axios";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CurrencyQuery } from "./currency.query";
import { createCurrency } from "./currency.model";
import { TranslateService } from "@ngx-translate/core";
import { AuthService } from "../../auth/state/auth.service";
import { environment } from "src/environments/environment";
import { AuthQuery } from "../../auth/state/auth.query";
import { AuthStore } from "../../auth/state/auth.store";
import { CurrencyStore } from "./currency.store";

@Injectable({
  providedIn: "root"
})
export class CurrencyService {
  constructor(
    private authQuery: AuthQuery,
    private currencyStore: CurrencyStore,
    public snackBar: MatSnackBar,
    private translate: TranslateService
  ) {}

  public fetchCurrencies() {
    axios({
      url: environment.api.currenciesEndpoint,
      method: "GET",
      headers: {
        "access-token": this.authQuery.accessToken,
        client: this.authQuery.client,
        uid: this.authQuery.uid,
        expiry: this.authQuery.expiry,
        "token-type": "Bearer"
      }
    })
      .then((response: any) => {
        this.currencyStore.set(
          response.data.currencies.map(item => createCurrency(item))
        );
      })
      .catch((error: any) => {
        error.response.data.errors.forEach(
          function(error) {
            if (!!this.snackBar) {
              this.translate
                .get("COMPONENT.AUTH.AUTHSTATE.OK")
                .subscribe((ok: string) => {
                  this.snackBar.open(error, ok, {
                    duration: 2000
                  });
                });
            }
          }.bind(this)
        );
      });
  }
}
