import {ItemNotaFiscalCadastro} from './item-nota-fiscal-cadastro';

export interface NotaFiscalCadastro{
  numeroNotaFiscal: number;
  data: string;
  codigoCliente: number;
  itens: ItemNotaFiscalCadastro[];
}
