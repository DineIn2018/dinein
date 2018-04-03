class Table {

	static ID_runner: number = 1;

	ID: number;
	capacity: number;
	free: boolean;
	partySize: number;
	server: string;
	guestName: string;

	constructor(capacityIn: number) {
		this.ID = Table.ID_runner;
		Table.ID_runner += 1;
		this.capacity = capacityIn;
		this.free = true;
		this.partySize = 0;
		this.server = "N/A";
		this.guestName = "N/A";
	}

	getStatus(): string {
		if (this.free) {
			return "Free";
		} else {
			return "Occupied";
		}
	}

	getButtonText(): string {
		if (this.free) {
			return this.capacity.toString();
		} else {
			return this.partySize + '/' + this.capacity;
		}
	}

	freeTable() {
		this.free = true;
		this.partySize = 0;
		this.server = "N/A";
		this.guestName = "N/A";
	}

	seat(size: number, name: string) {
		this.free = false;
		this.partySize = size;
		this.server = "Manager";
		if (name != null) {
			this.guestName = name;
		} else {
			this.guestName = "N/A";
		}
	}
}

class Party {

	static ID_runner: number = 0;

	ID: number;
	name: string;
	size: number;
	time: string;
	contact: string;
	reservation: boolean;

	constructor(name: string, size: number, time: string,
							contact: string, reservation: boolean) {
		this.ID = Party.ID_runner;
		Party.ID_runner += 1;
		this.name = name;
		this.size = size;
		this.time = time;
		this.contact = contact;
		this.reservation = reservation;
	}

	getKind(): string {
		if (this.reservation) {
			return "Reservation";
		} else {
			return "Party";
		}
	}

	display(): string {
		return this.time + ' | ' + this.name + ' | ' + this.size;
	}
}

//
// TEST BENCH
//

tables: Table[] = [ new Table(4), new Table(4), new Table(6),
										new Table(2), new Table(8), new Table(2),
										new Table(2), new Table(4), new Table(6),
										new Table(8), new Table(4), new Table(6)];
parties: Party[] = [ new Party("Kass", 7, "4:20pm", "608 609 5186", true),
										 new Party("Casey", 4, "5:55pm", "608 608 6006", true),
										 new Party("Kameron", 2, "6:15pm", "506 506 5006", false),
										 new Party("Jimmie", 3, "8:01pm", "999 999 9999", false),
										 new Party("Suzy", 1000, "9:00pm", "012 345 6789", false),
										 new Party("Bryan", 1, "11:59pm", "666 666 6666", false)];

try {
	// Test for consecutive ID's when instantiating Tables and Parties
	var i: number;
	for (i = 1; i < tables.length; i++) {
		if(tables[i].ID != (tables[i-1].ID - 1)) {
			throw new Error('Table ID mismatch');
		}
	}
} catch(e) {
	console.log(e)
}


