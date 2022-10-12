import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { Client } from "./client";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class ClientService{
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient){ }

    public getClients(): Observable<Client[]> {
        return this.http.get<Client[]>(`${this.apiServerUrl}/librarymanagementsystem/client/getAll_clients`)
    }

    public addClient(client : Client): Observable<Client> {
        return this.http.post<Client>(`${this.apiServerUrl}/librarymanagementsystem/client/save_client` , client)
    }

    public UpdateClient(client : Client): Observable<Client> {
        return this.http.put<Client>(`${this.apiServerUrl}/librarymanagementsystem/books/update_book` , client)
    }

    public deleteClient(clientId : string): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/librarymanagementsystem/books/deleteBook/${clientId}`)
    }
}