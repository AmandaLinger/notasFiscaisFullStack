import { Injectable } from '@angular/core';
import { Cliente } from '../interfaces/cliente';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  constructor(private http: HttpClient) {}

  private api = 'http://localhost:8080/cliente';

  listar(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.api);
  }

  salvar(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.api, cliente);
  }

  atualizar(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.api}/${cliente.id}`, cliente);
  }

  deletar(cliente: Cliente): Observable<void> {

    return this.http.delete<void>(`${this.api}/${cliente.id}`);
  }
}
