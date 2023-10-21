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
  @Input() serie?: Serie;
  idserie?: number = 0;
  data?: Serie;

  constructor(public modal: NgbActiveModal, private serieServ: SeriesService) {}

  ngOnInit(): void {
    if (this.serie !== undefined) {
      this.idserie = this.serie.id_serie;
      this.data = new Serie(
        this.serie.titulo,
        this.serie.descripcion,
        this.serie.fecha_estreno,
        this.serie.estrellas,
        this.serie.genero,
        this.serie.precio_alquiler,
        this.serie.atp,
        'AN'
      );
    }

    console.log(this.idserie);
  }

  anularRegistro() {
    if (this.idserie !== undefined && this.data !== undefined) {
      // Enviar solicitud de eliminación al servicio o realizar la acción correspondiente
      this.serieServ.UpdateSerie(this.idserie, this.data).subscribe(
        (data) => {
          alert('Serie Eliminada!');
          this.modal.close('success');
        },
        (err) => {
          alert('Error al cargar la serie');
        }
      );
    } else alert('Hay un error con el ID del registro');
  }
}
