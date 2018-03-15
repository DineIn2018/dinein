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
  employees: Array<Employee>;
  employeePage: any;
  newTitle: string;
  newID: string;
  newPay: string;
  newPhone: string;
  newFirstName: string;
  newLastName: string;
  newSrc: string;


  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.employeePage = navParams.get('employeesPage');
    this.selectedEmployee = navParams.get('selectedEmployee');
    this.employees = navParams.get('employees');

    this.newTitle = this.selectedEmployee.getTitle();
    this.newID = this.selectedEmployee.getID();
    this.newPay = this.selectedEmployee.getPay();
    this.newFirstName = this.selectedEmployee.getFirstName();
    this.newLastName = this.selectedEmployee.getLastName();
    this.newPhone = this.selectedEmployee.getPhone();
    this.newSrc = this.selectedEmployee.getSrc();

    

  }

  confirmDelete() {
    let confirm = this.alertCtrl.create({
      title: 'Delete this employee profile and exit?',
      message: 'Warning: this action cannot be undone!',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            //do nothing
          }
        },
        {
          text: 'Delete and Exit',
          handler: () => {
            this.secondConfirmDelete();
          }
        }
      ]
    });
    confirm.present();
  }
  secondConfirmDelete() {
    let confirm = this.alertCtrl.create({
      title: 'Are you <em>really</em> sure you want to delete this employee profile and exit?',
      message: 'Warning: this action cannot be undone!',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            //do nothing
          }
        },
        {
          text: 'Delete and Exit',
          handler: () => {
            //TODO: delete profile from list of employees
            this.employees.splice(this.employees.indexOf(this.selectedEmployee),1);
            this.employeePage.refreshSelectedEmployee();
            this.navCtrl.pop();
          }
        }
      ]
    });
    confirm.present();
  }

  confirmExit() {
    let confirm = this.alertCtrl.create({
      title: 'Exit without saving?',
      message: 'Are you sure you want to exit without saving your changes?',
      enableBackdropDismiss: false,
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
    this.selectedEmployee.setFirstName(this.newFirstName);
    this.selectedEmployee.setLastName(this.newLastName);
    this.selectedEmployee.setTitle(this.newTitle);
    this.selectedEmployee.setPay(this.newPay);
    this.selectedEmployee.setPhone(this.newPhone);
    this.selectedEmployee.setSrc(this.newSrc);
    let employeesPage = new EmployeesPage(null, null);
    this.employees.sort(employeesPage.sortByLastName);
    this.navCtrl.pop();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad EditEmployeePage');
  }

}
