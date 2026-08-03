import { Component, OnInit } from '@angular/core';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { Cliente } from '../../interfaces/cliente';
import { ClienteService } from '../../services/cliente-service';
import { forkJoin } from 'rxjs';
import {Produto} from '../../interfaces/produto';

@Component({
  selector: 'app-clients',
  imports: [DxDataGridModule],
  templateUrl: './clients.html',
  styleUrl: './clients.scss',
})
export class Clients implements OnInit {
  dataSource: Cliente[] = [];

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.carregarClientes();
  }

  private carregarClientes(): void {
    this.clienteService.listar().subscribe({
      next: (clientes) => {
        this.dataSource = clientes;
      },
      error: (err) => console.error('Erro ao carregar clientes', err),
    });
  }

  onSavingClients(e: any): void {
    const change = e?.changes?.[0];

    if (!change) {
      return;
    }

    e.cancel = false;

    if (change.type === 'insert') {
      this.clienteService.salvar(change.data).subscribe({
        next: () => this.carregarClientes(),
        error: (err) => console.error('Erro ao inserir cliente', err),
      });

    }

    else if (change.type === 'update') {

      const clienteOriginal = this.dataSource.find(
        cliente => cliente.id === change.key
      );

      if(!clienteOriginal) {
        return;
      }

      const cliente: Cliente = {
        ...clienteOriginal,
        ...change.data,
        id: change.key,
      }

      this.clienteService.atualizar(cliente).subscribe({
        next: () => this.carregarClientes(),
        error: (err) => console.error('Erro ao atualizar cliente', err),
      })
    }

    else if (change.type === 'remove') {
      const cliente = { id: change.key } as Cliente;
      this.clienteService.deletar(cliente).subscribe({
        next: () => this.carregarClientes(),
        error: (err) => console.error('Erro ao deletar cliente', err),
      });
    }
  }
}
