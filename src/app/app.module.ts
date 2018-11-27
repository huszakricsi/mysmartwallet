import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AuthPageComponent } from './components/auth/auth-page/auth-page.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ParticlesModule } from 'angular-particle';
import { AppRoutingModule } from './routing/app-routing.module';
import { HomePageComponent } from './components/home/home-page/home-page.component';
import { ToolbarComponent } from './components/toolbar/toolbar/toolbar.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import { StatisticsPageComponent } from './components/statistics/statistics-page/statistics-page.component';
import { TransactionsPageComponent } from './transactions/transactions-page/transactions-page.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { AngularWebStorageModule } from 'angular-web-storage';



@NgModule({
  declarations: [
    AppComponent,
    AuthPageComponent,
    HomePageComponent,
    ToolbarComponent,
    StatisticsPageComponent,
    TransactionsPageComponent
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
    FormsModule,
    ParticlesModule,
    AppRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatDividerModule,
    MatListModule,
    AngularWebStorageModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
