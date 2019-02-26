import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IColecao } from 'app/shared/model/colecao.model';
import { ColecaoService } from './colecao.service';

@Component({
    selector: 'jhi-colecao-update',
    templateUrl: './colecao-update.component.html'
})
export class ColecaoUpdateComponent implements OnInit {
    colecao: IColecao;
    isSaving: boolean;

    constructor(protected colecaoService: ColecaoService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ colecao }) => {
            this.colecao = colecao;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.colecao.id !== undefined) {
            this.subscribeToSaveResponse(this.colecaoService.update(this.colecao));
        } else {
            this.subscribeToSaveResponse(this.colecaoService.create(this.colecao));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IColecao>>) {
        result.subscribe((res: HttpResponse<IColecao>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
