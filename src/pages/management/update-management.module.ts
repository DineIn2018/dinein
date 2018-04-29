import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpdateManagementPage } from './update-management';

@NgModule({
  declarations: [
    UpdateManagementPage,
  ],
  imports: [
    IonicPageModule.forChild(UpdateManagementPage),
  ],
})
export class UpdateManagementPageModule {}
