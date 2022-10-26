import { Client } from "../client/client";
import { Contact } from "../contact/contact";

export interface ClientContact{
    clientContactId: string;

    contact: Contact;
    client: Client;
}