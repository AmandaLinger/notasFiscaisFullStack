import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CidadeEstadoService {

  url: string = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';

  constructor(private http: HttpClient) {}


  listarEstados(){
    return this.http.get<CidadeEstadoService[]>(this.url);
  }

}
