import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { min } from 'rxjs';
import { User } from 'src/app/model/user';
import { DbSettingsService } from 'src/app/service/db-settings.service';
import { esCampoRequerido } from 'src/app/utils/validations-util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  IsLogged = false;
  IsLoginFail = false;
  loginUser!: User;

  formulario!: FormGroup;
  isFormValid?: boolean;

  constructor(
    private db: DbSettingsService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    if (this.db.getToken()) {
      this.IsLogged = true;
      this.IsLoginFail = false;
    }
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
      const credentials = this.formulario.value;
      console.log(credentials);
      this.db.Login(credentials).subscribe(
        (data) => {
          alert('Conexion con la base de datos exitosa!');
          this.IsLogged = true;
          this.IsLoginFail = false;
          this.db.setToken('true');
          this.router.navigate(['/admin']);
        },
        (err) => {
          alert('Error al conectar a la base de datos');
          this.IsLogged = false;
          this.IsLoginFail = true;
        }
      );
      // Enviar nuevoRegistro al servicio o realizar la acción correspondiente
      //this.modal.close('success');
    }
  }
}
