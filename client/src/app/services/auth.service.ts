import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, catchError, map, tap } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { environment } from "@src/environments/environment";
import { DBService } from "@app/services";

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl: string = environment.apiUrl;
  private isLoggedIn = new BehaviorSubject<boolean | undefined>(undefined);
  private isDataStored = new BehaviorSubject<boolean>(false);
  private tokenKey = "authToken";
  private dataKey = "userData";

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
      this.checkUserLoggedIn();
    });
  }

  getToken(): Observable<string | null> {
    return this.dbService.getToken(this.tokenKey);
  }

  checkUserLoggedIn() {
    return this.getUserData().subscribe({
      next: (res) => {
        this.dbService.storeData({ id: this.dataKey, ...res }).subscribe(() => {
          this.isLoggedIn.next(!!res);
          this.isDataStored.next(true);
        });
      },
      error: (err) => {
        if (err.status === 401) {
          this.isLoggedIn.next(false);
        }
      }
    });
  }

  fetchUserData(): Observable<Object | null> {
    return this.dbService.getData(this.dataKey);
  }

  logout() {
    this.dbService.clear(this.dataKey).subscribe(() => {
      this.dbService.clear(this.tokenKey).subscribe(() => {
        this.checkUserLoggedIn();
      });
    });
  }

  isDataStoredObserable(): Observable<boolean> {
    return this.isDataStored.asObservable();
  }

  isLoggedInObseravable(): Observable<boolean | undefined> {
    return this.isLoggedIn.asObservable();
  }
}
