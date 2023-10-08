import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "@src/environments/environment";
import { map, tap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class UserService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  register(data: any) {
    const response = this.http.post<any>(`${this.apiUrl}/api/users`, data);

    return response.pipe(
      map(response => response),
      tap(email=> console.log('Testing: ', email)),
    );
  }
}
