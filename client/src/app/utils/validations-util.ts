import { FormControl } from '@angular/forms';
/**
 * `esCampoRequerido`: La funcion se encarga de evaluar si el input del formulario
 * cumple con las condiciones establecidas
 *
 * @param control : Input del formulario a evaluar
 * @returns True | False
 */
export function esCampoRequerido(control: FormControl) {
  return control.invalid && (control.dirty || control.touched);
}
