import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IColecao } from 'app/shared/model/colecao.model';

@Component({
    selector: 'jhi-colecao-detail',
    templateUrl: './colecao-detail.component.html'
})
export class ColecaoDetailComponent implements OnInit {
    colecao: IColecao;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ colecao }) => {
            this.colecao = colecao;
        });
    }

    previousState() {
        window.history.back();
    }
}
