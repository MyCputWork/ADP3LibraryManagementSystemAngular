import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Genre } from "./genre";

@Injectable({
    providedIn: 'root'
})

export class GenreService{
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient){ }

    public getGenres(): Observable<Genre[]> {
        return this.http.get<Genre[]>(`${this.apiServerUrl}/librarymanagementsystem/genre/getAll`)
    }

    public addGenres(genre : Genre): Observable<Genre> {
        return this.http.post<Genre>(`${this.apiServerUrl}/librarymanagementsystem/genre/save` , genre)
    }

    public UpdateGenres(genre : Genre): Observable<Genre> {
        return this.http.put<Genre>(`${this.apiServerUrl}/librarymanagementsystem/genre/update` , genre)
    }

    public deleteGenres(genreId : string): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/librarymanagementsystem/genre/delete/${genreId}`)
    }
}