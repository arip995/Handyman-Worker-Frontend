import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { pipe, throwError } from 'rxjs';
import { catchError,tap } from 'rxjs/operators'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  accessToken: any;
  constructor(private _formBuilder: FormBuilder,
    private _httpClient: HttpClient,
    private _router: Router,
    private _activeRoute: ActivatedRoute,
    private _location:Location){

  }

  ngOnInit(): void {
    console.log("hii")
    this.accessToken = localStorage.getItem('accessToken');
    // const a = JSON.parse(this.accessToken)
    const data={
        "accessToken": JSON.parse(this.accessToken)
    }
    if(this.accessToken){
      this._httpClient.post(`http://127.0.0.1:8000/worker/signinaccesstoken/`,data).pipe(
      tap(()=>{

      }),
      catchError((error)=>{
        this._router.navigate(['/worker/sign-in'], {relativeTo : this._activeRoute});
        throw new Error(error)
      })
      )
      .subscribe((res:any)=>{
        // this._router.navigate(['/worker/sign-in'], {relativeTo : this._activeRoute});
        // console.log(res)
      })
    }
  }
  
}
