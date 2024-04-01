import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ProductionInstallationsComponent } from './production-installations/production-installations.component';
import { CommonModule } from '@angular/common';
import { ContactpersonsComponent } from './contactpersons/contactpersons.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductionInstallationsComponent,
    ContactpersonsComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {path: '', component: DashboardComponent, pathMatch: 'full'},
      {path: 'ContactPersons', component: AppComponent},
      {path: 'Productioninstallations', component: ProductionInstallationsComponent}
    ])
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
