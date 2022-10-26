import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientBookComponent } from './client-book/client-book.component';
import { BookComponent } from './book/book.component';
import { HomePageComponent } from './home-page/home-page.component';import { AuthorComponent } from './author/author.component';
import { GenreComponent } from './genre/genre.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ClientComponent } from './client/client.component';
import { ClientAddressComponent } from './client-address/client-address.component';
import { AddressComponent } from './address/address.component';
import { CityComponent } from './city/city.component';
import { ClientContactComponent } from './client-contact/client-contact.component';
import { ContactComponent } from './contact/contact.component';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { UserDashboardComponent } from './component/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './component/admin-dashboard/admin-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
  ClientBookComponent,
    AuthorComponent,
    GenreComponent,
    NavbarComponent,
    BookComponent,
    HomePageComponent,
    ClientComponent,
    ClientAddressComponent,
    AddressComponent,
    CityComponent,
    ClientContactComponent,
ContactComponent,
LoginComponent,
    SignupComponent,
    UserDashboardComponent,
    AdminDashboardComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [ClientComponent]
})
export class AppModule { }
