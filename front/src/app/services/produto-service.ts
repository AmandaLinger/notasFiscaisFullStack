import { Injectable } from '@angular/core';
import { Produto } from '../interfaces/produto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Cliente} from '../interfaces/cliente';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {

  //conectando com a api do backend na rota de produtos
  private api = 'http://localhost:8080/produto';

  constructor(private http: HttpClient) {}

  listar(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.api);
  }

  salvar(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.api, produto);
  }

  atualizar(produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(`${this.api}/${produto.id}` , produto);
  }


  deletar(produto: Produto): Observable<void> {
    return this.http.delete<void>(`${this.api}/${produto.id}`, {
      responseType: 'text' as 'json'
    });
  }
}
