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

  }

  addUser(newUser: UserObject){
    const head = new HttpHeaders()
      .set("content-type", "application/json");
    let url = 'http://localhost:8080/api/user/addUser';
    let newURL = URLparser(url, newUser, "UserObject");
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




  testMethod(){
    this.http.get('http://localhost:8080/api/').pipe(
      map(res => res.json())).subscribe(response => {
        console.log("GET response: ", response);
      });
    console.log('getProducts() called')
  }

  postProduct(){
    this.http.post('/api/products',{ "name": "casey "});
  }
}
