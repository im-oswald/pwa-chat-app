import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "@src/environments/environment";
import { map, tap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AuthService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(data: any) {
    const response = this.http.post<any>(`${this.apiUrl}/api/auth/login`, data);

    return response.pipe(
      map(response => response),
      tap(response => console.log('Testing: ', response)),
    )
  }

  getToken(): string | null {
    return localStorage.getItem("authToken");
  }
}
