import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { UserObject, RestaurantObject, EmployeeObject, TableObject, PartyObject, ShiftObject } from '../../DBAssets/DBObjects';
import { URLParser } from '../../DBAssets/URLParser';
/*
  Generated class for the DbHelperProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DbHelperProvider {

  url: string;
  urlParser: URLParser;

  constructor(public http: HttpClient) {
    console.log('Hello DbHelperProvider Provider');
    //this.url = 'http://localhost:8080/api';
    this.url = 'https://dineinapi.herokuapp.com/api'
    this.urlParser = new URLParser();
  }

//USERObject methods
  addUser(newUser: UserObject){

    let newURL = this.urlParser.addUser(this.url, newUser);
    console.log("URLparser returned " + newURL);
    this.http.post(newURL,{}).subscribe(
        (val) => {
            console.log("POST call successful value returned in body",
                        val);
        },
        response => {
            console.log("POST call in error", response);
        },
        () => {
            console.log("The POST observable is now completed.");
        });
  }


  authenticateLogin(userName: String, password: String){
    let newURL = this.urlParser.authenticateUser(this.url,userName,password);
    //let user = new UserObject();
    console.log("URLParser returned " + newURL);
    this.http.get(newURL).subscribe( res => console.log(JSON.stringify(res)));
    return true;
  }

  //RESTAURANT methods
  addRestaurant(newRest: RestaurantObject){
  let newURL = this.urlParser.addRestaurant(this.url, newRest);
  console.log("URLparser returned " + newURL);
  this.http.post(newURL,{}).subscribe(
      (val) => {
          console.log("POST call successful value returned in body",
                      val);
      },
      response => {
          console.log("POST call in error", response);
      },
      () => {
          console.log("The POST observable is now completed.");
      });
  }


  //EMPLOYEE methods
  addEmployee(newEmployee: EmployeeObject){
  let newURL = this.urlParser.addEmployee(this.url, newEmployee);
  console.log("URLparser returned " + newURL);
  this.http.post(newURL,{}).subscribe(
      (val) => {
          console.log("POST call successful value returned in body",
                      val);
      },
      response => {
          console.log("POST call in error", response);
      },
      () => {
          console.log("The POST observable is now completed.");
      });
  }

  //TABLE methods
  addTable(newTable: TableObject){
  let newURL = this.urlParser.addTable(this.url, newTable);
  console.log("URLparser returned " + newURL);
  this.http.post(newURL,{}).subscribe(
      (val) => {
          console.log("POST call successful value returned in body",
                      val);
      },
      response => {
          console.log("POST call in error", response);
      },
      () => {
          console.log("The POST observable is now completed.");
      });
  }

  //PARTY methods
  addParty(newParty: PartyObject){
  let newURL = this.urlParser.addParty(this.url, newParty);
  console.log("URLparser returned " + newURL);
  this.http.post(newURL,{}).subscribe(
      (val) => {
          console.log("POST call successful value returned in body",
                      val);
      },
      response => {
          console.log("POST call in error", response);
      },
      () => {
          console.log("The POST observable is now completed.");
      });
  }


  //PUNCh methods
  addShift(newShift: ShiftObject){
  let newURL = this.urlParser.addShift(this.url, newShift);
  console.log("URLparser returned " + newURL);
  this.http.post(newURL,{}).subscribe(
      (val) => {
          console.log("POST call successful value returned in body",
                      val);
      },
      response => {
          console.log("POST call in error", response);
      },
      () => {
          console.log("The POST observable is now completed.");
      });
  }
}
