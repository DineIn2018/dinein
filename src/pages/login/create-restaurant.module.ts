import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateRestaurantPage } from './create-restaurant';

@NgModule({
  declarations: [
    CreateRestaurantPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateRestaurantPage),
  ],
})
export class CreateRestaurantPageModule {}
