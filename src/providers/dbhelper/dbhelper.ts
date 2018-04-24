import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { UserObject, anotherObject } from '../../DBAssets/DBObjects';
import { URLparser } from '../../DBAssets/URLParser';
/*
  Generated class for the DbHelperProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DbHelperProvider {
  
  constructor(public http: HttpClient) {
    console.log('Hello DbHelperProvider Provider');

    let url = 'https://quiet-waters-97553.herokuapp.com/api/';
  }

//USERObject methods
  addUser(newUser: UserObject){
    let newURL = URLparser.addUser(this.url, newUser);
    console.log("URLparser returned " + newURL);
    this.http.post(newURL).subscribe(
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

  getAUser(userName: String){
    //Need to rework how the parseURL works
    let newURL = URLParser.getAUser(this.url,userName);
    let user = new UserObject();
    console.log("URLParser returned " + newURL);
  }

  authenticate(userName: String, password: String){
    console.log("userName = " + userName + " and password = " + password);
    getAUser(userName);

  }



//test method written during setup
  testMethod(){
    this.http.get('http://localhost:8080/api/').pipe(
      map(res => res.json())).subscribe(response => {
        console.log("GET response: ", response);
      });
    console.log('getProducts() called')
  }

}
