import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { LoginPage } from '../pages/login/login';
import { CreateUserPage } from '../pages/login/create-user/create-user';

import { TabsPage } from '../pages/tabs/tabs';

import { TablesPage, TableInfo, PartyInfo, NumToSeat } from '../pages/tables/tables';
import { AddPartyPage, Numpad } from '../pages/tables/add-party/add-party';
import { EmployeesPage, PunchPopoverPage } from '../pages/employees/employees';
import { TimePunchPage } from '../pages/timepunch/timepunch';
import { PunchCardPage } from '../pages/punchcard/punchcard';
import { CalendarPage } from '../pages/calendar/calendar';
import { ManagementPage } from '../pages/management/management';
import { EditEmployeePage } from '../pages/edit-employee/edit-employee';
import {UpdateManagementPage} from '../pages/update-management/update-management';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CreateEmployeePage } from '../pages/create-employee/create-employee';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    CreateUserPage,

    TablesPage,
    TableInfo,
    PartyInfo,
    NumToSeat,
    AddPartyPage,
    Numpad,

    EmployeesPage,

    TimePunchPage,
    PunchCardPage,
    CalendarPage,
    ManagementPage,
    UpdateManagementPage,
    TabsPage,
    EditEmployeePage,
    CreateEmployeePage,
    PunchPopoverPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
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
    AddPartyPage,
    Numpad,

    EmployeesPage,
    TimePunchPage,
    PunchCardPage,
    CalendarPage,
    ManagementPage,
    UpdateManagementPage,
    TabsPage,
    EditEmployeePage,
    CreateEmployeePage,
    PunchPopoverPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ScreenOrientation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
