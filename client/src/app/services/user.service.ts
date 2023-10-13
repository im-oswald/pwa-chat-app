import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, catchError, map, tap } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { environment } from "@src/environments/environment";

@Injectable({ providedIn: 'root' })
export class UserService {
  apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private alertService: ToastrService
  ) { }

  register(data: any): Observable<any> {
    const response = this.http.post<any>(`${this.apiUrl}/api/users`, data);

    return response.pipe(
      catchError((error: any) => {
        this.alertService.error(error.error.errors[0].msg, error.statusText)
        return error;
      }),
      map(response => response),
      tap(response => console.log('Testing: ', response)),
    );
  }

  users(term?: string): Observable<any> {
    const response = this.http.get<any>(`${this.apiUrl}/api/users?term=${term}`);

    return response.pipe(
      map(response => response),
      tap(response => console.log('Testing: ', response)),
    );
  }
}
