import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageNamespace } from '../model/storage.model';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class MoviesGuard implements CanActivate {
  constructor(
    private router: Router,
    private readonly storageService: StorageService
  ){

  }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean  {
    if(this.storageService.getJsonValue(StorageNamespace.Storage.RequestToken) && this.storageService.getJsonValue(StorageNamespace.Storage.RequestToken)){
      return true;
    }

    this.router.navigate(['iniciar-sesion'])
    return false;
  }
  
}
