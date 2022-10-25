import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Contact } from "./contact";

@Injectable({
    providedIn: 'root'

})

export class ContactService{
    private apiServerUrl =environment.baseURL;

    constructor(private http: HttpClient){
    }

    public addContact(contact: Contact): Observable<Contact>{
        return this.http.post<Contact>(`${this.apiServerUrl}/librarymanagementsystem/contact/save_contact`,contact);
    }

    public updateContact(updatedContact: Contact): Observable<Contact>{
        return this.http.put<Contact>(`${this.apiServerUrl}/librarymanagementsystem/contact/update_contact`,updatedContact);

    }

    public deleteContact(contactId: string): Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/librarymanagementsystem/contact/deleteContact/${contactId}`);

    }

    public getAllContacts(): Observable<Contact[]>{
        return this.http.get<Contact[]>(`${this.apiServerUrl}/librarymanagementsystem/contact/getAllContacts`);

    }

    public findContactByEmail(email: string): Observable<any>{
        return this.http.get<Contact>(`${this.apiServerUrl}/librarymanagementsystem/contact/findByEmail/${email}`);

    }

    public findContactByCellNumber(cell: string): Observable<any>{
        return this.http.get<Contact>(`${this.apiServerUrl}/librarymanagementsystem/contact/findByCell/${cell}`);
    }

}