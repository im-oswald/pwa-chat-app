import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "@src/environments/environment";
import { Observable, catchError, map, tap } from "rxjs";
import { ToastrService } from "ngx-toastr";

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
      tap(email=> console.log('Testing: ', email)),
    );
  }
}
