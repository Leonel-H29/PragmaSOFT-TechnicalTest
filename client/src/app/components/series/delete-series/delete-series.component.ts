import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Serie } from 'src/app/model/series';
import { SeriesService } from 'src/app/service/series.service';

@Component({
  selector: 'app-delete-series',
  templateUrl: './delete-series.component.html',
  styleUrls: ['./delete-series.component.css'],
})
export class DeleteSeriesComponent {
  @Input() serie: Serie = new Serie('', '', new Date(), 0, '', 0, false, 'AC'); // Recibe el objeto Serie desde el componente padre
  idserie: number = 0;

  constructor(public modal: NgbActiveModal, private serieServ: SeriesService) {}

  ngOnInit(): void {
    if (this.serie.id_serie) this.idserie = this.serie.id_serie;
  }

  eliminarRegistro() {
    // Enviar solicitud de eliminación al servicio o realizar la acción correspondiente
    this.serieServ.DeleteSerie(this.idserie).subscribe(
      (data) => {
        alert('Serie Eliminada!');
        this.modal.close('success');
      },
      (err) => {
        alert('Error al cargar la serie');
      }
    );
  }
}
