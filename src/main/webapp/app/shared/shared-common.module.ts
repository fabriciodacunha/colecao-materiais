import { NgModule } from '@angular/core';

import { ColecaoDeMateriaisSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [ColecaoDeMateriaisSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [ColecaoDeMateriaisSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class ColecaoDeMateriaisSharedCommonModule {}
