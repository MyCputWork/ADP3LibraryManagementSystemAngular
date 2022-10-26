import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Genre } from './genre';
import { GenreService } from './genre.service';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css']
})
export class GenreComponent implements OnInit {

  public genres: Genre[];
  public editGenre: Genre;
  public deleteGenre: Genre;

  genre: Genre = {
    genreId: '',
    genreName: ''
  }

  addGenreForm: FormGroup;
  editGenreForm: FormGroup;
  genreList: any;

  constructor(private genreService: GenreService, public fb: FormBuilder, public addGenreFb: FormBuilder,
    public editGenreFb: FormBuilder) { 
      this.addGenreForm = this.addGenreFb.group({
        genreId: '',
        genreName: ''
      })
      this.editGenreForm = this.editGenreFb.group({
        genreId: '',
        genreName: ''
      })
    }

  ngOnInit(): void {
    this.getGenres();
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

public addGenre(){
  document.getElementById('add-genre-form').click();
  var formData: any = new FormData();
  formData.append('genreId', this.addGenreForm.get('genreId').value);
  formData.append('genreName', this.addGenreForm.get('genreName').value);

  console.log(formData.get("genreName"));

  this.genre.genreId= formData.get("genreId");
  this.genre.genreName= formData.get("genreName");
  this.genreService.addGenres(this.genre).subscribe(
    (response: Genre) => {
      console.log(response);
      this.getGenres();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
      this.getGenres();
    }
  );
}

public updateGenre(){
  document.getElementById('update-genre-form').click();
  var formData: any = new FormData();
  formData.append('genreId', this.editGenreForm.get('genreId').value);
  formData.append('genreName', this.editGenreForm.get('genreName').value);

  console.log(formData.get("genreName"));

  this.genre.genreId= formData.get("genreId");
  this.genre.genreName= formData.get("genreName");

  this.genreService.UpdateGenres(this.genre).subscribe(
    (response: Genre) => {
      console.log(response);
      this.getGenres();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
      this.getGenres();
    }
  );
}

public onDeleteGenre(genreId: string): void {
  this.genreService.deleteGenres(genreId).subscribe(
    (response: void) => {
      console.log(response);
      this.getGenres();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
      this.getGenres();
    }
  );
}

public searchGenres(key: string): void {
  console.log(key);
  const results: Genre[] = [];
  for (const genre of this.genres) {
    if (genre.genreName.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
      results.push(genre);
    }
  }
  this.genres = results;
  if (results.length === 0 || !key) {
    this.getGenres();
  }
}

public onOpenModal(genre: Genre, mode: string): void {
  console.log("in open module");
  const container = document.getElementById('main-container');
  const button = document.createElement('button');
  button.type = 'button';
  button.style.display = 'none';
  button.setAttribute('data-toggle', 'modal');
  if (mode === 'add') {
    button.setAttribute('data-target', '#addGenreModal');
  }
  if (mode === 'edit') {
    this.editGenre = genre;
    button.setAttribute('data-target', '#UpdateGenreModal');
  }
  if (mode === 'delete') {
    this.deleteGenre = genre;
    button.setAttribute('data-target', '#deleteGenreModal');
  }
  container.appendChild(button);
  button.click();
}


}
