import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, BehaviorSubject, map, startWith, catchError, of } from 'rxjs';
import { DataState } from '../enum/data-state.enum';
import { AppState } from '../interfaces/app-state';
import { ContactPerson } from '../interfaces/contact-person';
import { CustomContactPersonResponse } from '../interfaces/custom-contact-person-response';
import { ContactPersonService } from '../services/contact-person.service';

@Component({
  selector: 'app-contactpersons',
  templateUrl: './contactpersons.component.html',
  styleUrl: './contactpersons.component.css'
})
export class ContactpersonsComponent implements OnInit {
  appState$: Observable<AppState<CustomContactPersonResponse>>;
  readonly DataState = DataState;
  private dataSubject = new BehaviorSubject<CustomContactPersonResponse>(null);
  private filterSubject = new BehaviorSubject<string>('');
  filterStatus$ = this.filterSubject.asObservable();
  private isLoading = new BehaviorSubject<Boolean>(false);
  isLoading$ = this.isLoading.asObservable();

  constructor(private contactPersonService: ContactPersonService) { }

  ngOnInit(): void {
    this.appState$ = this.contactPersonService.contactPersons$
      .pipe(
        map(response => {
          this.dataSubject.next(response);
          return { dataState: DataState.LOADED_STATE, appData: { ...response, data: { contactPersons: response.data.contactPersons.reverse() } } }
        }),
        startWith({ dataState: DataState.LOADING_STATE, appData: null }),
        catchError((error: string) => {
          return of({ dataState: DataState.ERROR_STATE, error: error })
        })
      )
  }

  saveContactPerson(serverForm: NgForm): void {
    this.isLoading.next(true);
    this.appState$ = this.contactPersonService.saveContactPersons$(serverForm.value as ContactPerson)
      .pipe(
        map(response => {
          this.dataSubject.next(
            { ...response, data: { contactPersons: [response.data.contactPerson, ...this.dataSubject.value.data.contactPersons] } }
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

  deleteContactPerson(contactPerson: ContactPerson): void {
    this.appState$ = this.contactPersonService.deleteContactPersons$(contactPerson.id)
      .pipe(
        map(response => {
          this.dataSubject.next(
            { ...response, data: { contactPersons: this.dataSubject.value.data.contactPersons.filter(s => s.id !== contactPerson.id) } }
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
  // filterContactPersons(name: string) {
  //   this.appState$ = this.contatPersonService.
  // }

}
