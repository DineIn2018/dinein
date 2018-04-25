import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';

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
  providers: [ DbHelperProvider ]
})
export class CreateUserPage {

  email: string;
  password: string;
  pwdConfirm: string;
  firstName: string;
  lastName: string;
  phoneNo: number;
  restaurant: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
                  public alertCtrl: AlertController, public DBHelper: DbHelperProvider,
                      public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateUserPage');
  }

  goToLogin() {
  	this.navCtrl.pop();
  }

  validateNewUser(){
    //Helper method that should cross-check to make sure that the user can be
    //created
    //TODO: implement
    return true;
  }

  addUser(){
    let newUser = new UserObject();
    if(this.password === this.pwdConfirm){
      console.log("passwords match, creating user");
      newUser.email = this.email;
      newUser.password = this.password;
      newUser.firstName = this.firstName;
      newUser.lastName = this.lastName;
      newUser.phoneNo = this.phoneNo;
      newUser.restaurant = this.restaurant;
      if(this.validateNewUser(newUser)){
          this.DBHelper.addUser(newUser);
          let confirmToast = this.toastCtrl.create({
            message: 'New user created! Please login',
            duration: '3000',
            position: 'top'
          })
          confirmToast.present();
          this.navCtrl.pop();
      }else{
        let failedToast = this.toastCtrl.create({
          message: 'A user with this email already exists',
          duration: '5000'
        });
        failedToast.present();
      }
    }else{
      let alert = this.alertCtrl.create({
        title: "Password Error",
        subTitle: "Mismatch between password and password confirmation",
        buttons: ['OK']
      });
      alert.present();
      console.log("passwords don't match, user not created");
    }
  }

  goToSelectRestaurant() {

  }

}
