import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { AdminComponent } from './admin/admin.component';
import { StaffComponent } from './staff/staff.component';

const routes: Routes = [
  { path: 'customer', component: CustomerComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'staff', component: StaffComponent },
  { path: '', redirectTo: 'customer', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
