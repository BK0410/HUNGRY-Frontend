import { BackendService } from './backend.service';
import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TokenIncterceptorService implements HttpInterceptor {

  constructor(private inject:Injector) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("BK")
    let authservice=this.inject.get(BackendService);
    let jwtToken = req.clone({
      setHeaders: {
        Authorization: 'Bearer '+ authservice.getToken()
      }
    });
    console.log(jwtToken)
    console.log(authservice.getToken())
    return next.handle(jwtToken);
  } 
}
