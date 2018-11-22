import { ID, Store, StoreConfig } from "@datorama/akita";
import { Injectable } from "@angular/core";
export interface AuthState {
  uid: ID;
  client: string;
  accessToken: string;
  expiry: string;
  tokenType: string;
}
export function createInitialState(): AuthState {
  return {
    uid: null,
    client: "",
    accessToken: "",
    expiry: "",
    tokenType: "Bearer"
  };
}
@Injectable({
  providedIn: "root"
})
@StoreConfig({ name: "auth" })
export class AuthStore extends Store<AuthState> {
  constructor() {
    super(createInitialState());
  }
}
