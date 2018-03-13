import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EmployeesPage } from '../employees/employees';

/**
 * Generated class for the EditEmployeePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-employee',
  templateUrl: 'edit-employee.html',
})
export class EditEmployeePage {

  employeePage: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.employeePage = EmployeesPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditEmployeePage');
  }

}
