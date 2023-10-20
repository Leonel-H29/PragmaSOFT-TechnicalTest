import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Serie } from 'src/app/model/series';
import { DbSettingsService } from 'src/app/service/db-settings.service';
import { SeriesService } from 'src/app/service/series.service';
import { NewSeriesComponent } from '../new-series/new-series.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
    private router: Router,
    private modalServ: NgbModal
  ) {}

  ngOnInit(): void {
    this.GetSeries();
    if (this.db.getToken()) {
      this.isLogged = true;
      //this.GetSeries();
    }
  }
  GetSeries(): void {
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

  abrirModalNuevo() {
    const modalRef = this.modalServ.open(NewSeriesComponent);
    modalRef.result.then((result: string) => {
      if (result === 'success') {
        // El modal fue cerrado con éxito
        console.log('Exito');
        this.GetSeries();
      } else {
        // El modal fue cerrado con cancelar u otro evento
        console.log('Exito');
      }
    });
  }
}
