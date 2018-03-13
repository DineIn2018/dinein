webpackJsonp([3],{

/***/ 111:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmployeesPage; });
/* unused harmony export Employee */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__edit_employee_edit_employee__ = __webpack_require__(150);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var EmployeesPage = (function () {
    function EmployeesPage(navCtrl) {
        this.navCtrl = navCtrl;
        this.employee2 = new Employee("Carl Robins", 4321, "Assistant Manager", "$30/hr", "(608) 345-1209", "http://www.math.uni-frankfurt.de/~person/_4170854.jpg");
        this.employee5 = new Employee("Marianne Beaumont", 9902, "Hostess", "$15/hr", "+33 8 92 70 12 39", "http://www.pearsonvue.com/pteprofessional/images/homepage.png");
        this.employee6 = new Employee("Anna Schmidt", 4231, "Manager", "$50/hr", "+49 30 2273 2152", "https://i.pinimg.com/736x/25/48/31/25483183a26a96adcc2b5a4002eda6ca--headshot-ideas-professional-photographer.jpg");
        this.employee7 = new Employee("Valerie Carter", 1, "Owner", "$1003/hr", "(202) 456-1111", "https://cdn10.phillymag.com/wp-content/uploads/2016/01/woman-biz.jpg");
        this.employee8 = new Employee("Phil Scott", 8156, "Bartender", "$10/hr", "(608) 310-4545", "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Robert_gold_bartender.jpg/220px-Robert_gold_bartender.jpg");
        this.editPage = __WEBPACK_IMPORTED_MODULE_2__edit_employee_edit_employee__["a" /* EditEmployeePage */];
        this.employees = new Array();
        this.employee1 = new Employee("Kevin Anderson", 1234, "Server", "$5/hr", "(608) 329-4565", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxhJ8HaQ88jGA0Ws2WTCnI4DzSgMzvEXk4qdbQVbCAiKyP9yGl");
        this.employee3 = new Employee("Tina Russo", 5678, "Head Chef", "$500/hr", "(414) 921-4980", "https://cdn2.goabroad.com/images/program_content/5-tips-for-teaching-english-abroad-as-a-person-of-color-2-1462426680.jpg");
        this.employee4 = new Employee("Bryan Suzan", 666, "DJ", "$0.03/hr", "1-800-436-3230", "../../assets/imgs/bryan.jpg");
        this.employees.push(this.employee1, this.employee2, this.employee3, this.employee4, this.employee5, this.employee6, this.employee7, this.employee8);
        this.employees.sort(this.sortByName);
        this.selectedEmployee = this.employees[0];
    }
    EmployeesPage.prototype.openEditPage = function () {
        this.navCtrl.push(this.editPage, { selectedEmployee: this.selectedEmployee });
    };
    EmployeesPage.prototype.selectEmployee = function (myEvent, employee) {
        this.selectedEmployee = employee;
    };
    EmployeesPage.prototype.sortByName = function (a, b) {
        return a.getName().localeCompare(b.getName());
    };
    EmployeesPage.prototype.editEmployee = function () {
    };
    EmployeesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-employees',template:/*ion-inline-start:"/Users/kameronyoung/dinein/src/pages/employees/employees.html"*/'<ion-split-pane when="xs">\n  <div main>\n    <div id="editbutton">\n      <button ion-button block outline (click)="openEditPage()">\n        Edit Info\n      </button>\n    </div>\n    <div id="mainbody">\n      <div id="employeeprofile">\n        <img id="employeeimage" src="{{selectedEmployee.getSrc()}}">\n        <h1>{{selectedEmployee.getName()}}</h1>\n        <div id="employeeinfo">\n          <span class="label">Employee ID:</span> {{selectedEmployee.getID()}}\n          <br>\n          <span class="label">Title:</span> {{selectedEmployee.getTitle()}}\n          <br>\n          <span class="label">Pay:</span> {{selectedEmployee.getPay()}}\n          <br>\n          <span class="label">Phone:</span> {{selectedEmployee.getPhone()}}\n        </div>\n      </div>\n    </div>\n    <div id="viewpunchbutton">\n      <button ion-button block outline (click)="selectEmployee($event, employees[1])">\n        View Punch\n      </button>\n    </div>\n  </div>\n\n  <div id="sidebar">\n    <div>\n      <h2>\n        EMPLOYEES\n      </h2>\n    </div>\n    <div id="employeelist">\n      <ion-list>\n        <button ion-button block outline *ngFor="let employee of employees" (click)="selectEmployee($event, employee)">\n          {{ employee.getName() }}\n        </button>\n        <button ion-button block outline *ngFor="let employee of employees" (click)="selectEmployee($event, employee)">\n          {{ employee.getName() }}\n        </button>\n        <button ion-button block outline *ngFor="let employee of employees" (click)="selectEmployee($event, employee)">\n          {{ employee.getName() }}\n        </button>\n      </ion-list>\n    </div>\n  </div>\n</ion-split-pane>'/*ion-inline-end:"/Users/kameronyoung/dinein/src/pages/employees/employees.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]])
    ], EmployeesPage);
    return EmployeesPage;
}());

var Employee = (function () {
    function Employee(name, ID, title, pay, phone, imageSrc) {
        this.name = name;
        this.ID = ID;
        this.imageSrc = imageSrc;
        this.title = title;
        this.pay = pay;
        this.phone = phone;
    }
    Employee.prototype.getName = function () {
        return this.name;
    };
    Employee.prototype.setName = function (name) {
        this.name = name;
    };
    Employee.prototype.getSrc = function () {
        return this.imageSrc;
    };
    Employee.prototype.setSrc = function (src) {
        this.imageSrc = src;
    };
    Employee.prototype.getID = function () {
        return this.ID;
    };
    Employee.prototype.setID = function (id) {
        this.ID = id;
    };
    Employee.prototype.getTitle = function () {
        return this.title;
    };
    Employee.prototype.setTitle = function (title) {
        this.title = title;
    };
    Employee.prototype.getPhone = function () {
        return this.phone;
    };
    Employee.prototype.setPhone = function (phone) {
        this.phone = phone;
    };
    Employee.prototype.getPay = function () {
        return this.pay;
    };
    Employee.prototype.setPay = function (pay) {
        this.pay = pay;
    };
    return Employee;
}());

//# sourceMappingURL=employees.js.map

/***/ }),

/***/ 149:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateUserPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
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
    function CreateUserPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    CreateUserPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CreateUserPage');
    };
    CreateUserPage.prototype.goToLogin = function () {
        this.navCtrl.pop();
    };
    CreateUserPage.prototype.goToSelectRestaurant = function () {
    };
    CreateUserPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-create-user',template:/*ion-inline-start:"/Users/kameronyoung/dinein/src/pages/create-user/create-user.html"*/'<!--\n  Generated template for the CreateUserPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n</ion-header>\n\n<<<<<<< HEAD\n<ion-content no-bounce>\n  <div class="background">\n    <div id="container">\n      <ion-list>\n\n        <ion-label class="subtitle">Create User</ion-label>\n\n        <ion-item class="inputfield">\n          <ion-input type="Text" placeholder="e-mail"></ion-input>\n        </ion-item>\n\n        <ion-item class="inputfield">\n          <ion-input type="Password" placeholder="Password"></ion-input>\n        </ion-item>\n\n        <ion-item class="inputfield">\n          <ion-input type="Password" placeholder="Confirm Password"></ion-input>\n        </ion-item>\n\n        <ion-item class="inputfield">\n          <ion-input type="Text" placeholder="First Name"></ion-input>\n        </ion-item>\n\n        <ion-item class="inputfield">\n          <ion-input type="Text" placeholder="Last Name (optional)"></ion-input>\n        </ion-item>\n\n        <ion-item class="inputfield">\n          <ion-input type="number" placeholder="Phone # (optional)"></ion-input>\n        </ion-item>\n        \n        <ion-item class="inputfield">\n          <ion-label>Restaurant</ion-label>\n          <ion-select okText="Select" cancelText="Cancel">\n            <ion-option>CREATE NEW RESTAURANT</ion-option>\n            <ion-option>Placeholder Restaurant</ion-option>\n          </ion-select>\n        </ion-item>\n\n        <button id="buttons" ion-button block (click)="goToLogin()">Next</button>\n        <button id="buttons" ion-button outline block (click)="goToLogin()">Cancel</button>\n      \n      </ion-list>\n    </div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/kameronyoung/dinein/src/pages/create-user/create-user.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
    ], CreateUserPage);
    return CreateUserPage;
}());

//# sourceMappingURL=create-user.js.map

/***/ }),

/***/ 150:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditEmployeePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__employees_employees__ = __webpack_require__(111);
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
 * Generated class for the EditEmployeePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EditEmployeePage = (function () {
    function EditEmployeePage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.employeePage = __WEBPACK_IMPORTED_MODULE_2__employees_employees__["a" /* EmployeesPage */];
        this.selectedEmployee = navParams.get('selectedEmployee');
        this.selectedImageSrc = this.selectedEmployee.getSrc();
    }
    EditEmployeePage.prototype.saveNewValues = function () {
        this.selectedEmployee.setID(this.newID);
        this.selectedEmployee.setName(this.newName);
        this.selectedEmployee.setTitle(this.newTitle);
        this.selectedEmployee.setPay(this.newPay);
        this.selectedEmployee.setPhone(this.newPhone);
    };
    EditEmployeePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EditEmployeePage');
    };
    EditEmployeePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-edit-employee',template:/*ion-inline-start:"/Users/kameronyoung/dinein/src/pages/edit-employee/edit-employee.html"*/'<button ion-button block outline (click)="saveNewValues()">\n    Save and Exit\n</button>\n\n\n<ion-list inset>\n\n    <ion-item>\n        <ion-label>Image src</ion-label>\n        <ion-input type="text" [(ngModel)]="newSrc"></ion-input>\n    </ion-item>\n\n    <ion-item>\n        <ion-label>Name</ion-label>\n        <ion-input type="text" [(ngModel)]="newName"></ion-input>\n    </ion-item>\n\n    <ion-item>\n        <ion-label>ID</ion-label>\n        <ion-input type="number" [(ngModel)]="newID"></ion-input>\n    </ion-item>\n\n    <ion-item>\n        <ion-label>Title</ion-label>\n        <ion-input type="text" [(ngModel)]="newTitle"></ion-input>\n    </ion-item>\n\n    <ion-item>\n        <ion-label>Pay</ion-label>\n        <ion-input type="text" [(ngModel)]="newPay"></ion-input>\n    </ion-item>\n\n    <ion-item>\n        <ion-label>Phone</ion-label>\n        <ion-input type="text" [(ngModel)]="newPhone"></ion-input>\n    </ion-item>\n\n</ion-list>\n\n<button ion-button block outline (click)="confirmExit()">\n    Exit Without Saving\n</button>\n\n<!--<ion-split-pane when="xs">\n    <div main>\n        <div id="editbutton">\n            <button ion-button block outline>\n                DoneEditing\n            </button>\n        </div>\n        <div id="mainbody">\n            <div id="employeeprofile">\n                <img id="employeeimage" src="{{selectedEmployee.getSrc()}}">\n                <h1 id="employeename">{{selectedEmployee.getName()}}</h1>\n                <div id="employeeinfo">\n                    <ion-item>\n                        <ion-label color="primary">Employee ID</ion-label>\n                        <ion-input placeholder="{{selectedEmployee.getID()}}" [[ngModel]]="selectedEmployee.ID"></ion-input>\n                    </ion-item>\n                    Employee ID: {{selectedEmployee.getID()}}\n                    <br />Title: {{selectedEmployee.getTitle()}}\n                    <br />Pay: {{selectedEmployee.getPay()}}\n                    <br />Phone: {{selectedEmployee.getPhone()}}\n                </div>\n            </div>\n        </div>\n        <div id="viewpunchbutton">\n            <button ion-button block outline (click)="selectEmployee($event, employees[0])">\n                View Punch\n            </button>\n        </div>\n    </div>\n\n    <div id="sidebar">\n        <div id="EmployeeListTitle">\n            EMPLOYEES\n        </div>\n        <div id="employeelist">\n            <ion-list>\n                <button ion-button block outline *ngFor="let employee of employees" (click)="selectEmployee($event, employee)">\n                    {{ employee.getName() }}\n                </button>\n                <button ion-button block outline *ngFor="let employee of employees" (click)="selectEmployee($event, employee)">\n                    {{ employee.getName() }}\n                </button>\n                <button ion-button block outline *ngFor="let employee of employees" (click)="selectEmployee($event, employee)">\n                    {{ employee.getName() }}\n                </button>\n                <button ion-button block outline *ngFor="let employee of employees" (click)="selectEmployee($event, employee)">\n                    {{ employee.getName() }}\n                </button>\n                <button ion-button block outline *ngFor="let employee of employees" (click)="selectEmployee($event, employee)">\n                    {{ employee.getName() }}\n                </button>\n                <button ion-button block outline *ngFor="let employee of employees" (click)="selectEmployee($event, employee)">\n                    {{ employee.getName() }}\n                </button>\n                <button ion-button block outline *ngFor="let employee of employees" (click)="selectEmployee($event, employee)">\n                    {{ employee.getName() }}\n                </button>\n                <button ion-button block outline *ngFor="let employee of employees" (click)="selectEmployee($event, employee)">\n                    {{ employee.getName() }}\n                </button>\n            </ion-list>\n        </div>\n    </div>\n</ion-split-pane>-->'/*ion-inline-end:"/Users/kameronyoung/dinein/src/pages/edit-employee/edit-employee.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
    ], EditEmployeePage);
    return EditEmployeePage;
}());

//# sourceMappingURL=edit-employee.js.map

/***/ }),

/***/ 151:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tabs_tabs__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__create_user_create_user__ = __webpack_require__(149);
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
    function LoginPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.executeLogin = function () {
        console.log(this.email.value, this.password.value);
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
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__create_user_create_user__["a" /* CreateUserPage */]);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('email'),
        __metadata("design:type", Object)
    ], LoginPage.prototype, "email", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('password'),
        __metadata("design:type", Object)
    ], LoginPage.prototype, "password", void 0);
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/Users/kameronyoung/dinein/src/pages/login/login.html"*/'<!--\n  Generated template for the LoginPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n</ion-header>\n\n<ion-content no-bounce>\n  <div class="background">\n    <div id="container">\n      <ion-list>\n\n        <ion-label class="maintitle">DineIn</ion-label>\n\n        <ion-item class="inputfield">\n          <ion-input clearInput type="Text" placeholder="e-mail" #email></ion-input>\n        </ion-item>\n\n        <ion-item class="inputfield">\n          <ion-input clearInput type="Password" placeholder="Password" #password></ion-input>\n        </ion-item>   \n        \n        <button id="buttons" ion-button block (click)="executeLogin()">Login</button>\n        <button id="buttons" ion-button outline block (click)="goToCreateUser()">Create User</button>\n      \n      </ion-list>\n    </div>\n  </div>\n</ion-content>'/*ion-inline-end:"/Users/kameronyoung/dinein/src/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 164:
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
webpackEmptyAsyncContext.id = 164;

/***/ }),

/***/ 209:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/create-user/create-user.module": [
		679,
		2
	],
	"../pages/edit-employee/edit-employee.module": [
		680,
		1
	],
	"../pages/login/login.module": [
		681,
		0
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
webpackAsyncContext.id = 209;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 210:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tables_tables__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__employees_employees__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__timepunch_timepunch__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__settings_settings__ = __webpack_require__(305);
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
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_1__tables_tables__["a" /* TablesPage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_2__employees_employees__["a" /* EmployeesPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_3__timepunch_timepunch__["a" /* TimePunchPage */];
        this.tab4Root = __WEBPACK_IMPORTED_MODULE_4__settings_settings__["a" /* SettingsPage */];
    }
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/kameronyoung/dinein/src/pages/tabs/tabs.html"*/'<ion-tabs>\n  <ion-tab [root]="tab1Root" tabTitle="Tables" tabIcon="restaurant"></ion-tab>\n  <ion-tab [root]="tab2Root" tabTitle="Employees" tabIcon="people"></ion-tab>\n  <ion-tab [root]="tab3Root" tabTitle="TimePunch" tabIcon="time"></ion-tab>\n  <ion-tab [root]="tab4Root" tabTitle="Settings" tabIcon="settings"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"/Users/kameronyoung/dinein/src/pages/tabs/tabs.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 211:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TablesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TablesPage = (function () {
    function TablesPage(navCtrl, actionSheetCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.alertCtrl = alertCtrl;
        this.tables = [new Table(0, 2), new Table(1, 4), new Table(2, 6)];
        this.parties = [new Party(0, "Kass", 7, "4:20pm", "608 609 5186", true),
            new Party(1, "Casey", 4, "5:55pm", "608 608 6006", true),
            new Party(2, "Kameron", 2, "6:15pm", "506 506 5006", false),
            new Party(3, "Jimmie", 3, "8:01pm", "999 999 9999", false),
            new Party(4, "Suzy", 1000, "9:00pm", "012 345 6789", false),
            new Party(5, "Bryan", 1, "11:59pm", "666 666 6666", false),
        ];
    }
    TablesPage.prototype.presentTableActions = function (ID) {
        var _this = this;
        var seatOrFree;
        if (this.tables[ID].free) {
            seatOrFree = "Seat Party";
        }
        else {
            seatOrFree = "Free Table";
        }
        var tableActions = this.actionSheetCtrl.create({
            title: 'Table Actions',
            buttons: [
                {
                    text: seatOrFree,
                    handler: function () {
                        if (_this.tables[ID].free) {
                            console.log('Seat Party tapped on table ' + ID);
                            // TODO: Let user select party size
                            _this.tables[ID].seatParty(1);
                        }
                        else {
                            console.log('Free Table tapped on table ' + ID);
                            // TODO: Let user select party size
                            _this.tables[ID].freeTable();
                        }
                    }
                },
                {
                    text: 'Table Information',
                    handler: function () {
                        console.log('Table ' + ID + ' info tappped');
                        _this.displayInfo(_this.tables[ID]);
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        tableActions.present();
    };
    TablesPage.prototype.presentPartyActions = function (ID) {
        var _this = this;
        var partyActions = this.actionSheetCtrl.create({
            title: 'Party Actions',
            buttons: [
                {
                    text: 'Seat Party',
                    handler: function () {
                        console.log('Party ' + ID + ' seated');
                        _this.parties.splice(ID, 1);
                    }
                },
                {
                    text: 'Party Information',
                    handler: function () {
                        console.log('Party ' + ID + ' info tappped');
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        partyActions.present();
    };
    TablesPage.prototype.displayInfo = function (t) {
        var alert = this.alertCtrl.create({
            title: 'Table: ' + t.ID,
            subTitle: 'Capacity: ' + t.capacity +
                '\nStatus: ' + t.free +
                '\nCurrent Party: ' + t.partySize +
                '\nServer: ' + t.server,
            buttons: ['Dismiss']
        });
        alert.present();
    };
    TablesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-tables',template:/*ion-inline-start:"/Users/kameronyoung/dinein/src/pages/tables/tables.html"*/'<ion-header>\n  <div id="topleft">\n    <ion-label class="header">Placeholder\'s Restaurant</ion-label>\n  </div>\n\n  <div id="topright">\n  	<button ion-button outline block>Edit Layout</button>\n  </div>\n</ion-header>\n\n<ion-content>\n	<div id="tablelayout" main scroll="true">\n    <button *ngFor="let table of tables" class="table" ion-button outline\n            (click)="presentTableActions(table.ID)">\n      {{table.capacity}}\n    </button>\n	</div>\n\n	<div id="waitlist">\n		<ion-list scroll="true">\n\n      <button *ngFor="let party of parties" id="waitparty" ion-button block outline\n              (click)="presentPartyActions(party.ID)">\n        {{party.display()}}\n      </button>\n		</ion-list>\n	</div>\n</ion-content>\n\n\n'/*ion-inline-end:"/Users/kameronyoung/dinein/src/pages/tables/tables.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], TablesPage);
    return TablesPage;
}());

var Table = (function () {
    function Table(IDin, capacityIn) {
        this.ID = IDin;
        this.capacity = capacityIn;
        this.free = true;
        this.partySize = 0;
        this.server = "N/A";
    }
    Table.prototype.freeTable = function () {
        console.log('Table ' + this.ID + ' freed');
        this.free = true;
        this.partySize = 0;
        this.server = "N/A";
    };
    Table.prototype.seatParty = function (size) {
        console.log('Seated ' + size + ' people at Table ' + this.ID);
        this.free = false;
        this.partySize = size;
        this.server = "Manager";
    };
    return Table;
}());
var Party = (function () {
    function Party(ID, name, size, time, contact, reservation) {
        this.ID = ID;
        this.name = name;
        this.size = size;
        this.time = time;
        this.contact = contact;
        this.reservation = reservation;
    }
    Party.prototype.display = function () {
        return this.name + ', ' + this.size + ', ' + this.time;
    };
    return Party;
}());
//# sourceMappingURL=tables.js.map

/***/ }),

/***/ 212:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TimePunchPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs__ = __webpack_require__(373);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs__);
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
    function TimePunchPage(navCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.currDateTime = new Date();
        var source = __WEBPACK_IMPORTED_MODULE_2_rxjs__["Observable"].interval(1000); // 1 second subscription
        this.subscription = source.subscribe(function (x) { return _this.currDateTime = new Date(); });
    }
    TimePunchPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-timepunch',template:/*ion-inline-start:"/Users/kameronyoung/dinein/src/pages/timepunch/timepunch.html"*/'<ion-header>\n\n</ion-header>\n\n<div class="background">\n<div id="container">\n  <ion-list>\n\n    <ion-label class="subtitle">Punch In/Out</ion-label>\n    <ion-label class="header">{{currDateTime | date: \'EEE MMM d, yyyy\'}}</ion-label>\n    <ion-label class="header">{{currDateTime | date: \'hh:mm:ss aa\'}}</ion-label>\n\n    <ion-item class="inputfield">\n      <ion-input type="tel" placeholder="Employee ID"></ion-input>\n    </ion-item>\n  \n    <button id="buttons" ion-button block>Submit</button>\n    <button id="buttons" ion-button outline block>Clear</button>\n\n  </ion-list>\n</div>\n</div>'/*ion-inline-end:"/Users/kameronyoung/dinein/src/pages/timepunch/timepunch.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]])
    ], TimePunchPage);
    return TimePunchPage;
}());

//# sourceMappingURL=timepunch.js.map

/***/ }),

/***/ 305:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SettingsPage = (function () {
    function SettingsPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    SettingsPage.prototype.executeLogout = function () {
        this.navCtrl.parent.parent.pop(this);
    };
    SettingsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-settings',template:/*ion-inline-start:"/Users/kameronyoung/dinein/src/pages/settings/settings.html"*/'<ion-header>\n  <div id="topleft">\n    <ion-label class="subtitle">Management</ion-label>\n  </div>\n\n  <div id="topright">\n  	<button ion-button outline block (click)="executeLogout()">Logout</button>\n  </div>\n</ion-header>\n\n<ion-content padding>\n\n  <div id="container">\n    <ion-list>\n\n    </ion-list>\n  </div>\n\n</ion-content>\n'/*ion-inline-end:"/Users/kameronyoung/dinein/src/pages/settings/settings.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]])
    ], SettingsPage);
    return SettingsPage;
}());

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 348:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(353);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 353:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(674);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_screen_orientation__ = __webpack_require__(678);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_login_login__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_create_user_create_user__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_tabs_tabs__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_tables_tables__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_employees_employees__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_timepunch_timepunch__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_settings_settings__ = __webpack_require__(305);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_edit_employee_edit_employee__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_status_bar__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_splash_screen__ = __webpack_require__(347);
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
                __WEBPACK_IMPORTED_MODULE_6__pages_create_user_create_user__["a" /* CreateUserPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_tables_tables__["a" /* TablesPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_employees_employees__["a" /* EmployeesPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_timepunch_timepunch__["a" /* TimePunchPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_settings_settings__["a" /* SettingsPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_edit_employee_edit_employee__["a" /* EditEmployeePage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/create-user/create-user.module#CreateUserPageModule', name: 'CreateUserPage', segment: 'create-user', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/edit-employee/edit-employee.module#EditEmployeePageModule', name: 'EditEmployeePage', segment: 'edit-employee', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] }
                    ]
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_create_user_create_user__["a" /* CreateUserPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_tables_tables__["a" /* TablesPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_employees_employees__["a" /* EmployeesPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_timepunch_timepunch__["a" /* TimePunchPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_settings_settings__["a" /* SettingsPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_edit_employee_edit_employee__["a" /* EditEmployeePage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_13__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_14__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_screen_orientation__["a" /* ScreenOrientation */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 674:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_login_login__ = __webpack_require__(151);
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
    function MyApp(platform, statusBar, splashScreen) {
        var _this = this;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */];
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
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/kameronyoung/dinein/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/kameronyoung/dinein/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ })

},[348]);
//# sourceMappingURL=main.js.map