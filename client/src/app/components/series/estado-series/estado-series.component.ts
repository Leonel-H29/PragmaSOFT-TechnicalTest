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
  errorMge: string = '';
  /**
   * `loading`: Variable booleana utilizada para determinar cuando mostrar
   * el modal de 'Cargando ...'
   */
  loading = false;
  constructor(public modal: NgbActiveModal, private serieServ: SeriesService) {}

  /**
   * El propósito de `ngOnInit` es realizar tareas de inicialización o configuración
   * que son necesarias antes de que el componente se renderice en la vista.
   */
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

  /**
   * `errorMessage`: La funcion se encarga de analizar el registro y en caso de no cumplir
   * con ciertas condiciones entonces enviara un mensaje de error
   *
   * @returns string = Mensaje correspondiente
   */
  errorMessage() {
    if (this.serie.estado === 'AN')
      return (this.errorMge = 'No se puede anular una serie ya inactiva!');

    return '';
  }

  /**
   * `anularRegistro`: Funcion que recibe los datos del formulario y los procesa para enviarselos a funcion
   * encargada de hacer la peticion al servidor
   */
  anularRegistro() {
    this.serie.estado = 'AN';
    this.loading = true;
    if (this.serie) {
      // Enviar solicitud de eliminación al servicio o realizar la acción correspondiente
      this.serieServ.UpdateSerie(this.idSerie, this.serie).subscribe(
        (data) => {
          this.loading = true;
          alert('Serie Anulada!');
          this.modal.close('success');
        },
        (err) => {
          this.loading = true;
          alert('Error al anular la serie');
        }
      );
    } else alert('Hay un error con el ID del registro');
  }
}
