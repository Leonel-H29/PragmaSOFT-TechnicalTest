import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Serie } from 'src/app/model/series';
import { SeriesService } from 'src/app/service/series.service';

@Component({
  selector: 'app-update-series',
  templateUrl: './update-series.component.html',
  styleUrls: ['./update-series.component.css'],
})
export class UpdateSeriesComponent {
  @Input() serie: Serie = new Serie('', '', new Date(), 0, '', 0, false, 'AC'); // Recibe el objeto Serie desde el componente padre

  idserie: number = 0;
  public formulario!: FormGroup;

  constructor(
    public modal: NgbActiveModal,
    private fb: FormBuilder,
    private serieServ: SeriesService
  ) {}

  ngOnInit(): void {
    if (this.serie.id_serie) this.idserie = this.serie.id_serie;
    this.formulario = this.fb.group({
      titulo: [this.serie.titulo, Validators.required],
      descripcion: [this.serie.descripcion, Validators.required],
      fecha_estreno: [this.serie.fecha_estreno, Validators.required],
      estrellas: [this.serie.estrellas, Validators.required],
      genero: [this.serie.genero, Validators.required],
      precio_alquiler: [this.serie.precio_alquiler, Validators.required],
      atp: [this.serie.atp, Validators.required],
      estado: [this.serie.estado, Validators.required],
    });
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
