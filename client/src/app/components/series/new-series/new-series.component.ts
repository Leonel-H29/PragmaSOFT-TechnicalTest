import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeriesService } from 'src/app/service/series.service';
import { DbSettingsService } from 'src/app/service/db-settings.service';
import { Serie } from 'src/app/model/series';

@Component({
  selector: 'app-new-series',
  templateUrl: './new-series.component.html',
  styleUrls: ['./new-series.component.css'],
})
export class NewSeriesComponent {
  formulario: FormGroup;

  constructor(
    public modal: NgbActiveModal,
    private fb: FormBuilder,
    private serieServ: SeriesService,
    private db: DbSettingsService
  ) {
    this.formulario = fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      fecha_estreno: ['', Validators.required],
      estrellas: ['', Validators.required],
      genero: ['', Validators.required],
      precio_alquiler: ['', Validators.required],
      atp: [false, Validators.required],
      estado: ['', Validators.required],
    });
  }

  guardarNuevoRegistro() {
    if (this.formulario.valid) {
      const nuevoRegistro = this.formulario.value;
      console.log(nuevoRegistro);
      this.serieServ.PostSerie(nuevoRegistro).subscribe(
        (data) => {
          alert('Serie agregada!');
          this.modal.close('success');
        },
        (err) => {
          alert('Error al cargar la serie');
        }
      );
      // Enviar nuevoRegistro al servicio o realizar la acción correspondiente
      //this.modal.close('success');
    }
  }
}
