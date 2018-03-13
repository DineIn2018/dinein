import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateEmployeePage } from './create-employee';

@NgModule({
  declarations: [
    CreateEmployeePage,
  ],
  imports: [
    IonicPageModule.forChild(CreateEmployeePage),
  ],
})
export class CreateEmployeePageModule {}
