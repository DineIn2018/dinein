import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { AlertControllerMock } from '../../../test-config/mocks-ionic';

import { TablesPage, Table, Party, Mode, Employee } from './tables';

import { Component } from '@angular/core';
import { MyApp } from '../../app/app.component';
import { NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { ActionSheetController, ModalController } from 'ionic-angular';
import { AddPartyPage } from './add-party';
import { DateTimeService } from '../util/date-time';


describe('TablesPage Component', () => {

  let fixture: ComponentFixture<TablesPage>;
  let component: TablesPage;
  let debugElement: DebugElement;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [
        MyApp,
        TablesPage
      ],
      imports: [
        IonicModule.forRoot(MyApp)
      ],
      providers: [
        NavController, ModalController, DateTimeService,
        {provide: NavParams, useClass: MockNavParams},
        { provide: ViewController, useClass: MockViewController },
        { provide: AlertController, useClass: AlertControllerMock}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablesPage);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  afterEach(() => {
      fixture.destroy();
      component = null;
  });

  it('is created', () => {
      expect(fixture).toBeTruthy();
      expect(component).toBeTruthy();
  });
  it('is of correct page type', () => {
    expect(component instanceof TablesPage).toBe(true);
  });
  it('should initially be in default mode and have no party selected', () => {
    expect(component['mode']).toBe(Mode.Default);
    expect(component['selectedParty']).toBeNull();
  });

/*  it('On Table Press', () => {
    let tables = component['tables'];
    let table = tables[0];
    component.onTablePress(table);
    if (!component.seatingPartyMode()) {
        expect(component.presentTableActions).toHaveBeenCalledWith(table);
    } else {

    }
  });*/

});

class MockNavParams{
  data = {
  };

  get(param){
    return this.data[param];
  }
}

export class MockViewController{
  readReady = {
    subscribe(){

    }
  };
  writeReady = {
    subscribe(){

    }
  };

  dismiss(){
    console.log('View Controller Dismiss Called');
  }
  _setHeader(){

  }
  _setNavbar(){

  }
  _setIONContent(){

  }
  _setIONContentRef(){

  }

}