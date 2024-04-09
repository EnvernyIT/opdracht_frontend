import { ContactPerson } from "./contact-person";

export interface ProductionInstallationSave {
    id: number;
    name: string;
    contactPersonId: number;
    outputPower: number;
}