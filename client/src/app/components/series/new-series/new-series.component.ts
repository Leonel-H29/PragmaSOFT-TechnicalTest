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

  /**
   * `loading`: Variable booleana utilizada para determinar cuando mostrar
   * el modal de 'Cargando ...'
   */
  loading = false;
  generos = [
    { text: 'Acción', value: 'Accion' },
    { text: 'Comedia', value: 'Comedia' },
    { text: 'Drama', value: 'Drama' },
    { text: 'Fantasía', value: 'Fantasia' },
    { text: 'Ciencia Ficción', value: 'Ciencia Ficcion' },
    { text: 'Otro', value: 'Otro' },
  ];

  constructor(
    public modal: NgbActiveModal,
    private fb: FormBuilder,
    private serieServ: SeriesService
  ) {}

  /**
   * El propósito de `ngOnInit` es realizar tareas de inicialización o configuración
   * que son necesarias antes de que el componente se renderice en la vista.
   */
  ngOnInit(): void {
    this.setupForm();
  }

  /**
   * `validarInputs`: Funcion que recibe los inputs del formulario y los envia
   * a la funcion correspondiente para evaluar su validez
   *
   * @param control = Input del formulario
   * @returns bool = Determina si es valido o no el input del formulario
   */
  validarInputs(control: any): boolean {
    return esCampoRequerido(control);
  }

  /**
   * `setupForm`: Funcion para crear e inicializar los campos del formulario con sus restricciones
   */
  setupForm() {
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
  }

  /**
   * `guardarNuevoRegistro`: Funcion que recibe los datos del formulario y los procesa para enviarselos a funcion
   * encargada de hacer la peticion al servidor
   */
  guardarNuevoRegistro() {
    this.loading = true;
    if (this.formulario.valid) {
      const nuevoRegistro = this.formulario.value;
      //console.log(nuevoRegistro);
      this.serieServ.PostSerie(nuevoRegistro).subscribe(
        (data) => {
          this.loading = false;
          alert('Serie agregada!');
          this.modal.close('success');
        },
        (err) => {
          this.loading = false;
          alert('Error al cargar la serie');
        }
      );
      // Enviar nuevoRegistro al servicio o realizar la acción correspondiente
      //this.modal.close('success');
    }
  }
}
