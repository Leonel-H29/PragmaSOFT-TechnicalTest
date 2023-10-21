import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Serie } from 'src/app/model/series';
import { SeriesService } from 'src/app/service/series.service';

@Component({
  selector: 'app-estado-series',
  templateUrl: './estado-series.component.html',
  styleUrls: ['./estado-series.component.css'],
})
export class EstadoSeriesComponent {
  serie: Serie = new Serie('', '', new Date(), 0, '', 0, false, 'AC');
  @Input() idSerie: number = 0; // Recibe el objeto Serie desde el componente padre

  constructor(public modal: NgbActiveModal, private serieServ: SeriesService) {}

  ngOnInit(): void {
    if (this.idSerie) {
      this.serieServ.GetSerie(this.idSerie).subscribe(
        (data) => {
          this.serie = data;
        },
        (err) => {
          alert('Error al cargar la serie');
        }
      );
    }
  }

  anularRegistro() {
    this.serie.estado = 'AN';
    if (this.serie) {
      // Enviar solicitud de eliminación al servicio o realizar la acción correspondiente
      this.serieServ.UpdateSerie(this.idSerie, this.serie).subscribe(
        (data) => {
          alert('Serie Anulada!');
          this.modal.close('success');
        },
        (err) => {
          alert('Error al cargar la serie');
        }
      );
    } else alert('Hay un error con el ID del registro');
  }
}
