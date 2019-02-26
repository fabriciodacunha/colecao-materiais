import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Colecao } from 'app/shared/model/colecao.model';
import { ColecaoService } from './colecao.service';
import { ColecaoComponent } from './colecao.component';
import { ColecaoDetailComponent } from './colecao-detail.component';
import { ColecaoUpdateComponent } from './colecao-update.component';
import { ColecaoDeletePopupComponent } from './colecao-delete-dialog.component';
import { IColecao } from 'app/shared/model/colecao.model';

@Injectable({ providedIn: 'root' })
export class ColecaoResolve implements Resolve<IColecao> {
    constructor(private service: ColecaoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IColecao> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Colecao>) => response.ok),
                map((colecao: HttpResponse<Colecao>) => colecao.body)
            );
        }
        return of(new Colecao());
    }
}

export const colecaoRoute: Routes = [
    {
        path: '',
        component: ColecaoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Colecaos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: ColecaoDetailComponent,
        resolve: {
            colecao: ColecaoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Colecaos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: ColecaoUpdateComponent,
        resolve: {
            colecao: ColecaoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Colecaos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ColecaoUpdateComponent,
        resolve: {
            colecao: ColecaoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Colecaos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const colecaoPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: ColecaoDeletePopupComponent,
        resolve: {
            colecao: ColecaoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Colecaos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
