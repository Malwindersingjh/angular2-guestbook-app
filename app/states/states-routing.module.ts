import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {StatesViewComponent} from './states-view.component';
import {StatesListComponent} from './states-list.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'states'
        },
        children: [
            {
                path: 'list',
                component: StatesListComponent,
                data: {
                    title: 'List',
                }
            },
            {
                path: ':id',
                component: StatesViewComponent,
                data: {
                    title: 'View',
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
export class StatesRoutingModule {}
