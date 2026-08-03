import { Component } from '@angular/core';
import {CidadeEstado} from '../../shared/components/cidade-estado/cidade-estado';

@Component({
  selector: 'app-teste',
  imports: [CidadeEstado],
  templateUrl: './teste.html',
  styleUrl: './teste.scss',
})
export class Teste {

}
