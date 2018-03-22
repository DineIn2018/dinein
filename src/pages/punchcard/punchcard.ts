import { Component } from '@angular/core';
import { NavController, DateTime } from 'ionic-angular';

@Component({
  selector: 'page-punchcard',
  templateUrl: 'punchcard.html'
})
export class PunchCardPage {

  employeeShiftsList: EmployeeShift[];

  constructor(public navCtrl: NavController) {
    this.employeeShiftsList = [
      new EmployeeShift("Kevin Anderson", "2018-02-12T07:24", "2018-02-12T19:24", 12.000),
      new EmployeeShift("Bryan Suzan", "2018-02-12T07:25", "2018-02-12T09:47", 2.367),
      new EmployeeShift("Marianne Beaumont", "2018-02-12T07:30", "2018-02-12T20:45", 13.250),
      new EmployeeShift("Carl Robins", "2018-02-12T07:29", "2018-02-12T12:00", 4.517),
      new EmployeeShift("Kevin Anderson", "2018-02-13T07:26", "2018-02-12T19:24", 11.967),
      new EmployeeShift("Bryan Suzan", "2018-02-14T07:26", "2018-02-12T09:48", 2.367),
      new EmployeeShift("Bryan Suzan", "2018-02-14T018:00", "2018-02-12T23:28", 5.467),
      new EmployeeShift("TinaRusso", "2018-02-16T07:24", "2018-02-12T09:46", 2.367)
    ]
  }

}

export class EmployeeShift {
  name: string;
  startTime: string; //DateTime is just a string
  endTime: string;
  totalTime: number;


  constructor(name: string, startTime: string, endTime: string, totalTime?: number) {
    this.name = name;
    this.startTime = startTime;
    this.endTime = endTime;
    if (totalTime != null) {
      this.totalTime = totalTime;
    } else {
      this.setTotalTime();
    }

  }
  getName(): string {
    return this.name;
  }
  getStartTime(): string {
    return this.startTime;
  }
  getEndTime(): string {
    return this.endTime;
  }
  getTotalTime(): number {
    return this.totalTime;
  }
  setTotalTime() {
    //TODO: write this function
    this.totalTime = 0;
  }

}
