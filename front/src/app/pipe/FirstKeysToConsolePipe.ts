import {NgModule, Pipe, PipeTransform} from "@angular/core";

@Pipe({
  standalone: true,
  name: "firstKeysToConsole"
})
export class FirstKeysToConsolePipe implements PipeTransform {
  transform(object: any): any {
    if (object) {
      console.log('------ Printing keys -------');
      for (let x in object) {
        console.log("key: ", x, ", value:", object[x]);
      }
    }
    return null;
  }
}
