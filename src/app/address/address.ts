import { City } from "../city/city";

export interface Address{
    unitNumber: string;
    complexName: string;
    streetNumber: string;
    streetName: string;
    postalCode: number;

    city: City;

}
