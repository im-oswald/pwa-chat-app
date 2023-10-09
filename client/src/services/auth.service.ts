import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, catchError, map, of, tap } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { environment } from "@src/environments/environment";

@Injectable({ providedIn: 'root' })
export class AuthService {
  apiUrl: string = environment.apiUrl;
  isLoggedIn = new BehaviorSubject<boolean | undefined>(undefined);
  tokenKey = "authToken";

  constructor(
    private http: HttpClient,
    private alertService: ToastrService,
  ) { }

  getUserData(): Observable<any> {
    const response = this.http.get(`${this.apiUrl}/api/auth`);

    return response.pipe(
      map(response => response),
      tap(response => console.log('Testing: ', response)),
    );
  }

  login(data: any): Observable<any> {
    const response = this.http.post<any>(`${this.apiUrl}/api/auth/login`, data);

    return response.pipe(
      catchError((error: any) => {
        this.alertService.error(error.error.errors[0].msg, error.statusText)
        return error;
      }),
      map(response => response),
      tap(response => console.log('Testing: ', response)),
    );
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  storeUserData(token: string) {
    localStorage.setItem(this.tokenKey, JSON.stringify(token));
    this.isLoggedIn.next(true);
  }

  checkUserLoggedIn() {
    return this.getUserData().subscribe({
      next: (res) => {
        this.isLoggedIn.next(!!res);
      },
      error: (err) => {
        if (err.status === 401) {
          this.isLoggedIn.next(false);
        }
      }
    });
  }
}
