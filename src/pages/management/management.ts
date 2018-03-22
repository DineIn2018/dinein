import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-management',
  templateUrl: 'management.html'
})
export class ManagementPage {

  restaurantName: string;
  capacity: number;
  numEmployees: number;
  constructor(public navCtrl: NavController) {
    this.restaurantName = "Osteria Francescana";
    this.numEmployees = 23;
    this.capacity = 100;
  }

  executeLogout() {
  	this.navCtrl.parent.parent.pop(this);
  }
}
