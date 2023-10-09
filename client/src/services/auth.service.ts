import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, catchError, map, tap } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { environment } from "@src/environments/environment";
import { DBService } from "@services/index";

@Injectable({ providedIn: 'root' })
export class AuthService {
  apiUrl: string = environment.apiUrl;
  isLoggedIn = new BehaviorSubject<boolean | undefined>(undefined);
  tokenKey = "authToken";

  constructor(
    private http: HttpClient,
    private alertService: ToastrService,
    private dbService: DBService
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

  storeUserData(token: string) {
    this.dbService.storeToken({ id: this.tokenKey, token }).subscribe(() => {
      this.isLoggedIn.next(true);
    });
  }

  getToken(): Observable<string | null> {
    return this.dbService.getToken(this.tokenKey);
  }

  clearToken() {
    this.dbService.clearToken(this.tokenKey).subscribe(() => {
      this.checkUserLoggedIn();
    });
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
