import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Client } from '../client/client';
import { ClientService } from '../client/client.service';
import { ClientBook } from './client-book';
import { ClientBookService } from './client-book.service';

@Component({
  selector: 'app-client-book',
  templateUrl: './client-book.component.html',
  styleUrls: ['./client-book.component.css']
})
export class ClientBookComponent implements OnInit {
  public clients: Client[];
  public clientBooks: ClientBook[];

  constructor( private clientService: ClientService, private clientBookService: ClientBookService) { }

  ngOnInit(): void {
    this.getClients();
  }

  public getClientBooksByClient(client:Client): void {
    this.clientBookService.getClientBooksByClient(client).subscribe({next:
      (response: ClientBook[]) => {
        this.clientBooks = response;
      },
     error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
  });
  }

  private getClients(): void {
    this.clientService.getClients().subscribe({next:
      (response: Client[]) => {
        this.clients = response;
      },
     error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
  });
  }

}
