import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditEmployeePage } from './edit-employee';

@NgModule({
  declarations: [
    EditEmployeePage,
  ],
  imports: [
    IonicPageModule.forChild(EditEmployeePage),
  ],
})
export class EditEmployeePageModule {}
