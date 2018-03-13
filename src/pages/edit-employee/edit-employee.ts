import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { EmployeesPage, Employee } from '../employees/employees';

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

  selectedEmployee: Employee;
  employeePage: any;
  newTitle: string;
  newID: number;
  newPay: string;
  newPhone: string;
  newName: string;
  newSrc: string;


  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.employeePage = EmployeesPage;
    this.selectedEmployee = navParams.get('selectedEmployee');

    this.newTitle = this.selectedEmployee.getTitle();
    this.newID = this.selectedEmployee.getID();
    this.newPay = this.selectedEmployee.getPay();
    this.newName = this.selectedEmployee.getName();
    this.newPhone = this.selectedEmployee.getPhone();
    this.newSrc = this.selectedEmployee.getSrc();

    

  }

  confirmExit() {
    let confirm = this.alertCtrl.create({
      title: 'Exit without saving?',
      message: 'Are you sure you want to exit without saving your changes?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            //do nothing
          }
        },
        {
          text: 'Exit',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    confirm.present();
  }

  saveNewValues() {
    this.selectedEmployee.setID(this.newID);
    this.selectedEmployee.setName(this.newName);
    this.selectedEmployee.setTitle(this.newTitle);
    this.selectedEmployee.setPay(this.newPay);
    this.selectedEmployee.setPhone(this.newPhone);
    this.selectedEmployee.setSrc(this.newSrc);
    this.navCtrl.pop();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad EditEmployeePage');
  }

}
