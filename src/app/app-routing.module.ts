import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorComponent } from './author/author.component';
import { BookComponent } from './book/book.component';
import { ClientBookComponent } from './client-book/client-book.component';
import { ClientComponent } from './client/client.component';
import { HomePageComponent } from './home-page/home-page.component';
import { GenreComponent } from './genre/genre.component';

const routes: Routes = [
  {
    path: 'client',
    component: ClientComponent
  },
  {
    path: 'book',
    component: BookComponent
  },
  {
    path: 'clientBook',
    component: ClientBookComponent
  },
  {
    path: 'home',
    component: HomePageComponent
  },
  {
    path: 'genre',
    component: GenreComponent
  },
  {
    path: 'author',
    component: AuthorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
