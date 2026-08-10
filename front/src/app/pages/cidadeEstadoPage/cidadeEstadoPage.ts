import { Component } from '@angular/core';
import {CidadeEstado} from '../../shared/components/cidade-estado/cidade-estado';
import {DxSelectBoxModule} from 'devextreme-angular';
import {Estado} from '../../interfaces/cidadeEstado/estado';
import {Municipio} from '../../interfaces/cidadeEstado/municipio';
import {CidadeEstadoService} from '../../services/cidade-estado-service';
import {DxButtonModule} from 'devextreme-angular/ui/button';

@Component({
  selector: 'app-teste',
  imports: [CidadeEstado, DxSelectBoxModule, DxButtonModule],
  templateUrl: './cidadeEstadoPage.html',
  styleUrl: './cidadeEstadoPage.scss',
})
export class CidadeEstadoPage {

  estados: Estado[] = [];
  municipios:Municipio[] = [];

  estadoEscolhido: any = null;

  estadoSelecionado = '';
  municipioSelecionado= '';

  constructor(private cidadeEstadoService: CidadeEstadoService){}

  ngOnInit() {
    this.getEstados();
  }

  getEstados(){
    this.cidadeEstadoService.listarEstados().subscribe({
      next: (estados) => {
        this.estados = estados;
      },
      error: (err) => console.error('Erro ao carregar estados', err),
    });
  }

  aoSelecionarEstado(estado: {value?: string | null}): void {
    this.estadoEscolhido = estado.value ?? null;

    if(!this.estadoEscolhido){
      this.estadoEscolhido = [];
      return;
    }

    this.cidadeEstadoService.listarCidades(this.estadoEscolhido).subscribe(
      (res: Municipio[] ) => {
        this.municipios = res;
      }
    );
  }

  calculaFrete(){
    console.log
  }
}
