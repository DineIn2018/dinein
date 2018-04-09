import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { ModalController, ViewController, AlertController } from 'ionic-angular';;
import { Party } from './tables';
import { DateTimeService } from '../util/date-time';

@IonicPage()
@Component({
  selector: 'page-add-party',
  templateUrl: 'add-party.html',
})
export class AddPartyPage {

  FIELD_SIZE = "Party Size";
  FIELD_CONTACT: string = "Contact Number";

  buttonTextSize: string;
  buttonTextContact: string;

  editMode: boolean;

  ID: number;
  name: string;
  size: number;
  contact: string;
  time: string;
  reservation: boolean;

  party: Party;
  parties: Party[];

  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              public viewCtrl: ViewController,
              public alertCtrl: AlertController,
              public navParams: NavParams,
              private datetime: DateTimeService) {

    this.editMode = navParams.get("edit");
    console.log("Entered in: " + (this.editMode? "Edit":"Add") + " Party mode");

    //
    // Editing party mode
    //
    if (this.editMode) {
      this.party = navParams.get("edit_party");

      // Sets the button text
      this.buttonTextSize = String(this.party.size);
      this.buttonTextContact = String(this.party.contact);

      // Set user inputs automatically to the values of party being edited
      this.ID = this.party.ID;
      this.name = this.party.name;
      this.size = this.party.size;
      this.contact = this.party.contact;
      this.reservation = this.party.reservation;
      this.time = this.party.time;

    //
    // Adding new party mode
    //
    } else {
      this.parties = navParams.get("parties");

      // Sets the button text to their default place holders
      this.buttonTextSize = "Size";
      this.buttonTextContact = "Contact Number";

      // All inputs initially empty
      this.ID = null;
      this.name = null;
      this.size = null;
      this.contact = null;
      this.reservation = false;
      this.time = null;
    }

  }

  submit() {
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

      if (this.editMode) {
        this.party.ID = this.ID;
        this.party.name = this.name;
        this.party.size = this.size;
        this.party.contact = this.contact;
        this.party.reservation = this.reservation;
        this.party.time = this.time;
        console.log("Saved edited Party ID: " + this.party.ID);

      // Adding Party Mode
      } else {
        var partyTime: string;

        if (this.reservation) {
          partyTime = this.time;
        } else {
          partyTime = this.datetime.getTime();
        }
        var party = new Party(this.name, this.size, partyTime,
                            this.contact, this.reservation);
        this.parties.push(party);
        this.parties.sort(Party.compare);
        console.log("Added Party ID: " + party.ID);
      }

      this.exit();
    }
  }

  exit() {
    console.log(this.time);
    console.log("Exiting Add/Edit Party Page...");
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
            (this.reservation != null) &&
            (!this.reservation || (this.time != null)))
  }

  pad(n) {
    return (n < 10)? ('0' + n) : n;
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
              public alertCtrl: AlertController,
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
      this.viewCtrl.dismiss(this.userInput);
    } else {
      let alert = this.alertCtrl.create({
        title: 'Invalid ' + this.field,
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
    this.navCtrl.pop();
  }
}