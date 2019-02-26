/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ColecaoDeMateriaisTestModule } from '../../../test.module';
import { ColecaoDetailComponent } from 'app/entities/colecao/colecao-detail.component';
import { Colecao } from 'app/shared/model/colecao.model';

describe('Component Tests', () => {
    describe('Colecao Management Detail Component', () => {
        let comp: ColecaoDetailComponent;
        let fixture: ComponentFixture<ColecaoDetailComponent>;
        const route = ({ data: of({ colecao: new Colecao(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ColecaoDeMateriaisTestModule],
                declarations: [ColecaoDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ColecaoDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ColecaoDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.colecao).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
