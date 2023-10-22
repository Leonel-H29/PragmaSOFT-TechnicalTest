import { Component, OnInit } from '@angular/core';
import { Serie } from 'src/app/model/series';
import { SeriesService } from 'src/app/service/series.service';
import { NewSeriesComponent } from '../new-series/new-series.component';
import { UpdateSeriesComponent } from '../update-series/update-series.component';
import { DeleteSeriesComponent } from '../delete-series/delete-series.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EstadoSeriesComponent } from '../estado-series/estado-series.component';
import { LogoutComponent } from '../../logout/logout.component';

@Component({
  selector: 'app-list-series',
  templateUrl: './list-series.component.html',
  styleUrls: ['./list-series.component.css'],
})
export class ListSeriesComponent implements OnInit {
  list_series: Serie[] = new Array<Serie>();
  list_filter: Serie[] = new Array<Serie>();
  isLogged = false;
  hasPermission = false;
  registroSeleccionado!: Serie;
  mensajeAnulado = false;
  showSearchInput = false;

  modalUpdate = UpdateSeriesComponent;
  modalAnulacion = EstadoSeriesComponent;
  modalDelete = DeleteSeriesComponent;

  constructor(private serieServ: SeriesService, private modalServ: NgbModal) {}

  ngOnInit(): void {
    this.GetSeries();
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

  seleccionarRegistro(registro: Serie) {
    this.registroSeleccionado = registro;
    console.log(this.registroSeleccionado);
  }

  limpiarRegistro() {
    this.registroSeleccionado = new Serie(
      '',
      '',
      new Date(),
      0,
      '',
      0,
      false,
      'AC'
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
        console.log('Error');
      }
    });
  }

  abrirModal(
    anyComponent?:
      | typeof UpdateSeriesComponent
      | typeof EstadoSeriesComponent
      | typeof DeleteSeriesComponent
  ) {
    if (this.list_series.length == 0) {
      alert('No se puede realizar con una lista vacia');
      return;
    }
    if (!this.registroSeleccionado || !this.registroSeleccionado.id_serie) {
      alert('Debes seleccionar al menos un registro!');
      return;
    }

    const modalRef = this.modalServ.open(anyComponent);
    modalRef.componentInstance.idSerie = this.registroSeleccionado.id_serie;
    modalRef.result.then((result: string) => {
      if (result === 'success') {
        // El modal fue cerrado con éxito
        console.log('Exito');
        this.limpiarRegistro();
        this.GetSeries();
      } else {
        // El modal fue cerrado con cancelar u otro evento
        console.log('Error');
      }
    });
  }

  abrirModalLogout() {
    const modalRef = this.modalServ.open(LogoutComponent);

    modalRef.result.then((result: string) => {
      if (result === 'success') {
        // El modal fue cerrado con éxito
        console.log('Exito');
      } else {
        // El modal fue cerrado con cancelar u otro evento
        console.log('Error');
      }
    });
  }

  toggleSearchInput() {
    this.showSearchInput = !this.showSearchInput;
    // Si se muestra el input de búsqueda, restaurar la lista completa
    if (this.showSearchInput) {
      this.list_filter = [...this.list_series];
    }
  }
  filterData(query: string) {
    if (!query) {
      // Si la búsqueda está vacía, restaurar la lista completa
      this.GetSeries(); // Esto debe cargar la lista completa nuevamente
      return;
    }

    query = query.toLowerCase(); // Convertir a minúsculas para una búsqueda insensible a mayúsculas

    // Filtrar las series por ID, título y descripción
    this.list_series = this.list_filter.filter(
      (serie) =>
        //serie.id_serie?.toString().toLowerCase().includes(query) ||
        serie.titulo.toLowerCase().includes(query) ||
        serie.descripcion.toLowerCase().includes(query) ||
        //serie.fecha_estreno.toDateString().toLowerCase().includes(query) ||
        //serie.estrellas.toString().toLowerCase().includes(query) ||
        serie.genero.toLowerCase().includes(query) ||
        //serie.precio_alquiler.toString().toLowerCase().includes(query) ||
        //serie.atp.toString().toLowerCase().includes(query) ||
        serie.estado.toLowerCase().includes(query)
    );
  }
}
