import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeriesService } from 'src/app/service/series.service';
import { Serie } from 'src/app/model/series';
import { esCampoRequerido } from 'src/app/utils/validations-util';

@Component({
  selector: 'app-new-series',
  templateUrl: './new-series.component.html',
  styleUrls: ['./new-series.component.css'],
})
export class NewSeriesComponent {
  formulario!: FormGroup;

  constructor(
    public modal: NgbActiveModal,
    private fb: FormBuilder,
    private serieServ: SeriesService
  ) {}

  ngOnInit(): void {
    //Defino el formulario con sus valores iniciales
    this.formulario = this.fb.group({
      titulo: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(39),
        ],
      ],
      descripcion: ['', [Validators.required, Validators.minLength(6)]],
      fecha_estreno: ['', Validators.required],
      estrellas: [
        '',
        [Validators.required, Validators.min(0), Validators.max(5)],
      ],
      genero: ['', Validators.required],
      precio_alquiler: [
        '',
        [Validators.required, Validators.min(0), Validators.max(100000000)],
      ],
      //atp: [false, Validators.required],
      atp: [false],
      estado: ['AC', Validators.required],
    });
    /*Le quito la restriccion a 'ATP' para que pueda tomar un valor True o False y sea valida para el formulario*/
    this.formulario.statusChanges.subscribe(() => {
      if (
        this.formulario.get('atp')?.value !== true &&
        this.formulario.get('atp')?.value !== false
      ) {
        this.formulario.get('atp')?.setErrors({ invalidATPValue: true });
      } else {
        this.formulario.get('atp')?.setErrors(null);
      }
    });
    console.log(this.formulario.value);
  }

  validarInputs(control: any) {
    return esCampoRequerido(control);
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
