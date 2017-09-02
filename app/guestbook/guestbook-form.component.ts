import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";

import {CustomValidators} from 'ng2-validation';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";

import {UserService} from "../model/user.service";
import {GuestbookDataService} from "../model/guestbook-data.service";
import {Guestbook} from "../model/guestbook";

import {GlobalService} from '../model/global.service';

@Component({
    templateUrl: './guestbook-form.component.html',
})

export class GuestbookFormComponent implements OnInit{
    private _parameters:any;
    private _guestbook:Guestbook;
    
    private _form:FormGroup;
    private _formErrors:any;
    private _submitted:boolean = false;
	
    private _errorMessage:string;

	constructor(
				private _guestbookDataService:GuestbookDataService,
                private _userService:UserService,
                private _router:Router,
                private _activatedRoute:ActivatedRoute,
				private _formBuilder:FormBuilder) {


        this._form = _formBuilder.group({

			phone: ['', Validators.compose([
					Validators.required,
					CustomValidators.rangeLength([3, 15]),				   
				])],

			message: ['', Validators.compose([
					Validators.required,
					CustomValidators.rangeLength([3, 255]),                
				])],

        });

		this._form.valueChanges
            .subscribe(data => this.onValueChanged(data));

    }

    private _setFormErrors(errorFields:any):void{
        for (let key in errorFields) {
            let errorField = errorFields[key];
            // skip loop if the property is from prototype
            if (!this._formErrors.hasOwnProperty(key)) continue;

            // let message = errorFields[error.field];
            this._formErrors[key].valid = false;
            this._formErrors[key].message = errorField;
        }
    }

    private _resetFormErrors():void{
        this._formErrors = {
            phone: {valid: true, message: ''},
			message: {valid: true, message: ''},
        };
    }

    private _isValid(field):boolean {
        let isValid:boolean = false;

        // If the field is not touched and invalid, it is considered as initial loaded form. Thus set as true
        if(this._form.controls[field].touched == false) {
            isValid = true;
        }
        // If the field is touched and valid value, then it is considered as valid.
        else if(this._form.controls[field].touched == true && this._form.controls[field].valid == true) {
            isValid = true;
        }

        return isValid;
    }

    public onValueChanged(data?: any) {
        if (!this._form) { return; }
        const form = this._form;
        for (let field in this._formErrors) {
            // clear previous error message (if any)
            let control = form.get(field);
            if (control && control.dirty) {
                this._formErrors[field].valid = true;
                this._formErrors[field].message = '';
            }
        }
    }
	
	private _resetGuestbook(){
        this._guestbook = new Guestbook();
		this._guestbook.phone = '';
		this._guestbook.message = '';			
    }
	
	 public ngOnInit() {
        this._resetFormErrors();
		this._resetGuestbook();
    }
	
	public onSubmit() {
        this._submitted = true;
        this._resetFormErrors();
		
		this._guestbookDataService.AddEntry(this._guestbook)
			.subscribe(
				result => {
					
					this._submitted = false;
					this._router.navigate(['/guestbook']);
					
				},
				error => {
					this._submitted = false;
					// Validation errors
					if(error.status == 422) {
						let errorFields = JSON.parse(error.data.message);
						this._setFormErrors(errorFields);
						//this._setFormErrors(error.data);
					}
					// Unauthorized Access
					else if(error.status == 401 || error.status == 403) {
						this._userService.unauthorizedAccess(error);
					}
					// All other errors
					else {
						this._errorMessage = error.data.message;
					}
				}
			);
	
    }
}
