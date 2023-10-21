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
  //serie: Serie = new Serie('', '', new Date(), 0, '', 0, false, 'AC');
  @Input() idSerie: number = 0; // Recibe el objeto Serie desde el componente padre

  constructor(public modal: NgbActiveModal, private serieServ: SeriesService) {}

  ngOnInit(): void {
    if (this.idSerie == undefined) alert('Error en el registro!');
  }

  eliminarRegistro() {
    // Enviar solicitud de eliminación al servicio o realizar la acción correspondiente
    this.serieServ.DeleteSerie(this.idSerie).subscribe(
      (data) => {
        alert('Serie Eliminada!');
        this.modal.close('success');
      },
      (err) => {
        alert('Error al eliminar la serie');
      }
    );
  }
}
