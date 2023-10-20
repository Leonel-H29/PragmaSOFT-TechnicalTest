import { FormControl } from '@angular/forms';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function esCampoRequerido(control: FormControl) {
  return control.invalid && (control.dirty || control.touched);
}
