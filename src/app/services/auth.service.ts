import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthConstants } from '../config/auth.constants';
import { HttpService } from './http.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData$ = new BehaviorSubject<any>('');

  constructor(private HttpService: HttpService, private storageService: StorageService, private router: Router) { }

  getUserData(){
    this.storageService.get(AuthConstants.AUTH).then(res => {
      console.log(res);
      this.userData$.next(res);
    })
  }
  login(postDate: any): Observable<any> {
    return this.HttpService.post('login',postDate);
  }

  signup(postDate: any): Observable<any>{
    return this.HttpService.post('signup',postDate);
  }

  logout(){
    //this.storageService.clear();
    this.storageService.removeItem(AuthConstants.AUTH).then(res =>{
      this.userData$.next('');
      this.router.navigate(['']);
    });
  }
}
