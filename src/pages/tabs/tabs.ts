import { Component } from '@angular/core';

import { TablesPage } from '../tables/tables';
import { EmployeesPage } from '../employees/employees';
import { TimePunchPage } from '../timepunch/timepunch';
import { PunchCardPage } from '../punchcard/punchcard';
import { SettingsPage } from '../settings/settings';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = TablesPage;
  tab2Root = EmployeesPage;
  tab3Root = TimePunchPage;
  tab4Root = PunchCardPage;
  tab5Root = SettingsPage;

  constructor() {

  }
}
