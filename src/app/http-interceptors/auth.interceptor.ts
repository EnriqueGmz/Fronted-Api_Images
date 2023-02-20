import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  static accessToken = '';
  refresh = false;
  constructor(private hhtp: HttpClient, private userService: UserService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const req = request.clone({
      setHeaders: {
        Authorization: `${AuthInterceptor.accessToken}`,
      },
    });

    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401 && !this.refresh) {
          this.refresh = true;
          return this.userService.refresh().pipe(
            switchMap((res: any) => {
              AuthInterceptor.accessToken = res.token;
              return next.handle(
                request.clone({
                  setHeaders: {
                    Authorization: `${AuthInterceptor.accessToken}`,
                  },
                })
              );
            })
          );
        }
        return throwError(() => err);
      })
    );
  }
}
