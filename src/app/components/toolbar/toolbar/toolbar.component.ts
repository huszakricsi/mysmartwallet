import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../auth/state/auth.service";
import { LocalStorageService } from "angular-web-storage";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AccountService } from "../../accounts/state/account.service";
import { CurrencyService } from "../../currency/state/currency.service";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.css"]
})
export class ToolbarComponent implements OnInit {
  @ViewChild("drawer") drawer;

  location = { key: "home", value: "" };

  constructor(
    private router: Router,
    private authService: AuthService,
    public local: LocalStorageService,
    private translate: TranslateService,
    private snackBar: MatSnackBar,
    private accountService:AccountService,
    private currencyService:CurrencyService
  ) {
    this.translate.get("COMPONENT.TOOLBAR.HOME").subscribe((res: string) => {
      this.location.value = res;
    });
  }

  ngOnInit() {
    this.accountService.fetchAccounts();
    this.currencyService.fetchCurrencies();
  }
  public navigate(location: string) {
    this.location.key = location;
    this.translate
      .get("COMPONENT.TOOLBAR." + this.location.key.toUpperCase())
      .subscribe((res: string) => {
        this.location.value = res;
      });
    this.router.navigateByUrl(location);
    this.drawer.toggle();
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
      .get("COMPONENT.TOOLBAR.LANGUAGE_SETTINGS_SAVED_ON_DEVICE", {
        value: language
      })
      .subscribe((msg: string) => {
        this.translate.get("COMPONENT.TOOLBAR.OK").subscribe((ok: string) => {
          this.snackBar.open(msg, ok, {
            duration: 3000
          });
        });
      });
    this.translate
      .get("COMPONENT.TOOLBAR." + this.location.key.toUpperCase())
      .subscribe((res: string) => {
        this.location.value = res;
      });
    this.drawer.toggle();
  }
  public logOut() {
    this.authService.logout();
  }
}
