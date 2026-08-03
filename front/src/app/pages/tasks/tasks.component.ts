import {Component, OnInit} from '@angular/core';
import {
  DxDataGridModule,
  DxDateBoxModule,
  DxNumberBoxModule,
  DxPopupModule,
  DxSelectBoxModule,
  DxTextBoxModule
} from 'devextreme-angular';

import {CommonModule} from '@angular/common';
import {NotaFiscal} from '../../interfaces/nota-fiscal';
import {NotaFiscalService} from '../../services/nota-fiscal-service';
import {Cliente} from '../../interfaces/cliente';
import {Produto} from '../../interfaces/produto';
import {NotaFiscalCadastro} from '../../interfaces/nota-fiscal-cadastro';
import {ClienteService} from '../../services/cliente-service';
import {ProdutoService} from '../../services/produto-service';
import {DxButtonModule} from 'devextreme-angular/ui/button';
import {DxFormModule} from 'devextreme-angular/ui/form';
import {ItemNotaFiscalCadastro} from '../../interfaces/item-nota-fiscal-cadastro';


@Component({
  styleUrls: [`./tasks.component.scss`],
  standalone: true,
  selector: 'app-tasks',
  templateUrl: `./tasks.component.html`,
  imports: [
    CommonModule,
    DxDataGridModule,
    DxButtonModule,
    DxPopupModule,
    DxFormModule,
    DxTextBoxModule,
    DxDateBoxModule,
    DxNumberBoxModule,
    DxSelectBoxModule,

  ],
})
export class TasksComponent implements OnInit {
  constructor(
    private notaFiscalService: NotaFiscalService,
    private clienteService: ClienteService,
    private produtoService: ProdutoService
  ) {}

  notas: NotaFiscal[] = [];

  clientes: Cliente[] = [];

  produtos: Produto[] = [];

  popupVisible = false;

  novaNota: NotaFiscalCadastro = {
    numeroNotaFiscal: null as any,
    data: new Date().toISOString().substring(0,10),
    codigoCliente: 0,
    itens:[]
  };

  ngOnInit(): void {
    this.notaFiscalService.listar().subscribe(
      notas => this.notas = notas
    );

    this.clienteService.listar().subscribe(
      clientes => this.clientes = clientes
    );

    this.produtoService.listar().subscribe(
      produtos => this.produtos = produtos
    );
  }


  calcularSubtotal(item:any): number{
    return item.quantidade*item.precoUnitario;
  }

  abrirPopUp(): void{

    this.novaNota = {
      numeroNotaFiscal: 0,
      data: new Date().toISOString().substring(0,10),
      codigoCliente: 0,
      itens:[
        {
          produtoId: 0,
          quantidade: 1,
          precoUnitario: 0
        }
      ]
    };

    this.popupVisible = true;
  }

  fecharPopup(): void{
    this.popupVisible = false;
  }

  abrirPopupEdit(nota: NotaFiscalCadastro){

    this.notaFiscalService.listar().subscribe({
      next: () =>{
        this.popupVisible = false;
        this.notaFiscalService.listar().subscribe(
          notas => this.notas = notas
        );
      },
      error: (erro) =>{
        console.log('Erro ao atualizar a nota fiscal', erro);
      }
    })

    this.popupVisible = true;
  }

  adicionarItem(): void{
    this.novaNota.itens.push({
      produtoId: 0,
      quantidade: 1,
      precoUnitario: 0
    });
  }

  salvarNota(novaNota : NotaFiscalCadastro): void{
    this.notaFiscalService.salvar(this.novaNota).subscribe({
      next: () =>{
        this.popupVisible = false;
        this.notaFiscalService.listar().subscribe(
          notas => this.notas = notas
        );
      },
      error: (erro) =>{
        console.log('Erro ao salvar a nota fiscal', erro);
      }
    });
  }

  onProdutoSelecionado(item: ItemNotaFiscalCadastro): void {

    const produto = this.produtos.find(p => p.id === item.produtoId);

    if (produto) {
      item.precoUnitario = produto.preco;
    }

  }

  removerItem(i: number): void {

    this.novaNota.itens.splice(i, 1);

  }


  editarNota(){

  }


  excluirNota = (e: any): void => {

    if (!confirm('Deseja realmente excluir esta nota fiscal?')) {
      return;
    }

    this.notaFiscalService.deletar(e.row.data.id).subscribe({

      next: () => {
        //this.listar();
      },

      error: err => console.error(err)

    });

  }

}

