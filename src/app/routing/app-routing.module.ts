import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthPageComponent } from "../components/auth/auth-page/auth-page.component";
import { AuthGuard } from "./guards/auth-guard";
import { HomePageComponent } from "../components/home/home-page/home-page.component";
import { ToolbarComponent } from "../components/toolbar/toolbar/toolbar.component";
import { StatisticsPageComponent } from "../components/statistics/statistics-page/statistics-page.component";
import { TransactionsPageComponent } from "../components/transactions/transactions-page/transactions-page.component";

const routes: Routes = [
  {
    path: "",
    canActivate: [AuthGuard],
    component: ToolbarComponent,
    children: [
      {
        path: "",
        pathMatch: 'prefix',
        redirectTo: "home"
      },
      {
        path: "home",
        canActivate: [AuthGuard],
        component: HomePageComponent
      },
      {
        path: "statistics",
        canActivate: [AuthGuard],
        component: StatisticsPageComponent
      },
      {
        path: "transactions",
        canActivate: [AuthGuard],
        component: TransactionsPageComponent
      }
    ]
  },
  {
    path: "authentication",
    component: AuthPageComponent,
    pathMatch: "full"
  },
  {
    path: "**",
    redirectTo: ""
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
