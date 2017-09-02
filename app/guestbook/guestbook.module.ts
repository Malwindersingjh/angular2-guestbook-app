import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';

import {GuestbookFormComponent} from './guestbook-form.component';
import {GuestbookListComponent} from './guestbook-list.component';
import {GuestbookRoutingModule} from './guestbook-routing.module';

@NgModule({
    imports: [
        CommonModule,       
		SharedModule,
        GuestbookRoutingModule,	
    ],
    declarations: [
		GuestbookFormComponent,  
		GuestbookListComponent,
    ]
})
export class GuestbookModule { }
