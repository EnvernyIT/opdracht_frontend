import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap, catchError, throwError } from "rxjs";
import { ContactPerson } from "../interfaces/contact-person";
import { CustomContactPersonResponse } from "../interfaces/custom-contact-person-response";

@Injectable({ providedIn: 'root' })
export class ContactPersonService {
    private readonly apiUrl = 'http://localhost:8080';

    constructor(private http: HttpClient) { }

    contactPersons$ = <Observable<CustomContactPersonResponse>>
        this.http.get<CustomContactPersonResponse>(`${this.apiUrl}/contactPersons/list`)
            .pipe(
                tap(console.log),
                catchError(this.handleError)
            );

    getContactPersons$ = (id: number) => <Observable<CustomContactPersonResponse>>
        this.http.get<CustomContactPersonResponse>(`${this.apiUrl}/contactPersons/get/${id}`)
            .pipe(
                tap(console.log),
                catchError(this.handleError)
            );

    saveContactPersons$ = (contactPerson: ContactPerson) => <Observable<CustomContactPersonResponse>>
        this.http.post<CustomContactPersonResponse>(`${this.apiUrl}/contactPersons/save`, contactPerson)
            .pipe(
                tap(console.log),
                catchError(this.handleError)
            );

    deleteContactPersons$ = (id: number) => <Observable<CustomContactPersonResponse>>
        this.http.delete<CustomContactPersonResponse>(`${this.apiUrl}/contactPersons/delete/${id}`)
            .pipe(
                tap(console.log),
                catchError(this.handleError)
            );

    // filterContactPersons$ = (name: string, response: CustomContactPersonResponse) => <Observable<CustomContactPersonResponse>>

    private handleError(error: HttpErrorResponse): Observable<never> {
        console.log(error);
        return throwError(`An error occured - Error code: ${error.status}`);
    }

}