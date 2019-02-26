import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IColecao } from 'app/shared/model/colecao.model';
import { AccountService } from 'app/core';
import { ColecaoService } from './colecao.service';

@Component({
    selector: 'jhi-colecao',
    templateUrl: './colecao.component.html'
})
export class ColecaoComponent implements OnInit, OnDestroy {
    colecaos: IColecao[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected colecaoService: ColecaoService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.colecaoService
            .query()
            .pipe(
                filter((res: HttpResponse<IColecao[]>) => res.ok),
                map((res: HttpResponse<IColecao[]>) => res.body)
            )
            .subscribe(
                (res: IColecao[]) => {
                    this.colecaos = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInColecaos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IColecao) {
        return item.id;
    }

    registerChangeInColecaos() {
        this.eventSubscriber = this.eventManager.subscribe('colecaoListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
