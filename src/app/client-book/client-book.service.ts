
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { ClientBook } from "./client-book";

@Injectable({
    providedIn: 'root'
})

export class ClientBookService{
private apiServerUrl = environment.apiBaseUrl;

constructor(private http: HttpClient){ }

public getClientsBooks(): Observable<ClientBook[]> {
    return this.http.get<ClientBook[]>(`${this.apiServerUrl}/librarymanagementsystem/clientBook/getAll_clientbooks`)
}

public addClient(clientBook : ClientBook): Observable<ClientBook> {
    return this.http.post<ClientBook>(`${this.apiServerUrl}/librarymanagementsystem/clientBook/save_clientbook` , clientBook)
}

// public UpdateClient(clientBook : ClientBook): Observable<ClientBook> {
//     return this.http.put<ClientBook>(`${this.apiServerUrl}/librarymanagementsystem/books/update_book` , clientBook)
// }

// public deleteClient(clientBookId : string): Observable<void> {
//     return this.http.delete<void>(`${this.apiServerUrl}/librarymanagementsystem/books/deleteBook/${clientId}`)
// }
}