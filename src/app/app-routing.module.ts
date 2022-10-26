import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorComponent } from './author/author.component';
import { BookComponent } from './book/book.component';
import { ClientBookComponent } from './client-book/client-book.component';
import { ClientComponent } from './client/client.component';
import { HomePageComponent } from './home-page/home-page.component';
import { GenreComponent } from './genre/genre.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AdminDashboardComponent } from './component/admin-dashboard/admin-dashboard.component';

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
  },
  {
    path: '', component: LoginComponent
  },
  {
    path: 'signup', component: SignupComponent
  },
  {
    path: 'admin', component: AdminDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
