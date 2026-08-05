import { Cliente } from "./cliente";
import {ItemNotaFiscal} from './item-nota-fiscal';

export interface NotaFiscal {
    id: number;
    numeroNotaFiscal: number;
    data: string;
    codigoCliente: Number;
    itens: ItemNotaFiscal[];
}
