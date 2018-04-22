import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController, ViewController, AlertController } from 'ionic-angular';
import { CreateUserPage } from './create-user';
import { Employee } from '../employees/employees';
import { InputNumpad } from '../util/numpad';

@IonicPage()
@Component({
  selector: 'page-create-restaurant',
  templateUrl: 'create-restaurant.html',
})
export class CreateRestaurantPage {

  restaurantName: string;
  addrLine1: string;
  addrLine2: string;
  addrLine3: string;
  phone: number;
  ownerFirstName: string;
  ownerLastName: string;

  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              public viewCtrl: ViewController,
              public alertCtrl: AlertController) {
    this.restaurantName = null;
    this.addrLine1 = null;
    this.addrLine2 = null;
    this.addrLine3 = null;
    this.phone = null;
    this.ownerFirstName = null;
    this.ownerLastName = null;
  }

  create() {
    //
    // Invalid Input data
    //
    if (!this.validData()) {
      let alert = this.alertCtrl.create({
        title: 'Some Information is Missing!',
        enableBackdropDismiss: false,
        buttons: [
          {
            text: 'Dismiss',
            handler: () => {
              console.log(this.restaurantName + this.addrLine1 + this.addrLine2 + this.addrLine3 + this.phone + this.ownerFirstName + this.ownerLastName);
            }
          }
        ]
      });
      alert.present();

    //
    // Valid Input Data
    //
    } else {
      let createdRestaurant: Restaurant = new Restaurant(
        this.restaurantName, this.addrLine1, this.addrLine2,
        this.phone, this.ownerFirstName, this.ownerLastName, this.addrLine3);
      this.navCtrl.popTo(CreateUserPage);
    }
  }

  exit() {
    this.navCtrl.pop();
  }

  presentNumpad(field: string) {
    let numpadModal = this.modalCtrl.create(
      InputNumpad, {
                    inputField: "Phone Number",
                    alertTitle: "Invalid Phone Number",
                    alertMsg: null,
                    validInputCondition: function(input) { return input > 0;}
                   }
    );
    numpadModal.onDidDismiss(returnedNum => {
      if (returnedNum != null) {
        this.phone = returnedNum;
      }
    });
    numpadModal.present();
  }

  validData() {
    return ((this.addrLine1 != null) &&
            (this.addrLine3 != null) &&
            (this.phone != null) &&
            (this.ownerFirstName != null) &&
            (this.ownerLastName != null));
  }

}

export class Restaurant {

  name: string;
  addrLine1: string;
  addrLine2: string;
  addrLine3: string;
  phoneNumber: number;
  ownerFirstname: string;
  ownerLastName: string;

  capacity: number;
  totalEmployees: number;

  employees: Employee[];

  constructor(name: string, addrLine1: string,
              addrLine3: string, phoneNumber: number,
              ownerFirstname: string, ownerLastName: string,
              addrLine2?: string) {
    this.name = name;
    this.addrLine1 = addrLine1;
    if (addrLine2) {
      this.addrLine2 = addrLine2;
    } else {
      this.addrLine2 = null;
    }
    this.addrLine3 = addrLine3;
    this.phoneNumber = phoneNumber;
    this.ownerFirstname = ownerFirstname;
    this.ownerLastName = ownerLastName;

    this.capacity = 0;
    this.totalEmployees = 0;
    this.employees = [];
  }
}