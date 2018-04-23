import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DbHelperProvider } from '../../../providers/dbhelper/dbhelper';
import { UserObject } from '../../../DBAssets/DBObjects';
/**
 * Generated class for the CreateUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-user',
  templateUrl: 'create-user.html',
  providers: [DbHelperProvider],
})
export class CreateUserPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public DBHelper: DbHelperProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateUserPage');
  }

  goToLogin() {
  	this.navCtrl.pop();
  }

  addUser(){
    let newUser = new UserObject();
    newUser.email = "email";
    newUser.password = "pwd";
    newUser.firstName = "kc";
    newUser.lastName = "nitz";
    newUser.phoneNo = 123;
    newUser.restaurant = 'rest';
    this.DBHelper.addUser(newUser);
  }

  goToSelectRestaurant() {

  }

}
