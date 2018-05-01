import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';

import { LoginPage } from './login';

import { Component } from '@angular/core';
import { MyApp } from '../../app/app.component';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { CreateUserPage } from './create-user';


describe('LoginPage Component', () => {

  let fixture: ComponentFixture<LoginPage>;
  let component: LoginPage;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [
        MyApp,
        LoginPage
      ],
      imports: [
        IonicModule.forRoot(MyApp)
      ],
      providers: [
        NavController,
        {provide: NavParams, useClass: MockNavParams}
      ]
    }).compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPage);
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
  it('should be created', () => {
    expect(component instanceof LoginPage).toBe(true);
  });
  it('should initially have [email, password] set as null', () => {
    expect(component['email']).toBeNull();
    expect(component['password']).toBeNull();
  });

});

class MockNavParams{
  data = {
  };

  get(param){
    return this.data[param];
  }
}