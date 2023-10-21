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
  //@Input() serie: Serie = new Serie('', '', new Date(), 0, '', 0, false, 'AC'); // Recibe el objeto Serie desde el componente padre
  @Input() serie?: Serie;
  idserie: number = 0;
  public formulario!: FormGroup;
  isFormValid?: boolean;
  errorMge: string = '';
  generos = [
    { text: 'Acción', value: 'Accion' },
    { text: 'Comedia', value: 'Comedia' },
    { text: 'Drama', value: 'Drama' },
    { text: 'Fantasía', value: 'Fantasía' },
    { text: 'Ciencia Ficción', value: 'Ciencia Ficción' },
    { text: 'Otro', value: 'Otro' },
  ];

  constructor(
    public modal: NgbActiveModal,
    private fb: FormBuilder,
    private serieServ: SeriesService
  ) {}

  ngOnInit(): void {
    if (this.serie?.id_serie) this.idserie = this.serie?.id_serie;

    //Defino el formulario con sus valores iniciales
    this.formulario = this.fb.group({
      titulo: [
        this.serie?.titulo,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(39),
        ],
      ],
      descripcion: [
        this.serie?.descripcion,
        [Validators.required, Validators.minLength(6)],
      ],
      fecha_estreno: [this.serie?.fecha_estreno, Validators.required],
      estrellas: [
        this.serie?.estrellas,
        [Validators.required, Validators.min(0), Validators.max(5)],
      ],
      genero: [this.serie?.genero, Validators.required],
      precio_alquiler: [
        this.serie?.precio_alquiler,
        [Validators.required, Validators.min(0), Validators.max(100000000)],
      ],
      atp: [this.serie?.atp, Validators.required],
      estado: [this.serie?.estado, Validators.required],
    });

    /*Le quito la restriccion a 'ATP' para que pueda tomar un valor True o False y sea valida para el formulario*/
    console.log(this.formulario.get('atp')?.value);
    // this.formulario.statusChanges.subscribe(() => {
    //   const atpValue = this.formulario.get('atp')?.value;
    //   if (atpValue !== true && atpValue !== false) {
    //     this.formulario.get('atp')?.setErrors({ invalidATPValue: true });
    //   } else {
    //     this.formulario.get('atp')?.setErrors(null);
    //   }
    // });

    this.isFormValid = this.formulario.valid;
    this.errorMessage();
  }

  validarInputs(control: any) {
    return esCampoRequerido(control);
  }

  errorMessage() {
    if (this.serie === undefined)
      return (this.errorMge = 'Debes seleccionar un registro!');

    if (this.serie.estado === 'AN')
      return (this.errorMge = 'No se puede modificar una serie inactiva!');

    return '';
  }

  guardarRegistroEditado() {
    if (this.formulario.valid) {
      const registroEditado = this.formulario.value;

      this.serieServ.UpdateSerie(this.idserie, registroEditado).subscribe(
        (data) => {
          alert('Serie modificada!');
          this.modal.close('success');
        },
        (err) => {
          alert('Error al cargar la serie');
        }
      );
    }
  }
}
