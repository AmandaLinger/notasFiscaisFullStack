import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DxSelectBoxModule} from 'devextreme-angular';
import {Estado} from '../../../interfaces/cidadeEstado/estado';
import {DxButtonModule} from 'devextreme-angular/ui/button';
import {Municipio} from '../../../interfaces/cidadeEstado/municipio';

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
