import {ItemNotaFiscalCadastro} from './item-nota-fiscal-cadastro';

export interface NotaFiscalAtualizacao {
  numeroNotaFiscal: number;
  data: string;
  codigoCliente: number;
  itens: ItemNotaFiscalCadastro[];
}
