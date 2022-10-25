import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Client } from './client';
import { ClientService } from './client.service';
import { ClientAddressService } from '../client-address/clientAddress.service';
import { ClientContact } from '../client-contact/clientContact';
import { ClientContactService } from '../client-contact/clientContact.service';
import { ClientAddress } from '../client-address/client-address';
import { Contact } from '../contact/contact';
import { ContactService } from '../contact/contact.service';

@Component({
  selector: 'app-root',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})

export class ClientComponent implements OnInit{

  public clients: Client[] = [];
  public editClient: Client;
  public deleteClient: Client;

  public clientAddresses: ClientAddress[];
  public editClientAddress: ClientAddress;
  public deleteClientAddress: ClientAddress;

  public clientContacts: ClientContact[];
  public editClientContact: ClientContact;
  public deleteClientContact: ClientContact;

  public contacts: Contact[];
  public editContact: Contact;
  public deleteContact: Contact;

  formAdd: FormGroup;

  form: FormGroup;

  
   client: Client = {
    clientId: '',
    name: {
      firstName: '',
      middleName: '',
      lastName: '',
    },
  };
    
    clientAddress: ClientAddress = {
     clientId: '',
     address: {
       unitNumber: '',
       complexName: '',
       streetNumber: '',
       streetName: '',
       postalCode: 0,

       city:{
        id: '',
        name: '',
        suburb: ''
       }
    }
  };

  contact: Contact = {
    contactId: '',
    cell: '',
    email: '',
    nextOfKin: ''
  };

  clientContact: ClientContact = {
    clientContactId: '',

    client: {
      clientId: '',
      name: {
        firstName: '',
        middleName: '',
        lastName: '',
      }
    },
    contact: {
      contactId: '',
      email: '',
      cell: '',
      nextOfKin: ''
  }

  };

  constructor(public fb: FormBuilder, private http: HttpClient, private clientService: ClientService,
    private clientAddressService: ClientAddressService, private clientContactService: ClientContactService, private contactService: ContactService, public afb: FormBuilder){
    this.form = this.fb.group({
      clientId: ['',[Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      firstName: ['',[Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$')]],
      middleName: ['',[Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$')]],
      lastName: ['',[Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$')]],

      unitNumber: ['',[Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      complexName: ['',[Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$')]],
      streetNumber: ['',[Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      streetName: ['',[Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$')]],
      postalCode: [ ,[Validators.pattern(/^-?(0|[1-9]\d*)?$/)]], 

      id: ['-select city id-'],
      name: ['-select city name-'],
      suburb: ['',[Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$')]],

      clientContactId: [''], 
      contactId: ['',[Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      email: ['',[Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      cell: ['',[Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      nextOfKin: ['',[Validators.pattern(/^-?(0|[1-9]\d*)?$/)]]
    });

    this.formAdd = this.afb.group({
      clientId: ['',[Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      firstName: ['',[Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$')]],
      middleName: ['',[Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$')]],
      lastName: ['',[Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$')]],

      unitNumber: ['',[Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      complexName: ['',[Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$')]],
      streetNumber: ['',[Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      streetName: ['',[Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$')]],
      postalCode: [ ,[Validators.pattern(/^-?(0|[1-9]\d*)?$/)]], 

      id: ['-select city id-'],
      name: ['-select city name-'],
      suburb: ['',[Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$')]],

      clientContactId: [''], 
      contactId: ['',[Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      email: ['',[Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      cell: ['',[Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      nextOfKin: ['',[Validators.pattern(/^-?(0|[1-9]\d*)?$/)]]
    });
  }

  ngOnInit(): void {
    this.getAllClients();
    
  }

  submitForm() {
    var formData: any = new FormData();
    formData.append('clientId', this.formAdd.get('clientId').value);
    formData.append('firstName', this.formAdd.get('firstName').value);
    formData.append('middleName', this.formAdd.get('middleName').value);
    formData.append('lastName', this.formAdd.get('lastName').value);

    console.log(formData.get("clientId"));

    this.client.clientId= formData.get("clientId");
    this.client.name.firstName= formData.get("firstName");
    this.client.name.middleName= formData.get("middleName");
    this.client.name.lastName= formData.get("lastName");


    this.clientService.addClient(this.client).subscribe(
      (response: Client) => {
        console.log(response);
        this.getAllClients();
        this.formAdd.reset(); //remove if cause probs
      
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

    formData.append('unitNumber', this.formAdd.get('unitNumber').value);
    formData.append('complexName', this.formAdd.get('complexName').value);
    formData.append('streetNumber', this.formAdd.get('streetNumber').value);
    formData.append('streetName', this.formAdd.get('streetName').value);
    formData.append('postalCode', this.formAdd.get('postalCode').value);
    formData.append('id',this.formAdd.get('id').value);
    formData.append('name',this.formAdd.get('name').value);
    formData.append('suburb',this.formAdd.get('suburb').value);
    
    this.clientAddress.clientId= formData.get("clientId");
    this.clientAddress.address.unitNumber= formData.get("unitNumber");
    this.clientAddress.address.complexName= formData.get("complexName");
    this.clientAddress.address.streetNumber= formData.get("streetNumber");
    this.clientAddress.address.streetName= formData.get("streetName");
    this.clientAddress.address.postalCode= formData.get("postalCode");
    this.clientAddress.address.city.id=formData.get("id");
    this.clientAddress.address.city.name=formData.get("name");
    this.clientAddress.address.city.suburb=formData.get("suburb");


    this.clientAddressService.addClientAddress(this.clientAddress).subscribe(
        (response: ClientAddress) => {
          console.log(response);
          this.formAdd.reset(); //remove if cause probs
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
    );

      formData.append('contactId', this.formAdd.get('contactId').value);
      formData.append('cell', this.formAdd.get('cell').value);
      formData.append('email', this.formAdd.get('email').value);
      formData.append('nextOfKin', this.formAdd.get('nextOfKin').value);

      this.contact.contactId = formData.get("contactId");
      this.contact.cell = formData.get("cell");
      this.contact.email = formData.get("email");
      this.contact.nextOfKin = formData.get("nextOfKin");


    this.contactService.addContact(this.contact).subscribe(
      (response: Contact) => {
        console.log(response);
        this.formAdd.reset(); //remove if cause probs
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
  );
    
    formData.append('clientContactId',this.formAdd.get('clientContactId').value);
    formData.append('contactId', this.formAdd.get('contactId').value);
  
    this.clientContact.clientContactId = formData.get("clientContactId");
    this.clientContact.contact.contactId = formData.get("contactId");
    this.clientContact.client.clientId = formData.get("clientId");

    this.clientContactService.addClientContact(this.clientContact).subscribe(
      (response: ClientContact) => {
        console.log(response);
        this.formAdd.reset(); 
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
  );
    }

  public getAllClients(): void{
    this.clientService.getAllClients().subscribe(
        (response: Client[]) => {
          this.clients = response;
          
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
    );
  }

  public getAllClientAddresses(): void{
    this.clientAddressService.getAllClientAddresses().subscribe(
        (response: ClientAddress[]) => {
          this.clientAddresses = response;
      
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
    );
  }

  public getAllClientContacts(){
    this.clientContactService.getAllClientContacts().subscribe(
      (response: ClientContact[]) => {
        this.clientContacts = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getAllContacts(){
    this.contactService.getAllContacts().subscribe(
      (response : Contact[]) => {
        this.contacts = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteClient(clientId: string): void {
    this.clientService.deleteClient(clientId).subscribe(
      (response: void) => {
        console.log(response);
        this.getAllClients();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

    this.clientAddressService.deleteClientAddress(clientId).subscribe(
      (response: void) => {
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );

    this.clientContactService.deleteClientContact(clientId).subscribe(
      (response: void) => {
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
    
    this.contactService.deleteContact(clientId).subscribe(
      (response: void) => {
        console.log(response)
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
  }

  public searchClientById(key: string): void{
    const output: Client[] = [];

    for(const client of this.clients){
      if(client.clientId.indexOf(key) !== -1){
        output.push(client);
      }
    }

    this.clients = output;
    if(output.length === 0 || !key){
      this.getAllClients();

    }
  }

  public onOpenModal(client: Client, clientAddress: ClientAddress, clientContact: ClientContact,contact: Contact,mode: string): void{
      console.log("whatever");
      const container = document.getElementById('main-container');
      const button = document.createElement('button');
      button.type = 'button';
      button.style.display = 'none';
      button.setAttribute('data-toggle','modal');

      this.getAllClients();
      this.getAllClientAddresses();

      if(mode === 'add'){
        button.setAttribute('data-target','#addClientModal');
      }

      setTimeout(() => {
      if(mode === 'edit'){
        this.editClient = client;
        this.editClientAddress = this.clientAddresses.find((obj) => obj.clientId === this.editClient.clientId); 
        button.setAttribute('data-target','#updateClientModal');
      }

      if(mode === 'delete'){
        this.deleteClient = client;
        this.deleteClientAddress = this.clientAddresses.find((obj) => obj.clientId === this.deleteClient.clientId); 
        this.deleteContact = contact;
        this.deleteClientContact = clientContact
        button.setAttribute('data-target','#deleteClientModal');
      }

      if(mode === 'view'){
        this.editClient = client;
        this.editClientAddress = this.clientAddresses.find((obj) => obj.clientId === this.editClient.clientId);
        this.editClientContact = clientContact;
        this.editContact = contact;
        button.setAttribute('data-target','#viewClientModal');
          
      }
      container.appendChild(button);
      button.click();
    },3000)
  }

  updateClientDetails(){
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


    this.clientService.updateClient(this.client).subscribe(
      (response: Client) => {
        console.log(response);
        this.getAllClients();
        this.form.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

    formData.append('unitNumber', this.form.get('unitNumber').value);
    formData.append('complexName', this.form.get('complexName').value);
    formData.append('streetNumber', this.form.get('streetNumber').value);
    formData.append('streetName', this.form.get('streetName').value);
    formData.append('postalCode', this.form.get('postalCode').value);
    formData.append('id',this.form.get('id').value);
    formData.append('name',this.form.get('name').value);
    formData.append('suburb',this.form.get('suburb').value);
    
    this.clientAddress.clientId= formData.get("clientId");
    this.clientAddress.address.unitNumber= formData.get("unitNumber");
    this.clientAddress.address.complexName= formData.get("complexName");
    this.clientAddress.address.streetNumber= formData.get("streetNumber");
    this.clientAddress.address.streetName= formData.get("streetName");
    this.clientAddress.address.postalCode= formData.get("postalCode");
    this.clientAddress.address.city.id=formData.get("id");
    this.clientAddress.address.city.name=formData.get("name");
    this.clientAddress.address.city.suburb=formData.get("suburb");


    this.clientAddressService.updateClientAddress(this.clientAddress).subscribe(
        (response: ClientAddress) => {
          console.log(response);
          this.form.reset();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
    );

    formData.append('contactId', this.form.get('contactId').value);
      formData.append('cell', this.form.get('cell').value);
      formData.append('email', this.form.get('email').value);
      formData.append('nextOfKin', this.form.get('nextOfKin').value);

      this.contact.contactId = formData.get("contactId");
      this.contact.cell = formData.get("cell");
      this.contact.email = formData.get("email");
      this.contact.nextOfKin = formData.get("nextOfKin");


    this.contactService.updateContact(this.contact).subscribe(
      (response: Contact) => {
        console.log(response);
        this.form.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
  );
    
    formData.append('clientContactId',this.form.get('clientContactId').value);
    formData.append('contactId', this.form.get('contactId').value);
  
    this.clientContact.clientContactId = formData.get("clientContactId");
    this.clientContact.contact.contactId = formData.get("contactId");
    this.clientContact.client.clientId = formData.get("clientId");

    this.clientContactService.updateClientContact(this.clientContact).subscribe(
      (response: ClientContact) => {
        console.log(response);
        this.form.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
  );
}
}



