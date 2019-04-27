import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gender'
})
export class GenderPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value == 'male') {
      return 'Hombre';
    } else {
      return 'Mujer';
    }
  }

}
