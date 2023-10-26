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
  @Input() idSerie: number = 0; // Recibe el objeto Serie desde el componente padre

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
    if (this.idSerie == undefined) alert('Error en el registro!');
  }

  /**
   * `eliminarRegistro`: Funcion que recibe los datos del formulario y los procesa para enviarselos a funcion
   * encargada de hacer la peticion al servidor
   */
  eliminarRegistro() {
    this.loading = true;
    // Enviar solicitud de eliminación al servicio o realizar la acción correspondiente
    this.serieServ.DeleteSerie(this.idSerie).subscribe(
      (data) => {
        this.loading = false;
        alert('Serie Eliminada!');
        this.modal.close('success');
      },
      (err) => {
        this.loading = false;
        alert('Error al eliminar la serie');
      }
    );
  }
}
