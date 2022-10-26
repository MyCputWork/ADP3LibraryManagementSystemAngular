import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { Client } from './client';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class ClientService{
    private apiServerUrl =environment.baseURL;

    constructor(private http: HttpClient){
    }

    public addClient(client: Client): Observable<Client> {
        return this.http.post<Client>(`${this.apiServerUrl}/librarymanagementsystem/client/save_client`,client);

    }

    public readClient(clientId: String): Observable<Client>{
        return this.http.get<Client>(`${this.apiServerUrl}/librarymanagementsystem/client/readClient/${clientId}`);
    }

    public updateClient(client: Client): Observable<Client> {
        return this.http.put<Client>(`${this.apiServerUrl}/librarymanagementsystem/client/update_client`,client);

    }

    public deleteClient(clientId: String): Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/librarymanagementsystem/client/deleteClient/${clientId}`);

    }

    public getAllClients(): Observable<Client[]>{
        return this.http.get<Client[]>(`${this.apiServerUrl}/librarymanagementsystem/client/getAll_clients`);
    }

    public findClientById(clientId: String): Observable<any>{
        return this.http.get<Client>(`${this.apiServerUrl}/librarymanagementsystem/client/find_ClientBy_Id/${clientId}`);
    }

}