import { HttpErrorResponse } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClientBook } from './client-book';
import { ClientBookService } from './client-book.service';

@Injectable({ providedIn: 'root' })

@Component({
  selector: 'app-client-book',
  templateUrl: './client-book.component.html',
  styleUrls: ['./client-book.component.css']
})
export class ClientBookComponent implements OnInit {

  public clientBooks: ClientBook[];
  public editClientBook: ClientBook;
  public deleteClientBook: ClientBook;
  // public clientBook: ClientBook[];

  clientBook: ClientBook = {
    clients: {
      clientId: ''
    },
    books: {
      bookId: ''
    },
    dateOrdered: ''
  }
    form: FormGroup;

    dateBorrowed = new Date();
    
  constructor( private clientBookService: ClientBookService, public fb: FormBuilder) { 
    this.form = this.fb.group({
      clients: {
        clientId: ''
      },
      books: {
        bookId: ''
      },
      dateOrdered: ''

      // clientId: [''],
      // bookId: [''],
      // date: ['']
    });
  }

  ngOnInit(): void {
    this.getClientBooks();
  }

  public getClientBooks(): void {
    this.clientBookService.getClientsBooks().subscribe(
      (response: ClientBook[]) => {
        this.clientBooks = response;
        console.log(this.clientBooks);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  public saveClientBook(clientBook: ClientBook) {
    this.clientBookService.addClientBook(clientBook).subscribe(
      (response: ClientBook) => {
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  public onOpenModal(clientBook: ClientBook, mode: string): void {
    console.log("in open module");
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addBookModal');
    }
    if (mode === 'edit') {
      // this.editBook = book;
      // button.setAttribute('data-target', '#UpdateBookModal');
    }
    if (mode === 'delete') {
      // this.deleteBook = book;
      // button.setAttribute('data-target', '#deleteBookModal');
    }
    container.appendChild(button);
    button.click();
  }



}
