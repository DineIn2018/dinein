import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { LoginPage } from '../pages/login/login';
import { CreateUserPage } from '../pages/login/create-user/create-user';

import { TabsPage } from '../pages/tabs/tabs';

import { TablesPage, TableInfo, PartyInfo, NumToSeat, SelectServer } from '../pages/tables/tables';
import { AddPartyPage, Numpad } from '../pages/tables/add-party/add-party';
import { EmployeesPage, PunchPopoverPage } from '../pages/employees/employees';
import { TimePunchPage } from '../pages/timepunch/timepunch';
import { PunchCardPage } from '../pages/punchcard/punchcard';

import { CalendarPage } from '../pages/calendar/calendar';

import { ManagementPage } from '../pages/management/management';
import { EditEmployeePage } from '../pages/edit-employee/edit-employee';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CreateEmployeePage } from '../pages/create-employee/create-employee';

import { NgCalendarModule  } from 'ionic2-calendar';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    CreateUserPage,

    TablesPage,
    TableInfo,
    PartyInfo,
    NumToSeat,
    SelectServer,
    AddPartyPage,
    Numpad,

    EmployeesPage,

    TimePunchPage,
    PunchCardPage,
    CalendarPage,

    ManagementPage,

    TabsPage,
    EditEmployeePage,
    CreateEmployeePage,
    PunchPopoverPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    NgCalendarModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    CreateUserPage,

    TablesPage,
    TableInfo,
    PartyInfo,
    NumToSeat,
    SelectServer,
    AddPartyPage,
    Numpad,

    EmployeesPage,
    TimePunchPage,
    PunchCardPage,
    CalendarPage,

    ManagementPage,

    TabsPage,
    EditEmployeePage,
    CreateEmployeePage,
    PunchPopoverPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ScreenOrientation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FileTransfer,
    //FileUploadOptions, //commented b/c kept causing errors
    FileTransferObject, 
    File,
    Camera
  ]
})
export class AppModule {}
