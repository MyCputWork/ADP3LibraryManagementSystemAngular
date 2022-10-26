import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { ClientContact } from './clientContact';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class ClientContactService{
    private apiServerUrl =environment.baseURL;

    constructor(private http: HttpClient){
    }

    public addClientContact(clientContact: ClientContact): Observable<ClientContact>{
        return this.http.post<ClientContact>(`${this.apiServerUrl}/librarymanagementsystem/clientContact/save_ClientContact`,clientContact);

    }

    public readClientContact(clientContactId: string): Observable<ClientContact>{
        return this.http.get<ClientContact>(`${this.apiServerUrl}/librarymanagementsystem/clientContact/readClientContact/${clientContactId}`);

    }

    public updateClientContact(clientContact: ClientContact): Observable<ClientContact>{
        return this.http.put<ClientContact>(`${this.apiServerUrl}/librarymanagementsystem/clientContact/update_ClientContact`,clientContact);

    }

    public deleteClientContact(clientContactId: string): Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/librarymanagementsystem/clientContact/deleteClientContact/${clientContactId}`);

    }

    public getAllClientContacts(): Observable<ClientContact[]>{
        return this.http.get<ClientContact[]>(`${this.apiServerUrl}/librarymanagementsystem/clientContact/getAll_ClientContacts`);
    }

    public findClientContactByClientId(clientId: string): Observable<any>{
        return this.http.get<ClientContact>(`${this.apiServerUrl}/librarymanagementsystem/clientContact/getClientContactByClientId/${clientId}`);

    }

}