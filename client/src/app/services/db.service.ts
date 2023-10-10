import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class DBService {
  private dbName = 'authTokensDB';
  private dbVersion = 4;
  private tokenStoreName = 'authTokens';
  private db: IDBDatabase | null = null;
  private dbReadySubject = new BehaviorSubject<boolean>(false);

  constructor() {
    this.openDatabase();
  }

  private openDatabase() {
    const request = indexedDB.open(this.dbName, this.dbVersion);

    request.onerror = (event: Event) => {
      console.error('Error opening IndexedDB:', (event.target as IDBRequest).error);
    };

    request.onsuccess = (event: Event) => {
      this.db = (event.target as IDBRequest).result;
      console.log('Connected to the database successfully');
      this.dbReadySubject.next(true);
    };

    request.onupgradeneeded = (event: Event) => {
      this.db = (event.target as IDBRequest).result;
      if (!this.db?.objectStoreNames.contains(this.tokenStoreName)) {
        this.db?.createObjectStore(this.tokenStoreName, {
          keyPath: 'id',
        });
      }
    };
  }

  onDBReady(): Observable<boolean> {
    return this.dbReadySubject.asObservable();
  }

  storeToken(tokenData: any): Observable<void> {
    return new Observable<void>((subscriber) => {
      if (!this.db) {
        console.error('IndexedDB not available.');
        subscriber.error('IndexedDB not available.');
        return;
      }

      const transaction = this.db.transaction([this.tokenStoreName], 'readwrite');
      const objectStore = transaction.objectStore(this.tokenStoreName);

      const request = objectStore.put(tokenData);

      request.onsuccess = () => {
        subscriber.next();
        subscriber.complete();
      };

      request.onerror = (event: Event) => {
        console.error('Error storing token:', (event.target as IDBRequest).error);
        subscriber.error('Error storing token.');
      };
    });
  }

  getToken(userId: string): Observable<string | null> {
    return new Observable<string | null>((subscriber) => {
      if (!this.db) {
        console.error('IndexedDB not available.');
        subscriber.next(null);
        subscriber.complete();
        return;
      }

      const transaction = this.db.transaction([this.tokenStoreName], 'readonly');
      const objectStore = transaction.objectStore(this.tokenStoreName);

      const request = objectStore.get(userId);

      request.onsuccess = () => {
        const tokenData = request.result;
        if (tokenData) {
          subscriber.next(tokenData.token);
        } else {
          subscriber.next(null);
        }
        subscriber.complete();
      };

      request.onerror = (event: Event) => {
        console.error('Error retrieving token:', (event.target as IDBRequest).error);
        subscriber.error('Error retrieving token.');
      };
    });
  }

  clearToken(userId: string): Observable<void> {
    return new Observable<void>((subscriber) => {
      if (!this.db) {
        console.error('IndexedDB not available.');
        subscriber.error('IndexedDB not available.');
        return;
      }
  
      const transaction = this.db.transaction([this.tokenStoreName], 'readwrite');
      const objectStore = transaction.objectStore(this.tokenStoreName);
  
      const request = objectStore.delete(userId);

      request.onsuccess = () => {
        console.log('Token deleted successfully');
        subscriber.next();
        subscriber.complete();
      };

      request.onerror = (event) => {
        console.error('Error clearing token:', (event.target as IDBRequest).error);
        subscriber.error('Error clearing token.');
      };
    });
  }
}
