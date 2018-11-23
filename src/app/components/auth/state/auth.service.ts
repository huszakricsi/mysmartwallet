import { AuthStore } from "./auth.store";
import { createAuth } from "./auth.model";
import axios from "axios";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthQuery } from "./auth.query";
import {environment} from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private authStore: AuthStore, private athQuery: AuthQuery, public snackBar: MatSnackBar) {}
  login(userData: {email: string, password: string}) {
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
          this.snackBar.open(uid + " logged in.", "Ok", {
            duration: 2000
          });
        }
      })
      .catch((error: any) => {
        error.response.data.errors.forEach(
          function(error) {
            if (!!this.snackBar) {
              this.snackBar.open(error, "Ok", {
                duration: 2000
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
    email: string,
    password: string,
    password_confirmation: string,
    nickname: string,
    name: string
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
          this.snackBar.open(uid + " logged in.", "Ok", {
            duration: 2000
          });
        }
      })
      .catch((error: any) => {
        error.response.data.errors.full_messages.forEach(
          function(error) {
            if (!!this.snackBar) {
              this.snackBar.open(error, "Ok", {
                duration: 2000
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
        'access-token': this.athQuery.accessToken,
        'client': this.athQuery.client,
        'uid': this.athQuery.uid
      }
    })
      .then((response: any) => {
        this.authStore.update(
          createAuth({
            uid: null,
            client: "",
            accessToken: "",
            expiry: "",
            tokenType: "Bearer" })
        );
        if (!!this.snackBar) {
          this.snackBar.open("Goodbye! You logged out.", "Ok", {
            duration: 2000
          });
        }
      })
      .catch((error: any) => {
        error.response.data.errors.full_messages.forEach(
          function(error) {
            if (!!this.snackBar) {
              this.snackBar.open(error, "Ok", {
                duration: 2000
              });
            }
          }.bind(this)
        );
      });
  }
}
