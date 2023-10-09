import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from "@angular/common/http";
import { Observable, tap } from "rxjs";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    debugger
    return next.handle(request).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          const token = event.body.token;
          delete event.body.token;

          if (token) {
            this.storeTokenSecurely(token);
          }
        }
      })
    );
  }

  private storeTokenSecurely(token: string) {
    localStorage.setItem("authToken", token);
  }
}
