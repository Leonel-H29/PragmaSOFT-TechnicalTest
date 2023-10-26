import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-series',
  templateUrl: './search-series.component.html',
  styleUrls: ['./search-series.component.css'],
})
export class SearchSeriesComponent implements OnInit {
  @Output() search = new EventEmitter<string>(); // Variable se encagara de enviar los valores al componente padre

  /**
   * `onInputChange`: La funcion se encagara de enviar los datos ingresados en el input de
   * busqueda al componente padre
   * @param event
   */
  onInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.search.emit(inputElement.value);
  }

  ngOnInit(): void {}
}
