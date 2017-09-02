import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";

import {UserService} from "../model/user.service";
import {StatesDataService} from "../model/states-data.service";
import {States} from "../model/states";

import {GlobalService} from '../model/global.service';

@Component({
    templateUrl: './states-list.component.html',
})
export class StatesListComponent implements OnInit{
    private _states:States[];
	
    private p: number = 1;
	private total: number;
	private loading: boolean;
	// private collection = [];
	 
    private _errorMessage:string;
	
    constructor(private _statesDataService:StatesDataService,
                private _userService:UserService) {}

    ngOnInit() {
		this._states = null;	
        
		this.getPage(1);
    }

	public  getPage(page: number) {
        this.loading = true;

		this._statesDataService.getAllStates(page)
			.subscribe(
				states => {
				console.log(states);
					this._states = states.data;
					this.total = states.count;
					this.p = page;
					this.loading = false;
				},
				error => {
					// unauthorized access
					if(error.status == 401 || error.status == 403) {
						this._userService.unauthorizedAccess(error);
					} else {
						this._errorMessage = error.data.message;
					}
					 this.loading = false;
			}
		);
		
			
			
    }
	
    public getStates() {
				

    }
   
}