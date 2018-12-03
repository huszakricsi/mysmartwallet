import { Component } from "@angular/core";
import { LocalStorageService } from "angular-web-storage";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(public local: LocalStorageService, translate: TranslateService) {
    translate.setDefaultLang("en");
    let language = !!this.local.get("language")
      ? this.local.get("language")
      : "en";
    translate.use(language);
    translate
      .get("LANGUAGE_SET", { value: language })
      .subscribe((res: string) => {
        console.log(res);
      });
  }
  ngOnInit() {}
}
