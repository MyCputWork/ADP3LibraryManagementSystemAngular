import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './book/book.component';
import { ClientBookComponent } from './client-book/client-book.component';
import { ClientComponent } from './client/client.component';
import { HomePageComponent } from './home-page/home-page.component';

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
    path: 'home',
    component: HomePageComponent,
    children: [
      {
        path: 'client-books',
        component: ClientBookComponent,
        pathMatch: 'full',
      },]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
