/*  Wrapper class skeleton for our database. We are currently in the process of
*   connecting the backend support to our app, so we are just adding the
*   functions that we need as we go along (for now), along with the queries
*   (inSQLite3) that will be used to extract the information that the method
*   calls for.
*/

import { Restaurant, Table, Party, Employee, SpecialEvent, PunchEntry, eventType, Role } from "./DBDefs.ts";

class DBManager {
  //********** SETTER METHODS **********
  function createRestaurant (Restaurant rest){
    //INSERT INTO Restaurant rest
  }

  function createTable (Table table){
    //INSERT INTO Table table
  }

  function createParty(Party party){
    //INSERT INTO Party party
  }

  function createEmployee(Employee employee){
    //INSERT INTO Employee employee
  }

  function createSpecialEvent(SpecialEvent event){
    //INSERT INTO SpecialEvent (event)
  }

  function createPunchEntry(PunchEntry punchEntry){
    //INSERT INTO PunchEntry (punchEntry)
  }

  function createEventType(EventType eventType){
    //INSERT INTO EventType (eventType)
  }

  function createRole(Role role){
    //INSERT INTO Role (role)
  }
  //********** QUERY METHODS **********
  function getTables {
     /*   SELECT *
     *    FROM Table
     */
     return result;
  }
  function getPartiesWaiting{
    /*    SELECT *
    *     FROM Party
    *     WHERE here = true AND
    *     seated = false
    */
    return result;
  }
  function getEmployees {
    /*    SELECT *
    *     FROM Employee
    */
    return result;
  }
};
