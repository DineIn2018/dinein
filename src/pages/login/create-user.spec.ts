import { NavController, ModalController, ViewController, NavParams } from 'ionic-angular';
import { NavControllerMock, ModalControllerMock, ViewControllerMock, NavParamsMock, ModalMock } from 'ionic3-mocks';

import { CreateUserPage } from './create-user';

describe('Create User Page', () => {

  let navCtrl: NavController;
  let modalCtrl: ModalController;
  let viewCtrl: ViewController;
  let navParams: NavParams;

  let SUT: CreateUserPage;

  beforeEach(() => {
    // MOCKS :)
    navCtrl = NavControllerMock.instance();
    modalCtrl = ModalControllerMock.instance();
    viewCtrl = ViewControllerMock.instance();
    navParams = NavParamsMock.instance();
    SUT = new CreateUserPage(navCtrl, modalCtrl, viewCtrl, navParams);
  });

  afterEach(() => {
    navCtrl = null;
    modalCtrl = null;
    viewCtrl = null;
    navParams = null;
    SUT = null;
  });

  it('should be created', () => {
    expect(SUT).toBeTruthy();
  });
  it('should be a Create User Page', () => {
    expect(SUT instanceof CreateUserPage).toBe(true);
  });
  it('should initially contain invalid data', () => {
    expect(SUT.validData()).toBe(false);
  });

  it('should be popped', () => {
      SUT.goToLogin();
      expect(navCtrl.pop).toHaveBeenCalled();
  });

  describe('When user enters inputs', () => {

    beforeEach(function() {
      SUT.email = "e-mail";
      SUT.password = "password";
      SUT.confirmPassword = "password";
      SUT.firstName = "firstName";
      SUT.lastName = null;
      SUT.phone = null;
      SUT.restaurant = "Restaurant";
    });

    afterEach(function() {
      SUT.email = null;
      SUT.password = null;
      SUT.confirmPassword = null;
      SUT.firstName = null;
      SUT.lastName = null;
      SUT.phone = null;
      SUT.restaurant = null;
    });

    it('should not require optional inputs', function() {
      expect(SUT.validData()).toBe(true);
    });
    it('should check if password and confirmation matches', function() {
      var pass1 = "password";
      var pass2 = "badpassword";
      SUT.password = pass1;
      SUT.confirmPassword = pass1;
      expect(SUT.passwordsMatch()).toBe(true);
      SUT.password = pass1;
      SUT.confirmPassword = pass2;
      expect(SUT.passwordsMatch()).toBe(false);
    });
  });

  describe('Getting data from numpad modal', function() {
    it('should call a modal when button pressed', function() {
      SUT.presentNumpad();
      expect(modalCtrl.create).toHaveBeenCalled();
    });
  });
});