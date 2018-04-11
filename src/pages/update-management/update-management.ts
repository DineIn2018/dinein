import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { ModalController, ViewController, AlertController } from 'ionic-angular';
import { ManagementPage} from '../management/management';

@IonicPage()
@Component({
  selector: 'page-update-management',
  templateUrl: 'update-management.html',
})

export class UpdateManagementPage {
  name: string;
  employeeNumber: number;
  capacity: number;
  managementPage: any;
  tempName:string;
  tempNum:number;
  info:any;
  tempCapacity: number;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    // this.managementPage = this.navParams.get('managementPage');
    this.info = this.navParams.get('management_info');
    this.managementPage = ManagementPage;
    this.tempCapacity = this.info.capacity;
    this.tempName =  this.info.restaurantName;
    this.tempNum = this.info.numEmployees;
   this.name = null; 
   this.employeeNumber = 0;
   this.capacity = 0;
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdateManagementPage');
  }
  saveNewInfo(){
    this.info.capacity = this.tempCapacity;
    this.info.restaurantName = this.tempName;
    this.info.numEmployees = this.tempNum;
    this.navCtrl.pop();
  }
  // confirmSubmit(){
  //    this.name = this.tempName;
  //    this.capacity = this.tempCapacity;
  //    this.employeeNumber = this.tempNum;
  //    this.navCtrl.pop();
  // }
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
}
