import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { EmployeesPage, Employee } from '../employees/employees';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the EditEmployeePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-employee',
  templateUrl: 'edit-employee.html',
})
export class EditEmployeePage {

  selectedEmployee: Employee;
  employees: Array<Employee>;
  employeePage: any;
  newTitle: string;
  newID: string;
  newPay: string;
  newPhone: string;
  newFirstName: string;
  newLastName: string;
  newSrc: string;

  imageURI: any;
  imageFileName: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private transfer: FileTransfer,
    private camera: Camera,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController) {

    this.employeePage = navParams.get('employeesPage');
    this.selectedEmployee = navParams.get('selectedEmployee');
    this.employees = navParams.get('employees');

    this.newTitle = this.selectedEmployee.getTitle();
    this.newID = this.selectedEmployee.getID();
    this.newPay = this.selectedEmployee.getPay();
    this.newFirstName = this.selectedEmployee.getFirstName();
    this.newLastName = this.selectedEmployee.getLastName();
    this.newPhone = this.selectedEmployee.getPhone();
    this.newSrc = this.selectedEmployee.getSrc();



  }


  setEmployeePhoto() {
    this.newSrc = this.imageURI
  }

  ///////////////////////////////////////////////////////////////////////////////
  getImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options).then((imageData) => {
      this.imageURI = imageData;
    }, (err) => {
      console.log(err);
      this.showAlert(err);
    });
  }

  uploadFile() {
    let loader = this.loadingCtrl.create({
      content: "Uploading..."
    });
    loader.present();
    const fileTransfer: FileTransferObject = this.transfer.create();

    
    let options: FileUploadOptions = {
      fileKey: 'photo',
      fileName: "employeePhoto_"+this.newID+".jpg",
      chunkedMode: false,
      httpMethod: 'post',
      mimeType: "image/jpeg",
      headers: {}
    }

    //server receiving the file
    //let server = "http://192.168.0.7:8080/api/uploadImage"; //original from tutorial
    let server = "http://kameron-youngs-macbook-pro.local:8000/";
    //let server = "http://localhost:8100/Users/kameronyoung/dinein/src/assets/imgs/img.jpg";
    //let server = "../../assets/imgs/";
    fileTransfer.upload(this.imageURI, encodeURI(server), options)
      .then((data) => {
        console.log(data + " Uploaded Successfully");
        //this.imageFileName = "http://localhost:8100/static/images/ionicfile.jpg";
        //this.imageFileName = "http://192.168.0.7:8080/static/images/ionicfile.jpg"; //original from tutorial
        this.imageFileName = "http://kameron-youngs-macbook-pro.local:8000/images/ionicfile.jpg";
        loader.dismiss();
        this.showAlert("Image uploaded successfully");
      }, (err) => {
        console.log("Code: "+err.code+"\nSource: "+err.source+"\nTarget: "+err.target+"\nHttp_Status: "+err.http_status+"\nBody: "+err.body+"\nException: "+err.exception);
        loader.dismiss();
        this.showAlert("Code: "+err.code+"\nSource: "+err.source+"\nTarget: "+err.target+"\nHttp_Status: "+err.http_status+"\nBody: "+err.body+"\nException: "+err.exception);
      });
  }
  /*presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }*/
  showAlert(msg) {
    let alert = this.alertCtrl.create({
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

  //////////////////////////////////////////////////////////////////////////



  confirmDelete() {
    let confirm = this.alertCtrl.create({
      title: 'Delete this employee profile and exit?',
      message: 'Warning: this action cannot be undone!',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            //do nothing
          }
        },
        {
          text: 'Delete and Exit',
          handler: () => {
            this.secondConfirmDelete();
          }
        }
      ]
    });
    confirm.present();
  }
  secondConfirmDelete() {
    let confirm = this.alertCtrl.create({
      title: 'Are you <em>really</em> sure you want to delete this employee profile and exit?',
      message: 'Warning: this action cannot be undone!',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            //do nothing
          }
        },
        {
          text: 'Delete and Exit',
          handler: () => {
            //TODO: delete profile from list of employees
            this.employees.splice(this.employees.indexOf(this.selectedEmployee), 1);
            this.employeePage.refreshSelectedEmployee();
            this.navCtrl.pop();
          }
        }
      ]
    });
    confirm.present();
  }

  confirmExit() {
    let confirm = this.alertCtrl.create({
      title: 'Exit without saving?',
      message: 'Are you sure you want to exit without saving your changes?',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            //do nothing
          }
        },
        {
          text: 'Exit',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    confirm.present();
  }

  saveNewValues() {
    this.selectedEmployee.setID(this.newID);
    this.selectedEmployee.setFirstName(this.newFirstName);
    this.selectedEmployee.setLastName(this.newLastName);
    this.selectedEmployee.setTitle(this.newTitle);
    this.selectedEmployee.setPay(this.newPay);
    this.selectedEmployee.setPhone(this.newPhone);
    this.selectedEmployee.setSrc(this.newSrc);
    let employeesPage = new EmployeesPage(null, null);
    this.employees.sort(employeesPage.sortByLastName);
    this.navCtrl.pop();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad EditEmployeePage');
  }

}
