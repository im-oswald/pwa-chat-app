import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, map, tap } from "rxjs";
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

  getMessages(to: string, from: string): Observable<any> {
    const response = this.http.get<any>(`${this.apiUrl}/api/messages?to=${to}&from=${from}`);

    return response.pipe(
      map(response => response),
      tap(response => console.log('Testing: ', response)),
    );
  }

  getChatList(): Observable<any> {
    const response = this.http.get<any>(`${this.apiUrl}/api/messages/chat-list`);

    return response.pipe(
      map(response => response),
      tap(response => console.log('Testing: ', response)),
    );
  }

  readMessages(from: string): Observable<any> {
    const response = this.http.put<any>(`${this.apiUrl}/api/messages/read-messages?from=${from}`, {});

    return response.pipe(
      map(response => response),
      tap(response => console.log('Testing: ', response)),
    );
  }
}
