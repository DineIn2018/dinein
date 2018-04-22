import { NavController, PopoverController } from 'ionic-angular';
import { NavControllerMock, PopoverControllerMock } from 'ionic3-mocks';

import { EmployeesPage } from './employees';

describe('Employees Page', () => {

    let navCtrl: NavController;
    let popCtrl: PopoverController;
    /*let modalCtrl: ModalController;
    let viewCtrl: ViewController;
    let navParams: NavParams;*/

    let SUT: EmployeesPage;

    beforeEach(() => { 
        navCtrl = NavControllerMock.instance();
        popCtrl = PopoverControllerMock.instance();
        /*modalCtrl = ModalControllerMock.instance();
        viewCtrl = ViewControllerMock.instance();
        navParams = NavParamsMock.instance();*/
        SUT = new EmployeesPage(navCtrl, popCtrl);
    });
    afterEach(() => {
        navCtrl = null;
        popCtrl = null;
        /*modalCtrl = null;
        viewCtrl = null;
        navParams = null;*/
        SUT = null;
      });

      it('should be created', () => {
        expect(SUT).toBeTruthy();
      });
      it('should be an Employee Page', () => {
        expect(SUT instanceof EmployeesPage).toBe(true);
      });
      
    
      /*it('should be popped', () => {
          SUT.goToLogin();
          expect(navCtrl.pop).toHaveBeenCalled();
      });*/


});