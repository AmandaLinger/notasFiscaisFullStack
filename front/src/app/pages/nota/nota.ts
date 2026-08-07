import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotaFiscalService} from '../../services/nota-fiscal-service';
import {DxDataGridModule, DxNumberBoxModule, DxSelectBoxModule, DxTextBoxModule} from 'devextreme-angular';
import {NotaFiscal} from '../../interfaces/nota-fiscal';
import {Cliente} from '../../interfaces/cliente';
import {Produto} from '../../interfaces/produto';
import {ItemNotaFiscalCadastro} from '../../interfaces/item-nota-fiscal-cadastro';
import {DxButtonModule} from 'devextreme-angular/ui/button';
import {ClienteService} from '../../services/cliente-service';
import {ProdutoService} from '../../services/produto-service';
import {NotaFiscalCadastro} from '../../interfaces/nota-fiscal-cadastro';
import {FirstKeysToConsolePipe} from '../../pipe/FirstKeysToConsolePipe';
import {NotaFiscalAtualizacao} from '../../interfaces/nota-fiscal-atualizacao';
import {ItemNotaFiscal} from '../../interfaces/item-nota-fiscal';

@Component({
  selector: 'app-nota',
  standalone: true,
  imports: [
    CommonModule,
    DxDataGridModule,
    DxSelectBoxModule,
    DxButtonModule,
    DxTextBoxModule,
    DxNumberBoxModule,
    FirstKeysToConsolePipe,
  ],
  templateUrl: './nota.html',
  styleUrl: './nota.scss',
})
export class Nota  implements OnInit {

  constructor(
    private notaFiscalService: NotaFiscalService,
    private clienteService: ClienteService,
    private produtoService: ProdutoService,
  ){}

  notas: NotaFiscal[] = [];
  clientes: Cliente[] = [];
  produtos: Produto[] = [];
  itens: ItemNotaFiscalCadastro[] = [];

  ngOnInit() {

    this.listarClientes();

    this.notaFiscalService.listarProdutos().subscribe((data) => {
      this.produtos = data;
    });

    this.carregarNotas();

  }

  carregarNotas(): void {
    this.notaFiscalService.listar().subscribe({
      next: (notas) => {
        this.notas = notas;
      },
      error: (err) => {
        console.error('Erro ao carregar notas', err);
      }
    });
  }

  listarClientes() {
    this.notaFiscalService.listarClientes()
      .subscribe(clientes => {
        this.clientes = clientes;
        console.log(this.clientes);
      });
  }

  notaCadastro: NotaFiscalCadastro = {
    numeroNotaFiscal: 0,
    data: '',
    codigoCliente: 0,
    itens: []
  };

  notaInicial = {
    numeroNotaFiscal: 0,
    data: new Date(),
    codigoCliente: null,
    itens: []
  };

  onInitNewRow(e: any): void {
    e.data.numeroNotaFiscal = null;
    e.data.data = new Date();
    e.data.codigoCliente = null;
    e.data.itens = [];
  }

  onEditorPreparing(e: any) {
    if (e.dataField === 'codigoCliente') {
      const original = e.editorOptions.onValueChanged;

      e.editorOptions.onValueChanged = (args: any) => {
        console.log('Cliente selecionado:', args.value);

        if (original) {
          original(args);
        }
      };
    }
  }

  excluirLinha(itens: any,index: number) {
    this.notaCadastro.itens.splice(index, 1);
  }

  adicionarItem(itens: ItemNotaFiscalCadastro[]): void {

    itens.push({
      produtoId: 0,
      quantidade: 1,
      precoUnitario: 0
    });

  }

  calcularSubtotal(item:any): number{
    return item.quantidade*item.precoUnitario;
  }

  onValueChanged(item: ItemNotaFiscalCadastro) {

    const produto = this.produtos.find(
      p => p.id === item.produtoId
    );

    if (produto) {
      item.precoUnitario = produto.preco;
    }
  }

  onSavingNota(e: any) {
    console.log('Quantidade de changes:', e.changes.length);
    console.log('Changes completas:', e.changes);

    if (!e.changes.length) {
      console.log('Sem alterações');
      return;
    }

    const change = e.changes[0];
    if (change.type === 'update') {

      const notaAtual = e.component
        .getDataSource()
        .items()
        .find((item: any) => item.id === change.key);

      const dto = {
        numeroNotaFiscal: change.data.numeroNotaFiscal ?? notaAtual.numeroNotaFiscal,
        data: (change.data.data ? new Date(change.data.data).toISOString().split('T')[0]
          : (notaAtual.data ? new Date(notaAtual.data).toISOString().split('T')[0] : new Date().toISOString().split('T')[0])),
        codigoCliente: change.data.codigoCliente ?? change.data.cliente?.codigo ?? notaAtual.cliente?.codigo ?? notaAtual.codigoCliente,
        itens: (change.data.itens ?? notaAtual.itens ?? []).map((item:any) => ({
          produtoId: item.produto?.id ?? item.produtoId?.id ?? item.produtoId,
          quantidade: item.quantidade,
          precoUnitario: item.precoUnitario
        }))
      };

      e.cancel = true;

      this.notaFiscalService.atualizar(change.key, dto)
        .subscribe({
          next: resposta => {
            console.log("atualizado:", resposta);

            e.component.cancelEditData();

            this.notaFiscalService.listar()
              .subscribe(notas => this.notas = notas);

          }
        });

    }
    if (change.type === 'insert') {

      const nota: NotaFiscalCadastro = {
        numeroNotaFiscal: change.data.numeroNotaFiscal,
        data: new Date().toISOString().split('T')[0],
        codigoCliente: change.data.cliente.codigo,

        itens: (change.data.itens ?? []).map((item: any) => ({
          produtoId: item.produto.id,
          quantidade: Number(item.quantidade),
          precoUnitario: Number(item.precoUnitario)
        }))
      };

      e.cancel = true;

      this.notaFiscalService.salvar(nota).subscribe({
        next: resposta => {
          console.log('Salvo:', resposta);

          e.component.cancelEditData();

          this.notaFiscalService.listar()
            .subscribe(notas => this.notas = notas);
        },

        error: erro => {
          console.error('Erro ao salvar:', erro);
        }
      });
    }
    if (change.type === 'remove') {

      console.log('Nota que será excluída:', change.key);

      e.cancel = true;

      this.notaFiscalService.deletar(change.key)
        .subscribe({
          next: resposta => {
            this.carregarNotas();
          },

          error: erro => {
            console.error('Erro ao excluir nota:', erro);
          }
        });
    }
  }

  protected onClienteChange(e: any, cell: any) {

    const cliente = this.clientes.find(
      c => c.codigo === e.value
    );

    if (cliente) {
      cell.setValue(cliente);
    }
  }

  onProdutoChange(event: any, item: any) {
    const produto = this.produtos.find(
      p => p.id === event.value
    );

    if (produto) {
      item.produto = produto;
      item.precoUnitario = produto.preco;

      if (!item.quantidade) {
        item.quantidade = 1;
      }
    }

    delete item.produtoId;

    console.log('Item atualizado:', item);
  }

  calcularSubtotalProduto = (rowData: any): number => {
    if (rowData.quantidade == null || rowData.precoUnitario == null) {
      return 0;
    }

    return Number(rowData.quantidade) * Number(rowData.precoUnitario);
  };


  converterParaAtualizacao(nota: NotaFiscal): NotaFiscalAtualizacao {
    return {
      numeroNotaFiscal: nota.numeroNotaFiscal,
      data: nota.data,
      codigoCliente: nota.cliente.codigo,
      itens: (nota.itens ?? []).map((item: any) => ({
        produtoId: item.produto?.id ?? item.produtoId?.id ?? item.produtoId,
        quantidade: item.quantidade,
        precoUnitario: item.precoUnitario
      }))
    };
  }

  converterItensParaEdicao(itens: ItemNotaFiscal[]): ItemNotaFiscalCadastro[] {
    return itens.map(item => ({
      produtoId: item.produto.id,
      quantidade: item.quantidade,
      precoUnitario: item.precoUnitario
    }));
  }


  produtoSelecionado(item: any): number | null {
    return item.produto?.id ?? null;
  }

  onInitNewItem(e: any): void {
    e.data.produto = null;
    e.data.quantidade = 1;
    e.data.precoUnitario = 0;
  }

  onItemChanged(data: any) {
    const novosItens = data.value.map((item: any) => ({
      ...item
    }));

    data.setValue(novosItens);
  }
}
