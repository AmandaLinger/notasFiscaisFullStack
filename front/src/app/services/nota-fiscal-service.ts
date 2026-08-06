import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NotaFiscal} from '../interfaces/nota-fiscal';
import {NotaFiscalCadastro} from '../interfaces/nota-fiscal-cadastro';
import {Cliente} from '../interfaces/cliente';
import {Produto} from '../interfaces/produto';
import {NotaFiscalAtualizacao} from '../interfaces/nota-fiscal-atualizacao';

@Injectable({
  providedIn: 'root',
})
export class NotaFiscalService {

  private api = 'http://localhost:8080/notaFiscal';

  constructor(private http: HttpClient) {
  }

  listar() {
    return this.http.get<NotaFiscal[]>(this.api);
  };

  salvar(nota: NotaFiscalCadastro) {
    return this.http.post<NotaFiscal>(this.api, nota);
  };

  atualizar(id: number, nota: NotaFiscalAtualizacao) {
    return this.http.put(`${this.api}/${id}`, nota);
  }

  deletar(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }

  listarClientes() {
    return this.http.get<Cliente[]>('http://localhost:8080/cliente');
  }

  listarProdutos() {
    return this.http.get<Produto[]>('http://localhost:8080/produto');
  }

}
