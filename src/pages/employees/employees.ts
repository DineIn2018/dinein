import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController, ViewController, App } from 'ionic-angular';
import { List } from 'ionic-angular';
import { EditEmployeePage } from '../edit-employee/edit-employee';
import { CreateEmployeePage } from '../create-employee/create-employee';

@Component({
  selector: 'page-employees',
  templateUrl: 'employees.html'
})

export class EmployeesPage {
  searchQuery: string = '';
  items: Employee[];
  //editPage: any;
  //createEmployeePage: any;
  employees: Array<Employee>;
  employee1: Employee;
  employee2 = new Employee("Carl", "Robins", "4321", "Assistant Manager", "$30/hr", "(608) 345-1209", "http://www.math.uni-frankfurt.de/~person/_4170854.jpg");
  employee5 = new Employee("Marianne", "Beaumont", "9902", "Hostess", "$15/hr", "+33 8 92 70 12 39", "http://www.pearsonvue.com/pteprofessional/images/homepage.png");
  employee6 = new Employee("Anna", "Schmidt", "4231", "Manager", "$50/hr", "+49 30 2273 2152", "https://i.pinimg.com/736x/25/48/31/25483183a26a96adcc2b5a4002eda6ca--headshot-ideas-professional-photographer.jpg");
  employee7 = new Employee("Valerie", "Carter", "1", "Owner", "$1003/hr", "(202) 456-1111", "https://cdn10.phillymag.com/wp-content/uploads/2016/01/woman-biz.jpg");
  employee8 = new Employee("Phil", "Scott", "8156", "Bartender", "$10/hr", "(608) 310-4545", "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Robert_gold_bartender.jpg/220px-Robert_gold_bartender.jpg");
  employee3: Employee;
  employee4: Employee;
  selectedEmployee: Employee;

  constructor(public navCtrl: NavController,
              public popCtrl: PopoverController) {
    //this.editPage = EditEmployeePage;
    //this.createEmployeePage = CreateEmployeePage;
    this.employees = new Array<Employee>();

    this.employee1 = new Employee("Kevin", "Anderson", "1234", "Server", "$5/hr", "(608) 329-4565", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxhJ8HaQ88jGA0Ws2WTCnI4DzSgMzvEXk4qdbQVbCAiKyP9yGl");
    this.employee3 = new Employee("Tina", "Russo", "5678", "Head Chef", "$500/hr", "(414) 921-4980", "https://cdn2.goabroad.com/images/program_content/5-tips-for-teaching-english-abroad-as-a-person-of-color-2-1462426680.jpg")
    this.employee4 = new Employee("Bryan", "Suzan", "666", "DJ", "$0.03/hr", "1-866-436-5706", "../../assets/imgs/bryan.jpg")
    this.employees.push(this.employee1, this.employee2, this.employee3, this.employee4, this.employee5, this.employee6, this.employee7, this.employee8);
    this.employees.sort(this.sortByLastName);
    this.selectedEmployee = this.employees[0];
  }

  presentPunchPopover(anEvent) {
    let popover = this.popCtrl.create(PunchPopoverPage,{selectedEmployee: this.selectedEmployee});

    popover.present({
      ev: anEvent
    });
  }

  refreshSelectedEmployee() {
    this.selectedEmployee = this.employees[0];
    this.initializeItems();
  }
  initializeItems() {
    this.items = [
      this.selectedEmployee
    ];
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    //if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.getName().toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
  openEditPage() {
    this.navCtrl.push(EditEmployeePage, { selectedEmployee: this.selectedEmployee, employees: this.employees, employeesPage: this });
  }
  openCreatePage() {
    this.navCtrl.push(CreateEmployeePage, { employees: this.employees });
  }
  selectEmployee(myEvent, employee) {
    this.selectedEmployee = employee;
  }
  /*sortByName(a: Employee, b: Employee): number {
    return a.getName().localeCompare(b.getName());
  }*/
  sortByLastName(a: Employee, b: Employee): number {
    return a.getLastName().localeCompare(b.getLastName());
  }

}
//@IonicPage()
@Component({
  template: `
    <ion-item>
    <h3>{{selectedEmployee.getName()}}'s punches</h3>
    </ion-item>
    <ion-item>
      <ion-label>From:</ion-label>
      <ion-datetime displayFormat="YYYY-MMM-DD" pickerFormat="DD-MMMM-YYYY" max="{{currentDate}}" [(ngModel)]="startDate"></ion-datetime>
    </ion-item>
    <ion-item>
      <ion-label>To:</ion-label>
      <ion-datetime displayFormat="YYYY-MMM-DD" pickerFormat="DD-MMMM-YYYY" min="{{startDate}}" max="{{currentDate}}" [(ngModel)]="endDate"></ion-datetime>
    </ion-item>
    <button ion-item (click)="close()">VIEW</button>
  `
})
export class PunchPopoverPage {

  startDate: string;
  currentDate: string;
  endDate: string;
  dd: any;
  mm: any;
  selectedEmployee: Employee;

  constructor(public viewCtrl: ViewController,
              public popCtl: PopoverController,
              public appCtrl: App,
              private navParams: NavParams) {

    this.selectedEmployee = this.navParams.get("selectedEmployee");
    let currDate = new Date(); //initialized to current date
    this.dd = currDate.getDate();
    this.mm = currDate.getMonth() + 1; //January is 0
    let yyyy = currDate.getFullYear();
    if (this.dd < 10) {
      this.dd = '0' + this.dd;
    }
    if (this.mm < 10) {
      this.mm = '0' + this.mm;
    }
    this.startDate = yyyy + "-" + this.mm + "-" + this.dd;
    this.endDate = this.startDate;
    this.currentDate = this.startDate;
  }


  close() {
    this.viewCtrl.dismiss();
  }
}

export class Employee {

  name: string;
  firstName: string;
  lastName: string;
  ID: string;
  imageSrc: string;
  title: string;
  pay: string;
  phone: string;

  shifts: EmployeeShift[];

  constructor(firstName: string, lastName: string, ID: number,
              title: string, pay: number, phone: number, imageSrc?: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.ID = ID;
    this.imageSrc = imageSrc;
    this.title = title;
    this.pay = pay;
    this.phone = phone;
    this.shifts = [ ];
  }

  punchIn(timeIn: string) {

    // Instantiate shift object with only shift start time, no shift end time
    // Mark new shift as incompleted/in progress
    // Set employee status to "Currently working"
    // Add the shift object to the employee
    this.shifts.push(new EmployeeShift(timeIn));
    console.log('Successfully punched in for employee: ' + this.ID);
  }

  punchOut(timeOut: string) {

    // Add shift end time to the latest shift object
    // Mark shift as completed
    // Set employee to not be currently working
    this.shifts[this.shifts.length-1].endShift(timeOut);
    console.log('Successfully punched outfor employee: ' + this.ID);
  }


  isCurrentlyWorking(): boolean {
    //
    // Special case when employee newly instantiated and has empty shifts
    // array, accessing the last element will make the app pissed
    // In this case, just return false because a newly instantiated employee
    // hasn't started a shift yet
    //
    if (this.shifts.length < 1) {
      return false;
    }
    let mostRecentShift = this.shifts[this.shifts.length-1];
    return !mostRecentShift.hasEnded();
  }

  getName(): string {
    return this.firstName+" "+this.lastName;
  }
  /*setName(name: string) {
    this.name = name;
  }*/
  getFirstName(): string {
    return this.firstName;
  }
  setFirstName(firstName: string) {
    this.firstName = firstName;
  }
  getLastName(): string {
    return this.lastName;
  }
  setLastName(lastName: string) {
    this.lastName = lastName;
  }
  getSrc(): string {
    return this.imageSrc;
  }
  setSrc(src: string) {
    this.imageSrc = src;
  }
  getID(): string {
    return this.ID;
  }
  setID(id: string) {
    this.ID = id;
  }
  getTitle(): string {
    return this.title;
  }
  settitle(title: string) {
    this.title = title;
  }
  getPhone(): string {
    return this.phone;
  }
  setPhone(phone: string) {
    this.phone = phone;
  }
  getPay(): string {
    return this.pay;
  }
  setPay(pay: string) {
    this.pay = pay;
  }
}

export class EmployeeShift {

  name: string;
  startTime: string; //DateTime is just a string
  endTime: string;
  shiftLength: number;


  constructor(startTime: string, endTime?: string, name?: string) {
    this.startTime = startTime;

    if(name) {
      this.name = name;
    }

    if (endTime) {
      this.endTime = endTime;
      this.shiftLength = this.getDiffQuarterHour(this.startTime, this.endTime);
    } else {
      this.endTime = null;
      this.shiftLength = null;
    }

  }

  endShift(endTime: string) {
    this.endTime = endTime;
    this.shiftLength = this.getDiffQuarterHour(this.startTime, this.endTime);
  }

  hasEnded() {
    return this.endTime != null;
  }

  getDiffQuarterHour(t1, t2): number {
    let d1 = new Date(t1);
    let d2 = new Date(t2);
    let diffHours = (d2.getTime() - d1.getTime()) / 3600000;
    return (Math.round(diffHours * 4) / 4).toFixed(2);
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
  getshiftLength(): number {
    return this.shiftLength;
  }

  static compare(s1: EmployeeShift, s2: EmployeeShift) {
    let t1 = new Date(s1.startTime);
    let t2 = new Date(s2.startTime);
    let diff = t2.getTime() - t1.getTime();
    if (diff < 0) {
      return -1;
    } else if (diff > 0) {
      return 1;
    }
    return 0;
  }

}

export enum title {
  Owner = 0,
  Manager = 1,
  Host = 2,
  Server = 3,
  Bartender = 4,
  Chef = 5,
  Cook = 6,
  DJ = 69
}