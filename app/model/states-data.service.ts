// import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Rx';


import {ChangeDetectionStrategy, Component, Input , Injectable} from "@angular/core";

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';


import {GlobalService} from './global.service';
import {UserService} from './user.service';
import {States} from './states';
import {AuthHttp} from 'angular2-jwt';


@Injectable()
export class StatesDataService {

    constructor(private _globalService:GlobalService,
                private _userService:UserService,
                private _authHttp: AuthHttp){
    }

    private getHeaders():Headers {
        return new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+this._userService.getToken(),
        });
    }
    // GET /v1/states
    getAllStates(page) {
        let headers = this.getHeaders();	
        return this._authHttp.get(
            this._globalService.apiHost+'/states?sort=-id&page='+page,	    
            {
                headers: headers
            }
        )
            .map(response => response.json())
            .map((response) => {
                return response;
            })
            .catch(this.handleError);
    }

    // GET /v1/states/1
    getStateById(attr:string):Observable<States> {
        let headers = this.getHeaders();

        return this._authHttp.get(
            this._globalService.apiHost+'/states/'+attr,
            {
                headers: headers
            }
        )
            .map(response => response.json())
            .map((response) => {
                return <States>response.data;
            })
            .catch(this.handleError);
    }


    private handleError (error: Response | any) {

        let errorMessage:any = {};
        // Connection error
        if(error.status == 0) {
            errorMessage = {
                success: false,
                status: 0,
                data: "Sorry, there was a connection error occurred. Please try again.",
            };
        }
        else {
            errorMessage = error.json();
        }
        return Observable.throw(errorMessage);
    }

}
