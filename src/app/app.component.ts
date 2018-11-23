import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
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
