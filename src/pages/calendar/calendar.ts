import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import * as moment from 'moment';

@Component({
    selector: 'page-calendar',
    templateUrl: 'calendar.html'
})
export class CalendarPage {
    eventSource = [];
    viewTitle: string;
    selectedDay = new Date();

    calendar = {
        mode: 'month',
        currentDate: new Date()
    };

    constructor(public navCtrl: NavController, private modalCtrl: ModalController, private alertCtrl: AlertController) { }

    addEvent() {
        let modal = this.modalCtrl.create('EventModalPage', { selectedDay: this.selectedDay });
        modal.present();
        modal.onDidDismiss(data => {
            if (data) {
                let eventData = data;

                eventData.startTime = new Date(data.startTime);
                eventData.endTime = new Date(data.endTime);

                let events = this.eventSource;
                events.push(eventData);
                this.eventSource = [];
                setTimeout(() => {
                    this.eventSource = events;
                });
            }
        });
    }


    // not sure how to do this
    editEvent(event) {
        let modal = this.modalCtrl.create('EditEventPage', {event : event, events : this.eventSource});

        modal.present();

        modal.onDidDismiss(data => {
            if (data) {
                //delete the event passed back
                this.eventSource = this.eventSource.filter(e => e !== event);
            }
        })

    }

    goToToday() {
        this.calendar.currentDate = new Date();
    }

    onViewTitleChanged(title) {
        this.viewTitle = title;
    }

    onEventSelected(event) {
        let start = moment(event.startTime).format('LLLL');
        let end = moment(event.endTime).format('LLLL');

        let alert = this.alertCtrl.create({
            title: '' + event.title,
            subTitle: 'From: ' + start + '<br>To: ' + end + '<br>Organizer: ' + event.organizer,
            message: 'Description: ' + event.description,
            buttons: ['OK',
                {
                    text: 'Edit',
                    handler: () => {
                        this.editEvent(event);
                    },
                }
            ],
            cssClass: 'alertCSS'
        })
        alert.present();
    }

    onTimeSelected(ev) {
        this.selectedDay = ev.selectedTime;
    }
}
