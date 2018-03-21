import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { LoginPage } from '../pages/login/login';
import { CreateUserPage } from '../pages/create-user/create-user';

import { TabsPage } from '../pages/tabs/tabs';

import { TablesPage } from '../pages/tables/tables';
import { EmployeesPage } from '../pages/employees/employees';
import { TimePunchPage } from '../pages/timepunch/timepunch';
import { SettingsPage } from '../pages/settings/settings';
import { EditEmployeePage } from '../pages/edit-employee/edit-employee';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    CreateUserPage,

    TablesPage,
    EmployeesPage,
    TimePunchPage,
    SettingsPage,
    TabsPage,
    EditEmployeePage
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
    EmployeesPage,
    TimePunchPage,
    SettingsPage,
    TabsPage,
    EditEmployeePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ScreenOrientation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
