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

@NgModule({
  declarations: [
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
ContactComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [ClientComponent]
})
export class AppModule { }
