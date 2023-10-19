import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SeriesComponent } from './components/series/series.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListSeriesComponent } from './components/series/list-series/list-series.component';

@NgModule({
  declarations: [AppComponent, SeriesComponent, LoginComponent, ListSeriesComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
