/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ColecaoDeMateriaisTestModule } from '../../../test.module';
import { ColecaoDeleteDialogComponent } from 'app/entities/colecao/colecao-delete-dialog.component';
import { ColecaoService } from 'app/entities/colecao/colecao.service';

describe('Component Tests', () => {
    describe('Colecao Management Delete Component', () => {
        let comp: ColecaoDeleteDialogComponent;
        let fixture: ComponentFixture<ColecaoDeleteDialogComponent>;
        let service: ColecaoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ColecaoDeMateriaisTestModule],
                declarations: [ColecaoDeleteDialogComponent]
            })
                .overrideTemplate(ColecaoDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ColecaoDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ColecaoService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
