export interface ClientBook {
    dateOrdered : string
    clients : Clients;
    books: Books
   
}

export interface Books {
   bookId: string
   
}

export interface Clients {
    clientId: string
    
 }