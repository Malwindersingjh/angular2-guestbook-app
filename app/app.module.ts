import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';


import {AppRoutingModule} from './app.routing';

// Layouts
import {FrontendLayoutComponent} from './layouts/frontend-layout.component';
import {P404Component} from './pages/404.component';

import {AuthGuard} from './model/auth.guard';
import {NgxPaginationModule} from 'ngx-pagination'; 
import {SharedModule} from './shared/shared.module';

import {GlobalService} from './model/global.service';
import {UserService} from './model/user.service';
import {UserDataService} from './model/user-data.service';

import { AppComponent } from './app.component';
import {StatesDataService} from './model/states-data.service';
import {GuestbookDataService} from './model/guestbook-data.service';

@NgModule({
  declarations: [
    AppComponent,
    FrontendLayoutComponent,	
    P404Component,	
  ],
  imports: [
    BrowserModule,
    HttpModule,
	SharedModule,
    AppRoutingModule,
	NgxPaginationModule,
  ],
  providers: [
   AuthGuard,
   UserService,
   GlobalService,
   StatesDataService,
   GuestbookDataService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
