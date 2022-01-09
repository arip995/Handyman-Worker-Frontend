import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-in.component.html'
})
export class SignInComponent implements OnInit {
    signInForm: FormGroup;
    //Constructor
    constructor(private _formBuilder: FormBuilder,
      private _httpClient: HttpClient,
      private _router: Router,
      private _activeRoute: ActivatedRoute,
      private _location:Location
      ){
        this.signInForm = _formBuilder.group({
            username : new FormControl("",[Validators.required,Validators.minLength(6),Validators.maxLength(10)]),
            password : new FormControl("",[Validators.required]),
          });
    }

    //OnInit method
    ngOnInit() {

    }

    checkError(errorName:any){
  
        return()=>{
          this.signInForm.controls['username'].hasError(errorName);
          this.signInForm.controls['password'].hasError(errorName);
        } 
    
      }

    signIn(){
      
      // let headers = new HttpHeaders ();
      // headers.append('Content-Type', 'application/json');
      // let param = new HttpParams ();
      // param.set("username", this.signInForm?.get('username')?.value);
      // param.set("password", this.signInForm?.get('password')?.value); 
      // console.log(param)
      const data = {
        "username"      : this.signInForm?.get('username')?.value,
        "password"      : this.signInForm?.get('password')?.value,
      }
      this._httpClient.post(`http://127.0.0.1:8000/worker/signin/`,data )
      .subscribe((res:any)=>{
        const accessToken = localStorage.getItem('accessToken')
        if(!accessToken) {
          localStorage.setItem('accessToken', JSON.stringify(res.accessToken))
        }else{

        }
        // localStorage.setItem('accessToken', JSON.stringify(res.accessToken))
        // this._router.navigate(['worker/sign-up'], {relativeTo : this._activeRoute})
        // console.log(res.accessToken)
      })
    }
}