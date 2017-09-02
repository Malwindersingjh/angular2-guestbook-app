import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';

import {NgxPaginationModule} from 'ngx-pagination'; 

import {StatesViewComponent} from './states-view.component';
import {StatesListComponent} from './states-list.component';
import {StatesRoutingModule} from './states-routing.module';

@NgModule({
    imports: [
        CommonModule,       
		SharedModule,
        StatesRoutingModule,	
		NgxPaginationModule,
    ],
    declarations: [
		StatesViewComponent,  
		StatesListComponent,
    ]
})
export class StatesModule { }
