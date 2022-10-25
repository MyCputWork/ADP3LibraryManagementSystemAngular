import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Author } from '../author/author';
import { AuthorService } from '../author/author.service';
import { ClientBook } from '../client-book/client-book';
import { ClientBookService } from '../client-book/client-book.service';
import { Client } from '../client/client';
import { ClientService } from '../client/client.service';
import { Genre } from '../genre/genre';
import { GenreService } from '../genre/genre.service';
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
  public authors: Author[];
  public genres: Genre[];

  AssignClientsHtml:boolean=true;
  book: Book = {
    bookId: '',
    bookName: '',
    author: '',
    author2: '',
    author3: '',
    genre: '',
    genre2: '',
    genre3: '',
    description: '',
    isRented: '',
    imgUrl: '',
  }


  addBookForm: FormGroup;
  editBookForm: FormGroup;
  BookList: any;
  ClientList: any;
  AuthorList: any;
  GenreList: any;
  SelectedValue: any;
  SelectedValueAuthor: any;
  SelectedValueGenre: any;
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
     private clientBookService: ClientBookService, public fb: FormBuilder, private authorService: AuthorService,
     public addbookfb: FormBuilder, public editbookfb: FormBuilder, public genreService: GenreService ){
      this.form= this.fb.group({
        clientId: [''],
        bookId: ['']
      });
      this.addBookForm = this.addbookfb.group({
        bookId: [''],
        bookName: [''],
        author: [''],
        author2: [''],
        author3: [''],
        genre: [''],
        genre2: [''],
        genre3: [''],
        description: [''],
        isRented: [''],
        imgUrl: [''],
      })
      this.editBookForm= this.editbookfb.group({
        bookId: [''],
        bookName: [''],
        author: [''],
        author2: [''],
        author3: [''],
        genre: [''],
        genre2: [''],
        genre3: [''],
        description: [''],
        isRented: [''],
        imgUrl: ['']
      })

     }
  ngOnInit() {
    this.getBooks('Available');
    this.clientService.getClients().subscribe((data: any)=> {
      this.ClientList= data;
    })
    this.authorService.getAuthors().subscribe((data: any) =>{
      this.AuthorList= data
    })

    this.genreService.getGenres().subscribe((data: any) =>{
      this.GenreList= data
    })
  }

  ToggleAssignClient(){
    this.AssignClientsHtml = !this.AssignClientsHtml;
    if(this.AssignClientsHtml == false){
      this.getBooks('Not Available')
    }else{
      this.getBooks('Available')
    }
}

  //get methods

  //to display in combo box
  public getClients(): void {
    this.clientService.getClients().subscribe(
      (response: Client[]) => {
        this.clients = response;
        console.log(this.clients);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getAuthors(): void {
    this.authorService.getAuthors().subscribe(
      (response: Author[]) => {
        this.authors = response;
        console.log(this.authors);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getGenres(): void {
    this.genreService.getGenres().subscribe(
      (response: Genre[]) => {
        this.genres = response;
        console.log(this.genres);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }



  
  public getBooks(availability: string): void {
    
    //this.bookService.getBooks().subscribe(
      this.bookService.getBookByAvailability(availability).subscribe(
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
    );

    this.getBooks('Available')
  }
  
  public onAddBook(addForm: NgForm): void {
    console.log(this.form.value);
    document.getElementById('add-book-form').click();
    console.log(addForm.value + "------------------------------");
    this.bookService.addBook(addForm.value).subscribe(
      (response: Book) => {
        console.log(response);
        this.getBooks('Available');
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public addBook(){
    document.getElementById('add-book-form').click();
    var formData: any = new FormData();
    formData.append('bookId', this.addBookForm.get('bookId').value);
    formData.append('bookName', this.addBookForm.get('bookName').value);
    formData.append('author', this.addBookForm.get('author').value);
    formData.append('author2', this.addBookForm.get('author2').value);
    formData.append('author3', this.addBookForm.get('author3').value);
    formData.append('genre', this.addBookForm.get('genre').value);
    formData.append('genre', this.addBookForm.get('genre2').value);
    formData.append('genre', this.addBookForm.get('genre3').value);
    formData.append('description', this.addBookForm.get('description').value);
    formData.append('isRented', this.addBookForm.get('isRented').value);
    formData.append('imgUrl', this.addBookForm.get('imgUrl').value);
    console.log(formData.get("author"));

    this.book.bookId= formData.get("bookId");
    this.book.bookName= formData.get("bookName");
    this.book.author= formData.get("author");
    this.book.author2= formData.get("author2");
    this.book.author3= formData.get("author3");
    this.book.genre= formData.get("genre");
    this.book.genre2= formData.get("genre2");
    this.book.genre3= formData.get("genre3");
    this.book.description= formData.get("description");
    this.book.isRented = formData.get("isRented");
    this.book.imgUrl = formData.get("imgUrl");

    this.bookService.addBook(this.book).subscribe(
      (response: Book) => {
        console.log(response);
        this.getBooks('Available');
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        this.getBooks('Available');
      }
    );
    this.getBooks('Available');
  }

  //update methods

  public updateBook(){
    document.getElementById('close-edit').click();
    var formData: any = new FormData();
    formData.append('bookId', this.editBookForm.get('bookId').value);
    formData.append('bookName', this.editBookForm.get('bookName').value);
    formData.append('author', this.editBookForm.get('author').value);
    formData.append('author2', this.editBookForm.get('author2').value);
    formData.append('author3', this.editBookForm.get('author3').value);
    formData.append('genre', this.editBookForm.get('genre').value);
    formData.append('genre2', this.editBookForm.get('genre2').value);
    formData.append('genre3', this.editBookForm.get('genre3').value);
    formData.append('description', this.editBookForm.get('description').value);
    formData.append('isRented', this.editBookForm.get('isRented').value);
    formData.append('imgUrl', this.editBookForm.get('imgUrl').value);
    console.log(formData.get("author"));

    this.book.bookId= formData.get("bookId");
    this.book.bookName= formData.get("bookName");
    this.book.author= formData.get("author");
    this.book.author2= formData.get("author2");
    this.book.author3= formData.get("author3");
    this.book.genre= formData.get("genre");
    this.book.genre2= formData.get("genre2");
    this.book.genre3= formData.get("genre3");
    this.book.description= formData.get("description");
    this.book.isRented = formData.get("isRented");
    this.book.imgUrl = formData.get("imgUrl");

    this.bookService.UpdateBook(this.book).subscribe(
      (response: Book) => {
        console.log(response);
        this.getBooks('Available');
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        this.getBooks('Available');
      }
    );
    this.getBooks('Available');

  }

  public onUpdateBook(book: Book): void {
    this.bookService.UpdateBook(book).subscribe(
      (response: Book) => {
        console.log(response);
        this.getBooks('Available');
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
        this.getBooks('Available');
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

  ChangeAuthor(e){
    console.log(e.target.value);
    this.SelectedValueAuthor= e.target.value;
  }

  ChangeGenre(e){
    console.log(e.target.value);
    this.SelectedValueGenre= e.target.value;
  }

  public searchBooks(key: string): void {
    console.log(key);
    const results: Book[] = [];
    for (const book of this.books) {
      if (book.bookName.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || book.author.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || book.genre.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || book.genre2.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || book.genre3.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || book.author2.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || book.author3.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(book);
      }
    }
    this.books = results;
    if (results.length === 0 || !key) {
      this.getBooks('Available');
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
