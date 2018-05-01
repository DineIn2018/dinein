import { async, TestBed } from '@angular/core/testing';
import { IonicModule, Platform } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import {
  PlatformMock,
  StatusBarMock,
  SplashScreenMock
} from '../../test-config/mocks-ionic';

describe('MyApp Component', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyApp],
      imports: [
        IonicModule.forRoot(MyApp)
      ],
      providers: [
        { provide: StatusBar, useClass: StatusBarMock },
        { provide: SplashScreen, useClass: SplashScreenMock },
        { provide: Platform, useClass: PlatformMock }
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyApp);
    component = fixture.componentInstance;
  });

  afterEach(() => {
      fixture.destroy();
      component = null;
  });

  it('is created', () => {
      expect(fixture).toBeTruthy();
      expect(component).toBeTruthy();
  });
  it('initialises with a root page of LoginPage', () => {
      expect(component['rootPage']).toBe(LoginPage);
  });
  it('should be created', () => {
    expect(component instanceof MyApp).toBe(true);
  });
  it('should have test value 777', () => {
    expect(component['testvalue']).toBe(777);
    //console.log(component['testvalue']);
  });

});