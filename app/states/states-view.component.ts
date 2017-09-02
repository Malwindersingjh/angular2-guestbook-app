import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";

import {UserService} from "../model/user.service";
import {StatesDataService} from "../model/states-data.service";
import {States} from "../model/states";

import {GlobalService} from '../model/global.service';

@Component({
    templateUrl: './states-view.component.html',
})
export class StatesViewComponent implements OnInit{

    private _attr:string;
    private _parameters:any;

    private _state:States;

    private _errorMessage:string;

    // Status Types

    constructor(
		private _statesDataService:StatesDataService,
                private _userService:UserService,
				private _globalService:GlobalService,
                private _router:Router,
                private _activatedRoute:ActivatedRoute) {

    }

    public ngOnInit() {	
		this._state = new States();

        this._parameters = this._activatedRoute.params.subscribe(params => {
            // plus(+) is to convert 'id' to number
            if(typeof params['id'] !== "undefined") {
                this._attr = params['id'];

                this._errorMessage = "";
                this._statesDataService.getStateById(this._attr)
                    .subscribe(
                        state => {
                            this._state = state;  

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
        });
    }

}
