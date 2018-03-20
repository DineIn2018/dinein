import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { ModalController, ViewController } from 'ionic-angular';;
import { Party } from '../tables';

@IonicPage()
@Component({
  selector: 'page-add-party',
  templateUrl: 'add-party.html',
})
export class AddPartyPage {

  FIELD_SIZE: string;
  FIELD_CONTACT: string;
  buttonTextSize: string;
  buttonTextContact: string;

  ID: number;
  name: string;
  size: number;
  contact: string;
  time: string;
  reservation: boolean;

  parties: Party[];

  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              public viewCtrl: ViewController,
              public navParams: NavParams) {
    this.parties = navParams.get("parties");
    this.FIELD_SIZE = "Party Size";
    this.FIELD_CONTACT = "Contact Number";
    this.buttonTextSize = "Size";
    this.buttonTextContact = "Contact Number";
    this.name = null;
    this.size = null;
    this.contact = null;
    this.reservation = false;
    this.time = null;
  }

  submit() {
    this.ID = 7;
    var partyTime: string;

    if (this.reservation) {
      partyTime = this.time;
    } else {
      var d = new Date();
      var curr_hour = d.getHours();
      var curr_min = d.getMinutes();
      var a_p: string;
      if (curr_hour < 12) {
        a_p = "AM";
      } else {
        a_p = "PM";
      }
      if (curr_hour == 0) {
        curr_hour = 12;
      }
      if (curr_hour > 12) {
        curr_hour = curr_hour - 12;
      }
      partyTime = (curr_hour + ":" + curr_min + " " + a_p);
    }

    console.log(this.name + " " + this.size + " " + this.contact + " " + this.reservation);
    if (this.validData()) {
      var party = new Party(this.ID, this.name, this.size, partyTime,
                          this.contact, this.reservation);
      this.parties.push(party);
      console.log("PUSHED PARTY");
    }
    console.log("about to pop add party page");
    this.navCtrl.pop();
  }

  presentNumpad(field: string) {
    let modal = this.modalCtrl.create(Numpad, {field: field});
    modal.onDidDismiss(data => {
      if (data != null) {
        if (field == this.FIELD_SIZE) {
          this.size = data;
          this.buttonTextSize = String(this.size);
        } else if (field == this.FIELD_CONTACT) {
          this.contact = String(data);
          this.buttonTextContact = String(this.contact);
        }  
      }
      
    });
    modal.present();
  }

  validData() {
    return ((this.name != null) &&
            (this.size != null) &&
            (this.contact != null) &&
            (this.reservation != null));
  }
  cancel() {
    this.navCtrl.pop();
  }
}

//------------------------------------------------------------------------------
// Sub-View: NumPad
//------------------------------------------------------------------------------
@Component({
  selector: 'page-add-party',
  template: `
    <div class="modalbase" id="numpadmodal">
        <ion-label class="header">{{field}}</ion-label>
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

  field: string;
  userInput: number;

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              params: NavParams) {
    this.field = params.get('field');
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
      //let data = {'userInput': this.userInput};
      this.viewCtrl.dismiss(this.userInput);
    } else {
      this.viewCtrl.dismiss(null);
    }
  }

  cancel() {
    this.navCtrl.pop();
  }
}