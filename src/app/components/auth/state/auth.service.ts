import { AuthStore } from "./auth.store";
import { createAuth } from "./auth.model";
import axios from "axios";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthQuery } from "./auth.query";
import { environment } from "src/environments/environment";
import { LocalStorageService } from "angular-web-storage";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(
    private authStore: AuthStore,
    private authQuery: AuthQuery,
    public snackBar: MatSnackBar,
    public local: LocalStorageService,
    private translate: TranslateService
  ) {
    try {
      let auth = createAuth(local.get("auth"));
      axios({
        url: environment.api.auth.validateEndpoint,
        method: "GET",
        headers: {
          'access-token': auth.accessToken,
          'client': auth.client,
          'uid': auth.uid,
          'expiry': auth.expiry,
          'token-type': 'Bearer'
        }
      })
        .then((response: any) => {
          this.authStore.update(auth);
        })
        .catch((exception: any)=>{
          local.remove("auth");
        })
    } catch (e) {}
    authQuery.auth$.subscribe(auth => {
      this.local.set("auth", auth);
    });
  }
  login(userData: { email: string; password: string }) {
    axios({
      url: environment.api.auth.signInEndpoint,
      method: "POST",
      data: userData
    })
      .then((response: any) => {
        const uid = response.headers["uid"];
        const client = response.headers["client"];
        const accessToken = response.headers["access-token"];
        const expiry = response.headers["expiry"];
        this.authStore.update(
          createAuth({ uid, client, accessToken, expiry, tokenType: "Bearer" })
        );
        if (!!this.snackBar) {
          this.translate
            .get("COMPONENT.AUTH.AUTHSTATE.LOGGEDIN")
            .subscribe((msg: string) => {
              this.translate
                .get("COMPONENT.AUTH.AUTHSTATE.OK")
                .subscribe((ok: string) => {
                  this.snackBar.open(uid + msg, ok, {
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
        this.authStore.update(
          createAuth({
            uid: null,
            client: "",
            accessToken: "",
            expiry: "",
            tokenType: "Bearer"
          })
        );
      });
  }

  register(userData: {
    email: string;
    password: string;
    password_confirmation: string;
    nickname: string;
    name: string;
  }) {
    axios({
      url: environment.api.authEndpoint,
      method: "POST",
      data: userData
    })
      .then((response: any) => {
        const uid = response.headers["uid"];
        const client = response.headers["client"];
        const accessToken = response.headers["access-token"];
        const expiry = response.headers["expiry"];
        this.authStore.update(
          createAuth({ uid, client, accessToken, expiry, tokenType: "Bearer" })
        );
        if (!!this.snackBar) {
          this.translate
            .get("COMPONENT.AUTH.AUTHSTATE.REGISTERED")
            .subscribe((msg: string) => {
              this.translate
                .get("COMPONENT.AUTH.AUTHSTATE.OK")
                .subscribe((ok: string) => {
                  this.snackBar.open(uid + msg, ok, {
                    duration: 2000
                  });
                });
            });
        }
      })
      .catch((error: any) => {
        error.response.data.errors.full_messages.forEach(
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
        this.authStore.update(
          createAuth({
            uid: null,
            client: "",
            accessToken: "",
            expiry: "",
            tokenType: "Bearer"
          })
        );
      });
  }

  logout() {
    axios({
      url: environment.api.auth.signOutEndpoint,
      method: "DELETE",
      headers: {
        "access-token": this.authQuery.accessToken,
        client: this.authQuery.client,
        uid: this.authQuery.uid
      }
    })
      .then((response: any) => {
        this.authStore.update(
          createAuth({
            uid: null,
            client: "",
            accessToken: "",
            expiry: "",
            tokenType: "Bearer"
          })
        );
        if (!!this.snackBar) {
          this.translate
            .get("COMPONENT.AUTH.AUTHSTATE.GOODBYE")
            .subscribe((msg: string) => {
              this.translate
                .get("COMPONENT.AUTH.AUTHSTATE.OK")
                .subscribe((ok: string) => {
                  this.snackBar.open(msg, ok, {
                    duration: 2000
                  });
                });
            });
        }
      })
      .catch((error: any) => {
        error.response.data.errors.full_messages.forEach(
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
