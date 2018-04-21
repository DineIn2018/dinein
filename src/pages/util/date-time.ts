import { Injectable } from "@angular/core";

@Injectable()
export class DateTimeService {

	constructor() { }

	getTime(): string {
		let d = new Date();
		return this.pad(d.getUTCHours()) + ':' + this.pad(d.getUTCMinutes());
	}

	fullDateToTime(D): string {
		let d = new Date(D);
		return this.pad(d.getUTCHours()) + ':' + this.pad(d.getUTCMinutes());
	}

	getDateTime(): string {
		let d = new Date();
		let day = d.getUTCDate();
		let month = d.getUTCMonth() + 1;
		let year = d.getUTCFullYear();
		let hrs = d.getUTCHours();
		let min = d.getUTCMinutes();
		return (this.pad(month) + '/' + this.pad(day) + '/' + year + ' ' +
						this.pad(hrs) + ':' + this.pad(min));
	}

	getDiffQuarterHour(t1, t2): number {
		let d1 = new Date(t1);
		let d2 = new Date(t2);
		let diffHours: number = (d2.getTime() - d1.getTime()) / 3600000;
		return parseFloat((Math.round(diffHours * 4) / 4).toFixed(2));
	}

	sameDay(t1, t2): boolean {
		let d1 = new Date(t1);
		let d2 = new Date(t2);
		let day1 = d1.getUTCDate();
		let month1 = d1.getUTCMonth() + 1;
		let year1 = d1.getUTCFullYear();
		let day2 = d2.getUTCDate();
		let month2 = d2.getUTCMonth() + 1;
		let year2 = d2.getUTCFullYear();
		return (day1 == day2) && (month1 == month2) && (year1 == year2);
	}

	inBetween(t, tStart, tEnd): boolean {
		let d = new Date(t);
		let dStart = new Date(tStart);
		let dEnd = new Date(tEnd);
		let afterStart = (d.getTime() - dStart.getTime()) >= 0;
		let beforeEnd = (dEnd.getTime() - d.getTime()) >= 0;
		return afterStart && beforeEnd;
	}

	isBefore(t1, t2): boolean {
		let d1 = new Date(t1);
		let d2 = new Date(t2);
		return (d2.getTime() - d1.getTime()) >= 0;
	}

	pad(n) {
    return (n < 10)? ('0' + n) : n;
	}

	static compare(t1, t2) {
		let d1 = new Date(t1);
		let d2 = new Date(t2);
		let diff = (d2.getTime() - d1.getTime());

		if (diff < 0) {
			return -1;
		}
		if (diff > 0) {
			return 1;
		}
		return 0;
	}
}
/*
  getUTCTime() {
		var d = new Date();
		return this.parseTime(d.getUTCHours(), d.getUTCMinutes());
	}

	parseTime(hours: number, minutes: number) {
		return this.pad(hours) + ':' + this.pad(minutes);
	}

	getUTCDate() {
		var d = new Date();
		return this.parseDate(d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate());
	}

	parseDate(year: number, month: number, day: number) {
		return year + '-' + this.pad(month) + '-' + this.pad(day);
	}

	getUTCFullDateTime() {
		return this.getUTCDate() + 'T' + this.getUTCTime();
	}

	private pad(n) {
    return (n < 10)? ('0' + n) : n;
  }

  calculateElapsedTime(start: string, end: string): number {
  	var hourStart: number = parseInt(start.substring(0,2));
  	var hourEnd: number = parseInt(end.substring(0,2));
  	var minuteStart: number = parseInt(start.substring(3,5));
  	var minuteEnd: number = parseInt(end.substring(3,5));

  	var totMinutesStart: number = hourStart * 60 + minuteStart;
  	var totMinutesEnd: number = hourEnd * 60 + minuteEnd;

  	var minutesElapsed = totMinutesEnd - totMinutesStart;

  	return minutesElapsed / 60;
  }
  */