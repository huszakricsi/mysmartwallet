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
import { Account } from "./account.model";

@Injectable({
  providedIn: "root"
})
export class AccountService {
  deleteAccount(acc: Account): any {
    axios({
      url: environment.api.accountsEndpoint,
      method: "DELETE",
      headers: {
        "access-token": this.authQuery.accessToken,
        client: this.authQuery.client,
        uid: this.authQuery.uid,
        expiry: this.authQuery.expiry,
        "token-type": "Bearer"
      },
      data: acc
    })
      .then((response: any) => {
        this.authService.updateHeaders(response.headers);
        this.fetchAccounts();
        if (!!this.snackBar) {
          this.translate
            .get("COMPONENT.ACCOUNTS.ACCOUNTSTATE.OK")
            .subscribe((ok: string) => {
              this.translate
                .get("COMPONENT.ACCOUNTS.ACCOUNTSTATE.DELETEDSUCCESSFULLY")
                .subscribe((msg: string) => {
                  this.snackBar.open(msg, ok, {
                    duration: 2000
                  });
                });
            });
        }
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
  editAccount(acc: Account): any {
    axios({
      url: environment.api.accountsEndpoint,
      method: "PATCH",
      headers: {
        "access-token": this.authQuery.accessToken,
        client: this.authQuery.client,
        uid: this.authQuery.uid,
        expiry: this.authQuery.expiry,
        "token-type": "Bearer"
      },
      data: acc
    })
      .then((response: any) => {
        this.authService.updateHeaders(response.headers);
        this.fetchAccounts();
        if (!!this.snackBar) {
          this.translate
            .get("COMPONENT.ACCOUNTS.ACCOUNTSTATE.OK")
            .subscribe((ok: string) => {
              this.translate
                .get("COMPONENT.ACCOUNTS.ACCOUNTSTATE.EDITEDSUCCESSFULLY")
                .subscribe((msg: string) => {
                  this.snackBar.open(msg, ok, {
                    duration: 2000
                  });
                });
            });
        }
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
  createAccount(acc: Account): void {
    axios({
      url: environment.api.accountsEndpoint,
      method: "POST",
      headers: {
        "access-token": this.authQuery.accessToken,
        client: this.authQuery.client,
        uid: this.authQuery.uid,
        expiry: this.authQuery.expiry,
        "token-type": "Bearer"
      },
      data: acc
    })
      .then((response: any) => {
        this.authService.updateHeaders(response.headers);
        this.fetchAccounts();
        if (!!this.snackBar) {
          this.translate
            .get("COMPONENT.ACCOUNTS.ACCOUNTSTATE.OK")
            .subscribe((ok: string) => {
              this.translate
                .get("COMPONENT.ACCOUNTS.ACCOUNTSTATE.ADDEDSUCCESSFULLY")
                .subscribe((msg: string) => {
                  this.snackBar.open(msg, ok, {
                    duration: 2000
                  });
                });
            });
        }
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
        this.authService.updateHeaders(response.headers);
        this.accountStore.set(
          response.data.accounts.map(item => createAccount(item))
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
