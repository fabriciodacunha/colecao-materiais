import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ColecaoDeMateriaisSharedModule } from 'app/shared';
import {
    ColecaoComponent,
    ColecaoDetailComponent,
    ColecaoUpdateComponent,
    ColecaoDeletePopupComponent,
    ColecaoDeleteDialogComponent,
    colecaoRoute,
    colecaoPopupRoute
} from './';

const ENTITY_STATES = [...colecaoRoute, ...colecaoPopupRoute];

@NgModule({
    imports: [ColecaoDeMateriaisSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ColecaoComponent,
        ColecaoDetailComponent,
        ColecaoUpdateComponent,
        ColecaoDeleteDialogComponent,
        ColecaoDeletePopupComponent
    ],
    entryComponents: [ColecaoComponent, ColecaoUpdateComponent, ColecaoDeleteDialogComponent, ColecaoDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ColecaoDeMateriaisColecaoModule {}
