import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController, ViewController, AlertController } from 'ionic-angular';

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
  ownerFirstname: string;
  ownerLastName: string;

  buttonTextPhone: string;

  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              public viewCtrl: ViewController,
              public alertCtrl: AlertController) {
    this.restaurantName = null;
    this.addrLine1 = null;
    this.addrLine2 = null;
    this.addrLine3 = null;
    this.phone = null;
    this.ownerFirstname = null;
    this.ownerLastName = null;

    this.buttonTextPhone = "Restaurant's Phone Number";
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
            handler: () => { }
          }
        ]
      });
      alert.present();

    //
    // Valid Input Data
    //
    } else {
      this.exit();
    }
  }

  exit() {
    this.navCtrl.pop();
  }

  presentNumpad(field: string) {
    let modal = this.modalCtrl.create(Numpad);
    modal.onDidDismiss(data => {
      if (data != null) {
        this.phone = data;
        this.buttonTextPhone = String(this.phone);
      }

    });
    modal.present();
  }

  validData() {
    return ((this.addrLine1 != null) &&
            (this.addrLine3 != null) &&
            (this.phone != null) &&
            (this.ownerFirstname != null) &&
            (this.ownerLastName != null));
  }

}

//------------------------------------------------------------------------------
// Sub-View: NumPad
//------------------------------------------------------------------------------
@Component({
  selector: 'page-create-restaurant',
  template: `
    <div class="modalbase" id="numpadmodal">
        <ion-label class="header">Phone Number</ion-label>
        <ion-label class="subtitle">{{userInput}}</ion-label>
        <div style="height:300px;width:100%;margin-bottom:15px;">
          <table class="numpad">
            <tr>
              <td><button class="numkey" ion-button (click)="pressButton(1)">1</button></td>
              <td><button class="numkey" ion-button (click)="pressButton(2)">2</button></td>
              <td><button class="numkey" ion-button (click)="pressButton(3)">3</button></td>
            </tr>
            <tr>
              <td><button class="numkey" ion-button (click)="pressButton(4)">4</button></td>
              <td><button class="numkey" ion-button (click)="pressButton(5)">5</button></td>
              <td><button class="numkey" ion-button (click)="pressButton(6)">6</button></td>
            </tr>
            <tr>
              <td><button class="numkey" ion-button (click)="pressButton(7)">7</button></td>
              <td><button class="numkey" ion-button (click)="pressButton(8)">8</button></td>
              <td><button class="numkey" ion-button (click)="pressButton(9)">9</button></td>
            </tr>
            <tr>
              <td><button class="numkey" ion-button (click)="clearButton()">C</button></td>
              <td><button class="numkey" ion-button (click)="pressButton(0)">0</button></td>
              <td><button class="numkey" ion-button (click)="deleteButton()">del</button></td>
            </tr>
          </table>
        </div>
        <button class="modalbutton" ion-button block (click)="OK()">OK</button>
        <button class="modalbutton" ion-button block outline (click)="cancel()">Cancel</button>
    </div>
  `
})
export class Numpad {

  userInput: number;

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              public alertCtrl: AlertController,
              params: NavParams) {
    this.userInput = 0;
  }

  pressButton(n: number) {
    this.userInput = this.userInput * 10 + n;
  }

  deleteButton() {
    this.userInput = Math.floor(this.userInput / 10);
  }

  clearButton() {
    this.userInput = 0;
  }

  OK() {
    if (this.userInput > 0) {
      this.viewCtrl.dismiss(this.userInput);
    } else {
      let alert = this.alertCtrl.create({
        title: 'Invalid Phone Number',
        enableBackdropDismiss: false,
        buttons: [
          {
            text: 'Dismiss',
            handler: () => { }
          }
        ]
      });
      alert.present();
    }
  }

  cancel() {
    this.viewCtrl.dismiss(null);
  }
}