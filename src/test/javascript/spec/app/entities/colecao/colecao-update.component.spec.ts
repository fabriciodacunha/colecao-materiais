/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ColecaoDeMateriaisTestModule } from '../../../test.module';
import { ColecaoUpdateComponent } from 'app/entities/colecao/colecao-update.component';
import { ColecaoService } from 'app/entities/colecao/colecao.service';
import { Colecao } from 'app/shared/model/colecao.model';

describe('Component Tests', () => {
    describe('Colecao Management Update Component', () => {
        let comp: ColecaoUpdateComponent;
        let fixture: ComponentFixture<ColecaoUpdateComponent>;
        let service: ColecaoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ColecaoDeMateriaisTestModule],
                declarations: [ColecaoUpdateComponent]
            })
                .overrideTemplate(ColecaoUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ColecaoUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ColecaoService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Colecao(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.colecao = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Colecao();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.colecao = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
