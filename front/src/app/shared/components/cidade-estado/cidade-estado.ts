import {Component, OnInit} from '@angular/core';
import {DxSelectBoxModule} from 'devextreme-angular';
import {CidadeEstadoService} from '../../../services/cidade-estado-service';
import {Estado} from '../../../interfaces/cidadeEstado/estado';
import {Municipio} from '../../../interfaces/cidadeEstado/municipio';
import {DxButtonModule} from 'devextreme-angular/ui/button';

@Component({
  selector: 'app-cidade-estado',
  imports: [DxSelectBoxModule, DxButtonModule],
  templateUrl: './cidade-estado.html',
  styleUrl: './cidade-estado.scss',
})
export class CidadeEstado implements OnInit {

  estados: Estado[] = [];
  municipios:Municipio[] = [];

  estadoEscolhido: any = null;

  estadoSelecionado: string | null = null;
  municipioSelecionado: string | null = null;

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
