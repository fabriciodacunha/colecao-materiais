export interface IColecao {
    id?: number;
    nome?: string;
}

export class Colecao implements IColecao {
    constructor(public id?: number, public nome?: string) {}
}
