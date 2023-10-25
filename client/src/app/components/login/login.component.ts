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
  //IsLogged = false;
  //IsLoginFail = false;
  loading = false;

  formulario!: FormGroup;
  isFormValid?: boolean;

  constructor(
    private db: DbSettingsService,
    private router: Router,
    private fb: FormBuilder,
    private token: TokenService
  ) {}

  ngOnInit(): void {
    if (this.token.isLogged()) {
      this.router.navigate(['admin/']);
    }
    this.setupForm();
  }

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

  validarInputs(control: any) {
    return esCampoRequerido(control);
  }

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
