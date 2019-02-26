import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IColecao } from 'app/shared/model/colecao.model';
import { ColecaoService } from './colecao.service';

@Component({
    selector: 'jhi-colecao-delete-dialog',
    templateUrl: './colecao-delete-dialog.component.html'
})
export class ColecaoDeleteDialogComponent {
    colecao: IColecao;

    constructor(protected colecaoService: ColecaoService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.colecaoService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'colecaoListModification',
                content: 'Deleted an colecao'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-colecao-delete-popup',
    template: ''
})
export class ColecaoDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ colecao }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ColecaoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.colecao = colecao;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/colecao', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/colecao', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
