import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { LoginPage } from '../pages/login/login';
import { CreateUserPage } from '../pages/create-user/create-user';

import { TabsPage } from '../pages/tabs/tabs';

import { TablesPage, TableInfo, PartyInfo, AddParty, NumToSeat } from '../pages/tables/tables';
import { EmployeesPage, PunchPopoverPage } from '../pages/employees/employees';
import { TimePunchPage } from '../pages/timepunch/timepunch';
import { SettingsPage } from '../pages/settings/settings';
import { EditEmployeePage } from '../pages/edit-employee/edit-employee';

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
    AddParty,
    NumToSeat,

    EmployeesPage,
    TimePunchPage,
    SettingsPage,
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
    AddParty,
    NumToSeat,

    EmployeesPage,
    TimePunchPage,
    SettingsPage,
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
