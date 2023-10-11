import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, catchError } from "rxjs";
import { AuthService } from "@app/services";

@Injectable()
export class AuthErrorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          // Clear the token that will logout the user
          // Ignore the auth endpoint as it has its own handler
          if (request.method != "GET" && !request.url.includes("api/auth")) {
            this.authService.clearToken();
          }
        }
        return next.handle(request);
      })
    );
  }
}
