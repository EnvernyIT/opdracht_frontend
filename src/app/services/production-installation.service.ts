import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CustomProductionInstallationResponse } from "../interfaces/custom-production-installation-response";
import { catchError, never, Observable, tap, throwError } from "rxjs";
import { error } from "console";
import { ProductionInstallation } from "../interfaces/production-installation";

@Injectable({ providedIn: 'root' })
export class ProductionInstallationService {
    private readonly apiUrl = 'http://localhost:8080';

    constructor(private http: HttpClient) { }

    productionInstallations$ = <Observable<CustomProductionInstallationResponse>>
        this.http.get<CustomProductionInstallationResponse>(`${this.apiUrl}/productInstallations/list`)
            .pipe(
                tap(console.log),
                catchError(this.handleError)
            );

    getProductionInstallations$ = (id: number) => <Observable<CustomProductionInstallationResponse>>
        this.http.get<CustomProductionInstallationResponse>(`${this.apiUrl}/productInstallations/get/${id}`)
            .pipe(
                tap(console.log),
                catchError(this.handleError)
            );

    saveProductionInstallations$ = (productInstallation: ProductionInstallation) => <Observable<CustomProductionInstallationResponse>>
        this.http.post<CustomProductionInstallationResponse>(`${this.apiUrl}/productInstallations/save`, productInstallation)
            .pipe(
                tap(console.log),
                catchError(this.handleError)
            );

    deleteProductionInstallations$ = (id: number) => <Observable<CustomProductionInstallationResponse>>
        this.http.delete<CustomProductionInstallationResponse>(`${this.apiUrl}/productInstallations/delete/${id}`)
            .pipe(
                tap(console.log),
                catchError(this.handleError)
            );

    filter$ = (name: string, outputPower: number) => <Observable<CustomProductionInstallationResponse>>
        this.http.get<CustomProductionInstallationResponse>(`${this.apiUrl}/productInstallations/filter/name/${name}/outputPower/${outputPower}`)
            .pipe(
                tap(console.log),
                catchError(this.handleError)
            );

    getProductionInstallationsByOutputPower$ = (outputPower: number) => <Observable<CustomProductionInstallationResponse>>
    this.http.get<CustomProductionInstallationResponse>(`${this.apiUrl}/productInstallations/get/outputPower/${outputPower}`)
    .pipe(
        tap(console.log),
        catchError(this.handleError)
    ); 

    getProductionInstallationsByName$ = (name: string) => <Observable<CustomProductionInstallationResponse>>
    this.http.get<CustomProductionInstallationResponse>(`${this.apiUrl}/productInstallations/get/name/${name}`)
    .pipe(
        tap(console.log),
        catchError(this.handleError)
    );

    private handleError(error: HttpErrorResponse): Observable<never> {
        console.log(error);
        return throwError(`An error occured - Error code: ${error.status}`);
    }

}