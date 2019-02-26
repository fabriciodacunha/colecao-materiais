import { Moment } from 'moment';
import { IColecao } from 'app/shared/model/colecao.model';

export const enum TipoMaterial {
    AUDIO = 'AUDIO',
    FILME = 'FILME',
    TEXTO = 'TEXTO',
    IMAGEM = 'IMAGEM'
}

export interface IMaterial {
    id?: number;
    nome?: string;
    tipo?: TipoMaterial;
    url?: string;
    autor?: string;
    palavrasChave?: string;
    descricao?: string;
    data?: Moment;
    usuario?: string;
    colecao?: IColecao;
}

export class Material implements IMaterial {
    constructor(
        public id?: number,
        public nome?: string,
        public tipo?: TipoMaterial,
        public url?: string,
        public autor?: string,
        public palavrasChave?: string,
        public descricao?: string,
        public data?: Moment,
        public usuario?: string,
        public colecao?: IColecao
    ) {}
}
