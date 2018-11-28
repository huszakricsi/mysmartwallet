import { AccountStore } from "./account.store";
import axios from "axios";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AccountQuery } from "./account.query";
import { createAccount } from "./account.model";
import { TranslateService } from "@ngx-translate/core";
import { AuthService } from "../../auth/state/auth.service";
import { environment } from "src/environments/environment";
import { AuthQuery } from "../../auth/state/auth.query";
import { AuthStore } from "../../auth/state/auth.store";

@Injectable({
  providedIn: "root"
})
export class AccountService {
  constructor(
    private authService: AuthService,
    private authQuery: AuthQuery,
    private authStore: AuthStore,
    private accountStore: AccountStore,
    private accountQuery: AccountQuery,
    public snackBar: MatSnackBar,
    private translate: TranslateService
  ) {}

  public fetchAccounts() {
    axios({
      url: environment.api.accountsEndpoint,
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
        this.accountStore.set(response.data.accounts.map(item => createAccount(item)));
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
