import { Component } from '@angular/core';
import {DxSelectBoxModule} from 'devextreme-angular';
import {CidadeEstadoService} from '../../../services/cidade-estado-service';

@Component({
  selector: 'app-cidade-estado',
  imports: [DxSelectBoxModule],
  templateUrl: './cidade-estado.html',
  styleUrl: './cidade-estado.scss',
})
export class CidadeEstado {

  estados: any[] = [];
  cidades:any[] = [];

  constructor(private cidadeEstadoService: CidadeEstadoService){}

  getEstados(){
    this.cidadeEstadoService.listarEstados().subscribe({
      next: (estados) => {
        this.estados = estados;
      },
      error: (err) => console.error('Erro ao carregar estados', err),
    });
  }

  getCidades(){

  }



}
