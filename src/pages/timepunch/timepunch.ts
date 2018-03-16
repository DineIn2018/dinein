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

	ID:number = 0;

  constructor(public navCtrl: NavController) {

  	var source = Observable.interval(1000); // 1 second subscription
  	this.subscription = source.subscribe((x) => this.currDateTime = new Date());
  	
  }

  pressButton(n: number) {
		this.ID = this.ID * 10 + n;
	}

	deleteButton() {
		this.ID = Math.floor(this.ID / 10);;
	}

	clearButton() {
		this.ID = 0;
	}

}
