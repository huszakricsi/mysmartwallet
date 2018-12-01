import { TransactionStore } from "./transaction.store";
import axios from "axios";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TransactionQuery } from "./transaction.query";
import { Transaction, createTransaction } from "./transaction.model";
import { TranslateService } from "@ngx-translate/core";
import { AuthService } from "../../auth/state/auth.service";
import { environment } from "src/environments/environment";
import { AuthQuery } from "../../auth/state/auth.query";
import { AuthStore } from "../../auth/state/auth.store";
import { AccountService } from "../../accounts/state/account.service";

@Injectable({
  providedIn: "root"
})
export class TransactionService {
  deleteTransaction(transaction: Transaction): any {
    axios({
      url: environment.api.transactionsEndpoint,
      method: "DELETE",
      headers: {
        "access-token": this.authQuery.accessToken,
        client: this.authQuery.client,
        uid: this.authQuery.uid,
        expiry: this.authQuery.expiry,
        "token-type": "Bearer"
      },
      data: transaction
    })
      .then((response: any) => {
        this.authService.updateHeaders(response.headers);
        this.accountService.fetchAccounts();
        this.fetchTransactions();
        if (!!this.snackBar) {
          this.translate
            .get("COMPONENT.TRANSACTIONS.TRANSACTIONSSTATE.OK")
            .subscribe((ok: string) => {
              this.translate
                .get("COMPONENT.TRANSACTIONS.TRANSACTIONSSTATE.DELETEDSUCCESSFULLY")
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
  patchTransaction(transaction: Transaction): any {
    axios({
      url: environment.api.transactionsEndpoint,
      method: "PATCH",
      headers: {
        "access-token": this.authQuery.accessToken,
        client: this.authQuery.client,
        uid: this.authQuery.uid,
        expiry: this.authQuery.expiry,
        "token-type": "Bearer"
      },
      data: transaction
    })
      .then((response: any) => {
        this.authService.updateHeaders(response.headers);
        this.accountService.fetchAccounts();
        this.fetchTransactions();
        if (!!this.snackBar) {
          this.translate
            .get("COMPONENT.TRANSACTIONS.TRANSACTIONSSTATE.OK")
            .subscribe((ok: string) => {
              this.translate
                .get("COMPONENT.TRANSACTIONS.TRANSACTIONSSTATE.EDITEDSUCCESSFULLY")
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
  createTransaction(transaction: Transaction): any {
    axios({
      url: environment.api.transactionsEndpoint,
      method: "POST",
      headers: {
        "access-token": this.authQuery.accessToken,
        client: this.authQuery.client,
        uid: this.authQuery.uid,
        expiry: this.authQuery.expiry,
        "token-type": "Bearer"
      },
      data: transaction
    })
      .then((response: any) => {
        this.authService.updateHeaders(response.headers);
        this.accountService.fetchAccounts();
        this.fetchTransactions();
        if (!!this.snackBar) {
          this.translate
            .get("COMPONENT.TRANSACTIONS.TRANSACTIONSSTATE.OK")
            .subscribe((ok: string) => {
              this.translate
                .get("COMPONENT.TRANSACTIONS.TRANSACTIONSSTATE.ADDEDSUCCESSFULLY")
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
    private transactionStore: TransactionStore,
    private transactionQuery: TransactionQuery,
    private accountService: AccountService,
    public snackBar: MatSnackBar,
    private translate: TranslateService
  ) {}

  public fetchTransactions() {
    axios({
      url: environment.api.transactionsEndpoint,
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
        this.transactionStore.set(
          response.data.transactions.map(item => createTransaction(item))
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
