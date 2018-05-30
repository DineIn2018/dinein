webpackJsonp([8],{

/***/ 158:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditEmployeePage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return TitleSelector; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_classes__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_file_transfer__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__util_numpad__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_dbhelper_dbhelper__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__DBAssets_DBObjects__ = __webpack_require__(61);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var EditEmployeePage = (function () {
    function EditEmployeePage(navCtrl, navParams, alertCtrl, modalCtrl, transfer, camera, loadingCtrl, DBHelper) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.transfer = transfer;
        this.camera = camera;
        this.loadingCtrl = loadingCtrl;
        this.DBHelper = DBHelper;
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
        }
        else {
            this.employee = new __WEBPACK_IMPORTED_MODULE_2__util_classes__["a" /* Employee */](null, null, null, null, null);
            this.ID = this.employee.ID;
            this.firstName = null;
            this.lastName = null;
            this.title = null;
            this.pay = null;
            this.phone = null;
        }
    }
    EditEmployeePage.prototype.submit = function () {
        var _this = this;
        if (this.validData()) {
            this.employee.firstName = this.firstName;
            this.employee.lastName = this.lastName;
            this.employee.title = this.title;
            this.employee.pay = this.pay;
            this.employee.phone = this.phone;
            if (!this.editMode) {
                var newEmployee = new __WEBPACK_IMPORTED_MODULE_7__DBAssets_DBObjects__["a" /* EmployeeObject */]();
                newEmployee.fName = this.firstName;
                newEmployee.lName = this.lastName;
                newEmployee.id = this.ID;
                newEmployee.title = this.title;
                newEmployee.pay = this.pay;
                newEmployee.phoneNo = this.phone;
                this.DBHelper.addEmployee(newEmployee);
                this.employees.push(this.employee);
            }
            var alert_1 = this.alertCtrl.create({
                title: this.editMode ? "Employee Information Successfully Saved" : "Employee Successfully Created",
                enableBackdropDismiss: false,
                buttons: [
                    {
                        text: "OK",
                        handler: function () { _this.navCtrl.pop(); }
                    }
                ]
            });
            alert_1.present();
        }
        else {
            var alert_2 = this.alertCtrl.create({
                title: "Some Information is Missing!",
                enableBackdropDismiss: false,
                buttons: [
                    {
                        text: "OK",
                        handler: function () { }
                    }
                ]
            });
            alert_2.present();
        }
    };
    EditEmployeePage.prototype.presentPayNumpad = function () {
        var _this = this;
        var numpadModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__util_numpad__["a" /* InputNumpad */], {
            inputField: "Pay $/hr",
            alertTitle: "Invalid Employee Pay",
            alertMsg: null,
            validInputCondition: function (input) {
                return (input > 0) && (input < 1000000);
            },
            secondaryValidInputCondition: null
        });
        numpadModal.onDidDismiss(function (returnedNum) {
            if (returnedNum != null) {
                _this.pay = returnedNum;
            }
        });
        numpadModal.present();
    };
    EditEmployeePage.prototype.presentPhoneNumpad = function () {
        var _this = this;
        var numpadModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__util_numpad__["a" /* InputNumpad */], {
            inputField: "Phone Number",
            alertTitle: "Invalid Phone Number",
            alertMsg: null,
            validInputCondition: function (input) {
                return (input > 999999999) && (input < 10000000000);
            },
            secondaryValidInputCondition: null
        });
        numpadModal.onDidDismiss(function (returnedNum) {
            if (returnedNum != null) {
                _this.phone = returnedNum;
            }
        });
        numpadModal.present();
    };
    EditEmployeePage.prototype.deleteEmployee = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Delete this employee profile and exit?',
            message: 'Warning: this action cannot be undone!',
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Cancel',
                    handler: function () { }
                },
                {
                    text: 'Delete and Exit',
                    handler: function () { _this.confirmDelete(); }
                }
            ]
        });
        confirm.present();
    };
    EditEmployeePage.prototype.confirmDelete = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Are you <em>really</em> sure you want to delete this employee profile and exit?',
            message: 'Warning: this action cannot be undone!',
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Cancel',
                    handler: function () { }
                },
                {
                    text: 'Delete and Exit',
                    handler: function () {
                        //TODO: delete profile from list of employees
                        _this.employees.splice(_this.employees.indexOf(_this.employee), 1);
                        _this.navCtrl.pop();
                    }
                }
            ]
        });
        confirm.present();
    };
    EditEmployeePage.prototype.validData = function () {
        return ((this.firstName != null) &&
            (this.lastName != null) &&
            (this.title != null) &&
            (this.pay != null) &&
            (this.phone != null));
    };
    EditEmployeePage.prototype.confirmExit = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Exit without saving?',
            message: 'Are you sure you want to exit without saving your changes?',
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Cancel',
                    handler: function () {
                        //do nothing
                    }
                },
                {
                    text: 'Exit',
                    handler: function () {
                        __WEBPACK_IMPORTED_MODULE_2__util_classes__["a" /* Employee */].ID_runner -= 1;
                        _this.navCtrl.pop();
                    }
                }
            ]
        });
        confirm.present();
    };
    EditEmployeePage.prototype.presentTitleSelector = function () {
        var _this = this;
        var modal = this.modalCtrl.create(TitleSelector);
        modal.onDidDismiss(function (title) {
            if (title != null) {
                _this.title = title;
            }
        });
        modal.present();
    };
    EditEmployeePage.prototype.getPhoneStr = function () {
        if (this.phone) {
            var phoneStr = this.phone.toString();
            if (phoneStr.length == 10) {
                return "(" + phoneStr.slice(0, 3) + ") " + phoneStr.slice(3, 6) + "-" + phoneStr.slice(6, 10);
            }
        }
        return this.phone.toString();
    };
    EditEmployeePage.prototype.getIDStr = function () {
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
    };
    ///////////////////////////////////////////////////////////////////////////////
    EditEmployeePage.prototype.getImage = function () {
        var _this = this;
        var options = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
        };
        this.camera.getPicture(options).then(function (imageData) {
            _this.imageURI = imageData;
        }, function (err) {
            console.log(err);
            _this.showAlert(err);
        });
    };
    EditEmployeePage.prototype.uploadFile = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Uploading..."
        });
        loader.present();
        var fileTransfer = this.transfer.create();
        var options = {
            chunkedMode: false,
            headers: {}
        };
        fileTransfer.upload(this.imageURI, encodeURI('http://localhost:8100/Users/kameronyoung/dinein/src/assets/imgs/img.jpg'), options)
            .then(function (data) {
            console.log(data + " Uploaded Successfully");
            _this.imageFileName = "http://localhost:8100/static/images/ionicfile.jpg";
            loader.dismiss();
            _this.showAlert("Image uploaded successfully");
        }, function (err) {
            console.log("Code: " + err.code + "\nSource: " + err.source + "\nTarget: " + err.target + "\nHttp_Status: " + err.http_status + "\nBody: " + err.body + "\nException: " + err.exception);
            loader.dismiss();
            _this.showAlert(err);
        });
    };
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
    EditEmployeePage.prototype.showAlert = function (msg) {
        var alert = this.alertCtrl.create({
            subTitle: msg,
            buttons: ['OK']
        });
        alert.present();
    };
    EditEmployeePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-edit-employee',template:/*ion-inline-start:"C:\Users\Owner\documents\repos\dinein\dinein\src\pages\employees\edit-employee.html"*/'<ion-content no-bounce>\n\n	<div id="container">\n\n\n\n		<h3 class="colorprimary">\n\n			{{editMode? "Edit Employee Information" : "Create New Employee"}}\n\n		</h3>\n\n\n\n		<button class="inputbutton" ion-button outline block [disabled]="true">\n\n			<h6 class="colormiddark">Employee ID:</h6>{{getIDStr()}}\n\n		</button>\n\n\n\n		<ion-item class="inputfield">\n\n			<ion-input type="Text" placeholder="First Name"\n\n						 [(ngModel)]="firstName"></ion-input>\n\n			<button ion-button item-end class="xbutton"\n\n							*ngIf="firstName != null"\n\n							(click)="firstName = null">x</button>\n\n		</ion-item>\n\n		<ion-item class="inputfield">\n\n			<ion-input type="Text" placeholder="Last Name"\n\n						 [(ngModel)]="lastName"></ion-input>\n\n			<button ion-button item-end class="xbutton"\n\n				*ngIf="lastName != null"\n\n				(click)="lastName = null">x</button>\n\n		</ion-item>\n\n\n\n		<button class="inputbutton" ion-button outline block\n\n						[ngClass]="{\'inputbuttonnoval\': title == null,\n\n												\'inputbuttonhasval\': title != null}"\n\n						(click)="presentTitleSelector()">\n\n			{{(title == null)? "Employee Title" : title}}\n\n		</button>\n\n		<button class="inputbutton" ion-button outline block\n\n						[ngClass]="{\'inputbuttonnoval\': pay == null,\n\n												\'inputbuttonhasval\': pay != null}"\n\n						 (click)="presentPayNumpad()">\n\n			{{(pay == null)? "Pay $ / hr" : (pay.toFixed(2) + " $ / hr")}}\n\n		</button>\n\n		<button class="inputbutton" ion-button outline block\n\n						[ngClass]="{\'inputbuttonnoval\': phone == null,\n\n												\'inputbuttonhasval\': phone != null}"\n\n						 (click)="presentPhoneNumpad()">\n\n			{{(phone == null)? "Phone Number" : getPhoneStr()}}\n\n		</button>\n\n\n\n		<button class="localbutton modalbuttonprimary" ion-button block\n\n						(click)="submit()">\n\n				{{editMode? "Save and Exit" : "Add Employee"}}\n\n			</button>\n\n		<button class="localbutton redbutton" ion-button block outline\n\n						(click)="confirmExit()">\n\n			{{editMode? "Exit Without Saving" : "Cancel"}}\n\n		</button>\n\n		<button class="localbutton dangerbutton" ion-button block\n\n						*ngIf="editMode" (click)="deleteEmployee()">\n\n			Delete Employee\n\n		</button>\n\n\n\n	</div>\n\n</ion-content>\n\n\n\n<!--\n\n<ion-content>\n\n\n\n	<button ion-button block outline (click)="saveNewValues()">\n\n		Save and Exit\n\n	</button>\n\n\n\n\n\n	<ion-list inset>\n\n\n\n		<ion-item>\n\n			<ion-label>Image src</ion-label>\n\n			<ion-input type="text" [(ngModel)]="newSrc"></ion-input>\n\n		</ion-item>\n\n\n\n		<ion-item>\n\n			<ion-label>First Name</ion-label>\n\n			<ion-input type="text" [(ngModel)]="newFirstName"></ion-input>\n\n		</ion-item>\n\n\n\n		<ion-item>\n\n			<ion-label>Last Name</ion-label>\n\n			<ion-input type="text" [(ngModel)]="newLastName"></ion-input>\n\n		</ion-item>\n\n\n\n		<ion-item>\n\n			<ion-label>ID</ion-label>\n\n			<ion-input type="text" [(ngModel)]="newID"></ion-input>\n\n		</ion-item>\n\n\n\n		<ion-item>\n\n			<ion-label>Title</ion-label>\n\n			<ion-input type="text" [(ngModel)]="newTitle"></ion-input>\n\n		</ion-item>\n\n\n\n		<ion-item>\n\n			<ion-label>Pay</ion-label>\n\n			<ion-input type="text" [(ngModel)]="newPay"></ion-input>\n\n		</ion-item>\n\n\n\n		<ion-item>\n\n			<ion-label>Phone</ion-label>\n\n			<ion-input type="text" [(ngModel)]="newPhone"></ion-input>\n\n		</ion-item>\n\n\n\n	</ion-list>\n\n\n\n	<button ion-button inline outline (click)="confirmExit()">\n\n		Exit Without Saving\n\n	</button>\n\n	<button ion-button inline outline (click)="confirmDelete()">\n\n		Delete Employee Profile\n\n	</button>\n\n\n\n</ion-content>\n\n-->\n\n'/*ion-inline-end:"C:\Users\Owner\documents\repos\dinein\dinein\src\pages\employees\edit-employee.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_6__providers_dbhelper_dbhelper__["a" /* DbHelperProvider */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_file_transfer__["a" /* FileTransfer */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_6__providers_dbhelper_dbhelper__["a" /* DbHelperProvider */]])
    ], EditEmployeePage);
    return EditEmployeePage;
}());

//------------------------------------------------------------------------------
// Sub-View: SelectServer
//------------------------------------------------------------------------------
var TitleSelector = (function () {
    function TitleSelector(viewCtrl) {
        this.viewCtrl = viewCtrl;
        this.titleList = ["Owner", "Manager", "Host/Hostess", "Server",
            "Bartender", "Chef", "Cook", "DJ"];
        this.selectedTitle = this.titleList[0];
    }
    TitleSelector.prototype.selectTitle = function (title) {
        this.selectedTitle = title;
    };
    TitleSelector.prototype.OK = function () {
        this.viewCtrl.dismiss(this.selectedTitle);
    };
    TitleSelector.prototype.cancel = function () {
        this.viewCtrl.dismiss(null);
    };
    TitleSelector = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-edit-employee',
            template: "\n\t\t<div id=\"titlemodal\" class=\"modalbase\">\n\t\t\t\t<h4 class=\"colorprimary\">Select Title</h4>\n\t\t\t\t<ion-content class=\"modallisttitle\">\n\t\t\t\t\t<ion-list scroll=\"true\">\n\t\t\t\t\t\t<button ion-button block outline class=\"listbutton\"\n\t\t\t\t\t\t\t\t\t\t*ngFor=\"let title of titleList\"\n\t\t\t\t\t\t\t\t\t\t[ngClass]=\"{'selectedtitle': title == selectedTitle,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t'title': title != selectedTitle}\"\n\t\t\t\t\t\t\t\t\t\t(click)=\"selectTitle(title)\">\n\t\t\t\t\t\t\t{{title}}\n\t\t\t\t\t\t</button>\n\t\t\t\t\t</ion-list>\n\t\t\t\t</ion-content>\n\t\t\t\t<button class=\"modalbutton\" ion-button block\n\t\t\t\t\t\t\t\t\t(click)=\"OK()\">OK</button>\n\t\t\t\t<button class=\"modalbutton\" ion-button block outline\n\t\t\t\t\t\t\t\t\t(click)=\"cancel()\">Cancel</button>\n\t\t</div>\n\t"
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */]])
    ], TitleSelector);
    return TitleSelector;
}());

//# sourceMappingURL=edit-employee.js.map

/***/ }),

/***/ 159:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateRestaurantPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_classes__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_numpad__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__DBAssets_DBObjects__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_dbhelper_dbhelper__ = __webpack_require__(41);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var CreateRestaurantPage = (function () {
    function CreateRestaurantPage(navCtrl, modalCtrl, viewCtrl, alertCtrl, DBHelper) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.viewCtrl = viewCtrl;
        this.alertCtrl = alertCtrl;
        this.DBHelper = DBHelper;
        this.restaurantName = null;
        this.addrLine1 = null;
        this.addrLine2 = null;
        this.phone = null;
        this.ownerFirstName = null;
        this.ownerLastName = null;
        this.managerPin = null;
    }
    CreateRestaurantPage.prototype.create = function () {
        var _this = this;
        //
        // Invalid Input data
        //
        if (!this.validData()) {
            var alert_1 = this.alertCtrl.create({
                title: 'Some Information is Missing!',
                enableBackdropDismiss: false,
                buttons: [
                    {
                        text: 'Dismiss',
                        handler: function () {
                            console.log(_this.restaurantName + _this.addrLine1 + _this.addrLine2
                                + _this.phone + _this.ownerFirstName + _this.ownerLastName);
                        }
                    }
                ]
            });
            alert_1.present();
            //
            // Valid Input Data
            //
        }
        else {
            var owner = new __WEBPACK_IMPORTED_MODULE_2__util_classes__["a" /* Employee */](this.ownerFirstName, this.ownerLastName, "Owner", 100000.01, 2024561111, "../assets/imgs/mikefass.jpg", 1);
            var createdRestaurant = new __WEBPACK_IMPORTED_MODULE_2__util_classes__["d" /* Restaurant */](this.restaurantName, this.phone, owner, this.addrLine1, this.addrLine2, this.managerPin);
            var newRestaurant = new __WEBPACK_IMPORTED_MODULE_4__DBAssets_DBObjects__["c" /* RestaurantObject */]();
            newRestaurant.name = this.restaurantName;
            newRestaurant.addr1 = this.addrLine1;
            newRestaurant.addr2 = this.addrLine2;
            newRestaurant.capacity = createdRestaurant.getCapacity();
            newRestaurant.phoneNo = this.phone;
            newRestaurant.totalEmploy = createdRestaurant.getNumEmployees();
            newRestaurant.managerPIN = this.managerPin;
            this.DBHelper.addRestaurant(newRestaurant);
            var alert_2 = this.alertCtrl.create({
                title: "Restaurant Successfully Created",
                enableBackdropDismiss: false,
                buttons: [
                    {
                        text: "OK",
                        handler: function () { _this.exit(); }
                    }
                ]
            });
            alert_2.present();
        }
    };
    CreateRestaurantPage.prototype.exit = function () {
        this.navCtrl.pop();
    };
    CreateRestaurantPage.prototype.presentPhoneNumpad = function () {
        var _this = this;
        var numpadModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__util_numpad__["a" /* InputNumpad */], {
            inputField: "Phone Number",
            alertTitle: "Invalid Phone Number",
            alertMsg: null,
            validInputCondition: function (input) {
                return (input > 999999999) && (input < 10000000000);
            },
            secondaryValidInputCondition: null
        });
        numpadModal.onDidDismiss(function (returnedNum) {
            if (returnedNum != null) {
                _this.phone = returnedNum;
            }
        });
        numpadModal.present();
    };
    CreateRestaurantPage.prototype.presentPinNumpad = function () {
        var _this = this;
        var numpadModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__util_numpad__["a" /* InputNumpad */], {
            inputField: "Enter 4-digit PIN",
            alertTitle: "PIN must be 4 digits",
            alertMsg: null,
            validInputCondition: function (input) {
                return (input > 999) && (input < 10000);
            },
            secondaryValidInputCondition: null
        });
        numpadModal.onDidDismiss(function (returnedNum) {
            if (returnedNum != null) {
                _this.managerPin = returnedNum;
            }
        });
        numpadModal.present();
    };
    CreateRestaurantPage.prototype.validData = function () {
        return ((this.addrLine1 != null) &&
            (this.addrLine2 != null) &&
            (this.phone != null) &&
            (this.ownerFirstName != null) &&
            (this.ownerLastName != null));
    };
    CreateRestaurantPage.prototype.getPhoneStr = function () {
        if (this.phone) {
            var phoneStr = this.phone.toString();
            if (phoneStr.length == 10) {
                return "(" + phoneStr.slice(0, 3) + ") " + phoneStr.slice(3, 6) + "-" + phoneStr.slice(6, 10);
            }
        }
        return this.phone.toString();
    };
    CreateRestaurantPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-create-restaurant',template:/*ion-inline-start:"C:\Users\Owner\documents\repos\dinein\dinein\src\pages\login\create-restaurant.html"*/'<ion-content no-bounce>\n\n	<div class="background">\n\n		<div id="container">\n\n\n\n			<h2 class="colorprimary">Create Restaurant</h2>\n\n\n\n			<ion-item class="inputfield">\n\n				<ion-input type="Text" placeholder="Restaurant Name"\n\n									 [(ngModel)]="restaurantName"></ion-input>\n\n				<button ion-button item-end class="xbutton"\n\n						*ngIf="restaurantName != null"\n\n						(click)="restaurantName = null">x</button>\n\n			</ion-item>\n\n			<ion-item class="inputfield">\n\n				<ion-input type="Text" placeholder="Street Address"\n\n									 [(ngModel)]="addrLine1"></ion-input>\n\n				<button ion-button item-end class="xbutton"\n\n										*ngIf="addrLine1 != null"\n\n										(click)="addrLine1 = null">x</button>\n\n			</ion-item>\n\n			<ion-item class="inputfield">\n\n				<ion-input type="Text" placeholder="City, State Zip"\n\n									 [(ngModel)]="addrLine2"></ion-input>\n\n				<button ion-button item-end class="xbutton"\n\n										*ngIf="addrLine2 != null"\n\n										(click)="addrLine2 = null">x</button>\n\n			</ion-item>\n\n\n\n			<button class="inputbutton" ion-button outline block\n\n							[ngClass]="{\'inputbuttonnoval\': phone == null,\n\n													\'inputbuttonhasval\': phone != null}"\n\n							(click)="presentPhoneNumpad()">\n\n				{{phone == null? "Restaurant\'s Phone Number" : getPhoneStr()}}\n\n			</button>\n\n\n\n			<ion-item class="inputfield">\n\n				<ion-input type="Text" placeholder="Owner\'s First Name"\n\n									 [(ngModel)]="ownerFirstName"></ion-input>\n\n				<button ion-button item-end class="xbutton"\n\n										*ngIf="ownerFirstName != null"\n\n										(click)="ownerFirstName = null">x</button>\n\n			</ion-item>\n\n			<ion-item class="inputfield">\n\n				<ion-input type="Text" placeholder="Owner\'s Last Name"\n\n									 [(ngModel)]="ownerLastName"></ion-input>\n\n				<button ion-button item-end class="xbutton"\n\n										*ngIf="ownerLastName != null"\n\n										(click)="ownerLastName = null">x</button>\n\n			</ion-item>\n\n\n\n			<button class="inputbutton" ion-button outline block\n\n							[ngClass]="{\'inputbuttonnoval\': managerPin == null,\n\n													\'inputbuttonhasval\': managerPin != null}"\n\n							(click)="presentPinNumpad()">\n\n				{{managerPin == null? "Owner/Manager access PIN" : "XXXX"}}\n\n			</button>\n\n\n\n			<button class="localbutton" ion-button block\n\n							(click)="create()">Create</button>\n\n			<button class="localbutton redbutton" ion-button block outline\n\n							(click)="exit()">Cancel</button>\n\n\n\n		</div>\n\n	</div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Owner\documents\repos\dinein\dinein\src\pages\login\create-restaurant.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_5__providers_dbhelper_dbhelper__["a" /* DbHelperProvider */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_5__providers_dbhelper_dbhelper__["a" /* DbHelperProvider */]])
    ], CreateRestaurantPage);
    return CreateRestaurantPage;
}());

//# sourceMappingURL=create-restaurant.js.map

/***/ }),

/***/ 160:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateUserPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SelectRestaurant; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__create_restaurant__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_numpad__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__DBAssets_DBObjects__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_dbhelper_dbhelper__ = __webpack_require__(41);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the CreateUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CreateUserPage = (function () {
    function CreateUserPage(navCtrl, modalCtrl, viewCtrl, alertCtrl, navParams, DBHelper) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.viewCtrl = viewCtrl;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.DBHelper = DBHelper;
        this.restaurantsList = ["Potbelly", "State St. Brats", "Hopcat", "Five Guys",
            "Chipotle", "Nitty Gritty", "Dotty's", "Ians",
            "Glaze", "QQs"];
        this.createdRestaurant = this.navParams.get('restaurant');
        if (this.createdRestaurant) {
            console.log('received restaurant: ' + this.createdRestaurant.name);
        }
        else {
            this.createdRestaurant = null;
        }
        this.email = null;
        this.password = null;
        this.confirmPassword = null;
        this.firstName = null;
        this.lastName = null;
        this.phone = null;
        this.restaurant = null;
    }
    CreateUserPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CreateUserPage');
    };
    CreateUserPage.prototype.submit = function () {
        var _this = this;
        var newUser = new __WEBPACK_IMPORTED_MODULE_4__DBAssets_DBObjects__["e" /* UserObject */]();
        newUser.email = this.email;
        newUser.password = this.password;
        newUser.firstName = this.firstName;
        newUser.lastName = this.lastName;
        newUser.phoneNo = this.phone;
        newUser.restaurant = this.restaurant;
        this.DBHelper.addUser(newUser);
        var alert = this.alertCtrl.create({
            title: "User Account Successfully Created",
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: "OK",
                    handler: function () { _this.exit(); }
                }
            ]
        });
        alert.present();
    };
    CreateUserPage.prototype.exit = function () {
        this.navCtrl.pop();
    };
    CreateUserPage.prototype.presentNumpad = function () {
        var _this = this;
        var numpadModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__util_numpad__["a" /* InputNumpad */], {
            inputField: "Phone Number",
            alertTitle: "Invalid Phone Number",
            alertMsg: null,
            validInputCondition: function (input) {
                return (input > 999999999) && (input < 10000000000);
            },
            secondaryValidInputCondition: null
        });
        numpadModal.onDidDismiss(function (returnedNum) {
            if (returnedNum != null) {
                _this.phone = returnedNum;
            }
        });
        numpadModal.present();
    };
    CreateUserPage.prototype.presentRestaurantSelector = function () {
        var _this = this;
        var modal = this.modalCtrl.create(SelectRestaurant, { restaurants: this.restaurantsList });
        modal.onDidDismiss(function (data) {
            if (data != null) {
                if (data == 0) {
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__create_restaurant__["a" /* CreateRestaurantPage */]);
                }
                else {
                    _this.restaurant = data;
                    _this.buttonTextRestaurant = String(_this.restaurant);
                }
            }
        });
        modal.present();
    };
    CreateUserPage.prototype.validData = function () {
        return (this.email != null &&
            this.password != null &&
            this.confirmPassword != null &&
            this.firstName != null &&
            this.restaurant != null);
    };
    CreateUserPage.prototype.passwordsMatch = function () {
        return (this.password == this.confirmPassword);
    };
    CreateUserPage.prototype.getPhoneStr = function () {
        if (this.phone) {
            var phoneStr = this.phone.toString();
            if (phoneStr.length == 10) {
                return "(" + phoneStr.slice(0, 3) + ") " + phoneStr.slice(3, 6) + "-" + phoneStr.slice(6, 10);
            }
        }
        return this.phone.toString();
    };
    CreateUserPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-create-user',template:/*ion-inline-start:"C:\Users\Owner\documents\repos\dinein\dinein\src\pages\login\create-user.html"*/'\n\n<ion-content no-bounce>\n\n	<div class="background">\n\n		<div id="container">\n\n\n\n				<h2 class="colorprimary">Create User</h2>\n\n\n\n				<ion-item class="inputfield">\n\n					<ion-input type="Text" placeholder="e-mail" required\n\n										 [(ngModel)]="email"></ion-input>\n\n					<button ion-button item-end class="xbutton"\n\n											*ngIf="email != null"\n\n											(click)="email = null">x</button>\n\n				</ion-item>\n\n				<ion-item class="inputfield">\n\n					<ion-input type="Password" placeholder="Password" required\n\n										 [(ngModel)]="password"></ion-input>\n\n					<button ion-button item-end class="xbutton"\n\n											*ngIf="password != null"\n\n											(click)="password = null">x</button>\n\n				</ion-item>\n\n				<ion-item [ngClass]="{\'inputfield\': passwordsMatch(),\n\n															\'inputfielderror\': !passwordsMatch()}">\n\n					<ion-input type="Password" placeholder="Confirm Password" required\n\n										 [(ngModel)]="confirmPassword"></ion-input>\n\n						<button ion-button item-end class="xbutton"\n\n											*ngIf="confirmPassword != null"\n\n											(click)="confirmPassword = null">x</button>\n\n				</ion-item>\n\n				<ion-item class="inputfield">\n\n					<ion-input type="Text" placeholder="First Name"\n\n										 [(ngModel)]="firstName"></ion-input>\n\n					<button ion-button item-end class="xbutton"\n\n											*ngIf="firstName != null"\n\n											(click)="firstName = null">x</button>\n\n				</ion-item>\n\n				<ion-item class="inputfield">\n\n					<ion-input type="Text" placeholder="Last Name (optional)"\n\n										 [(ngModel)]="lastName"></ion-input>\n\n					<button ion-button item-end class="xbutton"\n\n											*ngIf="lastName != null"\n\n											(click)="lastName = null">x</button>\n\n				</ion-item>\n\n				<button class="inputbutton" ion-button outline block\n\n								[ngClass]="{\'inputbuttonnoval\': phone == null,\n\n														\'inputbuttonhasval\': phone != null}"\n\n								(click)="presentNumpad()">\n\n					{{phone == null? "Phone Number (optional)" : getPhoneStr()}}\n\n				</button>\n\n				<button class="inputbutton" ion-button outline block\n\n								[ngClass]="{\'inputbuttonnoval\': restaurant == null,\n\n														\'inputbuttonhasval\': restaurant != null}"\n\n								 (click)="presentRestaurantSelector()">\n\n					{{restaurant == null? "Select Restaurant" : restaurant}}\n\n				</button>\n\n\n\n				<button class="localbutton" ion-button block\n\n								(click)="submit()">Submit</button>\n\n				<button class="localbutton redbutton" ion-button outline block\n\n								(click)="exit()">Cancel</button>\n\n\n\n		</div>\n\n	</div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Owner\documents\repos\dinein\dinein\src\pages\login\create-user.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_5__providers_dbhelper_dbhelper__["a" /* DbHelperProvider */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_5__providers_dbhelper_dbhelper__["a" /* DbHelperProvider */]])
    ], CreateUserPage);
    return CreateUserPage;
}());

//------------------------------------------------------------------------------
// Sub-View: SelectServer
//------------------------------------------------------------------------------
var SelectRestaurant = (function () {
    function SelectRestaurant(viewCtrl, params) {
        this.viewCtrl = viewCtrl;
        this.params = params;
        this.restaurants = params.get('restaurants');
        this.selectedRestaurant = this.restaurants[0];
    }
    SelectRestaurant.prototype.selectRestaurant = function (r) {
        this.selectedRestaurant = r;
    };
    SelectRestaurant.prototype.OK = function () {
        this.viewCtrl.dismiss(this.selectedRestaurant);
    };
    SelectRestaurant.prototype.createNewRestaurant = function () {
        this.viewCtrl.dismiss(0);
    };
    SelectRestaurant.prototype.cancel = function () {
        this.viewCtrl.dismiss(null);
    };
    SelectRestaurant = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-create-user',
            template: "\n\t\t<div class=\"modalbase\" id=\"restaurantmodal\">\n\t\t\t<h3 class=\"colormedium\">Select Restaurant</h3>\n\t\t\t<ion-content class=\"modallist3buttons\">\n\t\t\t\t<ion-list scroll=\"true\">\n\t\t\t\t\t<button ion-button block outline class=\"listbutton\"\n\t\t\t\t\t\t\t\t\t*ngFor=\"let restaurant of restaurants\"\n\t\t\t\t\t\t\t\t\t[ngClass]=\"{'selectedrestaurant': restaurant === selectedRestaurant,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t'restaurant': restaurant !== selectedRestaurant}\"\n\t\t\t\t\t\t\t\t\t(click)=\"selectRestaurant(restaurant)\">\n\t\t\t\t\t\t{{restaurant}}\n\t\t\t\t\t</button>\n\t\t\t\t</ion-list>\n\t\t\t</ion-content>\n\t\t\t<button class=\"modalbutton\" ion-button block\n\t\t\t\t\t\t\t\t(click)=\"OK()\">OK</button>\n\t\t\t<button class=\"modalbutton\" ion-button block outline\n\t\t\t\t\t\t\t\t(click)=\"cancel()\">Cancel</button>\n\t\t\t<button class=\"modalbutton\" ion-button block outline\n\t\t\t\t\t\t\t\t(click)=\"createNewRestaurant()\">Create New Restaurant</button>\n\t\t</div>\n\t"
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
    ], SelectRestaurant);
    return SelectRestaurant;
}());

//# sourceMappingURL=create-user.js.map

/***/ }),

/***/ 161:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tabs_tabs__ = __webpack_require__(352);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__create_user__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_dbhelper_dbhelper__ = __webpack_require__(41);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoginPage = (function () {
    function LoginPage(navCtrl, navParams, DBHelper) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.DBHelper = DBHelper;
        this.email = null;
        this.password = null;
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.executeLogin = function () {
        if (this.loginSuccess(this.email, this.password)) {
            console.log('Login Successful');
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__tabs_tabs__["a" /* TabsPage */]);
        }
        else {
            console.log('Login Unsuccessful');
        }
    };
    LoginPage.prototype.loginSuccess = function (email, password) {
        return true;
    };
    LoginPage.prototype.goToCreateUser = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__create_user__["a" /* CreateUserPage */]);
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"C:\Users\Owner\documents\repos\dinein\dinein\src\pages\login\login.html"*/'<ion-content no-bounce>\n\n	<div class="background">\n\n		<div id="container">\n\n\n\n            <!-- Logo -->\n\n            <div class = "logo">\n\n                <img src="../assets/imgs/dinein_logo.png"/>\n\n            </div>\n\n\n\n\n\n				<div style="margin-top: 30px;">\n\n					<ion-item class="inputfield">\n\n						<ion-input placeholder="e-mail"\n\n											 [(ngModel)]="email"></ion-input>\n\n							<button ion-button item-end class="xbutton"\n\n											*ngIf="email != null"\n\n											(click)="email = null">x</button>\n\n					</ion-item>\n\n					<ion-item class="inputfield">\n\n						<ion-input type="Password" placeholder="Password"\n\n											 [(ngModel)]="password"></ion-input>\n\n						<button ion-button item-end class="xbutton"\n\n											*ngIf="password != null"\n\n											(click)="password = null">x</button>\n\n					</ion-item>\n\n					<button class="localbutton" ion-button block\n\n						(click)="executeLogin()">Login\n\n					</button>\n\n					<button class="localbutton" ion-button outline block\n\n						(click)="goToCreateUser()">Create User\n\n					</button>\n\n				</div>\n\n		</div>\n\n	</div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Owner\documents\repos\dinein\dinein\src\pages\login\login.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_4__providers_dbhelper_dbhelper__["a" /* DbHelperProvider */]],
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__providers_dbhelper_dbhelper__["a" /* DbHelperProvider */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 162:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddPartyPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_classes__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_date_time__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util_numpad__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__DBAssets_DBObjects__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_dbhelper_dbhelper__ = __webpack_require__(41);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



;





var AddPartyPage = (function () {
    function AddPartyPage(navCtrl, modalCtrl, viewCtrl, alertCtrl, navParams, datetime, DBHelper) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.viewCtrl = viewCtrl;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.datetime = datetime;
        this.DBHelper = DBHelper;
        this.editMode = this.navParams.get("edit");
        //
        // Editing party mode
        //
        if (this.editMode) {
            this.party = this.navParams.get("edit_party");
            // Set user inputs automatically to the values of party being edited
            this.ID = this.party.ID;
            this.name = this.party.name;
            this.size = this.party.size;
            this.contact = this.party.contact;
            this.reservation = this.party.reservation;
            this.time = this.party.time;
            //
            // Adding new party mode
            //
        }
        else {
            this.parties = this.navParams.get("parties");
            // All inputs initially empty
            this.ID = null;
            this.name = null;
            this.size = null;
            this.contact = null;
            this.reservation = false;
            this.time = null;
        }
    }
    AddPartyPage.prototype.submit = function () {
        var _this = this;
        //
        // Invalid Input data
        //
        if (!this.validData()) {
            var alert_1 = this.alertCtrl.create({
                title: 'Some Information is Missing!',
                enableBackdropDismiss: false,
                buttons: [
                    {
                        text: 'Dismiss',
                        handler: function () { }
                    }
                ]
            });
            console.log(this.name);
            alert_1.present();
            //
            // Valid Input Data
            //
        }
        else {
            if (this.editMode) {
                this.party.ID = this.ID;
                this.party.name = this.name;
                this.party.size = this.size;
                this.party.contact = this.contact;
                this.party.reservation = this.reservation;
                this.party.time = this.time;
                // Adding Party Mode
            }
            else {
                var partyTime;
                if (this.reservation) {
                    partyTime = this.time;
                }
                else {
                    partyTime = this.datetime.getTime();
                }
                var party = new __WEBPACK_IMPORTED_MODULE_2__util_classes__["c" /* Party */](this.name, this.size, partyTime, this.contact, this.reservation);
                this.parties.push(party);
                this.parties.sort(__WEBPACK_IMPORTED_MODULE_2__util_classes__["c" /* Party */].compare);
                var newParty = new __WEBPACK_IMPORTED_MODULE_5__DBAssets_DBObjects__["b" /* PartyObject */]();
                newParty.id = this.ID;
                newParty.name = this.name;
                newParty.size = this.size;
                newParty.time = this.time;
                newParty.phoneNo = this.contact;
                newParty.resv = this.reservation;
                this.DBHelper.addParty(newParty);
            }
            var alert_2 = this.alertCtrl.create({
                title: this.editMode ? "Edited Party Info Successfully Saved" : "Party Successfully Created",
                enableBackdropDismiss: false,
                buttons: [
                    {
                        text: "OK",
                        handler: function () { _this.exit(); }
                    }
                ]
            });
            alert_2.present();
        }
    };
    AddPartyPage.prototype.exit = function () {
        this.navCtrl.pop();
    };
    AddPartyPage.prototype.presentSizeNumpad = function () {
        var _this = this;
        var numpadModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__util_numpad__["a" /* InputNumpad */], {
            inputField: "Party Size",
            alertTitle: "Invalid Party Size",
            alertMsg: null,
            validInputCondition: function (input) { return input > 0; },
            secondaryValidInputCondition: null
        });
        numpadModal.onDidDismiss(function (returnedNum) {
            if (returnedNum != null) {
                _this.size = returnedNum;
            }
        });
        numpadModal.present();
    };
    AddPartyPage.prototype.presentContactNumpad = function () {
        var _this = this;
        var numpadModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__util_numpad__["a" /* InputNumpad */], {
            inputField: "Contact Number",
            alertTitle: "Invalid Contact Number",
            alertMsg: null,
            validInputCondition: function (input) {
                return (input > 999999999) && (input < 10000000000);
            },
            secondaryValidInputCondition: null
        });
        numpadModal.onDidDismiss(function (returnedNum) {
            if (returnedNum != null) {
                _this.contact = returnedNum;
            }
        });
        numpadModal.present();
    };
    AddPartyPage.prototype.validData = function () {
        return ((this.name != null) &&
            (this.size != null) &&
            (this.contact != null) &&
            (this.reservation != null) &&
            (!this.reservation || (this.time != null)));
    };
    AddPartyPage.prototype.getContactStr = function () {
        if (this.contact) {
            var phoneStr = this.contact.toString();
            if (phoneStr.length == 10) {
                return "(" + phoneStr.slice(0, 3) + ") " + phoneStr.slice(3, 6) + "-" + phoneStr.slice(6, 10);
            }
        }
        return this.contact.toString();
    };
    AddPartyPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-add-party',template:/*ion-inline-start:"C:\Users\Owner\documents\repos\dinein\dinein\src\pages\tables\add-party.html"*/'<ion-content no-bounce>\n\n	<div id="container">\n\n\n\n		<h3 class="colorprimary">Party Information</h3>\n\n\n\n		<ion-item class="inputfield">\n\n			<ion-input type="Text" placeholder="Name"\n\n								 [(ngModel)]="name"></ion-input>\n\n			<button ion-button item-end class="xbutton"\n\n							*ngIf="name != null"\n\n							(click)="name = null">x</button>\n\n		</ion-item>\n\n		<button class="inputbutton" ion-button outline block\n\n						[ngClass]="{\'inputbuttonnoval\': size == null,\n\n												\'inputbuttonhasval\': size != null}"\n\n						(click)="presentSizeNumpad()">\n\n			{{(size == null)? "Party Size" : size}}\n\n		</button>\n\n		<button class="inputbutton" ion-button outline block\n\n						[ngClass]="{\'inputbuttonnoval\': contact == null,\n\n												\'inputbuttonhasval\': contact != null}"\n\n						 (click)="presentContactNumpad()">\n\n			{{(contact == null)? "Contact Number" : getContactStr()}}\n\n		</button>\n\n\n\n		<ion-item id="reservationcheckbox">\n\n			<ion-label>Reservation?</ion-label>\n\n			<ion-checkbox [(ngModel)]="reservation"\n\n										[disabled]="editMode"></ion-checkbox>\n\n		</ion-item>\n\n		<ion-item *ngIf="reservation" class="timeselect">\n\n			<ion-datetime displayFormat="HH:mm"\n\n										pickerFormat="HH mm"\n\n										placeholder="Select Time"\n\n										[(ngModel)]="time"></ion-datetime>\n\n		</ion-item>\n\n\n\n		<button class="localbutton" ion-button block\n\n						(click)="submit()">Submit</button>\n\n		<button class="localbutton redbutton" ion-button block outline\n\n						(click)="exit()">Cancel</button>\n\n\n\n	</div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Owner\documents\repos\dinein\dinein\src\pages\tables\add-party.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_6__providers_dbhelper_dbhelper__["a" /* DbHelperProvider */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__util_date_time__["a" /* DateTimeService */],
            __WEBPACK_IMPORTED_MODULE_6__providers_dbhelper_dbhelper__["a" /* DbHelperProvider */]])
    ], AddPartyPage);
    return AddPartyPage;
}());

//# sourceMappingURL=add-party.js.map

/***/ }),

/***/ 163:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UpdateManagementPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_numpad__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_data_service__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var UpdateManagementPage = (function () {
    function UpdateManagementPage(navCtrl, alertCtrl, modalCtrl, data) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.data = data;
        this.restaurant = this.data.getRestaurant();
        this.name = this.restaurant.name;
        this.phone = this.restaurant.phoneNumber;
        this.addrLine1 = this.restaurant.addrLine1;
        this.addrLine2 = this.restaurant.addrLine2;
        this.managerPin = this.restaurant.managerPin;
    }
    UpdateManagementPage.prototype.submit = function () {
        this.restaurant.name = this.name;
        this.restaurant.phoneNumber = this.phone;
        this.restaurant.addrLine1 = this.addrLine1;
        this.restaurant.addrLine2 = this.addrLine2;
        this.restaurant.managerPin = this.managerPin;
        this.navCtrl.pop();
    };
    UpdateManagementPage.prototype.presentPhoneNumpad = function () {
        var _this = this;
        var numpadModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__util_numpad__["a" /* InputNumpad */], {
            inputField: "Phone Number",
            alertTitle: "Invalid Phone Number",
            alertMsg: null,
            validInputCondition: function (input) {
                return (input > 0) && (input < 1000000);
            },
            secondaryValidInputCondition: null
        });
        numpadModal.onDidDismiss(function (returnedNum) {
            if (returnedNum != null) {
                _this.phone = returnedNum;
            }
        });
        numpadModal.present();
    };
    UpdateManagementPage.prototype.presentPinNumpad = function () {
        var _this = this;
        var numpadModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__util_numpad__["a" /* InputNumpad */], {
            inputField: "Enter 4-digit PIN",
            alertTitle: "PIN must be 4 digits",
            alertMsg: null,
            validInputCondition: function (input) {
                return (input > 999) && (input < 10000);
            },
            secondaryValidInputCondition: null
        });
        numpadModal.onDidDismiss(function (returnedNum) {
            if (returnedNum != null) {
                _this.managerPin = returnedNum;
            }
        });
        numpadModal.present();
    };
    UpdateManagementPage.prototype.getPhoneStr = function () {
        if (this.phone) {
            var phoneStr = this.phone.toString();
            if (phoneStr.length == 10) {
                return "(" + phoneStr.slice(0, 3) + ") " + phoneStr.slice(3, 6) + "-" + phoneStr.slice(6, 10);
            }
        }
        return this.phone.toString();
    };
    UpdateManagementPage.prototype.exit = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Exit without saving?',
            message: 'Are you sure you want to exit without saving your changes?',
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Cancel',
                    handler: function () { }
                },
                {
                    text: 'Exit',
                    handler: function () { _this.navCtrl.pop(); }
                }
            ]
        });
        confirm.present();
    };
    UpdateManagementPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-update-management',template:/*ion-inline-start:"C:\Users\Owner\documents\repos\dinein\dinein\src\pages\management\update-management.html"*/'<ion-content no-bounce>\n\n	<div id="container">\n\n\n\n		<h3 class="colorprimary">Restaurant Information</h3>\n\n\n\n		<ion-item class="inputfield">\n\n			<ion-input type="Text" placeholder="Restaurant Name"\n\n								 [(ngModel)]="name"></ion-input>\n\n			<button ion-button item-end class="xbutton"\n\n							*ngIf="addrLine1 != null"\n\n							(click)="addrLine1 = null">x</button>\n\n		</ion-item>\n\n		<button class="inputbutton" ion-button outline block\n\n						[ngClass]="{\'inputbuttonnoval\': phone == null,\n\n												\'inputbuttonhasval\': phone != null}"\n\n						(click)="presentPhoneNumpad()">\n\n			{{(phone == null)? "Phone Number" : getPhoneStr()}}\n\n		</button>\n\n		<ion-item class="inputfield">\n\n			<ion-input type="Text" placeholder="Address Line 1"\n\n								 [(ngModel)]="addrLine1"></ion-input>\n\n			<button ion-button item-end class="xbutton"\n\n							*ngIf="addrLine1 != null"\n\n							(click)="addrLine1 = null">x</button>\n\n		</ion-item>\n\n		<ion-item class="inputfield">\n\n			<ion-input type="Text" placeholder="Address Line2"\n\n								 [(ngModel)]="addrLine2"></ion-input>\n\n			<button ion-button item-end class="xbutton"\n\n							*ngIf="addrLine2 != null"\n\n							(click)="addrLine2 = null">x</button>\n\n		</ion-item>\n\n		<button class="inputbutton" ion-button outline block\n\n							[ngClass]="{\'inputbuttonnoval\': managerPin == null,\n\n													\'inputbuttonhasval\': managerPin != null}"\n\n							(click)="presentPinNumpad()">\n\n				{{managerPin == null? "Owner/Manager access PIN" : "XXXX"}}\n\n		</button>\n\n\n\n		<button class="localbutton" ion-button block\n\n						(click)="submit()">Submit</button>\n\n		<button class="localbutton redbutton" ion-button block outline\n\n						(click)="exit()">Cancel</button>\n\n\n\n	</div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Owner\documents\repos\dinein\dinein\src\pages\management\update-management.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_3__util_data_service__["a" /* DataService */]])
    ], UpdateManagementPage);
    return UpdateManagementPage;
}());

//# sourceMappingURL=update-management.js.map

/***/ }),

/***/ 176:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 176;

/***/ }),

/***/ 220:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/edit-event/edit-event.module": [
		834,
		1
	],
	"../pages/employees/edit-employee.module": [
		835,
		7
	],
	"../pages/event-modal/event-modal.module": [
		836,
		0
	],
	"../pages/login/create-restaurant.module": [
		837,
		6
	],
	"../pages/login/create-user.module": [
		838,
		5
	],
	"../pages/login/login.module": [
		839,
		4
	],
	"../pages/management/update-management.module": [
		840,
		3
	],
	"../pages/tables/add-party.module": [
		841,
		2
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 220;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 33:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InputNumpad; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var InputNumpad = (function () {
    function InputNumpad(navCtrl, viewCtrl, alertCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.inputField = this.navParams.get('inputField');
        this.alertTitle = this.navParams.get('alertTitle');
        this.alertMsg = this.navParams.get('alertMsg');
        this.validInput = this.navParams.get('validInputCondition');
        this.secondaryValidInput = this.navParams.get('secondaryValidInputCondition');
        this.secondaryCondition = (this.secondaryValidInput != null);
        if (this.secondaryCondition) {
            this.secondaryAlertTitle = this.navParams.get('secondaryAlertTitle');
            this.secondaryAlertMsg = this.navParams.get('secondaryAlertMsg');
            this.secondaryAlertButton = this.navParams.get('secondaryAlertButton');
        }
        this.userInput = 0;
    }
    InputNumpad.prototype.pressButton = function (n) {
        if (this.userInput < 1000000000) {
            this.userInput = this.userInput * 10 + n;
        }
    };
    InputNumpad.prototype.deleteButton = function () {
        this.userInput = Math.floor(this.userInput / 10);
    };
    InputNumpad.prototype.clearButton = function () {
        this.userInput = 0;
    };
    InputNumpad.prototype.OK = function () {
        var _this = this;
        if (this.validInput(this.userInput)) {
            if (this.secondaryCondition) {
                if (this.secondaryValidInput(this.userInput)) {
                    this.viewCtrl.dismiss(this.userInput);
                }
                else {
                    var alert_1 = this.alertCtrl.create({
                        title: this.secondaryAlertTitle,
                        message: this.secondaryAlertMsg,
                        enableBackdropDismiss: false,
                        buttons: [
                            {
                                text: 'Cancel',
                                handler: function () { _this.clearButton(); }
                            },
                            {
                                text: this.secondaryAlertButton,
                                handler: function () { _this.viewCtrl.dismiss(_this.userInput); }
                            }
                        ]
                    });
                    alert_1.present();
                }
            }
            else {
                this.viewCtrl.dismiss(this.userInput);
            }
        }
        else {
            var alert_2 = this.alertCtrl.create({
                title: this.alertTitle,
                message: this.alertMsg,
                enableBackdropDismiss: false,
                buttons: [
                    {
                        text: 'OK',
                        handler: function () { }
                    }
                ]
            });
            alert_2.present();
        }
    };
    InputNumpad.prototype.cancel = function () {
        this.viewCtrl.dismiss(null);
    };
    InputNumpad = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'modal-numpad',template:/*ion-inline-start:"C:\Users\Owner\documents\repos\dinein\dinein\src\pages\util\numpad.html"*/'<div class="modalbase numpadmodal">\n\n	<h3 class="colormedium">{{inputField}}</h3>\n\n	<h2 class="colorprimary">{{userInput}}</h2>\n\n	<div style="height: 53%; width: 100%;">\n\n		<table class="numpad">\n\n			<tr>\n\n				<td><button class="numkey" ion-button (click)="pressButton(1)">1</button></td>\n\n				<td><button class="numkey" ion-button (click)="pressButton(2)">2</button></td>\n\n				<td><button class="numkey" ion-button (click)="pressButton(3)">3</button></td>\n\n			</tr>\n\n			<tr>\n\n				<td><button class="numkey" ion-button (click)="pressButton(4)">4</button></td>\n\n				<td><button class="numkey" ion-button (click)="pressButton(5)">5</button></td>\n\n				<td><button class="numkey" ion-button (click)="pressButton(6)">6</button></td>\n\n			</tr>\n\n			<tr>\n\n				<td><button class="numkey" ion-button (click)="pressButton(7)">7</button></td>\n\n				<td><button class="numkey" ion-button (click)="pressButton(8)">8</button></td>\n\n				<td><button class="numkey" ion-button (click)="pressButton(9)">9</button></td>\n\n			</tr>\n\n			<tr>\n\n				<td><button class="numkey" ion-button (click)="clearButton()">C</button></td>\n\n				<td><button class="numkey" ion-button (click)="pressButton(0)">0</button></td>\n\n				<td><button class="numkey" ion-button (click)="deleteButton()">del</button></td>\n\n			</tr>\n\n		</table>\n\n	</div>\n\n	<button class="modalbutton modalbuttonprimary" ion-button block (click)="OK()">OK</button>\n\n	<button class="modalbutton redbutton" ion-button block outline (click)="cancel()">Cancel</button>\n\n</div>'/*ion-inline-end:"C:\Users\Owner\documents\repos\dinein\dinein\src\pages\util\numpad.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
    ], InputNumpad);
    return InputNumpad;
}());

//# sourceMappingURL=numpad.js.map

/***/ }),

/***/ 352:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tables_tables__ = __webpack_require__(353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__employees_employees__ = __webpack_require__(354);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__timepunch_timepunch__ = __webpack_require__(355);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__punchcard_punchcard__ = __webpack_require__(445);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__calendar_calendar__ = __webpack_require__(446);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__management_management__ = __webpack_require__(447);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var TabsPage = (function () {
    function TabsPage() {
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_1__tables_tables__["d" /* TablesPage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_2__employees_employees__["a" /* EmployeesPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_3__timepunch_timepunch__["a" /* TimePunchPage */];
        this.tab4Root = __WEBPACK_IMPORTED_MODULE_4__punchcard_punchcard__["a" /* PunchCardPage */];
        this.tab5Root = __WEBPACK_IMPORTED_MODULE_5__calendar_calendar__["a" /* CalendarPage */];
        this.tab6Root = __WEBPACK_IMPORTED_MODULE_6__management_management__["a" /* ManagementPage */];
    }
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\Owner\documents\repos\dinein\dinein\src\pages\tabs\tabs.html"*/'<ion-tabs>\n\n  <ion-tab [root]="tab1Root" tabTitle="Tables" tabIcon="restaurant"></ion-tab>\n\n  <ion-tab [root]="tab2Root" tabTitle="Employees" tabIcon="people"></ion-tab>\n\n  <ion-tab [root]="tab3Root" tabTitle="TimePunch" tabIcon="time"></ion-tab>\n\n  <ion-tab [root]="tab4Root" tabTitle="PunchCard" tabIcon="clipboard"></ion-tab>\n\n  <ion-tab [root]="tab5Root" tabTitle="Calendar" tabIcon="calendar"></ion-tab>\n\n  <ion-tab [root]="tab6Root" tabTitle="Management" tabIcon="settings"></ion-tab>\n\n</ion-tabs>\n\n'/*ion-inline-end:"C:\Users\Owner\documents\repos\dinein\dinein\src\pages\tabs\tabs.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 353:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return TablesPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return TableInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PartyInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SelectServer; });
/* unused harmony export Mode */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__add_party__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_date_time__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util_numpad__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_interactjs__ = __webpack_require__(524);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_interactjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_interactjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__util_data_service__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__util_classes__ = __webpack_require__(50);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









/*
    BUGS:
    1) Static ID for party and tables keep counting after login-logout
         should be solved once we use ID's from DB
    2)
*/
var TablesPage = (function () {
    function TablesPage(navCtrl, modalCtrl, alertCtrl, actionSheetCtrl, viewCtrl, datetime, data) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.viewCtrl = viewCtrl;
        this.datetime = datetime;
        this.data = data;
        this.mode = Mode.Default;
        this.selectedParty = null;
        var restaurant = this.data.getRestaurant();
        this.restaurantName = restaurant.name;
        this.tables = restaurant.tables;
        this.parties = restaurant.parties;
        this.servers = restaurant.employees;
        this.parties.sort(__WEBPACK_IMPORTED_MODULE_7__util_classes__["c" /* Party */].compare);
        // TODO: get tables and parties from Database
        // Filter "parties" by date, get only the ones for today
        // Only reservations are going persist in database, grab those from database
        // TODO: write sorting algorithm for the whole list
    }
    TablesPage.prototype.ionViewDidLoad = function () {
        var i;
        for (i = 0; i < this.tables.length; i++) {
            var table = this.tables[i];
            var tableElement = document.getElementById('table' + table.ID);
            tableElement.setAttribute('data-x', table.xPos);
            tableElement.setAttribute('data-y', table.yPos);
            tableElement.style.webkitTransform =
                tableElement.style.transform =
                    'translate(' + table.xPos + 'px, ' + table.yPos + 'px)';
        }
    };
    TablesPage.prototype.ionViewWillLeave = function () {
        var i;
        for (i = 0; i < this.tables.length; i++) {
            var table = this.tables[i];
            var tableElement = document.getElementById('table' + table.ID);
            var x = tableElement.getAttribute('data-x');
            var y = tableElement.getAttribute('data-y');
            table.xPos = x;
            table.yPos = y;
        }
    };
    //----------------------------------------------------------------------------
    // Button Action: onTablePress
    //----------------------------------------------------------------------------
    TablesPage.prototype.onTablePress = function (table) {
        var _this = this;
        if (this.editingLayoutMode()) {
            /*
            let confirm = this.alertCtrl.create({
                title: 'Confirm Table Delete',
                message: 'This cannot be undone, are you sure?',
                enableBackdropDismiss: false,
                buttons: [
                    {
                        text: 'Cancel',
                        handler: () => { }
                    },
                    {
                        text: 'Delete',
                        handler: () => { this.deleteTable(table); }
                    }
                ]
            });
            confirm.present();*/
            return;
        }
        //
        // Not in seating party at table mode
        // Show table action sheet
        //
        if (!this.seatingPartyMode()) {
            this.presentTableActions(table);
            //
            // In seating party mode
            // Seat the party at table
            //
        }
        else {
            console.log('Table tapped in seating party mode');
            if (table.free) {
                if (this.selectedParty.size > table.capacity) {
                    console.log('Presented table overcapacity warning');
                    var confirm = this.alertCtrl.create({
                        title: 'Table Too Small',
                        message: 'Are you sure you want to seat them there?',
                        enableBackdropDismiss: false,
                        buttons: [
                            {
                                text: 'Cancel',
                                handler: function () { console.log('Cancelled seating overcapacity'); }
                            },
                            {
                                text: 'Seat',
                                handler: function () {
                                    console.log('Selected to seat overcapacity');
                                    _this.displaySelectServer(table, _this.selectedParty.size);
                                }
                            }
                        ]
                    });
                    confirm.present();
                }
                else {
                    // Seat number of party size at table
                    this.displaySelectServer(table, this.selectedParty.size);
                }
                // Table is Occupied
            }
            else {
                console.log('Tried to seat at occupied table');
                var alert = this.alertCtrl.create({
                    title: 'This table is currently occupied',
                    enableBackdropDismiss: false,
                    buttons: [{ text: 'Dismiss', handler: function () { } }]
                });
                alert.present();
            }
        }
    };
    //----------------------------------------------------------------------------
    // Button Action: onEditLayoutPress
    //----------------------------------------------------------------------------
    TablesPage.prototype.onEditLayoutPress = function () {
        if (this.editingLayoutMode()) {
            this.switchModeTo(Mode.Default);
            this.interactjsUpdate(false);
            console.log('mode now is ' + this.mode);
        }
        else {
            this.switchModeTo(Mode.EditingLayout);
            this.interactjsUpdate(true);
            console.log('mode now is ' + this.mode);
        }
    };
    //----------------------------------------------------------------------------
    // Button Action: onAddPartyPress
    //----------------------------------------------------------------------------
    TablesPage.prototype.onAddPartyPress = function () {
        console.log('Add Party Pressed');
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__add_party__["a" /* AddPartyPage */], { "parties": this.parties,
            "edit": false,
            "edit_party": null });
    };
    //----------------------------------------------------------------------------
    // Button Action: onCancelSeatingPartyPress
    //----------------------------------------------------------------------------
    TablesPage.prototype.onCancelSeatingPartyPress = function () {
        this.switchModeTo(Mode.Default);
    };
    //----------------------------------------------------------------------------
    // Action Sheet: presentTableActions
    //----------------------------------------------------------------------------
    TablesPage.prototype.presentTableActions = function (table) {
        var _this = this;
        var tableActions = this.actionSheetCtrl.create({
            title: 'Table ' + table.ID,
            buttons: [
                {
                    text: (table.free ? "Seat Party" : "Free Table"),
                    handler: function () {
                        if (table.free) {
                            console.log('Seat Table tapped on table ' + table.ID);
                            _this.displaySeatTableNumpad(table);
                        }
                        else {
                            console.log('Free Table tapped on table ' + table.ID);
                            table.freeTable();
                        }
                    }
                },
                {
                    text: 'Table Information',
                    handler: function () {
                        console.log('Table ' + table.ID + ' info tappped');
                        _this.displayTableInfo(table);
                    }
                },
                {
                    text: 'Delete Table',
                    handler: function () {
                        var confirm = _this.alertCtrl.create({
                            title: 'Confirm Table Delete',
                            message: 'This cannot be undone, are you sure?',
                            enableBackdropDismiss: false,
                            buttons: [
                                {
                                    text: 'Cancel',
                                    handler: function () { }
                                },
                                {
                                    text: 'Delete',
                                    handler: function () { _this.deleteTable(table); }
                                }
                            ]
                        });
                        confirm.present();
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () { }
                }
            ]
        });
        tableActions.present();
    };
    //----------------------------------------------------------------------------
    // Action Sheet: presentPartyActions
    //----------------------------------------------------------------------------
    TablesPage.prototype.presentPartyActions = function (party) {
        var _this = this;
        var partyActions = this.actionSheetCtrl.create({
            title: party.name + '\'s ' + (party.reservation ? "Reservation" : "Party"),
            buttons: [
                {
                    text: 'Seat Party',
                    handler: function () {
                        console.log('Selected Party ' + party.ID + ' to seat');
                        _this.switchModeTo(Mode.SeatingParty, party);
                    }
                },
                {
                    text: 'Party Information',
                    handler: function () {
                        console.log('Party ' + party.ID + ' info tappped');
                        _this.displayPartyInfo(party);
                    }
                },
                {
                    text: 'Edit Party',
                    handler: function () {
                        console.log('Party ' + party.ID + ' edit tappped');
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__add_party__["a" /* AddPartyPage */], { "parties": null,
                            "edit": true,
                            "edit_party": party });
                    }
                },
                {
                    text: 'Delete Party',
                    handler: function () {
                        console.log('Party ' + party.ID + ' delete tappped');
                        _this.deleteParty(party);
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () { }
                }
            ]
        });
        partyActions.present();
    };
    //----------------------------------------------------------------------------
    // MODAL TRIGGERS
    //----------------------------------------------------------------------------
    TablesPage.prototype.displayTableInfo = function (t) {
        var modal = this.modalCtrl.create(TableInfo, { table: t });
        modal.present();
    };
    TablesPage.prototype.displayPartyInfo = function (p) {
        var modal = this.modalCtrl.create(PartyInfo, { party: p });
        modal.present();
    };
    TablesPage.prototype.displaySeatTableNumpad = function (t) {
        var _this = this;
        var numpadModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__util_numpad__["a" /* InputNumpad */], {
            inputField: "Party Size",
            alertTitle: "Invalid Party Size",
            alertMsg: null,
            validInputCondition: function (input) { return input > 0; },
            secondaryValidInputCondition: function (input) { return input <= t.capacity; },
            secondaryAlertTitle: "Table is too Small",
            secondaryAlertMsg: "Are you sure you want to seat overcapacity?",
            secondaryAlertButton: "Seat"
        });
        numpadModal.onDidDismiss(function (returnedNum) {
            if (returnedNum != null) {
                _this.displaySelectServer(t, returnedNum);
            }
        });
        numpadModal.present();
    };
    TablesPage.prototype.displaySelectServer = function (table, numToSeat) {
        var _this = this;
        var modal = this.modalCtrl.create(SelectServer, { servers: this.servers });
        modal.onDidDismiss(function (server) {
            if (server != null) {
                table.seat(numToSeat, server.firstName, _this.datetime.getTime(), null);
                if (_this.seatingPartyMode()) {
                    _this.deleteParty(_this.selectedParty);
                    _this.switchModeTo(Mode.Default);
                }
            }
        });
        modal.present();
    };
    //----------------------------------------------------------------------------
    // AUXILLARY FUNCTIONS
    //----------------------------------------------------------------------------
    TablesPage.prototype.switchModeTo = function (newMode, party) {
        if (this.mode == newMode) {
            console.log('ERROR: tried to change mode to the same mode it is in');
            return;
        }
        if (Mode.SeatingParty == newMode) {
            if (party != null) {
                this.selectedParty = party;
            }
            else {
                console.log('ERROR: tried to change mode to Seating Party without party passed');
                return;
            }
        }
        else {
            this.selectedParty = null;
        }
        this.mode = newMode;
    };
    TablesPage.prototype.deleteParty = function (party) {
        this.parties.splice(this.parties.indexOf(party), 1);
    };
    TablesPage.prototype.deleteTable = function (table) {
        this.tables.splice(this.tables.indexOf(table), 1);
    };
    TablesPage.prototype.editingLayoutMode = function () {
        return this.mode == Mode.EditingLayout;
    };
    TablesPage.prototype.seatingPartyMode = function () {
        return this.mode == Mode.SeatingParty;
    };
    TablesPage.prototype.defaultMode = function () {
        return this.mode == Mode.Default;
    };
    TablesPage.prototype.addTable = function () {
        var _this = this;
        var numpadModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__util_numpad__["a" /* InputNumpad */], {
            inputField: "Table Capacity",
            alertTitle: "Invalid Table Capacity",
            alertMsg: null,
            validInputCondition: function (input) {
                return (input > 0) && (input < 100);
            },
            secondaryValidInputCondition: null
        });
        numpadModal.onDidDismiss(function (returnedNum) {
            if (returnedNum != null) {
                var t = new __WEBPACK_IMPORTED_MODULE_7__util_classes__["e" /* Table */](returnedNum, "0", "0");
                _this.tables.push(t);
            }
        });
        numpadModal.present();
    };
    TablesPage.prototype.interactjsUpdate = function (enabled) {
        if (enabled) {
            __WEBPACK_IMPORTED_MODULE_5_interactjs__('.tablediv').draggable({
                snap: {
                    targets: [
                        { x: 10, y: 10 }
                    ],
                    range: Infinity,
                    relativePoints: [{ x: 0, y: 0 }]
                },
                // enable inertial throwing
                inertia: false,
                // keep the element within the area of it's parent
                restrict: {
                    restriction: "parent",
                    endOnly: true,
                    elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
                },
                // enable autoScroll
                autoScroll: true,
                // call this function on every dragmove event
                onmove: dragMoveListener,
                // call this function on every dragend event
                onend: function (event) { }
            });
        }
        else {
            //interact('.tablediv').draggable(false)
        }
        function dragMoveListener(event) {
            var target = event.target, 
            // keep the dragged position in the data-x/data-y attributes
            x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx, y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
            // translate the element
            target.style.webkitTransform =
                target.style.transform =
                    'translate(' + x + 'px, ' + y + 'px)';
            // update the posiion attributes
            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
            //target.setAttribute('')
        }
    };
    TablesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-tables',template:/*ion-inline-start:"C:\Users\Owner\documents\repos\dinein\dinein\src\pages\tables\tables.html"*/'<ion-header>\n\n	<ion-navbar color="primary">\n\n\n\n		<div class="nav-bar">\n\n\n\n			<div id="topleft">\n\n				<div id="titletext">\n\n						<h3>{{restaurantName}}</h3>\n\n				</div>\n\n\n\n				<div id="navbuttons">\n\n					<div class="buttoncontainer">\n\n						<button class="navbutton" *ngIf="seatingPartyMode()"\n\n										ion-button color="tertiary" outline block\n\n										(click)="onCancelSeatingPartyPress()">\n\n							Cancel\n\n						</button>\n\n					</div>\n\n					<!-- add button necessary? -->\n\n					<!-- <button ion-button outline id="addbutton"\n\n					*ngIf="editingLayoutMode()"\n\n					[disabled]="seatingPartyMode()"\n\n					(click)="addTable()">\n\n					+\n\n			</button> -->\n\n					<div class="buttoncontainer">\n\n						<button class="navbutton" ion-button outline block\n\n										[disabled]="seatingPartyMode()"\n\n										(click)="onEditLayoutPress()">\n\n							{{editingLayoutMode()? "Done" : "Edit Layout"}}\n\n						</button>\n\n					</div>\n\n				</div>\n\n			</div>\n\n\n\n			<div id="topright">\n\n				<button class="navbutton" ion-button outline block\n\n								[disabled]="!defaultMode()"\n\n								(click)="onAddPartyPress()">\n\n						Add Party\n\n				</button>\n\n			</div>\n\n		</div>\n\n\n\n	</ion-navbar>\n\n</ion-header>\n\n\n\n<!-- Tables -->\n\n\n\n<ion-content no-bounce class="no-scroll" id="layoutview">\n\n	<div style="height: 100%; width: 100%; padding:10px;">\n\n		<div class="tablediv" id="{{\'table\'+table.ID}}"\n\n			*ngFor="let table of tables">\n\n			<button ion-button outline\n\n				[ngClass]="{\'table\': table.free && !seatingPartyMode() && !editingLayoutMode(),\n\n										\'tablechooseme\': table.free && seatingPartyMode() && !editingLayoutMode(),\n\n										\'tablenotfree\': !table.free && !editingLayoutMode(),\n\n										\'tablemovable\': editingLayoutMode()}"\n\n				(click)="onTablePress(table)">\n\n\n\n				<div class = "table-content">\n\n						<h6 class="colormedium tablebuttonID">\n\n								{{table.ID}}\n\n						</h6>\n\n						<h6 class="colormedium tablebuttonserver">\n\n								{{table.server}}\n\n						</h6>\n\n						<h4 class="tablebuttoncapacity">\n\n								{{table.getButtonText()}}\n\n						</h4>\n\n				</div>\n\n\n\n			</button>\n\n		</div>\n\n	</div>\n\n</ion-content>\n\n\n\n<!-- Side Scroll -->\n\n<ion-content id="sideview">\n\n		<div id="waitlist">\n\n				<ion-list scroll="true">\n\n						<button ion-button block outline class="listbutton"\n\n						*ngFor="let party of parties"\n\n						[ngClass]="{\'resparty\': party.reservation,\n\n						\'waitparty\': !party.reservation}"\n\n						[disabled]="!defaultMode()"\n\n						(click)="presentPartyActions(party)">\n\n						{{party.display()}}\n\n				</button>\n\n		</ion-list>\n\n</div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Owner\documents\repos\dinein\dinein\src\pages\tables\tables.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_3__util_date_time__["a" /* DateTimeService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__util_date_time__["a" /* DateTimeService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_6__util_data_service__["a" /* DataService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__util_data_service__["a" /* DataService */]) === "function" && _g || Object])
    ], TablesPage);
    return TablesPage;
    var _a, _b, _c, _d, _e, _f, _g;
}());

////////////////////////////////////////////////////////////////////////////////
// Sub-Views
////////////////////////////////////////////////////////////////////////////////
//------------------------------------------------------------------------------
// Sub-View: TableInfo
//------------------------------------------------------------------------------
var TableInfo = (function () {
    function TableInfo(navCtrl, params) {
        this.navCtrl = navCtrl;
        this.t = params.get('table');
    }
    TableInfo.prototype.dismiss = function () {
        this.navCtrl.pop();
    };
    TableInfo.prototype.editInfo = function () {
        console.log('Edit Table ID ', this.t.ID);
    };
    TableInfo = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-tables',
            template: "\n\t\t<div id=\"tablemodal\" class=\"modalbase\">\n\t\t\t<h3 class=\"colorprimary\">Table {{t.ID}}</h3>\n\t\t\t<h5 class=\"colormedium\">Status: {{t.getStatus()}}</h5>\n\t\t\t<h5 class=\"colormedium\">Capacity: {{t.capacity}}</h5>\n\t\t\t<h5 class=\"colormedium\">Current Party: {{t.partySize}}</h5>\n\t\t\t<h5 class=\"colormedium\">Time In: {{t.timeIn}}</h5>\n\t\t\t<h5 class=\"colormedium\">Server: {{t.server}}</h5>\n\t\t\t<h5 class=\"colormedium\">Guest: {{t.guest}}</h5>\n\n\t\t\t<div style=\"margin-top: 30px;\">\n\t\t\t\t<button class=\"modalbutton\" ion-button block (click)=\"dismiss()\">\n\t\t\t\t\tDismiss\n\t\t\t\t</button>\n\t\t\t</div>\n\t\t</div>\n\t"
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]) === "function" && _b || Object])
    ], TableInfo);
    return TableInfo;
    var _a, _b;
}());

//------------------------------------------------------------------------------
// Sub-View: PartyInfo
//------------------------------------------------------------------------------
var PartyInfo = (function () {
    function PartyInfo(navCtrl, params) {
        this.navCtrl = navCtrl;
        this.p = params.get('party');
    }
    PartyInfo.prototype.dismiss = function () {
        this.navCtrl.pop();
    };
    PartyInfo = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-tables',
            template: "\n\t\t<div id=\"partymodal\" class=\"modalbase\">\n\t\t\t<h3 class=\"colorprimary\">{{p.name}}'s {{p.getKind()}}</h3>\n\t\t\t<h5 class=\"colormedium\">Size: {{p.size}}</h5>\n\t\t\t<h5 class=\"colormedium\">Arrival Time: {{p.time}}</h5>\n\t\t\t<h5 class=\"colormedium\">Contact: {{p.getContactStr()}}</h5>\n\t\t\t<h5 class=\"colormedium\">ID: {{p.ID}}</h5>\n\n\t\t\t<div style=\"margin-top: 30px;\">\n\t\t\t\t<button class=\"modalbutton\" ion-button block (click)=\"dismiss()\">\n\t\t\t\t\tDismiss\n\t\t\t\t</button>\n\t\t\t</div>\n\t\t</div>\n\t"
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]) === "function" && _b || Object])
    ], PartyInfo);
    return PartyInfo;
    var _a, _b;
}());

//------------------------------------------------------------------------------
// Sub-View: SelectServer
//------------------------------------------------------------------------------
var SelectServer = (function () {
    function SelectServer(viewCtrl, params) {
        this.viewCtrl = viewCtrl;
        this.params = params;
        this.servers = params.get('servers');
        this.selectedServer = this.servers[0];
    }
    SelectServer.prototype.selectServer = function (s) {
        this.selectedServer = s;
    };
    SelectServer.prototype.OK = function () {
        this.viewCtrl.dismiss(this.selectedServer);
    };
    SelectServer.prototype.cancel = function () {
        this.viewCtrl.dismiss(null);
    };
    SelectServer = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-tables',
            template: "\n\t\t<div id=\"servermodal\" class=\"modalbase\">\n\t\t\t\t<h4 class=\"colorprimary\">Select Server</h4>\n\t\t\t\t<ion-content class=\"modallist\">\n\t\t\t\t\t<ion-list scroll=\"true\" id=\"listscroll\">\n\t\t\t\t\t\t<button ion-button block outline class=\"listbutton\"\n\t\t\t\t\t\t\t\t\t\t*ngFor=\"let server of servers\"\n\t\t\t\t\t\t\t\t\t\t[ngClass]=\"{'selectedserver': server === selectedServer,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t'server': server !== selectedServer}\"\n\t\t\t\t\t\t\t\t\t\t(click)=\"selectServer(server)\">\n\t\t\t\t\t\t\t{{server.getFullName()}}\n\t\t\t\t\t\t</button>\n\t\t\t\t\t</ion-list>\n\t\t\t\t</ion-content>\n\t\t\t\t<button class=\"modalbutton modalbuttonprimary\" ion-button block\n\t\t\t\t\t\t\t\t\t(click)=\"OK()\">OK</button>\n\t\t\t\t<button class=\"modalbutton redbutton\" ion-button block outline\n\t\t\t\t\t\t\t\t\t(click)=\"cancel()\">Cancel</button>\n\t\t</div>\n\t"
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]) === "function" && _b || Object])
    ], SelectServer);
    return SelectServer;
    var _a, _b;
}());

////////////////////////////////////////////////////////////////////////////////
// Classes
////////////////////////////////////////////////////////////////////////////////
var Mode;
(function (Mode) {
    Mode[Mode["Default"] = 0] = "Default";
    Mode[Mode["SeatingParty"] = 1] = "SeatingParty";
    Mode[Mode["EditingLayout"] = 2] = "EditingLayout";
})(Mode || (Mode = {}));
//# sourceMappingURL=tables.js.map

/***/ }),

/***/ 354:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmployeesPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return PunchPopoverPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__edit_employee__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_numpad__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util_data_service__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_dbhelper_dbhelper__ = __webpack_require__(41);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





//import { Restaurant } from '../management/management';
//import { Table, Party } from '../tables/tables';

var EmployeesPage = (function () {
    function EmployeesPage(navCtrl, popCtrl, modalCtrl, alertCtrl, data, DBHelper) {
        this.navCtrl = navCtrl;
        this.popCtrl = popCtrl;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.data = data;
        this.DBHelper = DBHelper;
        //searchQuery: string = '';
        this.placeholderImg = "https://openskymerchants.files.wordpress.com/2013/10/smile_icon.png";
        var restaurant = data.getRestaurant();
        this.employees = restaurant.employees;
        this.managerPin = restaurant.managerPin;
        //this.employees.sort(Employee.sortByLastName);
        this.selectedEmployee = this.employees[0];
    }
    EmployeesPage.prototype.presentPunchPopover = function (anEvent) {
        var popover = this.popCtrl.create(PunchPopoverPage, { selectedEmployee: this.selectedEmployee });
        popover.present({
            ev: anEvent
        });
    };
    EmployeesPage.prototype.onEditEmployeePress = function () {
        var _this = this;
        var pin = this.managerPin;
        var numpadModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__util_numpad__["a" /* InputNumpad */], {
            inputField: "Enter PIN",
            alertTitle: "Invalid PIN",
            alertMsg: null,
            validInputCondition: function (input) {
                return input == pin;
            },
            secondaryValidInputCondition: null
        });
        numpadModal.onDidDismiss(function (returnedNum) {
            if ((returnedNum == _this.managerPin) && (returnedNum != null)) {
                console.log(returnedNum);
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__edit_employee__["a" /* EditEmployeePage */], { editMode: true,
                    employee: _this.selectedEmployee,
                    employeesList: _this.employees });
            }
        });
        numpadModal.present();
    };
    EmployeesPage.prototype.onCreateEmployeePress = function () {
        var _this = this;
        var pin = this.managerPin;
        var numpadModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__util_numpad__["a" /* InputNumpad */], {
            inputField: "Enter PIN",
            alertTitle: "Invalid PIN",
            alertMsg: null,
            validInputCondition: function (input) {
                return input == pin;
            },
            secondaryValidInputCondition: null
        });
        numpadModal.onDidDismiss(function (returnedNum) {
            console.log(returnedNum);
            console.log(_this.managerPin);
            if ((returnedNum == _this.managerPin) && (returnedNum != null)) {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__edit_employee__["a" /* EditEmployeePage */], { editMode: false,
                    employee: null,
                    employeesList: _this.employees });
            }
        });
        numpadModal.present();
    };
    EmployeesPage.prototype.selectEmployee = function (myEvent, employee) {
        this.selectedEmployee = employee;
    };
    EmployeesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-employees',template:/*ion-inline-start:"C:\Users\Owner\documents\repos\dinein\dinein\src\pages\employees\employees.html"*/'<ion-header>\n\n	<div id="employeetitle">\n\n			<h3>Employees</h3>\n\n	</div>\n\n</ion-header>\n\n\n\n<ion-content no-bounce id="mainview">\n\n\n\n	<div id="profileleft">\n\n			<div id="imgcontainer">\n\n				<img id="employeeimage" src="{{selectedEmployee.imageSrc}}">\n\n			</div>\n\n	</div>\n\n\n\n	<div id="profileright">\n\n		<h3 class="colorprimary">{{selectedEmployee.getFullName()}}</h3>\n\n\n\n		<div id="employeeprofile">\n\n			<div id="labels">\n\n				<h5 class="colormiddark">ID:</h5>\n\n				<h5 class="colormiddark">Job Title:</h5>\n\n				<h5 class="colormiddark">Pay:</h5>\n\n				<h5 class="colormiddark">Phone:</h5>\n\n			</div>\n\n			<div id="employeeinfo">\n\n				<h5 class="colormedium">{{selectedEmployee.getIDStr()}}</h5>\n\n				<h5 class="colormedium">{{selectedEmployee.title}}</h5>\n\n				<h5 class="colormedium">${{selectedEmployee.pay.toFixed(2)}}/hr</h5>\n\n				<h5 class="colormedium">{{selectedEmployee.getPhoneStr()}}</h5>\n\n			</div>\n\n		</div>\n\n\n\n		<button class="localbutton" ion-button block outline\n\n						(click)="onEditEmployeePress()">\n\n			Edit Info\n\n		</button>\n\n	<!--\n\n		<button class="localbutton" ion-button block outline\n\n						(click)="presentPunchPopover($event)">\n\n			View Punch\n\n		</button>\n\n	-->\n\n		<button class="localbutton"  ion-button block\n\n						(click)="onCreateEmployeePress()">\n\n			Add New Employee\n\n		</button>\n\n	</div>\n\n\n\n</ion-content>\n\n\n\n<!-- List of Employees -->\n\n<ion-content id="sideview">\n\n	<div id="employeelist">\n\n		<ion-list scroll="true">\n\n			<button ion-button block outline class="listbutton"\n\n							*ngFor="let employee of employees"\n\n							[ngClass]="{\'employee\': employee.ID != selectedEmployee.ID,\n\n													\'selectedemployee\': employee.ID == selectedEmployee.ID}"\n\n							(click)="selectEmployee($event, employee)">\n\n				{{employee.getFullName()}}\n\n			</button>\n\n		</ion-list>\n\n	</div>\n\n</ion-content>\n\n\n\n<!--\n\n<ion-split-pane when="xs">\n\n	<div main>\n\n		<div id="editbutton">\n\n			<button ion-button block outline (click)="openEditPage()">\n\n				Edit Info\n\n			</button>\n\n\n\n				<button id="addButton" ion-button outline (click)="openCreatePage()">\n\n						Add New Employee\n\n				</button>\n\n\n\n		</div>\n\n\n\n		<div id="mainbody">\n\n			<div id="employeeprofile">\n\n				<img id="employeeimage" src="{{selectedEmployee.getSrc()}}">\n\n				<h1>{{selectedEmployee.getName()}}</h1>\n\n				<div id="employeeinfo">\n\n					<span class="label">Employee ID:</span> {{selectedEmployee.getID()}}\n\n					<br>\n\n					<span class="label">Title:</span> {{selectedEmployee.getTitle()}}\n\n					<br>\n\n					<span class="label">Pay:</span> {{selectedEmployee.getPay()}}\n\n					<br>\n\n					<span class="label">Phone:</span> {{selectedEmployee.getPhone()}}\n\n				</div>\n\n			</div>\n\n		</div>\n\n		<div id="viewpunchbutton">\n\n			<button ion-button block outline (click)="presentPunchPopover($event)">\n\n				View Punch\n\n			</button>\n\n		</div>\n\n	</div>\n\n\n\n	<div id="sidebar">\n\n		<div>\n\n\n\n			<h2>\n\n				EMPLOYEES\n\n			</h2>\n\n\n\n		</div>\n\n		<div id="employeelist">\n\n			<ion-list>\n\n				<button ion-button block outline *ngFor="let employee of employees" (click)="selectEmployee($event, employee)">\n\n					{{ employee.getName() }}\n\n				</button>\n\n				<button ion-button block outline *ngFor="let employee of employees" (click)="selectEmployee($event, employee)">\n\n					{{ employee.getName() }}\n\n				</button>\n\n				<button ion-button block outline *ngFor="let employee of employees" (click)="selectEmployee($event, employee)">\n\n					{{ employee.getName() }}\n\n				</button>\n\n			</ion-list>\n\n		</div>\n\n	</div>\n\n</ion-split-pane>\n\n-->\n\n'/*ion-inline-end:"C:\Users\Owner\documents\repos\dinein\dinein\src\pages\employees\employees.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_5__providers_dbhelper_dbhelper__["a" /* DbHelperProvider */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* PopoverController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_4__util_data_service__["a" /* DataService */],
            __WEBPACK_IMPORTED_MODULE_5__providers_dbhelper_dbhelper__["a" /* DbHelperProvider */]])
    ], EmployeesPage);
    return EmployeesPage;
}());

//@IonicPage()
var PunchPopoverPage = (function () {
    function PunchPopoverPage(viewCtrl, popCtl, navParams) {
        this.viewCtrl = viewCtrl;
        this.popCtl = popCtl;
        this.navParams = navParams;
        this.selectedEmployee = this.navParams.get("selectedEmployee");
        var currDate = new Date(); //initialized to current date
        this.dd = currDate.getDate();
        this.mm = currDate.getMonth() + 1; //January is 0
        var yyyy = currDate.getFullYear();
        if (this.dd < 10) {
            this.dd = '0' + this.dd;
        }
        if (this.mm < 10) {
            this.mm = '0' + this.mm;
        }
        this.startDate = yyyy + "-" + this.mm + "-" + this.dd;
        this.endDate = this.startDate;
        this.currentDate = this.startDate;
    }
    PunchPopoverPage.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    PunchPopoverPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-employees',
            template: "\n\n\t<ion-content class=\"popover\">\n\t\t<ion-item>\n\t\t\t<h3>{{selectedEmployee.firstName}}'s Punches</h3>\n\t\t</ion-item>\n\t\t<ion-item>\n\t\t\t<ion-label>From:</ion-label>\n\t\t\t<ion-datetime displayFormat=\"YYYY-MMM-DD\" pickerFormat=\"DD-MMMM-YYYY\" max=\"{{currentDate}}\" [(ngModel)]=\"startDate\"></ion-datetime>\n\t\t</ion-item>\n\t\t<ion-item>\n\t\t\t<ion-label>To:</ion-label>\n\t\t\t<ion-datetime displayFormat=\"YYYY-MMM-DD\" pickerFormat=\"DD-MMMM-YYYY\" min=\"{{startDate}}\" max=\"{{currentDate}}\" [(ngModel)]=\"endDate\"></ion-datetime>\n\t\t</ion-item>\n\t\t<button ion-item (click)=\"close()\">VIEW</button>\n\t</ion-content>\n\n\n\t"
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* PopoverController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
    ], PunchPopoverPage);
    return PunchPopoverPage;
}());

//# sourceMappingURL=employees.js.map

/***/ }),

/***/ 355:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TimePunchPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs__ = __webpack_require__(525);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_date_time__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util_data_service__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__DBAssets_DBObjects__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_dbhelper_dbhelper__ = __webpack_require__(41);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var TimePunchPage = (function () {
    function TimePunchPage(navCtrl, alertCtrl, dateTime, data, DBHelper) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.dateTime = dateTime;
        this.data = data;
        this.DBHelper = DBHelper;
        this.currDateTime = new Date();
        this.ID = 0;
        var source = __WEBPACK_IMPORTED_MODULE_2_rxjs__["Observable"].interval(1000); // 1 second subscription
        this.subscription = source.subscribe(function () { _this.currDateTime = new Date(); });
        var restaurant = this.data.getRestaurant();
        this.employees = restaurant.employees;
        this.employeeToPunch = null;
    }
    TimePunchPage.prototype.submit = function () {
        var _this = this;
        if (this.validID()) {
            var currTime_1 = this.dateTime.getDateTime();
            var employee_1 = this.getEmployeeByID();
            var alert_1 = this.alertCtrl.create({
                title: 'Punch for ' + employee_1.getFullName() + ' at ' + currTime_1 + '?',
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: function () { }
                    },
                    {
                        text: 'Confirm',
                        handler: function () {
                            if (employee_1.isCurrentlyWorking()) {
                                employee_1.punchOut(currTime_1);
                            }
                            else {
                                var newShift = new __WEBPACK_IMPORTED_MODULE_5__DBAssets_DBObjects__["d" /* ShiftObject */]();
                                newShift.name = employee_1.getFullName();
                                newShift.startTime = currTime_1;
                                _this.DBHelper.addShift(newShift);
                                employee_1.punchIn(currTime_1);
                            }
                            _this.ID = 0;
                        }
                    }
                ]
            });
            alert_1.present();
        }
        else {
            var alert_2 = this.alertCtrl.create({
                title: 'Invalid Employee ID',
                buttons: [
                    {
                        text: 'Dismiss',
                        role: 'cancel',
                        handler: function () { }
                    }
                ]
            });
            alert_2.present();
        }
    };
    TimePunchPage.prototype.validID = function () {
        var i;
        for (i = 0; i < this.employees.length; i++) {
            if (this.ID == this.employees[i].ID) {
                return true;
            }
        }
        return false;
    };
    TimePunchPage.prototype.getEmployeeByID = function () {
        var i;
        for (i = 0; i < this.employees.length; i++) {
            if (this.ID == this.employees[i].ID) {
                return this.employees[i];
            }
        }
    };
    TimePunchPage.prototype.pressButton = function (n) {
        if (this.ID < 1000) {
            this.ID = this.ID * 10 + n;
        }
    };
    TimePunchPage.prototype.deleteButton = function () {
        this.ID = Math.floor(this.ID / 10);
        ;
    };
    TimePunchPage.prototype.clearButton = function () {
        this.ID = 0;
    };
    TimePunchPage.prototype.getIDStr = function () {
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
    };
    TimePunchPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-timepunch',template:/*ion-inline-start:"C:\Users\Owner\documents\repos\dinein\dinein\src\pages\timepunch\timepunch.html"*/'<ion-content no-bounce class="background no-scroll">\n\n  <div id="container">\n\n\n\n    <div class = "punch-textbox">\n\n      <h2 class="colorprimary">Punch In/Out</h2>\n\n      <br>\n\n      <h4 class="colormedium">{{currDateTime | date: \'EEE MMM d, yyyy\'}}</h4>\n\n      <h4 class="colormedium">{{currDateTime | date: \'HH:mm:ss\'}}</h4>\n\n      <br>\n\n      <div id="idsection" [ngClass]="{\'valididbox\': validID(),\n\n                                      \'invalididbox\': !validID()}">\n\n        <div id="label">\n\n          <h2 class="colormedium">ID:</h2>\n\n        </div>\n\n        <div id="idtext">\n\n          <h2 [ngClass]="{\'colorprimary\': validID(),\n\n                          \'colorsecondary\': !validID()}">{{getIDStr()}}</h2>\n\n        </div>\n\n      </div>\n\n    </div>\n\n\n\n    <div class="numpad-box">\n\n      <table class="numpad">\n\n        <tr class="numpadrow">\n\n          <td><button class="numkey" ion-button (click)="pressButton(1)">1</button></td>\n\n          <td><button class="numkey" ion-button (click)="pressButton(2)">2</button></td>\n\n          <td><button class="numkey" ion-button (click)="pressButton(3)">3</button></td>\n\n        </tr>\n\n        <tr class="numpadrow">\n\n          <td><button class="numkey" ion-button (click)="pressButton(4)">4</button></td>\n\n          <td><button class="numkey" ion-button (click)="pressButton(5)">5</button></td>\n\n          <td><button class="numkey" ion-button (click)="pressButton(6)">6</button></td>\n\n        </tr>\n\n        <tr class="numpadrow">\n\n          <td><button class="numkey" ion-button (click)="pressButton(7)">7</button></td>\n\n          <td><button class="numkey" ion-button (click)="pressButton(8)">8</button></td>\n\n          <td><button class="numkey" ion-button (click)="pressButton(9)">9</button></td>\n\n        </tr>\n\n        <tr class="numpadrow">\n\n          <td><button class="numkey" ion-button (click)="clearButton()">C</button></td>\n\n          <td><button class="numkey" ion-button (click)="pressButton(0)">0</button></td>\n\n          <td><button class="numkey" ion-button (click)="deleteButton()">del</button></td>\n\n        </tr>\n\n      </table>\n\n\n\n\n\n        <button class="localbutton" ion-button block (click)="submit()">Submit</button>\n\n\n\n\n\n    </div>\n\n\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Owner\documents\repos\dinein\dinein\src\pages\timepunch\timepunch.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_6__providers_dbhelper_dbhelper__["a" /* DbHelperProvider */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_3__util_date_time__["a" /* DateTimeService */],
            __WEBPACK_IMPORTED_MODULE_4__util_data_service__["a" /* DataService */],
            __WEBPACK_IMPORTED_MODULE_6__providers_dbhelper_dbhelper__["a" /* DbHelperProvider */]])
    ], TimePunchPage);
    return TimePunchPage;
}());

//# sourceMappingURL=timepunch.js.map

/***/ }),

/***/ 41:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DbHelperProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__DBAssets_URLParser__ = __webpack_require__(523);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
  Generated class for the DbHelperProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var DbHelperProvider = (function () {
    function DbHelperProvider(http) {
        this.http = http;
        console.log('Hello DbHelperProvider Provider');
        //this.url = 'http://localhost:8080/api';
        this.url = 'https://dineinapi.herokuapp.com/api';
        this.urlParser = new __WEBPACK_IMPORTED_MODULE_2__DBAssets_URLParser__["a" /* URLParser */]();
    }
    //USERObject methods
    DbHelperProvider.prototype.addUser = function (newUser) {
        var newURL = this.urlParser.addUser(this.url, newUser);
        console.log("URLparser returned " + newURL);
        this.http.post(newURL, {}).subscribe(function (val) {
            console.log("POST call successful value returned in body", val);
        }, function (response) {
            console.log("POST call in error", response);
        }, function () {
            console.log("The POST observable is now completed.");
        });
    };
    DbHelperProvider.prototype.authenticateLogin = function (userName, password) {
        var newURL = this.urlParser.authenticateUser(this.url, userName, password);
        //let user = new UserObject();
        console.log("URLParser returned " + newURL);
        this.http.get(newURL).subscribe(function (res) { return console.log(JSON.stringify(res)); });
        return true;
    };
    //RESTAURANT methods
    DbHelperProvider.prototype.addRestaurant = function (newRest) {
        var newURL = this.urlParser.addRestaurant(this.url, newRest);
        console.log("URLparser returned " + newURL);
        this.http.post(newURL, {}).subscribe(function (val) {
            console.log("POST call successful value returned in body", val);
        }, function (response) {
            console.log("POST call in error", response);
        }, function () {
            console.log("The POST observable is now completed.");
        });
    };
    //EMPLOYEE methods
    DbHelperProvider.prototype.addEmployee = function (newEmployee) {
        var newURL = this.urlParser.addEmployee(this.url, newEmployee);
        console.log("URLparser returned " + newURL);
        this.http.post(newURL, {}).subscribe(function (val) {
            console.log("POST call successful value returned in body", val);
        }, function (response) {
            console.log("POST call in error", response);
        }, function () {
            console.log("The POST observable is now completed.");
        });
    };
    //TABLE methods
    DbHelperProvider.prototype.addTable = function (newTable) {
        var newURL = this.urlParser.addTable(this.url, newTable);
        console.log("URLparser returned " + newURL);
        this.http.post(newURL, {}).subscribe(function (val) {
            console.log("POST call successful value returned in body", val);
        }, function (response) {
            console.log("POST call in error", response);
        }, function () {
            console.log("The POST observable is now completed.");
        });
    };
    //PARTY methods
    DbHelperProvider.prototype.addParty = function (newParty) {
        var newURL = this.urlParser.addParty(this.url, newParty);
        console.log("URLparser returned " + newURL);
        this.http.post(newURL, {}).subscribe(function (val) {
            console.log("POST call successful value returned in body", val);
        }, function (response) {
            console.log("POST call in error", response);
        }, function () {
            console.log("The POST observable is now completed.");
        });
    };
    //PUNCh methods
    DbHelperProvider.prototype.addShift = function (newShift) {
        var newURL = this.urlParser.addShift(this.url, newShift);
        console.log("URLparser returned " + newURL);
        this.http.post(newURL, {}).subscribe(function (val) {
            console.log("POST call successful value returned in body", val);
        }, function (response) {
            console.log("POST call in error", response);
        }, function () {
            console.log("The POST observable is now completed.");
        });
    };
    DbHelperProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], DbHelperProvider);
    return DbHelperProvider;
}());

//# sourceMappingURL=dbhelper.js.map

/***/ }),

/***/ 42:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_classes__ = __webpack_require__(50);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DataService = (function () {
    function DataService() {
        var owner = new __WEBPACK_IMPORTED_MODULE_1__util_classes__["a" /* Employee */]("Michael", "Fassbender", "Owner", 100000.01, 2024561111, "../assets/imgs/mikefass.jpg", 1);
        this.restaurant = new __WEBPACK_IMPORTED_MODULE_1__util_classes__["d" /* Restaurant */]("Osteria Francescana", 6088060806, owner, "168 World's End St.", "Nowhere, NO, 99999", 1688);
        var tempEmployees = [
            new __WEBPACK_IMPORTED_MODULE_1__util_classes__["a" /* Employee */]("Anna", "Schmidt", "Manager", 50.00, 6086076006, "https://i.pinimg.com/736x/25/48/31/25483183a26a96adcc2b5a4002eda6ca--headshot-ideas-professional-photographer.jpg", 2),
            new __WEBPACK_IMPORTED_MODULE_1__util_classes__["a" /* Employee */]("Carl", "Robins", "Assistant Manager", 30.00, 6083456789, "http://www.math.uni-frankfurt.de/~person/_4170854.jpg", 10),
            new __WEBPACK_IMPORTED_MODULE_1__util_classes__["a" /* Employee */]("Marianne", "Beaumont", "Host/Hostess", 15.00, 9119119911, "http://www.pearsonvue.com/pteprofessional/images/homepage.png"),
            new __WEBPACK_IMPORTED_MODULE_1__util_classes__["a" /* Employee */]("Phil", "Scott", "Bartender", 10.00, 6083104545, "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Robert_gold_bartender.jpg/220px-Robert_gold_bartender.jpg"),
            new __WEBPACK_IMPORTED_MODULE_1__util_classes__["a" /* Employee */]("Kevin", "Anderson", "Server", 5.00, 6088067777, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxhJ8HaQ88jGA0Ws2WTCnI4DzSgMzvEXk4qdbQVbCAiKyP9yGl"),
            new __WEBPACK_IMPORTED_MODULE_1__util_classes__["a" /* Employee */]("Daniel", "Radcliffe", "Server", 1.00, 7299389920, "https://img.buzzfeed.com/buzzfeed-static/static/2018-01/12/14/asset/buzzfeed-prod-fastlane-03/sub-buzz-18898-1515786282-5.jpg?downsize=715:*&output-format=auto&output-quality=auto"),
            new __WEBPACK_IMPORTED_MODULE_1__util_classes__["a" /* Employee */]("Arnold", "Schwarznegger", "Cook", 9999.99, 9999999999, "https://upload.wikimedia.org/wikipedia/commons/1/10/Arnold_Schwarzenegger_September_2017.jpg"),
            new __WEBPACK_IMPORTED_MODULE_1__util_classes__["a" /* Employee */]("Kevin", "Spacey", "Server", 0.01, 8299291834, "https://www.gannett-cdn.com/-mm-/cafa601533d164e1a938fceb66dbd9ba7dec8622/c=1252-527-2956-1808&r=x404&c=534x401/local/-/media/2017/11/08/USATODAY/USATODAY/636457309000424528-XXX-AFP-TZ54V-95172455.JPG"),
            new __WEBPACK_IMPORTED_MODULE_1__util_classes__["a" /* Employee */]("Anthony", "Hopkins", "Bartender", 50.00, 7144969596, "https://www.biography.com/.image/t_share/MTE5NDg0MDU1MDAxMDczMTY3/sir-anthony-hopkins-9343556-1-402.jpg"),
            new __WEBPACK_IMPORTED_MODULE_1__util_classes__["a" /* Employee */]("Cara", "Delevingne", "Server", 15.00, 6783859873, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmLg8W3_tJ--QpQhPQjFglY9G-Tu9pCyWV-5UR8FLe4lFGXJhE"),
            new __WEBPACK_IMPORTED_MODULE_1__util_classes__["a" /* Employee */]("Kameron", "Young", "Server", 10.00, 6088067777, "https://scontent-ort2-1.xx.fbcdn.net/v/t1.0-9/13077027_1318802494800331_7760229749495766368_n.jpg?_nc_cat=0&oh=86e592e3eea0db57911dc21527f25dec&oe=5B965C90"),
            new __WEBPACK_IMPORTED_MODULE_1__util_classes__["a" /* Employee */]("Casey", "Nitz", "Server", 11.00, 6096084456, "https://scontent-ort2-1.xx.fbcdn.net/v/t31.0-8/1511827_792745014132756_977096387972296994_o.jpg?_nc_cat=0&oh=b31aba57dc71c510bb519eb13c1a1108&oe=5B8EF421"),
            new __WEBPACK_IMPORTED_MODULE_1__util_classes__["a" /* Employee */]("Suzy", "Kong", "Server", 12.00, 5938377872, "https://scontent-ort2-1.xx.fbcdn.net/v/t1.0-9/27073417_1873106099611377_6868467175191870057_n.jpg?_nc_cat=0&oh=61fe7c000239c0767dd7975c790defd0&oe=5B902065"),
            new __WEBPACK_IMPORTED_MODULE_1__util_classes__["a" /* Employee */]("Jimmie", "Plautz", "Server", 13.00, 6087299485, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYKzL4WtUsWpaDI_PkYH01KiEEwByV8JDplXwvdvJfrnEYa330"),
            new __WEBPACK_IMPORTED_MODULE_1__util_classes__["a" /* Employee */]("Kass", "Chupongstimun", "Server", 14.00, 6086095186, "https://scontent-ort2-1.xx.fbcdn.net/v/t1.0-9/29570700_1895844113789958_947715976665000958_n.jpg?_nc_cat=0&oh=2b736c14194f3e72574a68df67838e69&oe=5B9D77DD"),
            new __WEBPACK_IMPORTED_MODULE_1__util_classes__["a" /* Employee */]("Tina", "Russo", "Chef", 500.00, 4149217439, "https://cdn2.goabroad.com/images/program_content/5-tips-for-teaching-english-abroad-as-a-person-of-color-2-1462426680.jpg"),
            new __WEBPACK_IMPORTED_MODULE_1__util_classes__["a" /* Employee */]("Bryan", "Suzan", "DJ", 0.03, 6666666666, "../../assets/imgs/bryan.jpg")
        ];
        var tempTables = [
            new __WEBPACK_IMPORTED_MODULE_1__util_classes__["e" /* Table */](8, "20", "20"), new __WEBPACK_IMPORTED_MODULE_1__util_classes__["e" /* Table */](8, "120", "20"),
            new __WEBPACK_IMPORTED_MODULE_1__util_classes__["e" /* Table */](4, "320", "20"), new __WEBPACK_IMPORTED_MODULE_1__util_classes__["e" /* Table */](2, "520", "20"),
            new __WEBPACK_IMPORTED_MODULE_1__util_classes__["e" /* Table */](3, "20", "230"), new __WEBPACK_IMPORTED_MODULE_1__util_classes__["e" /* Table */](2, "20", "330"),
            new __WEBPACK_IMPORTED_MODULE_1__util_classes__["e" /* Table */](3, "120", "330"), new __WEBPACK_IMPORTED_MODULE_1__util_classes__["e" /* Table */](3, "320", "230"),
            new __WEBPACK_IMPORTED_MODULE_1__util_classes__["e" /* Table */](3, "320", "330"), new __WEBPACK_IMPORTED_MODULE_1__util_classes__["e" /* Table */](2, "520", "230"),
            new __WEBPACK_IMPORTED_MODULE_1__util_classes__["e" /* Table */](2, "520", "330")
        ];
        var tempParties = [
            new __WEBPACK_IMPORTED_MODULE_1__util_classes__["c" /* Party */]("Kass", 7, "04:20", 6086095186, true),
            new __WEBPACK_IMPORTED_MODULE_1__util_classes__["c" /* Party */]("Kameron", 2, "18:15", 5065065006, false),
            new __WEBPACK_IMPORTED_MODULE_1__util_classes__["c" /* Party */]("Jimmie", 3, "21:01", 9999999999, false),
            new __WEBPACK_IMPORTED_MODULE_1__util_classes__["c" /* Party */]("Suzy", 4, "09:00", 1234567890, false),
            new __WEBPACK_IMPORTED_MODULE_1__util_classes__["c" /* Party */]("Casey", 4, "05:55", 6667778888, true),
            new __WEBPACK_IMPORTED_MODULE_1__util_classes__["c" /* Party */]("Pete", 7, "05:54", 6969696969, false),
            new __WEBPACK_IMPORTED_MODULE_1__util_classes__["c" /* Party */]("Kay", 2, "00:59", 7773331111, false),
            new __WEBPACK_IMPORTED_MODULE_1__util_classes__["c" /* Party */]("Magaret", 4, "05:20", 9099099900, true),
            new __WEBPACK_IMPORTED_MODULE_1__util_classes__["c" /* Party */]("Joyce", 3, "05:55", 4156937782, false),
            new __WEBPACK_IMPORTED_MODULE_1__util_classes__["c" /* Party */]("Ivan", 5, "11:59", 4526565665, false),
            new __WEBPACK_IMPORTED_MODULE_1__util_classes__["c" /* Party */]("Jason", 8, "11:59", 3848892467, false),
            new __WEBPACK_IMPORTED_MODULE_1__util_classes__["c" /* Party */]("Ben", 5, "00:00", 5555555555, true),
            new __WEBPACK_IMPORTED_MODULE_1__util_classes__["c" /* Party */]("Issac", 6, "23:59", 9876543210, true),
            new __WEBPACK_IMPORTED_MODULE_1__util_classes__["c" /* Party */]("Leslie", 6, "24:59", 9119119911, false)
        ];
        var i;
        for (i = 0; i < tempEmployees.length; i++) {
            this.restaurant.employees.push(tempEmployees[i]);
        }
        for (i = 0; i < tempTables.length; i++) {
            this.restaurant.tables.push(tempTables[i]);
        }
        for (i = 0; i < tempParties.length; i++) {
            this.restaurant.parties.push(tempParties[i]);
        }
        for (i = 0; i < this.restaurant.employees.length; i++) {
            this.restaurant.employees[i].shifts =
                [
                    new __WEBPACK_IMPORTED_MODULE_1__util_classes__["b" /* EmployeeShift */]("04/15/2018 07:00", "04/15/2018 12:00", this.restaurant.employees[i].getFullName()),
                    new __WEBPACK_IMPORTED_MODULE_1__util_classes__["b" /* EmployeeShift */]("04/15/2018 15:00", "04/15/2018 21:00", this.restaurant.employees[i].getFullName()),
                    new __WEBPACK_IMPORTED_MODULE_1__util_classes__["b" /* EmployeeShift */]("04/16/2018 07:30", "04/16/2018 11:00", this.restaurant.employees[i].getFullName()),
                    new __WEBPACK_IMPORTED_MODULE_1__util_classes__["b" /* EmployeeShift */]("04/16/2018 17:00", "04/16/2018 23:00", this.restaurant.employees[i].getFullName()),
                    new __WEBPACK_IMPORTED_MODULE_1__util_classes__["b" /* EmployeeShift */]("04/17/2018 10:00", "04/17/2018 14:00", this.restaurant.employees[i].getFullName()),
                    new __WEBPACK_IMPORTED_MODULE_1__util_classes__["b" /* EmployeeShift */]("04/17/2018 18:00", "04/17/2018 23:30", this.restaurant.employees[i].getFullName()),
                    new __WEBPACK_IMPORTED_MODULE_1__util_classes__["b" /* EmployeeShift */]("04/18/2018 20:00", "04/19/2018 02:00", this.restaurant.employees[i].getFullName()),
                    new __WEBPACK_IMPORTED_MODULE_1__util_classes__["b" /* EmployeeShift */]("04/20/2018 04:20", "04/20/2018 16:20", this.restaurant.employees[i].getFullName()),
                    new __WEBPACK_IMPORTED_MODULE_1__util_classes__["b" /* EmployeeShift */]("04/21/2018 18:30", "04/21/2018 22:15", this.restaurant.employees[i].getFullName()),
                    new __WEBPACK_IMPORTED_MODULE_1__util_classes__["b" /* EmployeeShift */]("04/22/2018 07:00", "04/22/2018 12:00", this.restaurant.employees[i].getFullName()),
                    new __WEBPACK_IMPORTED_MODULE_1__util_classes__["b" /* EmployeeShift */]("04/23/2018 15:30", "04/23/2018 20:15", this.restaurant.employees[i].getFullName()),
                    new __WEBPACK_IMPORTED_MODULE_1__util_classes__["b" /* EmployeeShift */]("04/24/2018 18:15", "04/24/2018 23:45", this.restaurant.employees[i].getFullName()),
                    new __WEBPACK_IMPORTED_MODULE_1__util_classes__["b" /* EmployeeShift */]("04/25/2018 18:45", undefined, this.restaurant.employees[i].getFullName())
                ];
        }
        /*
                    this.restaurant.employees[17].shifts = [
                                                                        new EmployeeShift("02/01/2018 06:00", "02/01/2018 18:00",
                                                                        ),
                                                                        new EmployeeShift("02/02/2018 07:00", "02/02/2018 07:15", "Bryan Suzan"),
                                                                        new EmployeeShift("02/14/2018 08:00", "02/14/2018 09:30", "Bryan Suzan"),
                                                                        new EmployeeShift("04/01/2018 18:00", "04/02/2018 18:00", "Bryan Suzan"),
                                                                        new EmployeeShift("04/20/2018 04:20", "04/20/2018 14:20", "Bryan Suzan"),
                                                                        new EmployeeShift("04/21/2018 00:20", "04/21/2018 01:54", "Bryan Suzan"),
                                                                        new EmployeeShift("02/01/2018 06:01", "02/01/2018 18:00", "Bryan Suzan"),
                                                                        new EmployeeShift("02/02/2018 07:01", "02/02/2018 07:15", "Bryan Suzan"),
                                                                        new EmployeeShift("02/14/2018 08:01", "02/14/2018 09:30", "Bryan Suzan"),
                                                                        new EmployeeShift("04/01/2018 18:01", "04/02/2018 18:00", "Bryan Suzan"),
                                                                        new EmployeeShift("04/20/2018 04:21", "04/20/2018 14:20", "Bryan Suzan"),
                                                                        new EmployeeShift("04/21/2018 00:21", "04/21/2018 01:54", "Bryan Suzan"),
                                                                        new EmployeeShift("04/22/2018 07:01", undefined, "Bryan Suzan")
                                                                     ];
                this.restaurant.employees[2].shifts = [
                                                                        new EmployeeShift("02/01/2018 00:00", "02/01/2018 23:59", "Carl Robins"),
                                                                        new EmployeeShift("02/02/2018 23:45", "02/03/2018 00:15", "Carl Robins"),
                                                                        new EmployeeShift("02/11/2018 08:13", "02/14/2018 13:22", "Carl Robins"),
                                                                        new EmployeeShift("04/20/2018 18:00", "04/02/2018 18:00", "Carl Robins"),
                                                                        new EmployeeShift("04/20/2018 04:20", "02/01/2018 14:20", "Carl Robins")
                                                                     ];
                this.restaurant.employees[3].shifts = [
                                                                        new EmployeeShift("02/01/2018 06:00", "02/01/2018 18:00", "Marianne Beaumont"),
                                                                        new EmployeeShift("02/02/2018 07:00", "02/02/2018 07:15", "Marianne Beaumont"),
                                                                        new EmployeeShift("02/14/2018 08:00", "02/14/2018 09:30", "Marianne Beaumont"),
                                                                        new EmployeeShift("04/01/2018 18:00", "04/02/2018 18:00", "Marianne Beaumont"),
                                                                        new EmployeeShift("04/20/2018 04:20", "02/01/2018 14:20", "Marianne Beaumont")
                                                                     ];
                this.restaurant.employees[1].shifts = [
                                                                        new EmployeeShift("02/01/2018 06:00", "02/01/2018 18:00", "Anna Schmidt"),
                                                                        new EmployeeShift("02/02/2018 07:00", "02/02/2018 07:15", "Anna Schmidt"),
                                                                        new EmployeeShift("02/14/2018 08:00", "02/14/2018 09:30", "Anna Schmidt"),
                                                                        new EmployeeShift("04/01/2018 18:00", "04/02/2018 18:00", "Anna Schmidt"),
                                                                        new EmployeeShift("04/20/2018 04:20", "02/01/2018 14:20", "Anna Schmidt")
                                                                     ];*/
    }
    DataService.prototype.getRestaurant = function () {
        return this.restaurant;
    };
    DataService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], DataService);
    return DataService;
}());

//# sourceMappingURL=data-service.js.map

/***/ }),

/***/ 445:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PunchCardPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SelectEmployee; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_classes__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_date_time__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util_data_service__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var PunchCardPage = (function () {
    function PunchCardPage(navCtrl, modalCtrl, alertCtrl, dateTime, data) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.dateTime = dateTime;
        this.data = data;
        this.displayShiftList = [];
        this.allShifts = [];
        this.selectedEmployeeID = null;
        this.filterStartDate = null;
        this.filterEndDate = null;
        var restaurant = this.data.getRestaurant();
        this.employees = restaurant.employees;
        var i;
        for (i = 0; i < this.employees.length; i++) {
            this.employees[i].shifts.sort(__WEBPACK_IMPORTED_MODULE_2__util_classes__["b" /* EmployeeShift */].compare);
            var j;
            for (j = 0; j < this.employees[i].shifts.length; j++) {
                this.allShifts.push(this.employees[i].shifts[j]);
            }
        }
        this.allShifts.sort(__WEBPACK_IMPORTED_MODULE_2__util_classes__["b" /* EmployeeShift */].compare);
        this.filterShiftByLatest(30);
    }
    PunchCardPage.prototype.filterShiftByEmployeeID = function (ID, shiftCount) {
        var employee = this.getEmployeeByID(ID);
        var limit = shiftCount ? shiftCount : 100;
        var i, count;
        for (i = employee.shifts.length - 1, count = 0; (i >= 0) && (count <= limit); i--, count++) {
            this.displayShiftList.push(employee.shifts[i]);
        }
    };
    PunchCardPage.prototype.filterShiftByLatest = function (shiftCount) {
        var limit = shiftCount ? shiftCount : 100;
        var i, count;
        for (i = this.allShifts.length - 1, count = 0; (i >= 0) && (count <= limit); i--, count++) {
            this.displayShiftList.push(this.allShifts[i]);
        }
    };
    PunchCardPage.prototype.filterShiftByDate = function () {
        var tmp = [];
        var j;
        for (j = 0; j < this.displayShiftList.length; j++) {
            tmp.push(this.displayShiftList[j]);
        }
        this.clearDisplayShiftList();
        var i;
        if (this.filterBySingleDate()) {
            for (i = 0; i < tmp.length; i++) {
                if (this.dateTime.sameDay(tmp[i].startTime, this.filterStartDate) ||
                    this.dateTime.sameDay(tmp[i].startTime, this.filterEndDate)) {
                    this.displayShiftList.push(tmp[i]);
                }
            }
        }
        else if (this.filterByInterval()) {
            for (i = 0; i < tmp.length; i++) {
                if (this.dateTime.inBetween(tmp[i].startTime, this.filterStartDate, this.filterEndDate)) {
                    this.displayShiftList.push(tmp[i]);
                }
            }
        }
    };
    PunchCardPage.prototype.getEmployeeByID = function (ID) {
        var i;
        for (i = 0; i < this.employees.length; i++) {
            if (ID == this.employees[i].ID) {
                return this.employees[i];
            }
        }
        return null; // SHOULD NOT BE REACHED
    };
    PunchCardPage.prototype.presentEmployeeSelector = function () {
        var _this = this;
        var modal = this.modalCtrl.create(SelectEmployee, { employees: this.employees });
        modal.onDidDismiss(function (data) {
            if (data != null) {
                _this.selectedEmployeeID = data;
            }
        });
        modal.present();
    };
    PunchCardPage.prototype.applyFilter = function () {
        if (this.selectedEmployeeID == null) {
            var alert_1 = this.alertCtrl.create({
                title: 'Please Select an Employee',
                enableBackdropDismiss: false,
                buttons: [{ text: 'OK', handler: function () { } }]
            });
            alert_1.present();
            return;
        }
        if (!this.noTimeFilter() && !this.filterBySingleDate() &&
            !(this.filterStartDate == this.filterEndDate)) {
            if (!this.dateTime.isBefore(this.filterStartDate, this.filterEndDate)) {
                var alert_2 = this.alertCtrl.create({
                    title: 'The End Date is Before the Start Date',
                    enableBackdropDismiss: false,
                    buttons: [{ text: 'OK', handler: function () { } }]
                });
                alert_2.present();
                return;
            }
        }
        this.clearDisplayShiftList();
        if (this.selectedEmployeeID == 0) {
            this.filterShiftByLatest();
        }
        else {
            this.filterShiftByEmployeeID(this.selectedEmployeeID);
        }
        if (!this.noTimeFilter()) {
            this.filterShiftByDate();
        }
    };
    PunchCardPage.prototype.clearDisplayShiftList = function () {
        this.displayShiftList.length = 0;
    };
    PunchCardPage.prototype.filterBySingleDate = function () {
        return !this.filterByInterval() && !this.noTimeFilter();
    };
    PunchCardPage.prototype.filterByInterval = function () {
        return ((this.filterStartDate != null) && (this.filterEndDate != null) &&
            !(this.filterStartDate == this.filterEndDate));
    };
    PunchCardPage.prototype.noTimeFilter = function () {
        return (this.filterStartDate == null) && (this.filterEndDate == null);
    };
    PunchCardPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-punchcard',template:/*ion-inline-start:"C:\Users\Owner\documents\repos\dinein\dinein\src\pages\punchcard\punchcard.html"*/'<ion-header>\n\n	<ion-navbar color="primary">\n\n	<div id="topleft">\n\n		<h3>View PunchCards</h3>\n\n	</div>\n\n</ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<!-- Title Bar -->\n\n<ion-content class="no-scroll">\n\n	<table>\n\n		<tr>\n\n			<th><h4 class="colorprimary">Employee Name</h4></th>\n\n			<th><h4 class="colorprimary">Shift Start</h4></th>\n\n			<th><h4 class="colorprimary">Shift End</h4></th>\n\n			<th><h4 class="colorprimary">Hours Worked</h4></th>\n\n		</tr>\n\n	</table>\n\n</ion-content>\n\n\n\n\n\n<!-- List of names and punches -->\n\n<ion-content id="scrollcontainer">\n\n	<table>\n\n		<!-- <tr>\n\n		<th><h4 class="colorprimary">Employee Name</h4></th>\n\n		<th><h4 class="colorprimary">Shift Start</h4></th>\n\n		<th><h4 class="colorprimary">Shift End</h4></th>\n\n		<th><h4 class="colorprimary">Hours Worked</h4></th>\n\n	</tr> -->\n\n	<tr *ngFor="let shift of displayShiftList">\n\n		<td>\n\n			<h6 class="colormedium">{{shift.name}}</h6>\n\n		</td>\n\n		<td>\n\n			<h6 class="colormedium">{{shift.startTime}}</h6>\n\n		</td>\n\n		<td>\n\n			<h6 class="colormedium">\n\n				{{shift.hasEnded()? shift.endTime : "In Progress"}}\n\n			</h6>\n\n		</td>\n\n		<td>\n\n			<h6 class="colormedium">\n\n				{{shift.hasEnded()? shift.shiftLength : "N/A"}}\n\n			</h6>\n\n		</td>\n\n	</tr>\n\n</table>\n\n</ion-content>\n\n\n\n\n\n\n\n<!-- Filter Bar -->\n\n<ion-content class="filter-container no-scroll">\n\n\n\n	<!-- employee -->\n\n	<div id="filterpanel">\n\n		<div class="filterparam">\n\n			<h5 class="colormiddark">For Employee:</h5>\n\n			<button class="inputbutton" ion-button outline block\n\n			[ngClass]="{\'inputbuttonnoval\': selectedEmployeeID == null,\n\n			\'inputbuttonhasval\': selectedEmployeeID != null}"\n\n			(click)="presentEmployeeSelector()">\n\n			{{(selectedEmployeeID == null)? "Select Employee" :\n\n			(selectedEmployeeID == 0)? "ALL" : getEmployeeByID(selectedEmployeeID).getFullName()}}\n\n		</button>\n\n	</div>\n\n\n\n\n\n	<!-- from date -->\n\n	<div class="filterparam">\n\n\n\n		<h5 class="colormiddark">From:</h5>\n\n\n\n		<ion-item [ngClass]="{\'timeselect\': !(filterByInterval() &&\n\n																				!dateTime.isBefore(filterStartDate, filterEndDate)),\n\n												\'timeselecterror\': filterByInterval() &&\n\n																					 !dateTime.isBefore(filterStartDate, filterEndDate)}">\n\n			<ion-datetime displayFormat="MM/DD/YYYY" pickerFormat="MM DD YYYY"\n\n										placeholder="Select Start Date"\n\n										[(ngModel)]="filterStartDate">\n\n		</ion-datetime>\n\n\n\n		<button ion-button item-end class="xbutton"\n\n						(click)="filterStartDate = null">x</button>\n\n\n\n		</ion-item>\n\n	</div>\n\n\n\n	<!-- to date -->\n\n	<div class="filterparam">\n\n\n\n		<h5 class="colormiddark">To:</h5>\n\n\n\n		<ion-item [ngClass]="{\'timeselect\': !(filterByInterval() &&\n\n																						 !dateTime.isBefore(filterStartDate, filterEndDate)),\n\n													\'timeselecterror\': filterByInterval() &&\n\n																						 !dateTime.isBefore(filterStartDate, filterEndDate)}">\n\n			<ion-datetime displayFormat="MM/DD/YYYY" pickerFormat="MM DD YYYY"\n\n			placeholder="Select End Date"\n\n			[(ngModel)]="filterEndDate">\n\n		</ion-datetime>\n\n\n\n		<button ion-button item-end class="xbutton"\n\n						(click)="filterEndDate = null">x</button>\n\n\n\n		</ion-item>\n\n	</div>\n\n\n\n\n\n	<!-- applyFilter button -->\n\n	<div class="filterparam">\n\n		<h5 class="colormiddark"></h5>\n\n		<button class="localbutton applyfilterbutton" ion-button block\n\n		(click)="applyFilter()">\n\n		Apply Filter\n\n	</button>\n\n	</div>\n\n\n\n\n\n	</div>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Owner\documents\repos\dinein\dinein\src\pages\punchcard\punchcard.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_3__util_date_time__["a" /* DateTimeService */],
            __WEBPACK_IMPORTED_MODULE_4__util_data_service__["a" /* DataService */]])
    ], PunchCardPage);
    return PunchCardPage;
}());

//------------------------------------------------------------------------------
// Sub-View: SelectServer
//------------------------------------------------------------------------------
var SelectEmployee = (function () {
    function SelectEmployee(viewCtrl, params) {
        this.viewCtrl = viewCtrl;
        this.params = params;
        this.employees = params.get('employees');
        this.selectedEmployee = this.employees[0];
    }
    SelectEmployee.prototype.selectEmployee = function (e) {
        this.selectedEmployee = e;
    };
    SelectEmployee.prototype.OK = function () {
        this.viewCtrl.dismiss(this.selectedEmployee.ID);
    };
    SelectEmployee.prototype.selectAllEmployees = function () {
        this.viewCtrl.dismiss(0);
    };
    SelectEmployee.prototype.cancel = function () {
        this.viewCtrl.dismiss(null);
    };
    SelectEmployee = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-punchcard',
            template: "\n\t\t<div id=\"employeemodal\" class=\"modalbase\">\n\t\t\t<h4 class=\"colormedium\">Select Employee</h4>\n\t\t\t<ion-content class=\"modallist3buttons\">\n\t\t\t\t<ion-list scroll=\"true\">\n\t\t\t\t\t<button ion-button block outline class=\"listbutton\"\n\t\t\t\t\t\t\t\t\t*ngFor=\"let employee of employees\"\n\t\t\t\t\t\t\t\t\t[ngClass]=\"{'selectedemployee': employee === selectedEmployee,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t'employee': employee !== selectedEmployee}\"\n\t\t\t\t\t\t\t\t\t(click)=\"selectEmployee(employee)\">\n\t\t\t\t\t\t{{employee.getFullName()}}\n\t\t\t\t\t</button>\n\t\t\t\t</ion-list>\n\t\t\t</ion-content>\n\t\t\t<button class=\"modalbutton\" ion-button block\n\t\t\t\t\t\t\t\t(click)=\"OK()\">OK</button>\n\t\t\t<button class=\"modalbutton\" ion-button block outline\n\t\t\t\t\t\t\t\t(click)=\"cancel()\">Cancel</button>\n\t\t\t<button class=\"modalbutton\" ion-button block outline\n\t\t\t\t\t\t\t\t(click)=\"selectAllEmployees()\">Select All</button>\n\t\t</div>\n\t"
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
    ], SelectEmployee);
    return SelectEmployee;
}());

//# sourceMappingURL=punchcard.js.map

/***/ }),

/***/ 446:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalendarPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CalendarPage = (function () {
    function CalendarPage(navCtrl, modalCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.eventSource = [];
        this.selectedDay = new Date();
        this.calendar = {
            mode: 'month',
            currentDate: new Date()
        };
    }
    CalendarPage.prototype.addEvent = function () {
        var _this = this;
        var modal = this.modalCtrl.create('EventModalPage', { selectedDay: this.selectedDay });
        modal.present();
        modal.onDidDismiss(function (data) {
            if (data) {
                var eventData = data;
                eventData.startTime = new Date(data.startTime);
                eventData.endTime = new Date(data.endTime);
                var events_1 = _this.eventSource;
                events_1.push(eventData);
                _this.eventSource = [];
                setTimeout(function () {
                    _this.eventSource = events_1;
                });
            }
        });
    };
    // not sure how to do this
    CalendarPage.prototype.editEvent = function (event) {
        var _this = this;
        var modal = this.modalCtrl.create('EditEventPage', { event: event, events: this.eventSource });
        modal.present();
        modal.onDidDismiss(function (data) {
            if (data) {
                //delete the event passed back
                _this.eventSource = _this.eventSource.filter(function (e) { return e !== event; });
            }
        });
    };
    CalendarPage.prototype.goToToday = function () {
        this.calendar.currentDate = new Date();
    };
    CalendarPage.prototype.onViewTitleChanged = function (title) {
        this.viewTitle = title;
    };
    CalendarPage.prototype.onEventSelected = function (event) {
        var _this = this;
        var start = __WEBPACK_IMPORTED_MODULE_2_moment__(event.startTime).format('LLLL');
        var end = __WEBPACK_IMPORTED_MODULE_2_moment__(event.endTime).format('LLLL');
        var alert = this.alertCtrl.create({
            title: '' + event.title,
            subTitle: 'From: ' + start + '<br>To: ' + end + '<br>Organizer: ' + event.organizer,
            message: 'Description: ' + event.description,
            buttons: ['OK',
                {
                    text: 'Edit',
                    handler: function () {
                        _this.editEvent(event);
                    },
                }
            ],
            cssClass: 'alertCSS'
        });
        alert.present();
    };
    CalendarPage.prototype.onTimeSelected = function (ev) {
        this.selectedDay = ev.selectedTime;
    };
    CalendarPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-calendar',template:/*ion-inline-start:"C:\Users\Owner\documents\repos\dinein\dinein\src\pages\calendar\calendar.html"*/'<ion-header>\n\n    <ion-navbar color="primary">\n\n        <div class = "top-nav">\n\n            <button ion-button left (click)="goToToday()">\n\n                Today\n\n            </button>\n\n\n\n            <h3>\n\n                {{ viewTitle }}\n\n            </h3>\n\n\n\n            <button ion-button icon-only (click)="addEvent()">\n\n                <ion-icon name="add"></ion-icon>\n\n            </button>\n\n        </div>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content no-bounce>\n\n        <calendar [eventSource]="eventSource" [calendarMode]="calendar.mode" [currentDate]="calendar.currentDate" (onEventSelected)="onEventSelected($event)"\n\n        (onTitleChanged)="onViewTitleChanged($event)" (onTimeSelected)="onTimeSelected($event)" step="30" class="calendar">\n\n        </calendar>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Owner\documents\repos\dinein\dinein\src\pages\calendar\calendar.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], CalendarPage);
    return CalendarPage;
}());

//# sourceMappingURL=calendar.js.map

/***/ }),

/***/ 447:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ManagementPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__update_management__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_data_service__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util_numpad__ = __webpack_require__(33);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ManagementPage = (function () {
    function ManagementPage(navCtrl, modalCtrl, alertCtrl, data) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.data = data;
        this.restaurant = this.data.getRestaurant();
    }
    ManagementPage.prototype.executeLogout = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: "Are you sure you want to logout?",
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: "Logout",
                    handler: function () { _this.navCtrl.parent.parent.pop(_this); }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () { }
                }
            ]
        });
        alert.present();
    };
    ManagementPage.prototype.onEditInfoPress = function () {
        var _this = this;
        var pin = this.restaurant.managerPin;
        var numpadModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__util_numpad__["a" /* InputNumpad */], {
            inputField: "Enter PIN",
            alertTitle: "Invalid PIN",
            alertMsg: null,
            validInputCondition: function (input) {
                return input == pin;
            },
            secondaryValidInputCondition: null
        });
        numpadModal.onDidDismiss(function (returnedNum) {
            if ((returnedNum == _this.restaurant.managerPin) && (returnedNum != null)) {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__update_management__["a" /* UpdateManagementPage */], { restaurant: _this.restaurant });
            }
        });
        numpadModal.present();
    };
    ManagementPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-management',template:/*ion-inline-start:"C:\Users\Owner\documents\repos\dinein\dinein\src\pages\management\management.html"*/'<ion-header>\n\n	<ion-navbar color="primary">\n\n	<div id="topleft">\n\n		<h3>Management</h3>\n\n	</div>\n\n	</ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content no-bounce id="container">\n\n\n\n	<div id="profileleft">\n\n		<h3 class="colorprimary">{{restaurant.name}}</h3>\n\n\n\n		<div id="employeeprofile">\n\n			<div id="labels">\n\n				<h5 class="colormiddark">Owner:</h5>\n\n				<h5 class="colormiddark">Manager:</h5>\n\n				<h5 class="colormiddark">Employees:</h5>\n\n				<h5 class="colormiddark">Capacity:</h5>\n\n				<h5 class="colormiddark">Tables:</h5>\n\n				<h5 class="colormiddark">Phone:</h5>\n\n				<h5 class="colormiddark">Address:</h5>\n\n			</div>\n\n			<div id="employeeinfo">\n\n				<h5 class="colormedium">{{restaurant.getOwner().getFullName()}}</h5>\n\n				<h5 class="colormedium">{{restaurant.getManager().getFullName()}}</h5>\n\n				<h5 class="colormedium">{{restaurant.getNumEmployees()}}</h5>\n\n				<h5 class="colormedium">{{restaurant.getCapacity()}}</h5>\n\n				<h5 class="colormedium">{{restaurant.getNumTables()}}</h5>\n\n				<h5 class="colormedium">{{restaurant.getPhoneStr()}}</h5>\n\n				<h5 class="colormedium">{{restaurant.addrLine1}}</h5>\n\n				<h5 class="colormedium">{{restaurant.addrLine2}}</h5>\n\n			</div>\n\n		</div>\n\n	</div>\n\n\n\n	<div id="profileright">\n\n		<div id="imgcontainer">\n\n			<img id="employeeimage" src="../assets/imgs/mikefass.jpg">\n\n		</div>\n\n		<button class="localbutton" ion-button block\n\n						(click)="onEditInfoPress()">\n\n			Edit Information\n\n		</button>\n\n		<button class="localbutton dangerbutton" ion-button block\n\n						(click)="executeLogout()">\n\n			LOGOUT\n\n		</button>\n\n	</div>\n\n\n\n</ion-content>\n\n\n\n<!--\n\n<ion-content padding>\n\n\n\n		<div class="resize">\n\n				<img src="../assets/imgs/mikefass.jpg">\n\n		</div>\n\n\n\n\n\n	<div id="restaurantInfo">\n\n		<span class="label">Restaurant Name:</span> {{management_info.restaurantName}}\n\n		<br>\n\n		<span class="label">Manager Name:</span> {{management_info.managerName}}\n\n		<br>\n\n		<span class="label">Restaurant Capacity:</span> {{management_info.capacity}}\n\n		<br>\n\n		<span class="label">Total Employees:</span> {{management_info.numEmployees}}\n\n		<br>\n\n		<button ion-button block class="button" (click)="openEditPage()">Edit Information</button>\n\n	</div>\n\n\n\n\n\n</ion-content>\n\n-->\n\n'/*ion-inline-end:"C:\Users\Owner\documents\repos\dinein\dinein\src\pages\management\management.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_3__util_data_service__["a" /* DataService */]])
    ], ManagementPage);
    return ManagementPage;
}());

//# sourceMappingURL=management.js.map

/***/ }),

/***/ 490:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(491);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(495);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 495:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(821);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_screen_orientation__ = __webpack_require__(489);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_login_login__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_login_create_user__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_login_create_restaurant__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_tabs_tabs__ = __webpack_require__(352);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_tables_tables__ = __webpack_require__(353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_tables_add_party__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_employees_employees__ = __webpack_require__(354);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_employees_edit_employee__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_timepunch_timepunch__ = __webpack_require__(355);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_punchcard_punchcard__ = __webpack_require__(445);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_calendar_calendar__ = __webpack_require__(446);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_management_management__ = __webpack_require__(447);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_management_update_management__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_util_date_time__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_util_data_service__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_util_numpad__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__ionic_native_status_bar__ = __webpack_require__(487);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ionic_native_splash_screen__ = __webpack_require__(488);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__providers_dbhelper_dbhelper__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__angular_common_http__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25_ionic2_calendar__ = __webpack_require__(822);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__ionic_native_file_transfer__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__ionic_native_file__ = __webpack_require__(833);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__ionic_native_camera__ = __webpack_require__(348);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





























var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_login_create_user__["a" /* CreateUserPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_login_create_user__["b" /* SelectRestaurant */],
                __WEBPACK_IMPORTED_MODULE_7__pages_login_create_restaurant__["a" /* CreateRestaurantPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_tables_tables__["d" /* TablesPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_tables_tables__["c" /* TableInfo */],
                __WEBPACK_IMPORTED_MODULE_9__pages_tables_tables__["a" /* PartyInfo */],
                __WEBPACK_IMPORTED_MODULE_9__pages_tables_tables__["b" /* SelectServer */],
                __WEBPACK_IMPORTED_MODULE_10__pages_tables_add_party__["a" /* AddPartyPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_employees_employees__["a" /* EmployeesPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_employees_edit_employee__["a" /* EditEmployeePage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_employees_edit_employee__["b" /* TitleSelector */],
                __WEBPACK_IMPORTED_MODULE_11__pages_employees_employees__["b" /* PunchPopoverPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_timepunch_timepunch__["a" /* TimePunchPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_punchcard_punchcard__["a" /* PunchCardPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_punchcard_punchcard__["b" /* SelectEmployee */],
                __WEBPACK_IMPORTED_MODULE_15__pages_calendar_calendar__["a" /* CalendarPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_management_management__["a" /* ManagementPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_management_update_management__["a" /* UpdateManagementPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_util_numpad__["a" /* InputNumpad */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/edit-event/edit-event.module#EditEventPageModule', name: 'EditEventPage', segment: 'edit-event', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/employees/edit-employee.module#EditEmployeePageModule', name: 'EditEmployeePage', segment: 'edit-employee', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/event-modal/event-modal.module#EventModalPageModule', name: 'EventModalPage', segment: 'event-modal', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/create-restaurant.module#CreateRestaurantPageModule', name: 'CreateRestaurantPage', segment: 'create-restaurant', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/create-user.module#CreateUserPageModule', name: 'CreateUserPage', segment: 'create-user', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/management/update-management.module#UpdateManagementPageModule', name: 'UpdateManagementPage', segment: 'update-management', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/tables/add-party.module#AddPartyPageModule', name: 'AddPartyPage', segment: 'add-party', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_24__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_25_ionic2_calendar__["a" /* NgCalendarModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_login_create_user__["a" /* CreateUserPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_login_create_user__["b" /* SelectRestaurant */],
                __WEBPACK_IMPORTED_MODULE_7__pages_login_create_restaurant__["a" /* CreateRestaurantPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_tables_tables__["d" /* TablesPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_tables_tables__["c" /* TableInfo */],
                __WEBPACK_IMPORTED_MODULE_9__pages_tables_tables__["a" /* PartyInfo */],
                __WEBPACK_IMPORTED_MODULE_9__pages_tables_tables__["b" /* SelectServer */],
                __WEBPACK_IMPORTED_MODULE_10__pages_tables_add_party__["a" /* AddPartyPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_employees_employees__["a" /* EmployeesPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_employees_edit_employee__["a" /* EditEmployeePage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_employees_edit_employee__["b" /* TitleSelector */],
                __WEBPACK_IMPORTED_MODULE_11__pages_employees_employees__["b" /* PunchPopoverPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_timepunch_timepunch__["a" /* TimePunchPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_punchcard_punchcard__["a" /* PunchCardPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_punchcard_punchcard__["b" /* SelectEmployee */],
                __WEBPACK_IMPORTED_MODULE_15__pages_calendar_calendar__["a" /* CalendarPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_management_management__["a" /* ManagementPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_management_update_management__["a" /* UpdateManagementPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_util_numpad__["a" /* InputNumpad */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_21__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_22__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_screen_orientation__["a" /* ScreenOrientation */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_23__providers_dbhelper_dbhelper__["a" /* DbHelperProvider */],
                __WEBPACK_IMPORTED_MODULE_24__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_18__pages_util_date_time__["a" /* DateTimeService */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_26__ionic_native_file_transfer__["a" /* FileTransfer */],
                //FileUploadOptions, //commented b/c kept causing errors
                __WEBPACK_IMPORTED_MODULE_26__ionic_native_file_transfer__["b" /* FileTransferObject */],
                __WEBPACK_IMPORTED_MODULE_27__ionic_native_file__["a" /* File */],
                __WEBPACK_IMPORTED_MODULE_28__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_19__pages_util_data_service__["a" /* DataService */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 50:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return Restaurant; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return Table; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return Party; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Employee; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return EmployeeShift; });
var Restaurant = (function () {
    function Restaurant(name, phoneNumber, owner, addrLine1, addrLine2, managerPin) {
        this.name = name;
        this.addrLine1 = addrLine1;
        this.addrLine2 = addrLine2;
        this.phoneNumber = phoneNumber;
        this.tables = [];
        this.employees = [];
        this.parties = [];
        this.employees.push(owner);
        this.managerPin = managerPin;
    }
    Restaurant.prototype.getPhoneStr = function () {
        if (this.phoneNumber) {
            var phoneStr = this.phoneNumber.toString();
            if (phoneStr.length == 10) {
                return "(" + phoneStr.slice(0, 3) + ") " + phoneStr.slice(3, 6) + "-" + phoneStr.slice(6, 10);
            }
        }
        return this.phoneNumber.toString();
    };
    Restaurant.prototype.getOwner = function () {
        var i;
        for (i = 0; i < this.employees.length; i++) {
            if (this.employees[i].ID == 1) {
                return this.employees[i];
            }
        }
    };
    Restaurant.prototype.getManager = function () {
        var i;
        for (i = 0; i < this.employees.length; i++) {
            if (this.employees[i].ID == 2) {
                return this.employees[i];
            }
        }
    };
    Restaurant.prototype.getNumEmployees = function () {
        return this.employees.length;
    };
    Restaurant.prototype.getNumTables = function () {
        return this.tables.length;
    };
    Restaurant.prototype.getCapacity = function () {
        if (this.tables.length == 0) {
            return 0;
        }
        else {
            var cap = 0;
            var i;
            for (i = 0; i < this.tables.length; i++) {
                cap += this.tables[i].capacity;
            }
            return cap;
        }
    };
    return Restaurant;
}());

var Table = (function () {
    function Table(capacityIn, xPos, yPos) {
        this.ID = Table.ID_runner;
        Table.ID_runner += 1;
        this.capacity = capacityIn;
        this.free = true;
        this.partySize = 0;
        this.timeIn = "N/A";
        this.server = "N/A";
        this.guest = "N/A";
        if (xPos) {
            this.xPos = xPos;
        }
        else {
            this.xPos = "0";
        }
        if (yPos) {
            this.yPos = yPos;
        }
        else {
            this.yPos = "0";
        }
    }
    Table.prototype.getStatus = function () {
        return this.free ? "Free" : "Occupied";
    };
    Table.prototype.getButtonText = function () {
        return this.free ? String(this.capacity) : this.partySize + '/' + this.capacity;
    };
    Table.prototype.freeTable = function () {
        console.log('Table ' + this.ID + ' freed');
        this.free = true;
        this.partySize = 0;
        this.timeIn = "N/A";
        this.server = "N/A";
        this.guest = "N/A";
    };
    Table.prototype.seat = function (size, server, timeIn, guest) {
        this.free = false;
        this.partySize = size;
        this.timeIn = timeIn;
        this.server = server;
        this.guest = (guest != null) ? guest : "N/A";
        console.log('Seated ' + size + ' people at Table ' + this.ID);
    };
    // TODO: change from static ID runner to getting current ID runner from DB
    Table.ID_runner = 1;
    return Table;
}());

var Party = (function () {
    function Party(name, size, time, contact, reservation) {
        this.ID = Party.ID_runner;
        Party.ID_runner += 1;
        this.name = name;
        this.size = size;
        this.time = time;
        this.contact = contact;
        this.reservation = reservation;
    }
    Party.prototype.getKind = function () {
        return this.reservation ? "Reservation" : "Party";
    };
    Party.prototype.display = function () {
        return this.time + ' | ' + this.name + ' | ' + this.size;
    };
    Party.prototype.getContactStr = function () {
        if (this.contact) {
            var phoneStr = this.contact.toString();
            if (phoneStr.length == 10) {
                return "(" + phoneStr.slice(0, 3) + ") " + phoneStr.slice(3, 6) + "-" + phoneStr.slice(6, 10);
            }
        }
        return this.contact.toString();
    };
    Party.compare = function (p1, p2) {
        if (p1.reservation && !p2.reservation)
            return -1;
        if (!p1.reservation && p2.reservation)
            return 1;
        else {
            var h1 = parseInt(p1.time.substring(0, 2));
            var h2 = parseInt(p2.time.substring(0, 2));
            if (h1 < h2)
                return -1;
            if (h1 > h2)
                return 1;
            var m1 = parseInt(p1.time.substring(3, 5));
            var m2 = parseInt(p2.time.substring(3, 5));
            if (m1 < m2)
                return -1;
            if (m1 > m2)
                return 1;
        }
        return 0;
    };
    Party.ID_runner = 1;
    return Party;
}());

var Employee = (function () {
    function Employee(firstName, lastName, title, pay, phone, imageSrc, ID) {
        if (ID) {
            if (ID < 100) {
                this.ID = ID;
            }
            else {
                this.ID = Employee.ID_runner;
                Employee.ID_runner += 1;
            }
        }
        else {
            this.ID = Employee.ID_runner;
            Employee.ID_runner += 1;
        }
        this.firstName = firstName;
        this.lastName = lastName;
        this.title = title;
        this.pay = pay;
        this.phone = phone;
        this.shifts = [];
        if (imageSrc) {
            this.imageSrc = imageSrc;
        }
        else {
            this.imageSrc = null;
        }
    }
    Employee.prototype.punchIn = function (timeIn) {
        // Instantiate shift object with only shift start time, no shift end time
        // Mark new shift as incompleted/in progress
        // Set employee status to "Currently working"
        // Add the shift object to the employee
        this.shifts.push(new EmployeeShift(timeIn, undefined, this.getFullName()));
        console.log('Successfully punched in for employee: ' + this.ID);
    };
    Employee.prototype.punchOut = function (timeOut) {
        // Add shift end time to the latest shift object
        // Mark shift as completed
        // Set employee to not be currently working
        this.shifts[this.shifts.length - 1].endShift(timeOut);
        console.log('Successfully punched outfor employee: ' + this.ID);
    };
    Employee.prototype.isCurrentlyWorking = function () {
        //
        // Special case when employee newly instantiated and has empty shifts
        // array, accessing the last element will make the app pissed
        // In this case, just return false because a newly instantiated employee
        // hasn't started a shift yet
        //
        if (this.shifts.length < 1) {
            return false;
        }
        var mostRecentShift = this.shifts[this.shifts.length - 1];
        return !mostRecentShift.hasEnded();
    };
    Employee.prototype.getFullName = function () {
        return this.firstName + " " + this.lastName;
    };
    Employee.prototype.getPhoneStr = function () {
        if (this.phone) {
            var phoneStr = this.phone.toString();
            if (phoneStr.length == 10) {
                return "(" + phoneStr.slice(0, 3) + ") " + phoneStr.slice(3, 6) + "-" + phoneStr.slice(6, 10);
            }
        }
        return null;
    };
    Employee.prototype.getIDStr = function () {
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
    };
    Employee.sortByLastName = function (a, b) {
        return a.lastName.localeCompare(b.lastName);
    };
    Employee.ID_runner = 100;
    return Employee;
}());

var EmployeeShift = (function () {
    function EmployeeShift(startTime, endTime, name) {
        this.startTime = startTime;
        if (name) {
            this.name = name;
        }
        if (endTime) {
            this.endTime = endTime;
            this.shiftLength = this.getDiffQuarterHour(this.startTime, this.endTime);
        }
        else {
            this.endTime = null;
            this.shiftLength = null;
        }
    }
    EmployeeShift.prototype.endShift = function (endTime) {
        this.endTime = endTime;
        this.shiftLength = this.getDiffQuarterHour(this.startTime, this.endTime);
    };
    EmployeeShift.prototype.hasEnded = function () {
        return this.endTime != null;
    };
    EmployeeShift.prototype.getDiffQuarterHour = function (t1, t2) {
        var d1 = new Date(t1);
        var d2 = new Date(t2);
        var diffHours = (d2.getTime() - d1.getTime()) / 3600000;
        return parseFloat((Math.round(diffHours * 4) / 4).toFixed(2));
    };
    EmployeeShift.compare = function (s1, s2) {
        var d1 = new Date(s1.startTime);
        var d2 = new Date(s2.startTime);
        var diff = (d1.getTime() - d2.getTime());
        if (diff < 0) {
            return -1;
        }
        if (diff > 0) {
            return 1;
        }
        return 0;
    };
    return EmployeeShift;
}());

//# sourceMappingURL=classes.js.map

/***/ }),

/***/ 516:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 221,
	"./af.js": 221,
	"./ar": 222,
	"./ar-dz": 223,
	"./ar-dz.js": 223,
	"./ar-kw": 224,
	"./ar-kw.js": 224,
	"./ar-ly": 225,
	"./ar-ly.js": 225,
	"./ar-ma": 226,
	"./ar-ma.js": 226,
	"./ar-sa": 227,
	"./ar-sa.js": 227,
	"./ar-tn": 228,
	"./ar-tn.js": 228,
	"./ar.js": 222,
	"./az": 229,
	"./az.js": 229,
	"./be": 230,
	"./be.js": 230,
	"./bg": 231,
	"./bg.js": 231,
	"./bm": 232,
	"./bm.js": 232,
	"./bn": 233,
	"./bn.js": 233,
	"./bo": 234,
	"./bo.js": 234,
	"./br": 235,
	"./br.js": 235,
	"./bs": 236,
	"./bs.js": 236,
	"./ca": 237,
	"./ca.js": 237,
	"./cs": 238,
	"./cs.js": 238,
	"./cv": 239,
	"./cv.js": 239,
	"./cy": 240,
	"./cy.js": 240,
	"./da": 241,
	"./da.js": 241,
	"./de": 242,
	"./de-at": 243,
	"./de-at.js": 243,
	"./de-ch": 244,
	"./de-ch.js": 244,
	"./de.js": 242,
	"./dv": 245,
	"./dv.js": 245,
	"./el": 246,
	"./el.js": 246,
	"./en-au": 247,
	"./en-au.js": 247,
	"./en-ca": 248,
	"./en-ca.js": 248,
	"./en-gb": 249,
	"./en-gb.js": 249,
	"./en-ie": 250,
	"./en-ie.js": 250,
	"./en-il": 251,
	"./en-il.js": 251,
	"./en-nz": 252,
	"./en-nz.js": 252,
	"./eo": 253,
	"./eo.js": 253,
	"./es": 254,
	"./es-do": 255,
	"./es-do.js": 255,
	"./es-us": 256,
	"./es-us.js": 256,
	"./es.js": 254,
	"./et": 257,
	"./et.js": 257,
	"./eu": 258,
	"./eu.js": 258,
	"./fa": 259,
	"./fa.js": 259,
	"./fi": 260,
	"./fi.js": 260,
	"./fo": 261,
	"./fo.js": 261,
	"./fr": 262,
	"./fr-ca": 263,
	"./fr-ca.js": 263,
	"./fr-ch": 264,
	"./fr-ch.js": 264,
	"./fr.js": 262,
	"./fy": 265,
	"./fy.js": 265,
	"./gd": 266,
	"./gd.js": 266,
	"./gl": 267,
	"./gl.js": 267,
	"./gom-latn": 268,
	"./gom-latn.js": 268,
	"./gu": 269,
	"./gu.js": 269,
	"./he": 270,
	"./he.js": 270,
	"./hi": 271,
	"./hi.js": 271,
	"./hr": 272,
	"./hr.js": 272,
	"./hu": 273,
	"./hu.js": 273,
	"./hy-am": 274,
	"./hy-am.js": 274,
	"./id": 275,
	"./id.js": 275,
	"./is": 276,
	"./is.js": 276,
	"./it": 277,
	"./it.js": 277,
	"./ja": 278,
	"./ja.js": 278,
	"./jv": 279,
	"./jv.js": 279,
	"./ka": 280,
	"./ka.js": 280,
	"./kk": 281,
	"./kk.js": 281,
	"./km": 282,
	"./km.js": 282,
	"./kn": 283,
	"./kn.js": 283,
	"./ko": 284,
	"./ko.js": 284,
	"./ky": 285,
	"./ky.js": 285,
	"./lb": 286,
	"./lb.js": 286,
	"./lo": 287,
	"./lo.js": 287,
	"./lt": 288,
	"./lt.js": 288,
	"./lv": 289,
	"./lv.js": 289,
	"./me": 290,
	"./me.js": 290,
	"./mi": 291,
	"./mi.js": 291,
	"./mk": 292,
	"./mk.js": 292,
	"./ml": 293,
	"./ml.js": 293,
	"./mn": 294,
	"./mn.js": 294,
	"./mr": 295,
	"./mr.js": 295,
	"./ms": 296,
	"./ms-my": 297,
	"./ms-my.js": 297,
	"./ms.js": 296,
	"./mt": 298,
	"./mt.js": 298,
	"./my": 299,
	"./my.js": 299,
	"./nb": 300,
	"./nb.js": 300,
	"./ne": 301,
	"./ne.js": 301,
	"./nl": 302,
	"./nl-be": 303,
	"./nl-be.js": 303,
	"./nl.js": 302,
	"./nn": 304,
	"./nn.js": 304,
	"./pa-in": 305,
	"./pa-in.js": 305,
	"./pl": 306,
	"./pl.js": 306,
	"./pt": 307,
	"./pt-br": 308,
	"./pt-br.js": 308,
	"./pt.js": 307,
	"./ro": 309,
	"./ro.js": 309,
	"./ru": 310,
	"./ru.js": 310,
	"./sd": 311,
	"./sd.js": 311,
	"./se": 312,
	"./se.js": 312,
	"./si": 313,
	"./si.js": 313,
	"./sk": 314,
	"./sk.js": 314,
	"./sl": 315,
	"./sl.js": 315,
	"./sq": 316,
	"./sq.js": 316,
	"./sr": 317,
	"./sr-cyrl": 318,
	"./sr-cyrl.js": 318,
	"./sr.js": 317,
	"./ss": 319,
	"./ss.js": 319,
	"./sv": 320,
	"./sv.js": 320,
	"./sw": 321,
	"./sw.js": 321,
	"./ta": 322,
	"./ta.js": 322,
	"./te": 323,
	"./te.js": 323,
	"./tet": 324,
	"./tet.js": 324,
	"./tg": 325,
	"./tg.js": 325,
	"./th": 326,
	"./th.js": 326,
	"./tl-ph": 327,
	"./tl-ph.js": 327,
	"./tlh": 328,
	"./tlh.js": 328,
	"./tr": 329,
	"./tr.js": 329,
	"./tzl": 330,
	"./tzl.js": 330,
	"./tzm": 331,
	"./tzm-latn": 332,
	"./tzm-latn.js": 332,
	"./tzm.js": 331,
	"./ug-cn": 333,
	"./ug-cn.js": 333,
	"./uk": 334,
	"./uk.js": 334,
	"./ur": 335,
	"./ur.js": 335,
	"./uz": 336,
	"./uz-latn": 337,
	"./uz-latn.js": 337,
	"./uz.js": 336,
	"./vi": 338,
	"./vi.js": 338,
	"./x-pseudo": 339,
	"./x-pseudo.js": 339,
	"./yo": 340,
	"./yo.js": 340,
	"./zh-cn": 341,
	"./zh-cn.js": 341,
	"./zh-hk": 342,
	"./zh-hk.js": 342,
	"./zh-tw": 343,
	"./zh-tw.js": 343
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 516;

/***/ }),

/***/ 523:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return URLParser; });
var URLParser = (function () {
    function URLParser() {
    }
    URLParser.prototype.addUser = function (url, object) {
        var newURL = url + "/user/addUser/" + object.email + '/' + object.password + '/' + object.firstName + '/' + object.lastName + '/' + object.phoneNo + '/' + object.restaurant;
        //url = newURL;
        return newURL;
    };
    URLParser.prototype.authenticateUser = function (url, name, pwd) {
        var newURL = url + "/user/getUser/" + name + '/' + pwd;
        return newURL;
    };
    URLParser.prototype.addEmployee = function (url, object) {
        var newURL = url + "/employee/addEmployee/" + object.id + '/' + object.fName + '/' + object.lName + '/' + object.title + '/' + object.pay + '/' +
            object.phoneNo;
        //url = newURL;
        return newURL;
    };
    URLParser.prototype.addRestaurant = function (url, object) {
        var newURL = url + "/restaurant/addRestaurant/" + object.name + '/' + object.addr1 + '/' + object.addr2 + '/' + object.phoneNo;
        //url = newURL;
        return newURL;
    };
    URLParser.prototype.addParty = function (url, object) {
        var newURL = url + "/party/addParty/" + object.name + '/' + object.size + '/tempTime/' + object.phoneNo;
        //url = newURL;
        return newURL;
    };
    URLParser.prototype.addShift = function (url, object) {
        var newURL = url + "/shift/addShift/" + object.name + '/' + object.startTime + '/' + object.endTime + '/' + object.shiftLen;
        //url = newURL;
        return newURL;
    };
    URLParser.prototype.addTable = function (url, object) {
    };
    return URLParser;
}());

//# sourceMappingURL=URLParser.js.map

/***/ }),

/***/ 61:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return UserObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return RestaurantObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmployeeObject; });
/* unused harmony export TableObject */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return PartyObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return ShiftObject; });
var UserObject = (function () {
    function UserObject() {
    }
    return UserObject;
}());

var RestaurantObject = (function () {
    function RestaurantObject() {
    }
    return RestaurantObject;
}());

var EmployeeObject = (function () {
    function EmployeeObject() {
    }
    return EmployeeObject;
}());

var TableObject = (function () {
    function TableObject() {
    }
    return TableObject;
}());

var PartyObject = (function () {
    function PartyObject() {
    }
    return PartyObject;
}());

var ShiftObject = (function () {
    function ShiftObject() {
    }
    return ShiftObject;
}());

//# sourceMappingURL=DBObjects.js.map

/***/ }),

/***/ 62:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DateTimeService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var DateTimeService = (function () {
    function DateTimeService() {
    }
    DateTimeService.prototype.getTime = function () {
        var d = new Date();
        return this.pad(d.getHours()) + ':' + this.pad(d.getMinutes());
    };
    DateTimeService.prototype.fullDateToTime = function (D) {
        var d = new Date(D);
        return this.pad(d.getHours()) + ':' + this.pad(d.getMinutes());
    };
    DateTimeService.prototype.getDateTime = function () {
        var d = new Date();
        var day = d.getUTCDate();
        var month = d.getUTCMonth() + 1;
        var year = d.getUTCFullYear();
        var hrs = d.getHours();
        var min = d.getMinutes();
        return (this.pad(month) + '/' + this.pad(day) + '/' + year + ' ' +
            this.pad(hrs) + ':' + this.pad(min));
    };
    DateTimeService.prototype.getDiffQuarterHour = function (t1, t2) {
        var d1 = new Date(t1);
        var d2 = new Date(t2);
        var diffHours = (d2.getTime() - d1.getTime()) / 3600000;
        return parseFloat((Math.round(diffHours * 4) / 4).toFixed(2));
    };
    DateTimeService.prototype.sameDay = function (t1, t2) {
        var d1 = new Date(t1);
        var d2 = new Date(t2);
        var day1 = d1.getUTCDate();
        var month1 = d1.getUTCMonth() + 1;
        var year1 = d1.getUTCFullYear();
        var day2 = d2.getUTCDate();
        var month2 = d2.getUTCMonth() + 1;
        var year2 = d2.getUTCFullYear();
        return (day1 == day2) && (month1 == month2) && (year1 == year2);
    };
    DateTimeService.prototype.inBetween = function (t, tStart, tEnd) {
        var d = new Date(t);
        var dStart = new Date(tStart);
        var dEnd = new Date(tEnd);
        var afterStart = (d.getTime() - dStart.getTime()) >= 0;
        var beforeEnd = (dEnd.getTime() - d.getTime()) >= 0;
        return afterStart && beforeEnd;
    };
    DateTimeService.prototype.isBefore = function (t1, t2) {
        var d1 = new Date(t1);
        var d2 = new Date(t2);
        return (d2.getTime() - d1.getTime()) >= 0;
    };
    DateTimeService.prototype.pad = function (n) {
        return (n < 10) ? ('0' + n) : n;
    };
    DateTimeService.compare = function (t1, t2) {
        var d1 = new Date(t1);
        var d2 = new Date(t2);
        var diff = (d2.getTime() - d1.getTime());
        if (diff < 0) {
            return -1;
        }
        if (diff > 0) {
            return 1;
        }
        return 0;
    };
    DateTimeService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], DateTimeService);
    return DateTimeService;
}());

/*
  getUTCTime() {
        var d = new Date();
        return this.parseTime(d.getUTCHours(), d.getUTCMinutes());
    }

    parseTime(hours: number, minutes: number) {
        return this.pad(hours) + ':' + this.pad(minutes);
    }

    getUTCDate() {
        var d = new Date();
        return this.parseDate(d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate());
    }

    parseDate(year: number, month: number, day: number) {
        return year + '-' + this.pad(month) + '-' + this.pad(day);
    }

    getUTCFullDateTime() {
        return this.getUTCDate() + 'T' + this.getUTCTime();
    }

    private pad(n) {
    return (n < 10)? ('0' + n) : n;
  }

  calculateElapsedTime(start: string, end: string): number {
    var hourStart: number = parseInt(start.substring(0,2));
    var hourEnd: number = parseInt(end.substring(0,2));
    var minuteStart: number = parseInt(start.substring(3,5));
    var minuteEnd: number = parseInt(end.substring(3,5));

    var totMinutesStart: number = hourStart * 60 + minuteStart;
    var totMinutesEnd: number = hourEnd * 60 + minuteEnd;

    var minutesElapsed = totMinutesEnd - totMinutesStart;

    return minutesElapsed / 60;
  }
  */ 
//# sourceMappingURL=date-time.js.map

/***/ }),

/***/ 821:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(487);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(488);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_screen_orientation__ = __webpack_require__(489);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_login_login__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_util_data_service__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};







var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, screenOrientation, data) {
        var _this = this;
        this.screenOrientation = screenOrientation;
        this.data = data;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */];
        this.testvalue = 777;
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            // Hide Statusbar
            platform.ready().then(function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    statusBar.hide();
                    statusBar.backgroundColorByHexString('#ffffff');
                    return [2 /*return*/];
                });
            }); });
            if (platform.is('ios')) {
                _this.screenOrientation.lock(_this.screenOrientation.ORIENTATIONS.LANDSCAPE);
            }
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\Owner\documents\repos\dinein\dinein\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n\n'/*ion-inline-end:"C:\Users\Owner\documents\repos\dinein\dinein\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_screen_orientation__["a" /* ScreenOrientation */],
            __WEBPACK_IMPORTED_MODULE_6__pages_util_data_service__["a" /* DataService */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 826:
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[490]);
//# sourceMappingURL=main.js.map