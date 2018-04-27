import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ModalController, ViewController } from 'ionic-angular';
import { Employee } from '../employees/employees';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { InputNumpad } from '../util/numpad';

@IonicPage()
@Component({
	selector: 'page-edit-employee',
	templateUrl: 'edit-employee.html',
})
export class EditEmployeePage {

	employee: Employee;
	employees: Employee[];

	ID: number;
	firstName: string;
	lastName: string;
	title: string;
	pay: number;
	phone: number;

	editMode: boolean;

	newSrc: string;
	imageURI: any;
	imageFileName: any;


	constructor(public navCtrl: NavController,
							public navParams: NavParams,
							public alertCtrl: AlertController,
							public modalCtrl: ModalController,
							private transfer: FileTransfer,
							private camera: Camera,
							public loadingCtrl: LoadingController) {


		this.editMode = this.navParams.get('editMode');
		this.employees = this.navParams.get('employeesList');

		if (this.editMode) {
			this.employee = this.navParams.get('employee');
			this.ID = this.employee.ID;
			this.firstName = this.employee.firstName;
			this.lastName = this.employee.lastName;
			this.title = this.employee.title;
			this.pay = this.employee.pay;
			this.phone = this.employee.phone;
		} else {
			this.employee = new Employee(null, null, null, null, null);
			this.ID = this.employee.ID;
			this.firstName = null;
			this.lastName = null;
			this.title = null;
			this.pay = null;
			this.phone = null;
		}
	}

	submit() {

		if (this.validData()) {
			this.employee.firstName = this.firstName;
			this.employee.lastName = this.lastName;
			this.employee.title = this.title;
			this.employee.pay = this.pay;
			this.employee.phone = this.phone;
			if (!this.editMode) {
				this.employees.push(this.employee);
			}
			this.navCtrl.pop();
		} else {

		}
	}

	presentPayNumpad() {
		let numpadModal = this.modalCtrl.create(
      InputNumpad, {
                    inputField: "Pay $/hr",
                    alertTitle: "Invalid Employee Pay",
                    alertMsg: null,
                    validInputCondition: function(input) { return input > 0;},
                    secondaryValidInputCondition: null
                   }
    );
    numpadModal.onDidDismiss(returnedNum => {
      if (returnedNum != null) {
        this.pay = returnedNum;
      }
    });
    numpadModal.present();
	}

	presentPhoneNumpad() {
		let numpadModal = this.modalCtrl.create(
      InputNumpad, {
                    inputField: "Phone Number",
                    alertTitle: "Invalid Phone Number",
                    alertMsg: null,
                    validInputCondition: function(input) { return input > 0;},
                    secondaryValidInputCondition: null
                   }
    );
    numpadModal.onDidDismiss(returnedNum => {
      if (returnedNum != null) {
        this.phone = returnedNum;
      }
    });
    numpadModal.present();
	}

	deleteEmployee() {
		let confirm = this.alertCtrl.create({
			title: 'Delete this employee profile and exit?',
			message: 'Warning: this action cannot be undone!',
			enableBackdropDismiss: false,
			buttons: [
				{
					text: 'Cancel',
					handler: () => { }
				},
				{
					text: 'Delete and Exit',
					handler: () => { this.confirmDelete(); }
				}
			]
		});
		confirm.present();
	}

	confirmDelete() {
		let confirm = this.alertCtrl.create({
			title: 'Are you <em>really</em> sure you want to delete this employee profile and exit?',
			message: 'Warning: this action cannot be undone!',
			enableBackdropDismiss: false,
			buttons: [
				{
					text: 'Cancel',
					handler: () => { }
				},
				{
					text: 'Delete and Exit',
					handler: () => {
						//TODO: delete profile from list of employees
						this.employees.splice(this.employees.indexOf(this.employee), 1);
						this.navCtrl.pop();
					}
				}
			]
		});
		confirm.present();
	}

	validData(): boolean {
		return ((this.firstName != null) &&
						(this.lastName != null) &&
						(this.title != null) &&
						(this.pay != null) &&
						(this.phone != null));
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
						Employee.ID_runner -= 1;
						this.navCtrl.pop();
					}
				}
			]
		});
		confirm.present();
	}

	presentTitleSelector() {
		let modal = this.modalCtrl.create(TitleSelector);
		modal.onDidDismiss(title => {
			if (title != null) {
				this.title = title;
			}
		});
		modal.present();
	}

	getPhoneStr(): string {
		if (this.phone) {
			let phoneStr = this.phone.toString();
			if (phoneStr.length == 10) {
				return "("+phoneStr.slice(0,3)+") "+phoneStr.slice(3,6)+"-"+phoneStr.slice(6,10);
			}
		}
		return this.phone.toString();
	}

	getIDStr() {
		if (this.ID < 10) {
			return '000' + this.ID;
		}
		if (this.ID < 100) {
			return '00' + this.ID;
		}
		if (this.ID < 1000) {
			return '0' + this.ID;
		}
		return this.ID.toString();
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
			chunkedMode: false,
			headers: {}
		}

		fileTransfer.upload(this.imageURI, encodeURI('http://localhost:8100/Users/kameronyoung/dinein/src/assets/imgs/img.jpg'), options)
			.then((data) => {
				console.log(data + " Uploaded Successfully");
				this.imageFileName = "http://localhost:8100/static/images/ionicfile.jpg"
				loader.dismiss();
				this.showAlert("Image uploaded successfully");
			}, (err) => {
				console.log("Code: "+err.code+"\nSource: "+err.source+"\nTarget: "+err.target+"\nHttp_Status: "+err.http_status+"\nBody: "+err.body+"\nException: "+err.exception);
				loader.dismiss();
				this.showAlert(err);
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

}

//------------------------------------------------------------------------------
// Sub-View: SelectServer
//------------------------------------------------------------------------------
@Component({
	selector: 'page-edit-employee',
	template: `
		<div id="titlemodal" class="modalbase">
				<h4 class="colorprimary">Select Title</h4>
				<ion-content class="modallisttitle">
					<ion-list scroll="true">
						<button ion-button block outline class="listbutton"
										*ngFor="let title of titleList"
										[ngClass]="{'selectedtitle': title == selectedTitle,
																'title': title != selectedTitle}"
										(click)="selectTitle(title)">
							{{title}}
						</button>
					</ion-list>
				</ion-content>
				<button class="modalbutton" ion-button block
									(click)="OK()">OK</button>
				<button class="modalbutton" ion-button block outline
									(click)="cancel()">Cancel</button>
		</div>
	`
})
export class TitleSelector {

	titleList: string[] = [ "Owner", "Manager", "Host/Hostess", "Server",
													"Bartender", "Chef", "Cook", "DJ" ];

	selectedTitle: string;

	constructor(public viewCtrl: ViewController) {
		this.selectedTitle = this.titleList[0];
	}

	selectTitle(title: string) {
		this.selectedTitle = title;
	}

	OK() {
		this.viewCtrl.dismiss(this.selectedTitle);
	}

	cancel() {
		this.viewCtrl.dismiss(null);
	}

}
