import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-timepunch',
  templateUrl: 'timepunch.html',
})
export class TimePunchPage {

	currDateTime = new Date();

  constructor(public navCtrl: NavController) {
  }


}
