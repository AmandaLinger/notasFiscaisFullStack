import {ItemNotaFiscalCadastro} from './item-nota-fiscal-cadastro';

export interface NotaFiscalAtualizacao {
  id: number;
  numeroNotaFiscal: number;
  data: string;
  codigoCliente: number;
  itens: ItemNotaFiscalCadastro[];
}
