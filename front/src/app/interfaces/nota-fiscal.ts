import { Cliente } from "./cliente";
import { Produto } from "./produto";
import {ItemNotaFiscal} from './item-nota-fiscal';

export interface NotaFiscal {
    id: number;
    numeroNotaFiscal: number;
    data: string;
    cliente: Cliente;
    itens: ItemNotaFiscal[];
}
