import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css'],
})
export class SeriesComponent {
  constructor(private router: Router, private token: TokenService) {}

  /**
   * El propósito de `ngOnInit` es realizar tareas de inicialización o configuración
   * que son necesarias antes de que el componente se renderice en la vista.
   */
  ngOnInit(): void {
    //Si el usuario no esta logueado entonces se redigira a la pagina de inicio de sesion
    if (!this.token.isLogged()) {
      this.router.navigate(['/login']);
    }
  }
}
