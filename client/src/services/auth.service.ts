import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "@src/environments/environment";

@Injectable({ providedIn: 'root' })
export class AuthService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(data: any) {
    const response = this.http.post<any>(`${this.apiUrl}/api/auth`, data);

    debugger
  }
}
