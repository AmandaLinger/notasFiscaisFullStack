import { Component, OnInit } from '@angular/core';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { Produto } from '../../interfaces/produto';
import { ProdutoService } from '../../services/produto-service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [DxDataGridModule],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products implements OnInit {
  dataSource: Produto[] = [];

  constructor(private produtoService: ProdutoService) { }

  ngOnInit() {
    this.carregarProdutos()
  }

  private carregarProdutos(): void {
    this.produtoService.listar().subscribe({
      next: (produtos) => {
        this.dataSource = produtos;
      },
      error: (err) => console.error('Erro ao carregar produtos', err),
    });
  }

  onSavingProducts(e: any): void {
    const change = e?.changes?.[0];
    if (!change) {
      return;
    }
    e.cancel = false;

    if (change.type === 'insert') {
      this.produtoService.salvar(change.data).subscribe({
        next: () => this.carregarProdutos(),
        error: (err) => console.error('Erro ao inserir produto', err),
      });
    }

    if (change.type === 'update') {

      const produtoOriginal = this.dataSource.find(
        produto => produto.id === change.key
      );

      if(!produtoOriginal) {
        return;
      }

      const produto: Produto = {
        ...produtoOriginal,
        ...change.data,
        id: change.key,
      }

        this.produtoService.atualizar(produto).subscribe({
          next: () => this.carregarProdutos(),
          error: (err) => console.error('Erro ao atualizar produto', err),
        })
    }

    if (change.type === 'remove') {
      const produto = { id: change.key } as Produto;

      this.produtoService.deletar(produto).subscribe({
        next: () => {
          this.carregarProdutos();
        },
        error: (err) => {
          console.error('Erro ao deletar produto', err);

          if (err.status === 409) {
            alert(err.error || 'Impossível apagar o produto pois ele está vinculado a uma nota.');
          } else if(err.status == true ){
            alert('Ocorreu um erro ao tentar excluir o produto.');
          }
          this.carregarProdutos();
        }
      });
    }
  }
}
