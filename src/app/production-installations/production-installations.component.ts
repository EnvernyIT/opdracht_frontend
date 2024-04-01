import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, startWith } from 'rxjs';
import { AppState } from '../interfaces/app-state';
import { CustomProductionInstallationResponse } from '../interfaces/custom-production-installation-response';
import { DataState } from '../enum/data-state.enum';
import { ProductionInstallationService } from '../services/production-installation.service';
import { NgForm } from '@angular/forms';
import { ProductionInstallation } from '../interfaces/production-installation';
import { response } from 'express';

@Component({
  selector: 'app-production-installations',
  templateUrl: './production-installations.component.html',
  styleUrl: './production-installations.component.css'
})
export class ProductionInstallationsComponent implements OnInit {
  appState$: Observable<AppState<CustomProductionInstallationResponse>>;
  readonly DataState = DataState;
  private dataSubject = new BehaviorSubject<CustomProductionInstallationResponse>(null);
  private filterSubject = new BehaviorSubject<string>('');
  filterStatus$ = this.filterSubject.asObservable();
  private isLoading = new BehaviorSubject<Boolean>(false);
  isLoading$ = this.isLoading.asObservable();

  constructor(private productionInstallationService: ProductionInstallationService) { }

  ngOnInit(): void {
    this.appState$ = this.productionInstallationService.productionInstallations$
      .pipe(
        map(response => {
          this.dataSubject.next(response);
          return { dataState: DataState.LOADED_STATE, appData: { ...response, data: { productionInstallations: response.data.productionInstallations } } }
        }),
        startWith({ dataState: DataState.LOADING_STATE, appData: null }),
        catchError((error: string) => {
          return of({ dataState: DataState.ERROR_STATE, error: error })
        })
      )
  }

  saveProductionInstallation(serverForm: NgForm): void {
    this.isLoading.next(true);
    this.appState$ = this.productionInstallationService.saveProductionInstallations$(serverForm.value as ProductionInstallation)
      .pipe(
        map(response => {
          this.dataSubject.next(
            { ...response, data: { productionInstallations: [response.data.productionInstallation, ...this.dataSubject.value.data.productionInstallations] } }
          );
          document.getElementById('closeModal').click();
          this.isLoading.next(false);
          serverForm.resetForm({})
          return { dataState: DataState.LOADED_STATE, appData: this.dataSubject.value }
        }),
        startWith({ dataState: DataState.LOADED_STATE, appData: this.dataSubject.value }),
        catchError((error: string) => {
          this.isLoading.next(false);
          return of({ dataState: DataState.ERROR_STATE, error: error })
        })
      )
  }

  // name: string, outputPower: number
  filterProductionInstallations(): void {
    this.isLoading.next(true);
      this.appState$ = this.productionInstallationService.filter$(document.getElementById("A1").ariaValueNow, Number(document.getElementById("A2").ariaValueNow))
      .pipe(
        map(response => {
          return { dataState: DataState.LOADED_STATE, appData: this.dataSubject.value }
        }),
        startWith({ dataState: DataState.LOADED_STATE, appData: this.dataSubject.value }),
        catchError((error: string) => {
          this.isLoading.next(false);
          return of({ dataState: DataState.ERROR_STATE, error: error })
        })
      )
    }

  deleteProductionInstallation(productInstallation: ProductionInstallation): void {
    this.appState$ = this.productionInstallationService.deleteProductionInstallations$(productInstallation.id)
      .pipe(
        map(response => {
          this.dataSubject.next(
            { ...response, data: { productionInstallations: this.dataSubject.value.data.productionInstallations.filter(s => s.id !== productInstallation.id) } }
          );
          return { dataState: DataState.LOADED_STATE, appData: this.dataSubject.value }
        }),
        startWith({ dataState: DataState.LOADED_STATE, appData: this.dataSubject.value }),
        catchError((error: string) => {
          this.filterSubject.next('');
          return of({ dataState: DataState.ERROR_STATE, error: error })
        })
      )
  }

}
