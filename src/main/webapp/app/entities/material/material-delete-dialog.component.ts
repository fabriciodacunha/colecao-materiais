import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMaterial } from 'app/shared/model/material.model';
import { MaterialService } from './material.service';

@Component({
    selector: 'jhi-material-delete-dialog',
    templateUrl: './material-delete-dialog.component.html'
})
export class MaterialDeleteDialogComponent {
    material: IMaterial;

    constructor(protected materialService: MaterialService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.materialService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'materialListModification',
                content: 'Deleted an material'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-material-delete-popup',
    template: ''
})
export class MaterialDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ material }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(MaterialDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.material = material;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/material', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/material', { outlets: { popup: null } }]);
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
