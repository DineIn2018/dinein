import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { List } from 'ionic-angular';
import { EditEmployeePage } from '../edit-employee/edit-employee';

@Component({
  selector: 'page-employees',
  templateUrl: 'employees.html'
})

export class EmployeesPage {
  searchQuery: string = '';
  items: Employee[];
  editPage: any;
  listPage: any;
  employees: Array<Employee>;
  employee1: Employee;
  employee2 = new Employee("Carl Robins", 4321, "Assistant Manager", "$30/hr", "(608) 345-1209", "http://www.math.uni-frankfurt.de/~person/_4170854.jpg");
  employee5 = new Employee("Marianne Beaumont", 9902, "Hostess", "$15/hr", "+33 8 92 70 12 39", "http://www.pearsonvue.com/pteprofessional/images/homepage.png");
  employee6 = new Employee("Anna Schmidt", 4231, "Manager", "$50/hr", "+49 30 2273 2152", "https://i.pinimg.com/736x/25/48/31/25483183a26a96adcc2b5a4002eda6ca--headshot-ideas-professional-photographer.jpg");
  employee7 = new Employee("Valerie Carter", 1, "Owner", "$1003/hr", "(202) 456-1111", "https://cdn10.phillymag.com/wp-content/uploads/2016/01/woman-biz.jpg");
  employee8 = new Employee("Phil Scott", 8156, "Bartender", "$10/hr", "(608) 310-4545", "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Robert_gold_bartender.jpg/220px-Robert_gold_bartender.jpg");
  employee3: Employee;
  employee4: Employee;
  selectedEmployee: Employee;

  constructor(public navCtrl: NavController) {
    this.editPage = EditEmployeePage;
    this.employees = new Array<Employee>();

    this.employee1 = new Employee("Kevin Anderson", 1234, "Server", "$5/hr", "(608) 329-4565", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxhJ8HaQ88jGA0Ws2WTCnI4DzSgMzvEXk4qdbQVbCAiKyP9yGl");
    this.employee3 = new Employee("Tina Russo", 5678, "Head Chef", "$500/hr", "(414) 921-4980", "https://cdn2.goabroad.com/images/program_content/5-tips-for-teaching-english-abroad-as-a-person-of-color-2-1462426680.jpg")
    this.employee4 = new Employee("Bryan Suzan", 666, "DJ", "$0.03/hr", "1-800-436-3230", "../../assets/imgs/bryan.jpg")
    this.employees.push(this.employee1, this.employee2, this.employee3, this.employee4, this.employee5, this.employee6, this.employee7, this.employee8);
    this.employees.sort(this.sortByName);
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
    this.navCtrl.push(this.editPage, {selectedEmployee : this.selectedEmployee });
  }
  selectEmployee(myEvent, employee) {
    this.selectedEmployee = employee;
  }
  sortByName(a: Employee, b: Employee): number {
    return a.getName().localeCompare(b.getName());
  }
  editEmployee() {

  }

}

export class Employee {

  name: string;
  ID: number;
  imageSrc: string;
  title: string;
  pay: string;
  phone: string;

  constructor(name: string, ID: number, title: string, pay: string, phone: string, imageSrc: string) {
    this.name = name;
    this.ID = ID;
    this.imageSrc = imageSrc;
    this.title = title;
    this.pay = pay;
    this.phone = phone;
  }

  getName(): string {
    return this.name;
  }
  setName(name: string) {
    this.name = name;
  }
  getSrc(): string {
    return this.imageSrc;
  }
  setSrc(src: string) {
    this.imageSrc = src;
  }
  getID(): number {
    return this.ID;
  }
  setID(id: number) {
    this.ID = id;
  }
  getTitle(): string {
    return this.title;
  }
  setTitle(title: string) {
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