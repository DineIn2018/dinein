import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { UserObject } from '../../DBAssets/DBObjects';
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
    this.url = 'https://quiet-waters-97553.herokuapp.com/api/';
    this.urlParser = new URLParser();
  }

//USERObject methods
  addUser(newUser: UserObject){

    let newURL = this.urlParser.addUser(this.url, newUser);
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
    let newURL = this.urlParser.getAUser(this.url,userName);
    //let user = new UserObject();
    console.log("URLParser returned " + newURL);
    return new Promise(resolve => {
      this.http.get(newURL).map(res => res.json())
      .subscribe(data => {
        this.data = data.results;
        resolve(this.data);
      });
    });
  }

  authenticate(email: String, password: String){
    console.log("authenticating...")
    console.log("email = " + email + " and password = " + password);
    //Need to make sure that this works correctly
    let temp = new UserObject();
    this.getAUser(email).then(data => {
      temp = data;
    });
    console.log("got " + JSON.stringify(temp) + " from the API");
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
