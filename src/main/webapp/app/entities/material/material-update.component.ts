import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IMaterial } from 'app/shared/model/material.model';
import { MaterialService } from './material.service';
import { IColecao } from 'app/shared/model/colecao.model';
import { ColecaoService } from 'app/entities/colecao';

@Component({
    selector: 'jhi-material-update',
    templateUrl: './material-update.component.html'
})
export class MaterialUpdateComponent implements OnInit {
    material: IMaterial;
    isSaving: boolean;

    colecaos: IColecao[];
    dataDp: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected materialService: MaterialService,
        protected colecaoService: ColecaoService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ material }) => {
            this.material = material;
        });
        this.colecaoService
            .query({ filter: 'material-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IColecao[]>) => mayBeOk.ok),
                map((response: HttpResponse<IColecao[]>) => response.body)
            )
            .subscribe(
                (res: IColecao[]) => {
                    if (!this.material.colecao || !this.material.colecao.id) {
                        this.colecaos = res;
                    } else {
                        this.colecaoService
                            .find(this.material.colecao.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IColecao>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IColecao>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IColecao) => (this.colecaos = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.material.id !== undefined) {
            this.subscribeToSaveResponse(this.materialService.update(this.material));
        } else {
            this.subscribeToSaveResponse(this.materialService.create(this.material));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IMaterial>>) {
        result.subscribe((res: HttpResponse<IMaterial>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackColecaoById(index: number, item: IColecao) {
        return item.id;
    }
}
