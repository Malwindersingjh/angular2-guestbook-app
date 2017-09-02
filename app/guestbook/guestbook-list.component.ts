import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";

import {UserService} from "../model/user.service";
import {GuestbookDataService} from "../model/guestbook-data.service";
import {Guestbook} from "../model/guestbook";

import {GlobalService} from '../model/global.service';

@Component({
    templateUrl: './guestbook-list.component.html',
})
export class GuestbookListComponent implements OnInit{
    private _guestbook:Guestbook[];

    private _errorMessage:string;

    constructor(private _guestbookDataService:GuestbookDataService,
                private _userService:UserService) {}

    ngOnInit() {
        this.getGuestbook();
    }

    public getGuestbook() {
		
		this._guestbook =null;
		   
		this._guestbookDataService.getAllGuestbook()
			.subscribe(
				guestbooks => {
					this._guestbook = guestbooks;
				},
				error => {
					// unauthorized access
					if(error.status == 401 || error.status == 403) {
						this._userService.unauthorizedAccess(error);
					} else {
						this._errorMessage = error.data.message;
					}
			}
		);
    }
   
}