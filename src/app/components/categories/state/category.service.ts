import { CategoryStore } from "./category.store";
import axios from "axios";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CategoryQuery } from "./category.query";
import { Category, createCategory } from "./category.model";
import { environment } from "src/environments/environment";
import { AuthQuery } from "../../auth/state/auth.query";
import { AuthService } from "../../auth/state/auth.service";

@Injectable({
  providedIn: "root"
})
export class CategoryService {
  constructor(
    private authQuery: AuthQuery,
    private authService: AuthService,
    private CategoryStore: CategoryStore,
    public snackBar: MatSnackBar
  ) {}

  public fetchCategories() {
    axios({
      url: environment.api.categoriesEndpoint,
      method: "GET",
      headers: {
        "access-token": this.authQuery.accessToken,
        client: this.authQuery.client,
        uid: this.authQuery.uid,
        expiry: this.authQuery.expiry,
        "token-type": "Bearer"
      }
    })
      .then((response: any) => {
        this.authService.updateHeaders(response.headers);
        this.CategoryStore.set(
          response.data.categories.map(item => createCategory(item))
        );
      })
      .catch((error: any) => {
        error.response.data.errors.forEach(
          function(error) {
            if (!!this.snackBar) {
              this.translate
                .get("COMPONENT.AUTH.AUTHSTATE.OK")
                .subscribe((ok: string) => {
                  this.snackBar.open(error, ok, {
                    duration: 2000
                  });
                });
            }
          }.bind(this)
        );
        this.authService.logout();
      });
  }
}
