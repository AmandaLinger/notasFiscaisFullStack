import {Component, OnInit} from '@angular/core';
import {NotaFiscalService} from '../../services/nota-fiscal-service';
import {DxDataGridModule, DxSelectBoxModule} from 'devextreme-angular';
import {NotaFiscal} from '../../interfaces/nota-fiscal';
import {Cliente} from '../../interfaces/cliente';
import {Produto} from '../../interfaces/produto';

@Component({
  selector: 'app-nota',
  standalone: true,
  imports: [DxDataGridModule, DxSelectBoxModule],
  templateUrl: './nota.html',
  styleUrl: './nota.scss',
})
export class Nota  implements OnInit {

  constructor(private notaFiscalService: NotaFiscalService){}

  notas: NotaFiscal[] = [];
  clientes: Cliente[] = [];
  produtos: Produto[] = [];

  ngOnInit() {

  }
}
