import { Component } from "@angular/core";
import { LocalStorageService } from "angular-web-storage";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(public local: LocalStorageService, translate: TranslateService){
    translate.setDefaultLang('en');
    let language = !!this.local.get('language')?this.local.get('language'):'en';
    translate.use(language);
    translate.get('LANGUAGE_SET', {value: language}).subscribe((res:string)=>{
      console.log(res)
    });
  }
  title = "mysmartwallet";
  myParams: any;
  myStyle: {
    position: string;
    width: string;
    height: string;
    "z-index": number;
    top: number;
    left: number;
    right: number;
    bottom: number;
  };

  width: number = 100;
  height: number = 100;
  ngOnInit() {
    this.myStyle = {
      position: "fixed",
      width: "100%",
      height: "100%",
      "z-index": -1,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    };

    this.myParams = {
      particles: {
        number: {
          value: 88
        },
        color: {
          value: "#0C88C2"
        },
        shape: {
          type: "circle"
        },
        line_linked: {
          enable: true,
          distance: 100,
          color: "#0C88C2"
        },

        move: {
          enable: true,
          speed: 6,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200
          }
        }
      }
    };
  }
}
