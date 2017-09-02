import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {GuestbookFormComponent} from './guestbook-form.component';
import {GuestbookListComponent} from './guestbook-list.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'guestbook'
        },
        children: [
            {
                path: 'list',
                component: GuestbookListComponent,
                data: {
                    title: 'List',
                }
            },
            {
                path: 'add',
                component: GuestbookFormComponent,
                data: {
                    title: 'Form',
                }
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'list'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GuestbookRoutingModule {}
