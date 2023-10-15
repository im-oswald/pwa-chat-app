import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class DBService {
  private dbName = 'userDataDB';
  private dbVersion = 7;
  private storeName = 'userData';
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
      if (!this.db?.objectStoreNames.contains(this.storeName)) {
        this.db?.createObjectStore(this.storeName, {
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

      const transaction = this.db.transaction([this.storeName], 'readwrite');
      const objectStore = transaction.objectStore(this.storeName);

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

      const transaction = this.db.transaction([this.storeName], 'readonly');
      const objectStore = transaction.objectStore(this.storeName);

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

  clear(userId: string): Observable<void> {
    return new Observable<void>((subscriber) => {
      if (!this.db) {
        console.error('IndexedDB not available.');
        subscriber.error('IndexedDB not available.');
        return;
      }
  
      const transaction = this.db.transaction([this.storeName], 'readwrite');
      const objectStore = transaction.objectStore(this.storeName);
  
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

  storeData(data: any): Observable<void> {
    return new Observable<void>((subscriber) => {
      if (!this.db) {
        console.error('IndexedDB not available.');
        subscriber.error('IndexedDB not available.');
        return;
      }

      const transaction = this.db.transaction([this.storeName], 'readwrite');
      const objectStore = transaction.objectStore(this.storeName);

      const request = objectStore.put(data);

      request.onsuccess = () => {
        subscriber.next();
        subscriber.complete();
      };

      request.onerror = (event: Event) => {
        console.error('Error storing data:', (event.target as IDBRequest).error);
        subscriber.error('Error storing data.');
      };
    });
  }

  getData(userId: string): Observable<Object | null> {
    return new Observable<Object | null>((subscriber) => {
      if (!this.db) {
        console.error('IndexedDB not available.');
        subscriber.next(null);
        subscriber.complete();
        return;
      }

      const transaction = this.db.transaction([this.storeName], 'readonly');
      const objectStore = transaction.objectStore(this.storeName);

      const request = objectStore.get(userId);

      request.onsuccess = () => {
        const data = request.result;
        if (data) {
          subscriber.next(data);
        } else {
          subscriber.next(null);
        }
        subscriber.complete();
      };

      request.onerror = (event: Event) => {
        console.error('Error retrieving data:', (event.target as IDBRequest).error);
        subscriber.error('Error retrieving data.');
      };
    });
  }
}
