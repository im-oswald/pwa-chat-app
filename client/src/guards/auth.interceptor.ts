import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { AuthService } from "@src/services";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    if (token) {
      const authReq = request.clone({
        setHeaders: { Authorization: `Bearer ${token}`.replaceAll("\"", '') },
      });
      return next.handle(authReq);
    }

    return next.handle(request);
  }

}
