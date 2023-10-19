import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Serie } from 'src/app/model/series';
import { DbSettingsService } from 'src/app/service/db-settings.service';
import { SeriesService } from 'src/app/service/series.service';

@Component({
  selector: 'app-list-series',
  templateUrl: './list-series.component.html',
  styleUrls: ['./list-series.component.css'],
})
export class ListSeriesComponent {
  list_series: Serie[] = new Array<Serie>();
  isLogged = false;
  hasPermission = false;

  constructor(
    private serieServ: SeriesService,
    private db: DbSettingsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.GetSeries();
    if (this.db.getToken()) {
      this.isLogged = true;
      //this.GetSeries();
    }
  }
  GetSeries(): void {
    //const dataAPI = []
    this.serieServ.ListSeries().subscribe(
      (data) => {
        this.list_series = data;
        console.log(this.list_series);
      },
      (err) => {
        alert('Error al traer los datos');
      }
    );
  }
  /*
    console.log(
      'Experencia: isLogged - ',
      this.isLogged,
      'hasPermission: ',
      this.hasPermission
    );
    */
}
