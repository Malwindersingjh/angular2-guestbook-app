import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Rx';

import {GlobalService} from './global.service';
import {UserService} from './user.service';
import {Guestbook} from './guestbook';
import {AuthHttp} from 'angular2-jwt';


@Injectable()
export class GuestbookDataService {

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
    // GET /v1/Guestbook
    getAllGuestbook(): Observable<Guestbook[]> {
        let headers = this.getHeaders();	
        return this._authHttp.get(
            this._globalService.apiHost+'/guestbook?sort=-id',	    
            {
                headers: headers
            }
        )
            .map(response => response.json())
            .map((response) => {				
                return <Guestbook[]>response.data;
            })
            .catch(this.handleError);
    }

    // GET /v1/Guestbook/1
    AddEntry(guestbook:Guestbook):Observable<Guestbook> {
        let headers = this.getHeaders();

        return this._authHttp.post(
            this._globalService.apiHost+'/guestbook',
            JSON.stringify(guestbook),
            {
                headers: headers
            }
        )
            .map(response => response.json())
            .map((response) => {
                return <Guestbook>response.data;
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
