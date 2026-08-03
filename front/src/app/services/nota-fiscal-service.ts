import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NotaFiscal} from '../interfaces/nota-fiscal';
import {NotaFiscalCadastro} from '../interfaces/nota-fiscal-cadastro';

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

  atualizar(nota: NotaFiscalCadastro) {
    return this.http.put<NotaFiscal>(this.api, nota);
  }

  deletar(e : NotaFiscalCadastro) {
    return this.http.delete<NotaFiscalCadastro>(`${this.api}/${e}`);
  }

}
