import { ContactPerson } from "./contact-person";

export interface ProductionInstallation {
    id: number;
    name: string;
    contactPerson: ContactPerson;
    outputPower: number;
}