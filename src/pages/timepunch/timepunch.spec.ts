import { NavController, AlertController } from 'ionic-angular';
import { NavControllerMock, AlertControllerMock } from 'ionic3-mocks';

import { TimePunchPage } from './timepunch';
import { DateTimeService } from '../util/date-time';

describe('TimePunch Page', () => {

  let navCtrl: NavController;
  let alertCtrl: AlertController;
  let dateTime: DateTimeService;
  let SUT: TimePunchPage;

  beforeEach(() => {
    // MOCKS :)
    navCtrl = NavControllerMock.instance();
    alertCtrl = AlertControllerMock.instance();
    dateTime = new DateTimeService();

    SUT = new TimePunchPage(navCtrl, alertCtrl, dateTime);
  });

  afterEach(() => {
    navCtrl = null;
    alertCtrl = null;
    dateTime = null;
    SUT = null;
  });

  it('should be created', () => {
    expect(SUT).toBeTruthy();
  });
  it('should be a Create User Page', () => {
    expect(SUT instanceof TimePunchPage).toBe(true);
  });
  it('should present alert confirmation upon submission', () => {
    SUT.submit();
    expect(alertCtrl.create).toHaveBeenCalled();
  });

  describe('Valid ID checking', () => {

    beforeEach(() => {
      SUT.ID = 0;
    });
    afterEach(() => {
      SUT.ID = 0;
    });

    it('should deny IDs <= 0', () => {
      expect(SUT.validID()).toBe(false);
    });
    it('should accept ID of 1 (owner)', () => {
      SUT.ID = 1;
      expect(SUT.validID()).toBe(true);
    });

  })
});