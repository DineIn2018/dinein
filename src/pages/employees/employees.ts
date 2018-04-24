import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController, ViewController, App } from 'ionic-angular';
import { List } from 'ionic-angular';
import { EditEmployeePage } from './edit-employee';

@Component({
	selector: 'page-employees',
	templateUrl: 'employees.html'
})

export class EmployeesPage {
	//searchQuery: string = '';

	items: Employee[];
	//editPage: any;
	//createEmployeePage: any;
	employees: Employee[];
	selectedEmployee: Employee;

	constructor(public navCtrl: NavController,
							public popCtrl: PopoverController) {
		//this.editPage = EditEmployeePage;
		//this.createEmployeePage = CreateEmployeePage;
		this.employees =
			[
				new Employee("Carl", "Robins", "Assistant Manager", 30, 6083456789, "http://www.math.uni-frankfurt.de/~person/_4170854.jpg"),
				new Employee("Marianne", "Beaumont", "Hostess", 15, 9119119911, "http://www.pearsonvue.com/pteprofessional/images/homepage.png"),
				new Employee("Anna", "Schmidt", "Manager", 50, 6086076006, "https://i.pinimg.com/736x/25/48/31/25483183a26a96adcc2b5a4002eda6ca--headshot-ideas-professional-photographer.jpg"),
				new Employee("Valerie", "Carter", "Owner", 1003, 2024561111, "https://cdn10.phillymag.com/wp-content/uploads/2016/01/woman-biz.jpg"),
				new Employee("Phil", "Scott", "Bartender", 10, 6083104545, "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Robert_gold_bartender.jpg/220px-Robert_gold_bartender.jpg"),
				new Employee("Kevin", "Anderson", "Server", 5, 6088067777, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxhJ8HaQ88jGA0Ws2WTCnI4DzSgMzvEXk4qdbQVbCAiKyP9yGl"),
				new Employee("Tina", "Russo", "Head Chef", 500, 4149217439, "https://cdn2.goabroad.com/images/program_content/5-tips-for-teaching-english-abroad-as-a-person-of-color-2-1462426680.jpg"),
				new Employee("Bryan", "Suzan", "DJ", 0.03, 6666666666, "../../assets/imgs/bryan.jpg")
			];

		this.employees.sort(Employee.sortByLastName);
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

	/*getItems(ev: any) {
		// Reset items back to all of the items
		this.initializeItems();

		// set val to the value of the searchbar
		let val = ev.target.value;

		//if the value is an empty string don't filter the items
		if (val && val.trim() != '') {
			this.items = this.items.filter((item) => {
				return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
			})
		}
  }*/

	onEditEmployeePress() {
		this.navCtrl.push(EditEmployeePage, { editMode: true,
																					employee: this.selectedEmployee,
																					employeesList: this.employees });
	}
	onCreateEmployeePress() {
		this.navCtrl.push(EditEmployeePage, { editMode: false,
																					employee: null,
																					employeesList: this.employees });
	}

	selectEmployee(myEvent, employee) {
		this.selectedEmployee = employee;
	}

}
//@IonicPage()
@Component({
	template: `
		<ion-item>
		<h3>{{selectedEmployee.name}}'s punches</h3>
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

	static ID_runner: number = 1;

	ID: number;
	firstName: string;
	lastName: string;
	imageSrc: string;
	title: string;
	pay: number;
	phone: number;

	shifts: EmployeeShift[];

	constructor(firstName: string, lastName: string, title: string, pay: number,
							phone: number, imageSrc?: string) {
		this.ID = Employee.ID_runner;
		Employee.ID_runner += 1;

		this.firstName = firstName;
		this.lastName = lastName;
		this.title = title;
		this.pay = pay;
		this.phone = phone;
		this.shifts = [];
		if (imageSrc) {
			this.imageSrc = imageSrc;
		} else {
			this.imageSrc = null;
		}
	}

	punchIn(timeIn: string) {

		// Instantiate shift object with only shift start time, no shift end time
		// Mark new shift as incompleted/in progress
		// Set employee status to "Currently working"
		// Add the shift object to the employee
		this.shifts.push(new EmployeeShift(timeIn, undefined, this.getFullName()));
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

	getFullName(): string {
		return this.firstName + " " + this.lastName;
	}

	getPhoneStr(): string {
		if (this.phone) {
			let phoneStr = this.phone.toString();
			if (phoneStr.length == 10) {
				return "("+phoneStr.slice(0,3)+") "+phoneStr.slice(3,6)+"-"+phoneStr.slice(6,10);
			}
		}
		return null;
	}

	static sortByLastName(a: Employee, b: Employee): number {
		return a.lastName.localeCompare(b.lastName);
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

	static compare(s1: EmployeeShift, s2: EmployeeShift) {
		let d1 = new Date(s1.startTime);
		let d2 = new Date(s2.startTime);
		let diff = (d1.getTime() - d2.getTime());

		if (diff < 0) {
			return -1;
		}
		if (diff > 0) {
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
