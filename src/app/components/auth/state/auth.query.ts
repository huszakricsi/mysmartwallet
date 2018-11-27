import { Query, ID } from "@datorama/akita";
import { Auth } from "./auth.model";
import { AuthStore } from "./auth.store";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AuthQuery extends Query<Auth> {
  isLoggedIn$ = this.select(Auth => !!Auth.accessToken);
  isLoggedIn: boolean;
  uid$ = this.select(Auth => Auth.uid);
  auth$ = this.select(Auth => Auth);
  uid: ID;
  client: string;
  accessToken: string;
  expiry: string;
  tokenType: string;

  constructor(protected store: AuthStore) {
    super(store);
    this.select(Auth => Auth.uid).subscribe(value => {
      this.uid = value;
    });
    this.select(Auth => Auth.client).subscribe(value => {
      this.client = value;
    });
    this.select(Auth => Auth.accessToken).subscribe(value => {
      this.accessToken = value;
    });
    this.select(Auth => Auth.expiry).subscribe(value => {
      this.expiry = value;
    });
    this.select(Auth => Auth.tokenType).subscribe(value => {
      this.tokenType = value;
    });
    this.select(Auth => Auth.accessToken).subscribe(value => {
      this.isLoggedIn = !!value;
    });
  }
}
