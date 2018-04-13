import { Injectable } from "@angular/core";

@Injectable()
export class DateTimeService {

	constructor() { }

	getTime(): string {
		let d = new Date();
		return pad(d.getHours()) + ':' + pad(d.getMinutes());
	}

	fullDateToTime(d): string {
		let D = new Date(d);
		return pad(d.getHours()) + ':' + pad(d.getMinutes());
	}

	getDateTime(): string {
		let d = new Date();
		let day = d.getDate();
		let month = d.getMonth() + 1;
		let year = d.getFullYear();
		let hrs = d.getHours();
		let min = d.getMinutes();
		return pad(month)+'/'+pad(day)+'/'+year+' '+pad(hrs)+':'+pad(min);
	}

	getDiffQuarterHour(t1, t2): number {
		let d1 = new Date(t1);
		let d2 = new Date(t2);
		let diffHours = (d2.getTime() - d1.getTime()) / 3600000;
		return (Math.round(diff_hrs * 4) / 4).toFixed(2);
	}

	pad (n) {
    return (n < 10)? ('0' + n) : n;
	}
}
/*
  getTime() {
		var d = new Date();
		return this.parseTime(d.getHours(), d.getMinutes());
	}

	parseTime(hours: number, minutes: number) {
		return this.pad(hours) + ':' + this.pad(minutes);
	}

	getDate() {
		var d = new Date();
		return this.parseDate(d.getFullYear(), d.getMonth() + 1, d.getDate());
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
  */