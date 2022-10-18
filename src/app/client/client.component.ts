import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Client } from './client';
import { ClientService } from './client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {


  form: FormGroup;
   client: Client = {
    clientId: '',
    name: {
      firstName: '',
      middleName: '',
      lastName: ''
    }
  };

  constructor(public fb: FormBuilder, private clientService: ClientService ) {
    this.form = this.fb.group({
      clientId: [''],
      firstName: [''],
      middleName: [''],
      lastName: ['']
    });
  }

  ngOnInit(): void {
  }


  submitForm() {
    var formData: any = new FormData();
    formData.append('clientId', this.form.get('clientId').value);
    formData.append('firstName', this.form.get('firstName').value);
    formData.append('middleName', this.form.get('middleName').value);
    formData.append('lastName', this.form.get('lastName').value);

    console.log(formData.get("clientId"));

    this.client.clientId= formData.get("clientId");
    this.client.name.firstName= formData.get("firstName");
    this.client.name.middleName= formData.get("middleName");
    this.client.name.lastName= formData.get("lastName");


    this.clientService.addClient(this.client).subscribe(
      (response: Client) => {
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
