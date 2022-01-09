import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { serviceType } from 'src/app/Shared/service-type';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html'
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  password:any;
  confirmPassword:any;
  passwordMatch:boolean = false;
  type = serviceType;
  

  //Constructor
  constructor(
    private _formBuilder: FormBuilder,
    private _httpClient: HttpClient,
    private _router: Router,
    private _activeRoute: ActivatedRoute,
    private _location:Location
  ){
    this.signUpForm = _formBuilder.group({
      firstname       : new FormControl("",[Validators.required]),
      lastname        : new FormControl("",[Validators.required]),
      mobileNumber    : new FormControl("",[Validators.required,Validators.maxLength(10),Validators.minLength(10)]),
      service         : new FormControl("",[Validators.required]),
      username        : new FormControl("",[Validators.required,Validators.minLength(6),Validators.maxLength(10)]),
      password        : new FormControl("",[Validators.required]),
      confirmPassword : new FormControl("",[Validators.required])
    });
  }


  //OnInit Method
ngOnInit(){
  
  // this.signUpForm.reset({

  // })
}

checkError(errorName:any){
  
    return()=>{
      this.signUpForm.controls['firstname'].hasError(errorName);
      this.signUpForm.controls['lastname'].hasError(errorName);
      this.signUpForm.controls['mobileNumber'].hasError(errorName);
      this.signUpForm.controls['service'].hasError(errorName);
      this.signUpForm.controls['username'].hasError(errorName);
      this.signUpForm.controls['password'].hasError(errorName);
      this.signUpForm.controls['confirmPassword'].hasError(errorName);
      
    } 

  }


  signUp(){
    if(this.password !== this.confirmPassword){
      this.passwordMatch = true;
      return;
    }else{
      this.passwordMatch = false;
      const data = {
        "firstName"     : this.signUpForm?.get('firstname')?.value,
        "lastName"      : this.signUpForm?.get('lastname')?.value,
        "mobileNumber"  : this.signUpForm?.get('mobileNumber')?.value,
        "worktype"      : this.signUpForm?.get('service')?.value,
        "username"      : this.signUpForm?.get('username')?.value,
        "password"      : this.signUpForm?.get('password')?.value,      
        "createdOn"     : "2005-01-01"
      }
      console.log(data)
      this._httpClient.post(`http://127.0.0.1:8000/worker/signup/`,data)
      .subscribe((res)=>{
        this._router.navigate(['../sign-in'], {relativeTo : this._activeRoute})
        console.log(res)
      })

      console.log(data)
    }
  }
}


