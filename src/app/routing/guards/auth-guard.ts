import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { AuthQuery } from "../../components/auth/state/auth.query";
@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  isAuthenticated: boolean;
  constructor(public authQuery: AuthQuery, public router: Router) {
    authQuery.isLoggedIn$.subscribe(value => {
      if (value) {
        this.router.navigate([""]);
      }
      else{
        this.router.navigate(["authentication"]);
      }
    });
  }
  canActivate(): boolean {
    if (!this.authQuery.isLoggedIn) {
      this.router.navigate(["authentication"]);
      return false;
    }
    return true;
  }
}
