import { FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';

export default class Utils {
  static emptySpaceValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const errors: any = {};
      if (control.value && !control.value.trim()) {
        errors.numbers = true;
        return errors;
      }
      return null;
    };
  }

  static capitalize(str) {
    if (str) {
      return str[0].toUpperCase() + str.substr(1).toLowerCase();
    }
  }

  static removeUnderScore(value: string) {
    if (value) {
      if (value.includes('_')) {
        return Utils.capitalize(value.replace('_', ' '));
      } else {
        return '';
      }
    }
  }
}
