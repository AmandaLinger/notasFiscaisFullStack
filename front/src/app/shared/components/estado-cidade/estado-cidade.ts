import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DxButtonComponent, DxSelectBoxComponent} from "devextreme-angular";
import {CidadeEstadoService} from '../../../services/cidade-estado-service';
import {Estado} from '../../../interfaces/cidadeEstado/estado';
import {Municipio} from '../../../interfaces/cidadeEstado/municipio';

@Component({
  selector: 'app-estado-cidade',
    imports: [
        DxButtonComponent,
        DxSelectBoxComponent
    ],
  templateUrl: './estado-cidade.html',
  styleUrl: './estado-cidade.scss',
})
export class EstadoCidade {

  estados: Estado[] = [];
  municipios: Municipio[] = [];

  @Input()
  estadoSelecionado: any = {
    id: 35,
    sigla: 'SP',
    nome: 'São Paulo',
  };

  @Output()
  estadoSelecionadoChange = new EventEmitter<Estado>();

  @Input()
  municipioSelecionado:any ={}

  @Output()
  municipioSelecionadoChange = new EventEmitter<Municipio>();


  constructor(private cidadeEstadoService: CidadeEstadoService){}

  ngOnInit() {
    this.getEstados();
  }

  getEstados(){
    this.cidadeEstadoService.listarEstados().subscribe({
      next: (estados: Estado[]) => {
        this.estados = estados;

        const estadoPadrao = this.estados.find((estado) =>
          estado.sigla === 'SP');

        if (estadoPadrao) {
          this.estadoSelecionado = estadoPadrao;
          this.aoSelecionarEstado({ value: estadoPadrao });
        }
      },
      error: (err) => console.error('Erro ao carregar estados', err),
    });
  }

  aoSelecionarEstado(estado: any): void {
    this.estadoSelecionado = estado.value ?? null;

    console.log('Estado selecionado:', this.estadoSelecionado);

    this.estadoSelecionadoChange.emit(this.estadoSelecionado);

    if(!this.estadoSelecionado){
      this.estadoSelecionado = [];
      return;
    }

    this.cidadeEstadoService.listarCidades(this.estadoSelecionado.sigla).subscribe(
      (res: Municipio[] ) => {
        this.municipios = res;
      }
    );
  }

  aoSelecionarMunicipio(municipio: any){
    this.municipioSelecionado = municipio.value ?? null;


    console.log('Municipio selecionado:', this.municipioSelecionado);

    this.municipioSelecionadoChange.emit(this.municipioSelecionado);

    if(!this.municipioSelecionado){
      this.municipioSelecionado = [];
      return;
    }
  }
  calculaFrete(){
    console.log(this.municipioSelecionadoChange)
  }
}
