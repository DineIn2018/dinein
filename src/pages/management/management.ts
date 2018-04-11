import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UpdateManagementPage } from  '../update-management/update-management';
import { NUMBER_TYPE } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'page-management',
  templateUrl: 'management.html'
})
export class ManagementPage {
  updatePage: any;
  restaurantName: string;
  capacity: number;
  numEmployees: number;
  management_info: any;
  constructor(public navCtrl: NavController) {
    this.management_info = {
      restaurantName: "Osteria Francescana",
      numEmployees: 23,
      capacity: 100
    };
    this.restaurantName = "Osteria Francescana";
    this.numEmployees = 23;
    this.capacity = 100;
    this.updatePage = UpdateManagementPage;
  }

  executeLogout() {
  	this.navCtrl.parent.parent.pop(this);
  }

  openEditPage() {
    this.navCtrl.push(UpdateManagementPage, 
      {management_info: this.management_info, managementPage: this});
  }
  setCapacity(capacity: number){
     this.capacity = capacity;
  }
  setEmployeeNum(numEmployees: number){
     this.numEmployees = numEmployees;
  }
  setRestaurantName(restaurantName: string){
     this.restaurantName = restaurantName;
  }
  
}



