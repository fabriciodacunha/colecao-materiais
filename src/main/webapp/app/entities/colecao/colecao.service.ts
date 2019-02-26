import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IColecao } from 'app/shared/model/colecao.model';

type EntityResponseType = HttpResponse<IColecao>;
type EntityArrayResponseType = HttpResponse<IColecao[]>;

@Injectable({ providedIn: 'root' })
export class ColecaoService {
    public resourceUrl = SERVER_API_URL + 'api/colecaos';

    constructor(protected http: HttpClient) {}

    create(colecao: IColecao): Observable<EntityResponseType> {
        return this.http.post<IColecao>(this.resourceUrl, colecao, { observe: 'response' });
    }

    update(colecao: IColecao): Observable<EntityResponseType> {
        return this.http.put<IColecao>(this.resourceUrl, colecao, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IColecao>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IColecao[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
