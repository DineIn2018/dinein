export class UserObject{
    email: String;
    password: String;
    firstName: String;
    lastName: String;
    phoneNo: Number;
    restaurant: String;
}
export class RestaurantObject{
    name: String;
    addr1: String;
    addr2: String;
    capacity: Number;
    phoneNo: Number;
    totalEmploy: Number;
    managerPIN: Number;
}

export class EmployeeObject {
    id: Number;
    fName: String;
    lName: String;
    imageSource: String;
    title: String;
    pay: Number;
    phoneNo: Number
}

export class TableObject {
  id: Number;
  capacity: Number;
  free: boolean;
  partySize: Number;
  timeIn: String;
  server: String;
  guestName: String;
  xPos: String;
  yPos: String
}
export class PartyObject{
  id: Number;
  name: String;
  size: Number;
  time: String;
  phoneNo: Number;
  resv: boolean
}
export class ShiftObject{
  name: String;
  startTime: String;
  endTime: String;
  shiftLen: String
}
