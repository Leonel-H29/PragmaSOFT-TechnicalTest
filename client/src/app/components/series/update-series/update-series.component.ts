import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Serie } from 'src/app/model/series';
import { SeriesService } from 'src/app/service/series.service';
import { esCampoRequerido } from 'src/app/utils/validations-util';

@Component({
  selector: 'app-update-series',
  templateUrl: './update-series.component.html',
  styleUrls: ['./update-series.component.css'],
})
export class UpdateSeriesComponent {
  serie: Serie = new Serie('', '', new Date(), 0, '', 0, false, 'AC');
  @Input() idSerie: number = 0; // Recibe el objeto Serie desde el componente padre

  public formulario!: FormGroup;
  errorMge: string = '';
  /**
   * `loading`: Variable booleana utilizada para determinar cuando mostrar
   * el modal de 'Cargando ...'
   */
  loading = true;
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
    if (this.idSerie) {
      this.serieServ.GetSerie(this.idSerie).subscribe(
        (data) => {
          this.serie = data;
          //console.log('Data: ', this.serie);
          this.setupForm();
          this.loading = false;
        },
        (err) => {
          alert('Error al cargar la serie');
        }
      );
    }
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
        this.serie.titulo,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(39),
        ],
      ],
      descripcion: [
        this.serie.descripcion,
        [Validators.required, Validators.minLength(6)],
      ],
      fecha_estreno: [this.serie.fecha_estreno, Validators.required],
      estrellas: [
        this.serie.estrellas,
        [Validators.required, Validators.min(0), Validators.max(5)],
      ],
      genero: [this.serie.genero, Validators.required],
      precio_alquiler: [
        this.serie.precio_alquiler,
        [Validators.required, Validators.min(0), Validators.max(100000000)],
      ],
      atp: [this.serie.atp],
      estado: [this.serie.estado, Validators.required],
    });

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
   * `errorMessage`: La funcion se encarga de analizar el registro y en caso de no cumplir
   * con ciertas condiciones entonces enviara un mensaje de error
   *
   * @returns string = Mensaje correspondiente
   */
  errorMessage() {
    if (this.serie.estado === 'AN')
      return (this.errorMge = 'No se puede modificar una serie inactiva!');

    return '';
  }

  /**
   * `guardarRegistroEditado`: Funcion que recibe los datos del formulario y los procesa para enviarselos a funcion
   * encargada de hacer la peticion al servidor
   */
  guardarRegistroEditado() {
    if (this.formulario.valid) {
      this.loading = true;
      const registroEditado = this.formulario.value;

      this.serieServ.UpdateSerie(this.idSerie, registroEditado).subscribe(
        (data) => {
          this.loading = false;
          alert('Serie modificada!');
          this.modal.close('success');
        },
        (err) => {
          this.loading = false;
          alert('Error al modificar la serie');
        }
      );
    }
  }
}
