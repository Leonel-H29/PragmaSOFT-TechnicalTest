import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenService } from 'src/app/service/token.service';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent {
  constructor(
    public modal: NgbActiveModal,
    private token: TokenService,
    private router: Router
  ) {}

  /**
   * `cerrarSesion`: La funcion se encarga de cerrar la sesion del usuario
   * @returns
   */
  cerrarSesion() {
    this.token.Logout();
    if (this.token.isLogged()) {
      alert('No se ha podido cerrar la sesión correctamente!');
      this.modal.close('success');
      return;
    }
    alert('Se ha cerrado la sesión. Vuelva pronto!');
    this.modal.close('success');
    this.router.navigate(['login']);
  }
}
