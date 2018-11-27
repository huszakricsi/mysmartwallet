import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { AuthQuery } from "../state/auth.query";
import { AuthService } from "../state/auth.service";
import { Observable } from "rxjs";
import { ID } from "@datorama/akita";
import { Router } from "@angular/router";

@Component({
  selector: "app-auth-page",
  templateUrl: "./auth-page.component.html",
  styleUrls: ["./auth-page.component.css"]
})
export class AuthPageComponent implements OnInit {
  isLoggedIn$: Observable<Boolean>;
  uid$: Observable<ID>;
  userData = {
    email: "",
    password: "",
    passwordConfirmation: "",
    nickname: "",
    name: ""
  };
  ngOnInit(): void {
    this.isLoggedIn$ = this.authQuery.isLoggedIn$;
    this.uid$ = this.authQuery.uid$;
    this.isLoggedIn$.subscribe(v => {
      console.log("Logged in: " + v);
      if (v) {
        this.router.navigate([""]);
      }
      else{
        this.router.navigate(["authentication"]);
      }
    });
  }
  constructor(private authQuery: AuthQuery, private authService: AuthService, public router: Router) {}
  Register(): void {
    console.log(this.userData);1
    this.authService.register({
      name: this.userData.name,
      email: this.userData.email,
      password: this.userData.password,
      password_confirmation: this.userData.passwordConfirmation,
      nickname: this.userData.nickname
    });
  }
  Login(): void {
    this.authService.login({email: this.userData.email, password: this.userData.password});
  }
  Logout(): void{
    this.authService.logout();
  }
}
