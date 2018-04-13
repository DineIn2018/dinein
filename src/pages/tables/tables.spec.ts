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
/*
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
  it('should delete the correct parties when specified', () => {
    let parties = component['parties'];
    let party = parties[0];
    component.deleteParty(party);
    expect(component['parties']).not.toContain(party);
  });

  describe('switching to seat party mode', () => {
    let parties: Party[];
    let party: Party;
    beforeEach(() => {
      parties = component['parties'];
      party = parties[0];
      component.switchModeTo(Mode.SeatingParty, party);
    });

    afterEach(() => {
      component.switchModeTo(Mode.Default);
    });

    it('should be in seating party mode', () => {
      expect(component['mode']).toBe(Mode.SeatingParty);
      expect(component.seatingPartyMode()).toBe(true);
    });
    it('should set selected party to the party passed', () => {
      expect(component['selectedParty']).toBe(party);
    });

  });
*/
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