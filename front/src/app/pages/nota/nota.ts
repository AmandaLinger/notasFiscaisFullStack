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
  clienteSelecionado!: number;

  ngOnInit() {
    this.carregarNotas();

    this.listarClientes();

    this.notaFiscalService.listarProdutos().subscribe((data) => {
      this.produtos = data;
    });
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

  novaNota : NotaFiscalCadastro = {
  numeroNotaFiscal: null as any,
  data: new Date().toISOString().substring(0,10),
  codigoCliente: 0,
  itens:[]
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

    console.log(item)
  }

  salvarNota() {

    this.notaFiscalService.salvar(this.notaCadastro)
      .subscribe({
        next: () => {
          this.carregarNotas();
        },
        error: err => {
          console.error(err);
        }
      });

  }

  onSavingNota(e: any) {

    const change = e.changes[0];
    console.log("change: " + change);

    if (!change) {
      return;
    }

    if (change.type === 'insert') {

      const nota: NotaFiscalCadastro = {
        numeroNotaFiscal: change.data.numeroNotaFiscal,
        data: new Date().toISOString().split('T')[0],
        codigoCliente: this.clienteSelecionado,
        itens: change.data.itens ?? []
      };

      console.log("Enviando:", nota);

      e.cancel = true;

      this.notaFiscalService.salvar(nota)
        .subscribe({
          next: resposta => {
            console.log("Salvo:", resposta);
            this.notaFiscalService.listar()
              .subscribe(notas => this.notas = notas);
          },
          error: erro => console.error(erro)
        });

      console.log('change.data:', JSON.stringify(change.data, null, 2));
      console.log('DTO:', JSON.stringify(nota, null, 2));
      console.log("DADOS DO GRID:", change.data);

    }

  }

  protected onProdutoChange(e: any, item: ItemNotaFiscalCadastro) {

    item.produtoId = e.value;

    const produto = this.produtos.find(
      p => p.id === e.value
    );

    if (produto) {
      item.precoUnitario = produto.preco;
    }
  }

  calcularSubtotalProduto = (rowData: ItemNotaFiscalCadastro): number => {

    const produto = this.produtos.find(
      p => p.id === rowData.produtoId
    );

    if (!produto || rowData.quantidade == null) {
      return 0;
    }

    return Number(rowData.quantidade) * Number(produto.preco);
  };


  // onClienteSelecionado(e: any){
  //   this.clienteSelecionado = e.value;
  //   console.log("Cliente selecionado:", this.co);
  // }
}
