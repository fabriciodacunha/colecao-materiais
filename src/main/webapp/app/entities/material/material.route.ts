import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Material } from 'app/shared/model/material.model';
import { MaterialService } from './material.service';
import { MaterialComponent } from './material.component';
import { MaterialDetailComponent } from './material-detail.component';
import { MaterialUpdateComponent } from './material-update.component';
import { MaterialDeletePopupComponent } from './material-delete-dialog.component';
import { IMaterial } from 'app/shared/model/material.model';

@Injectable({ providedIn: 'root' })
export class MaterialResolve implements Resolve<IMaterial> {
    constructor(private service: MaterialService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMaterial> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Material>) => response.ok),
                map((material: HttpResponse<Material>) => material.body)
            );
        }
        return of(new Material());
    }
}

export const materialRoute: Routes = [
    {
        path: '',
        component: MaterialComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'Materials'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: MaterialDetailComponent,
        resolve: {
            material: MaterialResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Materials'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: MaterialUpdateComponent,
        resolve: {
            material: MaterialResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Materials'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: MaterialUpdateComponent,
        resolve: {
            material: MaterialResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Materials'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const materialPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: MaterialDeletePopupComponent,
        resolve: {
            material: MaterialResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Materials'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
