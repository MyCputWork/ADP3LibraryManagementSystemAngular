import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ClientBook } from '../client-book/client-book';
import { ClientBookService } from '../client-book/client-book.service';
import { Client } from '../client/client';
import { ClientService } from '../client/client.service';
import { Book } from './book';
import { BookService } from './book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  public books: Book[];
  public editBook: Book;
  public deleteBook: Book;
  public clients: Client[];

  BookList: any;
  ClientList: any;
  SelectedValue: any;
  SelectedBookId: any;
  form: FormGroup;
  dateBorrowed = new Date();

  clientBook: ClientBook = {
    dateOrdered: '',
    clients: {
      clientId: ''
    },
    books: {
      bookId: ''
    }
  }
  
  constructor(private bookService: BookService, private clientService: ClientService,
     private clientBookService: ClientBookService, public fb: FormBuilder){
      this.form= this.fb.group({
        clientId: [''],
        bookId: ['']
      });

     }
  ngOnInit() {
    this.getBooks();
    this.clientService.getClients().subscribe((data: any)=> {
      this.ClientList= data;
    })
  }

  //get methods

  //to display in combo box
  public getClients(): void {
    this.clientService.getClients().subscribe(
      (response: Client[]) => {
        this.clients = response;
        console.log(this.clients);
        //this.SendToArray(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  
  public getBooks(): void {
    this.bookService.getBooks().subscribe(
      (response: Book[]) => {
        this.books = response;
        console.log(this.books);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  //add methods
  // public AssignClientToBook(assignClientForm: NgForm): void{
  //   this.clientBookService.addClientBook(assignClientForm.value).subscribe(
  //     (response: ClientBook) => {
  //       console.log(response);
  //       this.getBooks();
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   );
  // }

  public AssigningClientToBook(){
    var formData: any = new FormData();
    formData.append('clientId', this.form.get('clientId').value);
    formData.append('bookId', this.form.get('bookId').value);

    console.log(formData.get("clientId"));

    this.clientBook.clients.clientId = formData.get("clientId");
    this.clientBook.books.bookId = formData.get("bookId");
    this.clientBook.dateOrdered = this.dateBorrowed.toUTCString();

    this.clientBookService.addClientBook(this.clientBook).subscribe(
      (response: ClientBook) => {
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

    this.bookService.updateBookAvailability(this.clientBook.books.bookId).subscribe(
      (response: void) => {
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );;

    this.getBooks()
  }
  






  public onAddBook(addForm: NgForm): void {
    document.getElementById('add-book-form').click();
    console.log(addForm.value + "------------------------------");
    this.bookService.addBook(addForm.value).subscribe(
      (response: Book) => {
        console.log(response);
        this.getBooks();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  //update methods

  public onUpdateBook(book: Book): void {
    this.bookService.UpdateBook(book).subscribe(
      (response: Book) => {
        console.log(response);
        this.getBooks();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  //delete methods
  public onDeleteBook(bookId: string): void {
    this.bookService.deleteBook(bookId).subscribe(
      (response: void) => {
        console.log(response);
        this.getBooks();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  //misc
  ChangeBook(e){
    console.log(e.target.value);
    this.SelectedValue= e.target.value;
  }

  public searchBooks(key: string): void {
    console.log(key);
    const results: Book[] = [];
    for (const book of this.books) {
      if (book.bookName.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || book.author.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || book.genre.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(book);
      }
    }
    this.books = results;
    if (results.length === 0 || !key) {
      this.getBooks();
    }
  }

  public onOpenModal(book: Book, mode: string): void {
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
      this.editBook = book;
      button.setAttribute('data-target', '#UpdateBookModal');
    }
    if (mode === 'delete') {
      this.deleteBook = book;
      button.setAttribute('data-target', '#deleteBookModal');
    }
    container.appendChild(button);
    button.click();
  }


}
