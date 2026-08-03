import { Produto } from "./produto";

export interface ItemNotaFiscal {
    id: number;
    quantidade: number;
    precoUnitario: number;
    produto: Produto;
}
