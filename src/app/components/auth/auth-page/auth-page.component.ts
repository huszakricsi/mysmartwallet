import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { AuthQuery } from "../state/auth.query";
import { AuthService } from "../state/auth.service";
import { Observable } from "rxjs";
import { ID } from "@datorama/akita";
import { Router } from "@angular/router";
import { LocalStorageService } from "angular-web-storage";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

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
      if (v) {
        this.router.navigate([""]);
      } else {
        this.router.navigate(["authentication"]);
      }
    });
  }
  constructor(
    private authQuery: AuthQuery,
    private authService: AuthService,
    public router: Router,
    public local: LocalStorageService,
    public translate: TranslateService,
    public snackBar: MatSnackBar
  ) {}
  Register(): void {
    console.log(this.userData);
    1;
    this.authService.register({
      name: this.userData.name,
      email: this.userData.email,
      password: this.userData.password,
      password_confirmation: this.userData.passwordConfirmation,
      nickname: this.userData.nickname
    });
  }
  Login(): void {
    this.authService.login({
      email: this.userData.email,
      password: this.userData.password
    });
  }
  Logout(): void {
    this.authService.logout();
  }
  public setLanguage(language: string) {
    this.local.set("language", language);
    this.translate.use(language);
    this.translate
      .get("LANGUAGE_SET", { value: language })
      .subscribe((res: string) => {
        console.log(res);
      });
    this.translate
      .get("COMPONENT.AUTH.AUTHSTATE.LANGUAGE_SETTINGS_SAVED_ON_DEVICE", {
        value: language
      })
      .subscribe((msg: string) => {
        this.translate
          .get("COMPONENT.AUTH.AUTHSTATE.OK")
          .subscribe((ok: string) => {
            this.snackBar.open(msg, ok, {
              duration: 3000
            });
          });
      });
  }
}
