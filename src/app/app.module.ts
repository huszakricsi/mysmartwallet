import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { AuthPageComponent } from "./components/auth/auth-page/auth-page.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTabsModule } from "@angular/material/tabs";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { ParticlesModule } from "angular-particle";
import { AppRoutingModule } from "./routing/app-routing.module";
import { HomePageComponent } from "./components/home/home-page/home-page.component";
import { ToolbarComponent } from "./components/toolbar/toolbar/toolbar.component";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { StatisticsPageComponent } from "./components/statistics/statistics-page/statistics-page.component";
import { TransactionsPageComponent } from "./components/transactions/transactions-page/transactions-page.component";
import { MatDividerModule } from "@angular/material/divider";
import { MatListModule } from "@angular/material/list";
import { AngularWebStorageModule } from "angular-web-storage";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { AccountsPageComponent } from "./components/accounts/accounts-page/accounts-page.component";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatSelectModule } from "@angular/material/select";
import { MatDialogModule } from "@angular/material/dialog";
import { DeleteConfirmationDialogComponent } from "./components/accounts/delete-confirmation-dialog/delete-confirmation-dialog.component";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { EditDialogComponent } from "./components/transactions/edit-dialog/edit-dialog.component";

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
    AuthPageComponent,
    HomePageComponent,
    ToolbarComponent,
    StatisticsPageComponent,
    TransactionsPageComponent,
    AccountsPageComponent,
    DeleteConfirmationDialogComponent,
    EditDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatExpansionModule,
    FormsModule,
    ParticlesModule,
    AppRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatDividerModule,
    MatListModule,
    MatSelectModule,
    AngularWebStorageModule,
    HttpClientModule,
    MatDialogModule,
    MatPaginatorModule,
    MatTableModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DeleteConfirmationDialogComponent, EditDialogComponent]
})
export class AppModule {}
