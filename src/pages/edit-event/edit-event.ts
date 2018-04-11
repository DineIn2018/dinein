import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import * as moment from 'moment';

@IonicPage()
@Component({
    selector: 'page-edit-event',
    templateUrl: 'edit-event.html',
})
export class EditEventPage {

    event = { startTime: new Date().toISOString(), endTime: new Date().toISOString(), allDay: false };
    minDate = new Date().toISOString(); //ISO string format: YYYY-MM-DDTHH:mm:ss.sssZ

    title: string;
    description: string;
    organizer: string;
    startTime: string;
    endTime: string;
    myEvent: any;

    constructor(public navCtrl: NavController, private navParams: NavParams, public viewCtrl: ViewController, private alertCtrl: AlertController) {
        this.minDate = moment(this.minDate).format();
        let preselectedDate = moment(this.navParams.get('selectedDay')).format();
        this.event.startTime = preselectedDate;
        this.event.endTime = preselectedDate;
        
        this.myEvent = navParams.get('event');
        this.title = this.myEvent.title;
        this.description = this.myEvent.description;
        this.organizer = this.myEvent.organizer;
        this.startTime = moment(this.myEvent.startTime.toISOString()).format();
        this.endTime = moment(this.myEvent.endTime.toISOString()).format();
        //console.log(this.startTime);
        //console.log(this.endTime);

    }

    cancel() {
        this.viewCtrl.dismiss();
    }

    save() {
        this.myEvent.title = this.title;
        this.myEvent.description = this.description;
        this.myEvent.organizer = this.organizer;
        this.myEvent.startTime = new Date(this.startTime);
        this.myEvent.endTime = new Date(this.endTime);

        this.viewCtrl.dismiss(this.event);
    }

    delete() {
        let alert = this.alertCtrl.create({
            title: 'Confirm Delete',
            message: 'Are you sure you want to delete the event?',
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

        });
        alert.present();
    }

}
