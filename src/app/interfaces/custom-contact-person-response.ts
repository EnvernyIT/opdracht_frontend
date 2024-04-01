import { ContactPerson } from "./contact-person";

export interface CustomContactPersonResponse {
    timeStamp: Date;
    statusCode: number;
    status: string;
    reason: string;
    message: string;
    developerMessage: string;
    data: {contactPersons?: ContactPerson[], contactPerson?: ContactPerson};
}