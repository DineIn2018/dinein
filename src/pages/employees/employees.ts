import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { List } from 'ionic-angular';

@Component({
  selector: 'page-employees',
  templateUrl: 'employees.html'
})
export class EmployeesPage {

  listPage: any;
  employees: Array<Employee>;
  employee1: Employee;
  employee2 = new Employee("Carl", 4321,"Manager","$50/hr","(608) 345-1209", "http://www.math.uni-frankfurt.de/~person/_4170854.jpg");
  employee3: Employee;
  employee4: Employee;
  selectedEmployee: Employee;

  constructor(public navCtrl: NavController){
      this.employees = new Array<Employee>();
      
      this.employee1 = new Employee("Kevin", 1234,"Server","$5/hr","(608) 329-4565","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxhJ8HaQ88jGA0Ws2WTCnI4DzSgMzvEXk4qdbQVbCAiKyP9yGl");
      this.employee3 = new Employee("Tina", 5678,"Chef","$500/hr","(414) 921-4980", "https://cdn2.goabroad.com/images/program_content/5-tips-for-teaching-english-abroad-as-a-person-of-color-2-1462426680.jpg")
      this.employee4 = new Employee("Bryan", 666, "DJ", "$0.03/hr","1-800-436-3230", "../../assets/imgs/bryan.jpg")
      this.employees.push(this.employee1, this.employee2, this.employee3, this.employee4);
      this.employees.sort(this.sortByName);
      this.selectedEmployee = this.employees[0];
  }

  selectEmployee(myEvent, employee)
  {
    this.selectedEmployee = employee;
  }
  sortByName(a: Employee, b:Employee): number
  {
    return a.getName().localeCompare(b.getName());
  }
  
}

export class Employee {

  name: string;
  ID: number;
  imageSrc: string;
  title: string;
  pay: string;
  phone: string;

  constructor(name: string, ID: number, title: string, pay: string, phone: string, imageSrc: string)
  {
      this.name = name;
      this.ID = ID;
      this.imageSrc = imageSrc;
      this.title = title;
      this.pay = pay;
      this.phone = phone;
  }

  getName(): string
  {
      return this.name;
  }

  getSrc(): string
  {
    return this.imageSrc;
  }
  getID(): number
  {
    return this.ID;
  }
  getTitle(): string
  {
    return this.title;
  }
  getPhone(): string
  {
    return this.phone;
  }
  getPay(): string
  {
    return this.pay;
  }
}

