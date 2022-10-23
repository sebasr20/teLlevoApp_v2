import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthConstants } from '../config/auth.constants';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {
 canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

  constructor(private storageService: StorageService, private router: Router){}
  
 /* canActivate(): Promise<boolean>{
    return new Promise(resolve => {
      resolve(true);
      this.storageService.get(AuthConstants.AUTH).then( res => {
        if(res){
          resolve(true)
        }else{
          this.router.navigate([''])
          resolve(false)
        }
      }).catch(err => {
        resolve(false);
      });
    });
  }*/
}
