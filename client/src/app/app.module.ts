import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SeriesComponent } from './components/series/series.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListSeriesComponent } from './components/series/list-series/list-series.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NewSeriesComponent } from './components/series/new-series/new-series.component';
import { UpdateSeriesComponent } from './components/series/update-series/update-series.component';
import { DeleteSeriesComponent } from './components/series/delete-series/delete-series.component';
import { EstadoSeriesComponent } from './components/series/estado-series/estado-series.component';
import { LogoutComponent } from './components/logout/logout.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchSeriesComponent } from './components/series/search-series/search-series.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    SeriesComponent,
    LoginComponent,
    ListSeriesComponent,
    NewSeriesComponent,
    UpdateSeriesComponent,
    DeleteSeriesComponent,
    EstadoSeriesComponent,
    LogoutComponent,
    FooterComponent,
    SearchSeriesComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
