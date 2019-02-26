/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ColecaoDeMateriaisTestModule } from '../../../test.module';
import { ColecaoComponent } from 'app/entities/colecao/colecao.component';
import { ColecaoService } from 'app/entities/colecao/colecao.service';
import { Colecao } from 'app/shared/model/colecao.model';

describe('Component Tests', () => {
    describe('Colecao Management Component', () => {
        let comp: ColecaoComponent;
        let fixture: ComponentFixture<ColecaoComponent>;
        let service: ColecaoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ColecaoDeMateriaisTestModule],
                declarations: [ColecaoComponent],
                providers: []
            })
                .overrideTemplate(ColecaoComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ColecaoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ColecaoService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Colecao(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.colecaos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
