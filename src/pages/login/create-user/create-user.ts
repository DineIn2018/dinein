import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DBHelper } from "../../../database/DBHelper";
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
})
export class CreateUserPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public helper: DBHelper) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateUserPage');
  }

  goToLogin() {
  	this.navCtrl.pop();
  }

  createUser(){
    this.helper.addUser("cnitz@wisc.edu", "password", "Casey", "Nitz", 7513593, "Steenbocks" );
    this.navCtrl.pop();
  }
  goToSelectRestaurant() {

  }

}
