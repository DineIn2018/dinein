import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'page-timepunch',
  templateUrl: 'timepunch.html',
})
export class TimePunchPage {

	private currDateTime = new Date();
	private subscription;

  constructor(public navCtrl: NavController) {

  	var source = Observable.interval(1000); // 1 second subscription
  	this.subscription = source.subscribe((x) => this.currDateTime = new Date());
  	
  }

}
