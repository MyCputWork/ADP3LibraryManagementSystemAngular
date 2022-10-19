import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Author } from "./author";

@Injectable({
    providedIn: 'root'
})

export class AuthorService{
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient){ }

    public getAuthors(): Observable<Author[]> {
        return this.http.get<Author[]>(`${this.apiServerUrl}/librarymanagementsystem/author/getAllAuthors`)
    }

    public addAuthor(author : Author): Observable<Author> {
        return this.http.post<Author>(`${this.apiServerUrl}/librarymanagementsystem/author/save_author` , author)
    }

    public UpdateBook(author : Author): Observable<Author> {
        return this.http.put<Author>(`${this.apiServerUrl}/librarymanagementsystem/author/update_author` , author)
    }

    public deleteBook(authorId : string): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/librarymanagementsystem/author/deleteBook/${authorId}`)
    }


}