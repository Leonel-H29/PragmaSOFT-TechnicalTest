import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DbSettingsService } from 'src/app/service/db-settings.service';
import { TokenService } from 'src/app/service/token.service';
import { esCampoRequerido } from 'src/app/utils/validations-util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  /**
   * `loading`: Variable booleana utilizada para determinar cuando mostrar
   * el modal de 'Cargando ...'
   */
  loading = false;

  formulario!: FormGroup;

  constructor(
    private db: DbSettingsService,
    private router: Router,
    private fb: FormBuilder,
    private token: TokenService
  ) {}

  /**
   * El propósito de `ngOnInit` es realizar tareas de inicialización o configuración
   * que son necesarias antes de que el componente se renderice en la vista.
   */
  ngOnInit(): void {
    if (this.token.isLogged()) {
      this.router.navigate(['admin/']);
    }
    this.setupForm();
  }

  /**
   * `setupForm`: Funcion para crear e inicializar los campos del formulario con sus restricciones
   */
  setupForm() {
    this.formulario = this.fb.group({
      host: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(260),
        ],
      ],
      port: [0, Validators.min(0)],
      database_name: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(260),
        ],
      ],
      user: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(260),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(260),
        ],
      ],
    });
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
   * `onLogin`: Funcion que recibe los datos del formulario y los procesa para enviarselos a funcion
   * encargada de hacer la peticion al servidor
   */
  onLogin(): void {
    if (this.formulario.valid) {
      this.loading = true; // Activamos el indicador de carga
      const credentials = this.formulario.value;
      //console.log(credentials);
      this.db.Login(credentials).subscribe(
        (data) => {
          const result = data;
          this.loading = false;
          alert('Conexion con la base de datos exitosa!');
          this.token.setToken(result[0].token);
          this.token.setDatabase(result[0].database);
          this.token.setUsername(result[0].user);
          this.router.navigate(['/admin']);
        },
        (err) => {
          this.loading = false;
          alert('Error al conectar a la base de datos');
        }
      );
    }
  }
}
