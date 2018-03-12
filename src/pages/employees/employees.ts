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
  employee2 = new Employee("Carl", 4321, "http://www.math.uni-frankfurt.de/~person/_4170854.jpg");
  employee3: Employee;
  selectedEmployee: Employee;

  constructor(public navCtrl: NavController){
      this.employees = new Array<Employee>();
      
      this.employee1 = new Employee("Kevin", 1234,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxhJ8HaQ88jGA0Ws2WTCnI4DzSgMzvEXk4qdbQVbCAiKyP9yGl");
      this.employee3 = new Employee("Tina", 5678, "https://cdn2.goabroad.com/images/program_content/5-tips-for-teaching-english-abroad-as-a-person-of-color-2-1462426680.jpg")
      this.selectedEmployee = this.employee1;
      this.employees.push(this.employee1, this.employee2, this.employee3);
  }

  selectEmployee(myEvent, employee)
  {
    this.selectedEmployee = employee;
  }
  
}

export class Employee {

  name: string;
  ID: number;
  imageSrc: string;

  constructor(name: string, ID: number, imageSrc: string)
  {
      this.name = name;
      this.ID = ID;
      this.imageSrc = imageSrc;
  }

  getName(): string
  {
      return this.name;
  }

  getSrc(): string
  {
    return this.imageSrc;
  }

}

