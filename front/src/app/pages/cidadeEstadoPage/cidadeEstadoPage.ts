import {Component} from '@angular/core';
import {EstadoCidade} from '../../shared/components/estado-cidade/estado-cidade';

@Component({
  selector: 'app-teste',
  imports: [EstadoCidade],
  templateUrl: './cidadeEstadoPage.html',
  styleUrl: './cidadeEstadoPage.scss',
})
export class CidadeEstadoPage {
  estadoEscolhido: any;
  municipioEscolhido: any;
}
