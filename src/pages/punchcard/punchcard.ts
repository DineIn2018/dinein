import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EmployeeShift } from '../employees/employees';
import { DateTimeService } from '../util/date-time';

@Component({
  selector: 'page-punchcard',
  templateUrl: 'punchcard.html'
})
export class PunchCardPage {

  displayShiftList: EmployeeShift[];
  employees: Employee[];
  allShifts: EmployeeShift[];

  constructor(public navCtrl: NavController,
              private dateTime: DateTimeService) {

    this.displayShiftList = [
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

  filterShiftByEmployeeID(ID: number, shiftCount: number) {
    this.clearDisplayShiftList();
    let employee: Employee = this.getEmployeeByID(ID);
    var i, count;
    for(i = employee.shifts.length-1, count = 0;
        (i >=0) && (count <= shiftCount);
        i--, count++) {
      this.displayShiftList.push(employee.shifts[i]);
    }
  }

  filterShiftByLatest(shiftCount: number) {
    this.clearDisplayShiftList();
    var i, count;
    for(i = this.allShifts.length-1, count = 0;
        (i >= 0) && (count <= shiftCount);
        i--, count++) {
      this.displayShiftList.push(this.allShifts[i]);
    }
  }

  getEmployeeByID(ID: number) {
    var i: number;
    for (i = 0; i < this.employees.length; i++) {
      if (ID == this.employees[i].ID) {
        return this.employees[i];
      }
    }
    return null // SHOULD NOT BE REACHED
  }

  clearDisplayShiftList() {
    this.displayShiftList.length = 0;
  }

}
