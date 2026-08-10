import {Component, Input} from '@angular/core';
import {DxSelectBoxModule} from 'devextreme-angular';
import {DxButtonModule} from 'devextreme-angular/ui/button';

@Component({
  selector: 'app-cidade-estado',
  imports: [DxSelectBoxModule, DxButtonModule],
  templateUrl: './cidade-estado.html',
  styleUrl: './cidade-estado.scss',
})
export class CidadeEstado {
  @Input() estado = '';
  @Input() municipio = '';
}
