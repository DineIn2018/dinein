import { Injectable } from "@angular/core";

@Injectable()
export class DateTimeService {

	constructor() {

  }

  getTime() {
		var d = new Date();
		return this.parseTime(d.getHours(), d.getMinutes());
	}

	parseTime(hours: number, minutes: number) {
		return this.pad(hours) + ':' + this.pad(minutes);
	}

	getDate() {
		var d = new Date();
		return this.parseDateTime(d.getFullYear(), d.getMonth() + 1, d.getDate());
	}

	parseDate(year: number, month: number, day: number) {
		return year + '-' + this.pad(month) + '-' + this.pad(day);
	}

	getFullDateTime() {
		return this.getDate() + 'T' + this.getTime();
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
}