import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class ClientService{
    private apiServerUrl =environment.baseURL;

    constructor(private http: HttpClient){
    }

public deleteCity(cityId: String): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/librarymanagementsystem/client/deleteCity/${cityId}`);
}
}