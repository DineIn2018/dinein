import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { CreateRestaurantPage } from './create-restaurant';

/**
 * Generated class for the CreateUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-user',
  templateUrl: 'create-user.html',
})
export class CreateUserPage {

  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phone: number;
  restaurant: string;

  buttonTextPhone: string;
  buttonTextRestaurant: string;

  restaurantsList: string[] = ["Potbelly", "State St. Brats", "Hopcat", "Five Guys",
                               "Chipotle", "Nitty Gritty", "Dotty's", "Ians",
                               "Glaze", "QQs"];

  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              public viewCtrl: ViewController,
              public navParams: NavParams) {

    this.buttonTextPhone = "Phone Number (Optional)";
    this.buttonTextRestaurant = "Select Restaurant";

    this.email = null;
    this.password = null;
    this.confirmPassword = null;
    this.firstName = null;
    this.lastName = null;
    this.phone = null;
    this.restaurant = null;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateUserPage');
  }

  goToLogin() {
  	this.navCtrl.pop();
  }

  presentNumpad() {
    let modal = this.modalCtrl.create(PhoneNumpad);
    modal.onDidDismiss(data => {
      if (data != null) {
        this.phone = data;
        this.buttonTextPhone = String(this.phone);
      }

    });
    modal.present();
  }

  presentRestaurantSelector() {
    let modal = this.modalCtrl.create(SelectRestaurant, {restaurants: this.restaurantsList});
    modal.onDidDismiss(data => {
      if (data != null) {
        if (data == 0) {
          this.navCtrl.push(CreateRestaurantPage);
        } else {
          this.restaurant = data;
          this.buttonTextRestaurant = String(this.restaurant);
        }
      }
    });
    modal.present();
  }
}

//------------------------------------------------------------------------------
// Sub-View: NumPad
//------------------------------------------------------------------------------
@Component({
  selector: 'page-add-party',
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
export class PhoneNumpad {

  userInput: number;

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController) {
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
    }
  }

  cancel() {
    this.navCtrl.pop();
  }
}

//------------------------------------------------------------------------------
// Sub-View: SelectServer
//------------------------------------------------------------------------------
@Component({
  selector: 'page-create-user',
  template: `
    <div id="restaurantmodal">
      <ion-list id="modalcontent">
        <ion-label class="header">Select Restaurant</ion-label>
        <ion-content id="restaurantlist">
          <ion-list scroll="true">
            <button *ngFor="let restaurant of restaurants"
                    [ngClass]="{'selectedrestaurant': restaurant === selectedRestaurant,
                                'restaurant': restaurant !== selectedRestaurant}"
                    ion-button block outline
                    (click)="selectRestaurant(restaurant)">
              {{restaurant}}
            </button>
          </ion-list>
        </ion-content>
        <button class="modalbutton" ion-button block
                  (click)="OK()">OK</button>
        <button class="modalbutton" ion-button block outline
                  (click)="cancel()">Cancel</button>
        <button class="modalbutton" ion-button block outline
                  (click)="createNewRestaurant()">Create New Restaurant</button>
      </ion-list>
    </div>
  `
})
export class SelectRestaurant {

  restaurants: string[];
  selectedRestaurant: string;

  constructor(public viewCtrl: ViewController,
              private params: NavParams) {
    this.restaurants = params.get('restaurants');
    this.selectedRestaurant = this.restaurants[0];
  }

  selectRestaurant(r: string) {
    this.selectedRestaurant = r;
  }

  OK() {
    this.viewCtrl.dismiss(this.selectedRestaurant);
  }

  createNewRestaurant() {
    this.viewCtrl.dismiss(0);
  }

  cancel() {
    this.viewCtrl.dismiss(null);
  }

}
