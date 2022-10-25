import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ClientAddress } from './client-address';

@Injectable({
    providedIn: 'root'
})

export class ClientAddressService{
    private apiServerUrl =environment.baseURL;


    constructor(private http: HttpClient){
    }

    public addClientAddress(address: ClientAddress): Observable<ClientAddress>{
        return this.http.post<ClientAddress>(`${this.apiServerUrl}/librarymanagementsystem/clientAddress/save_ClientAddress`,address);

    }

    public readClientAddress(clientId: string): Observable<ClientAddress>{
        return this.http.get<ClientAddress>(`${this.apiServerUrl}/librarymanagementsystem/clientAddress/readClientAddress/${clientId}`);
    }

    public updateClientAddress(updatedAddress: ClientAddress): Observable<ClientAddress>{
        return this.http.put<ClientAddress>(`${this.apiServerUrl}/librarymanagementsystem/clientAddress/update_ClientAddress`,updatedAddress);
    }

    public deleteClientAddress(clientId: String): Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/librarymanagementsystem/clientAddress/deleteClientAddress/${clientId}`);

    }

    public getAllClientAddresses(): Observable<ClientAddress[]>{
        return this.http.get<ClientAddress[]>(`${this.apiServerUrl}/librarymanagementsystem/clientAddress/getAll_ClientAddresses`);

    }

    public findClientAddressByClientId(clientId: String): Observable<any>{
        return this.http.get<ClientAddress>(`${this.apiServerUrl}/librarymanagementsystem/clientAddress/findClientAddressByClientId/${clientId}`);

    }
}

