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
  managerName:string;
  management_info: any;
  constructor(public navCtrl: NavController) {
    this.management_info = {
      restaurantName: "Osteria Francescana",
      managerName: "Michael Fassbender",
      numEmployees: 8,
      capacity: 62
    };
    this.restaurantName = "Osteria Francescana";
    this.managerName = "Micheal Fassbender";
    this.numEmployees = 8;
    this.capacity = 62;
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
  setManangerName(managerName: string) {
      this.managerName = managerName;
  }
  setRestaurantName(restaurantName: string){
     this.restaurantName = restaurantName;
  }

}
