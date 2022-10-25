import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Author } from './author';
import { AuthorService } from './author.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  public authors: Author[];
  public editAuthor: Author;
  public deleteAuthor: Author;

  author: Author = {
    authorId: '',
    name: {
      firstName: '',
      middleName: '',
      lastName: '',
    }
  }

  addAuthorForm: FormGroup;
  editAuthorForm: FormGroup;
  authorList: any;

  constructor(private authorService: AuthorService, public fb: FormBuilder, public addAuthorFb: FormBuilder,
    public editAuthorFb: FormBuilder) {
      this.addAuthorForm = this.addAuthorFb.group({
        authorId: [''],
        firstName: [''],
        middleName: [''],
        lastName: ['']
      })
      this.editAuthorForm = this.editAuthorFb.group({
        authorId: [''],
        firstName: [''],
        middleName: [''],
        lastName: ['']
      })
     }

  ngOnInit(): void {
    this.getAuthors();
    

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

  public addAuthor(){
    document.getElementById('add-author-form').click();
    var formData: any = new FormData();
    formData.append('authorId', this.addAuthorForm.get('authorId').value);
    formData.append('firstName', this.addAuthorForm.get('firstName').value);
    formData.append('middleName', this.addAuthorForm.get('middleName').value);
    formData.append('lastName', this.addAuthorForm.get('lastName').value);

    console.log(formData.get("authorId"));

    this.author.authorId= formData.get("authorId");
    this.author.name.firstName= formData.get("firstName");
    this.author.name.middleName= formData.get("middleName");
    this.author.name.lastName= formData.get("lastName");


    this.authorService.addAuthor(this.author).subscribe(
      (response: Author) => {
        console.log(response);
        this.getAuthors();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        this.getAuthors();
      }
    );
  }

  public updateAuthor(){
    document.getElementById('update-author-form').click();
    var formData: any = new FormData();
    formData.append('authorId', this.editAuthorForm.get('authorId').value);
    formData.append('firstName', this.editAuthorForm.get('firstName').value);
    formData.append('middleName', this.editAuthorForm.get('middleName').value);
    formData.append('lastName', this.editAuthorForm.get('lastName').value);

    console.log(formData.get("authorId"));

    this.author.authorId= formData.get("clientId");
    this.author.name.firstName= formData.get("firstName");
    this.author.name.middleName= formData.get("middleName");
    this.author.name.lastName= formData.get("lastName");


    this.authorService.UpdateAuthor(this.author).subscribe(
      (response: Author) => {
        console.log(response);
        this.getAuthors();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        this.getAuthors();
      }
    );
  }

  public onDeleteAuthor(authorId: string): void {
    this.authorService.deleteAuthor(authorId).subscribe(
      (response: void) => {
        console.log(response);
        this.getAuthors();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchAuthors(key: string): void {
    console.log(key);
    const results: Author[] = [];
    for (const author of this.authors) {
      if (author.authorId.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || author.name.firstName.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || author.name.middleName.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || author.name.lastName.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(author);
      }
    }
    this.authors = results;
    if (results.length === 0 || !key) {
      this.getAuthors();
    }
  }

  public onOpenModal(author: Author, mode: string): void {
    console.log("in open module");
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addAuthorModal');
    }
    if (mode === 'edit') {
      this.editAuthor = author;
      button.setAttribute('data-target', '#UpdateAuthorModal');
    }
    if (mode === 'delete') {
      this.deleteAuthor = author;
      button.setAttribute('data-target', '#deleteAuthorModal');
    }
    container.appendChild(button);
    button.click();
  }


  

}
