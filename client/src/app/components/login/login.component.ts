import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { DbSettingsService } from 'src/app/service/db-settings.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  IsLogged = false;
  IsLoginFail = false;
  loginUser!: User;

  credentials = {
    host: '',
    puerto: 0,
    nombre_base_de_datos: '',
    usuario: '',
    contrasena: '',
  };
  error = '';

  constructor(private db: DbSettingsService, private router: Router) {}

  ngOnInit(): void {
    if (this.db.getToken()) {
      this.IsLogged = true;
      this.IsLoginFail = false;
    }
  }

  onLogin(): void {
    this.loginUser = new User(
      this.credentials.host,
      this.credentials.puerto,
      this.credentials.nombre_base_de_datos,
      this.credentials.usuario,
      this.credentials.contrasena
    );
    console.log(this.loginUser);
    this.db.Login(this.loginUser).subscribe(
      (data) => {
        this.IsLogged = true;
        this.IsLoginFail = false;
        this.db.setToken('true');
        this.router.navigate(['/admin']);
      },
      (err) => {
        this.IsLogged = false;
        this.IsLoginFail = true;
        this.error = err.error.error;
        alert(this.error);

        //Swal.fire('Fallo la operacion');
        //alert(this.errorMsj);
        //console.log(this.errorMsj);
      }
    );
  }
}
