import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, catchError, map, tap } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { environment } from "@src/environments/environment";

@Injectable({ providedIn: 'root' })
export class MessageService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  sendMessage(data: any): Observable<any> {
    const response = this.http.post<any>(`${this.apiUrl}/api/messages`, data);

    return response.pipe(
      map(response => response),
      tap(response => console.log('Testing: ', response)),
    );
  }
}
