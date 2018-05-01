export class Restaurant {

	name: string;
	addrLine1: string;
	addrLine2: string;

	capacity: number;
	phoneNumber: number;
	totalEmployees: number;
	managerPin: number;
	tables: Table[];
	parties: Party[];

	employees: Employee[];

	constructor(name: string, phoneNumber: number, owner: Employee,
							addrLine1: string, addrLine2: string, managerPin: number) {
		this.name = name;
		this.addrLine1 = addrLine1;
		this.addrLine2 = addrLine2;
		this.phoneNumber = phoneNumber;

		this.tables = [];
		this.employees = [];
		this.parties = [];
		this.employees.push(owner);

		this.managerPin = managerPin;
	}

	getPhoneStr(): string {
		if (this.phoneNumber) {
			let phoneStr = this.phoneNumber.toString();
			if (phoneStr.length == 10) {
				return "("+phoneStr.slice(0,3)+") "+phoneStr.slice(3,6)+"-"+phoneStr.slice(6,10);
			}
		}
		return this.phoneNumber.toString();
	}

	getOwner(): Employee {
		var i;
		for (i = 0; i < this.employees.length; i++) {
			if (this.employees[i].ID == 1) {
				return this.employees[i];
			}
		}
	}
	getManager(): Employee {
		var i;
		for (i = 0; i < this.employees.length; i++) {
			if (this.employees[i].ID == 2) {
				return this.employees[i];
			}
		}
	}

	getNumEmployees(): number {
		return this.employees.length;
	}
	getNumTables(): number {
		return this.tables.length;
	}
	getCapacity(): number {
		if (this.tables.length == 0) {
			return 0;
		} else {
			var cap = 0;
			var i;
			for (i = 0; i < this.tables.length; i++) {
				cap += this.tables[i].capacity;
			}
			return cap;
		}
	}
}

export class Table {

	// TODO: change from static ID runner to getting current ID runner from DB
	static ID_runner: number = 1;

	ID: number;
	capacity: number;
	free: boolean;
	partySize: number;
	timeIn: string;
	server: string;
	guest: string;

	xPos: string;
	yPos: string;

	constructor(capacityIn: number, xPos?: string, yPos?: string) {
		this.ID = Table.ID_runner;
		Table.ID_runner += 1;
		this.capacity = capacityIn;
		this.free = true;
		this.partySize = 0;
		this.timeIn = "N/A";
		this.server = "N/A";
		this.guest = "N/A";

		if (xPos) {
			this.xPos = xPos;
		} else {
			this.xPos = "0";
		}
		if (yPos) {
			this.yPos = yPos;
		} else {
			this.yPos = "0";
		}
	}

	getStatus(): string {
		return this.free? "Free" : "Occupied";
	}

	getButtonText(): string {
		return this.free? String(this.capacity) : this.partySize + '/' + this.capacity
	}

	freeTable() {
		console.log('Table ' + this.ID + ' freed');
		this.free = true;
		this.partySize = 0;
		this.timeIn = "N/A";
		this.server = "N/A";
		this.guest = "N/A";
	}

	seat(size: number, server: string, timeIn: string, guest: string) {
		this.free = false;
		this.partySize = size;
		this.timeIn = timeIn;
		this.server = server;
		this.guest = (guest != null)? guest : "N/A";
		console.log('Seated ' + size + ' people at Table ' + this.ID);
	}


}

export class Party {

	static ID_runner: number = 1;

	ID: number;
	name: string;
	size: number;
	time: string;
	contact: number;
	reservation: boolean;

	constructor(name: string, size: number, time: string,
							contact: number, reservation: boolean) {
		this.ID = Party.ID_runner;
		Party.ID_runner += 1;
		this.name = name;
		this.size = size;
		this.time = time;
		this.contact = contact;
		this.reservation = reservation;
	}

	getKind(): string {
		return this.reservation? "Reservation" : "Party";
	}

	display(): string {
		return this.time + ' | ' + this.name + ' | ' + this.size;
	}

	 getContactStr(): string {
    if (this.contact) {
      let phoneStr = this.contact.toString();
      if (phoneStr.length == 10) {
        return "("+phoneStr.slice(0,3)+") "+phoneStr.slice(3,6)+"-"+phoneStr.slice(6,10);
      }
    }
    return this.contact.toString();
  }

	static compare(p1, p2) {
		if (p1.reservation && !p2.reservation)
			return -1;
		if (!p1.reservation && p2.reservation)
			return 1;
		else {
			var h1 = parseInt(p1.time.substring(0,2));
			var h2 = parseInt(p2.time.substring(0,2));
			if (h1 < h2)
				return -1;
			if (h1 > h2)
				return 1;

			var m1 = parseInt(p1.time.substring(3,5));
			var m2 = parseInt(p2.time.substring(3,5));
			if (m1 < m2)
				return -1;
			if (m1 > m2)
				return 1;
		}
		return 0;
	}
}

export class Employee {

	static ID_runner: number = 100;

	ID: number;
	firstName: string;
	lastName: string;
	imageSrc: string;
	title: string;
	pay: number;
	phone: number;

	shifts: EmployeeShift[];

	constructor(firstName: string, lastName: string, title: string, pay: number,
							phone: number, imageSrc?: string, ID?: number) {

		if (ID) {
			if (ID < 100) {
				this.ID = ID;
			} else {
				this.ID = Employee.ID_runner;
				Employee.ID_runner += 1;
			}
		} else {
			this.ID = Employee.ID_runner;
			Employee.ID_runner += 1;
		}

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

	getIDStr() {
		if (this.ID < 10) {
			return '000' + this.ID;
		}
		if (this.ID < 100) {
			return '00' + this.ID;
		}
		if (this.ID < 1000) {
			return '0' + this.ID;
		}
		return this.ID.toString();
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
		return parseFloat((Math.round(diffHours * 4) / 4).toFixed(2));
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