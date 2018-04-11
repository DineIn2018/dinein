import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import * as moment from 'moment';

@IonicPage()
@Component({
    selector: 'page-edit-event',
    templateUrl: 'edit-event.html',
})
export class EditEventPage {

    event = { startTime: new Date().toISOString(), endTime: new Date().toISOString(), allDay: false };
    minDate = new Date().toISOString(); //ISO string format: YYYY-MM-DDTHH:mm:ss.sssZ


    constructor(public navCtrl: NavController, private navParams: NavParams, public viewCtrl: ViewController, private alertCtrl: AlertController) {
        this.minDate = moment(this.minDate).format();
        let preselectedDate = moment(this.navParams.get('selectedDay')).format();
        this.event.startTime = preselectedDate;
        this.event.endTime = preselectedDate;
    }

    cancel() {
        this.viewCtrl.dismiss();
    }

    save() {
        this.viewCtrl.dismiss(this.event);
    }

    delete() {
        let alert = this.alertCtrl.create({
            title: 'Confirm Delete',
            message: 'Are you sure you want to delete the event?'
            buttons: [
                {
                    text: 'No',
                    role: 'cancel'
                },
                {
                    text: 'Yes',
                    handler: data => {
                    this.viewCtrl.dismiss(this.event);
                    }
                }
            ]

        })
    }

}
