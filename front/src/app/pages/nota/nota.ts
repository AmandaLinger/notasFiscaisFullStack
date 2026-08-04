import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotaFiscalService} from '../../services/nota-fiscal-service';
import {DxDataGridModule, DxNumberBoxModule, DxSelectBoxModule, DxTextBoxModule} from 'devextreme-angular';
import {NotaFiscal} from '../../interfaces/nota-fiscal';
import {Cliente} from '../../interfaces/cliente';
import {Produto} from '../../interfaces/produto';
import {ItemNotaFiscalCadastro} from '../../interfaces/item-nota-fiscal-cadastro';
import {DxButtonModule} from 'devextreme-angular/ui/button';

@Component({
  selector: 'app-nota',
  standalone: true,
  imports: [CommonModule, DxDataGridModule, DxSelectBoxModule, DxButtonModule, DxTextBoxModule, DxNumberBoxModule],
  templateUrl: './nota.html',
  styleUrl: './nota.scss',
})
export class Nota  implements OnInit {

  constructor(private notaFiscalService: NotaFiscalService){}

  notas: NotaFiscal[] = [];
  clientes: Cliente[] = [];
  produtos: Produto[] = [];
  itens: ItemNotaFiscalCadastro[] = [];

  ngOnInit() {
    this.notaFiscalService.listar().subscribe((data) => {
      this.notas = data;
    });

    this.notaFiscalService.listarClientes().subscribe((data) => {
      this.clientes = data;
    });

    this.notaFiscalService.listarProdutos().subscribe((data) => {
      this.produtos = data;
    });
  }


  excluirLinha(index: number) {
    this.itens.splice(index, 1);
  }

  adicionarItem(): void {
    this.itens.push({
      produtoId: 0,
      produtoNome: '',
      quantidade: 1,
      precoUnitario: 0
    })
  }
}
