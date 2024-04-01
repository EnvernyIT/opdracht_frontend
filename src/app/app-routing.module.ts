import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ProductionInstallationsComponent } from './production-installations/production-installations.component';
import { ContactpersonsComponent } from './contactpersons/contactpersons.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path: '', component: DashboardComponent, pathMatch: 'full'},
  {path: 'ContactPersons', component: ContactpersonsComponent},
  {path: 'Productioninstallations', component: ProductionInstallationsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
