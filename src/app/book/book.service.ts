import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Book } from "./book";

@Injectable({
    providedIn: 'root'
})

export class BookService{
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient){ }

    public getBooks(): Observable<Book[]> {
        return this.http.get<Book[]>(`${this.apiServerUrl}/librarymanagementsystem/books/getAllBooks`)
    }

    public addBook(book : Book): Observable<Book> {
        return this.http.post<Book>(`${this.apiServerUrl}/librarymanagementsystem/books/save_book` , book)
    }

    public UpdateBook(book : Book): Observable<Book> {
        return this.http.put<Book>(`${this.apiServerUrl}/librarymanagementsystem/books/update_book` , book)
    }

    public deleteBook(bookId : string): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/librarymanagementsystem/books/deleteBook/${bookId}`)
    }

    public updateBookAvailability(bookId : string): Observable<void> {
        console.log("entered updatebookav function");
        return this.http.put<void>(`${this.apiServerUrl}/librarymanagementsystem/books/updateBookAvailability/${bookId} `, null)
    }
}