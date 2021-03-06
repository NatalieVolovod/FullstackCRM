import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable, throwError} from "rxjs";
import {AuthService} from "../services/auth.service";
import {catchError} from "rxjs/operators";


@Injectable()
export class TokenInterceptor implements HttpInterceptor{

  constructor(private auth: AuthService,
              private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.auth.isAuthenticated()) {
      console.log('In token.interceptor.ts token: ' + this.auth.getToken());
      req = req.clone({
        setHeaders: {
          Authorization: this.auth.getToken()
        }
      });
    }
    return next.handle(req).pipe(
      catchError(
        (error: HttpErrorResponse) => this.handleAuthError(error)
      )
    );
  }

  private handleAuthError(error: HttpErrorResponse): Observable<HttpEvent<HttpErrorResponse>> {
    if(error.status === 401) {
      this.router.navigate(['/login'], {
        queryParams: {
          tokenExpired: true
        }
      })
    }

    return throwError(error);
  }
}
