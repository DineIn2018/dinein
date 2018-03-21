export interface Restaurant{
  restID: number;
  name: string;
  tableListID: number;
  address: string;
  ownerID: number;
  managerID: number;
  contactNo: string;
  contactEmail: string
}

export interface Table{
  tableID: number;
  tableListID: number;
  restaurantID: number;
  serverID: number;
  xpos: number;
  ypos: number
  full: boolean;
  capacity: number;
  currPartyID: number;
  currPartySize: number
}

export interface Party{
  partyID: number;
  numGuests: number;
  contactID: number;
  reservName: string;
  timeIn: string;
  reserved: boolean;
  here: boolean;
  seated: boolean
}

export interface Employee{
  employeeID: number;
  name: string;
  role: string;
  payPerHour: number;
  dateHired: string;
  contactNum: string;
  disciplineStrikes: number;
  currentlyWorking: boolean;
  lastShift: string
}

export interface SpecialEvent{
  eventID: number;
  contactID: number;
  eventType: string;
  private: boolean;
  start: string;
  end: string
}

export interface PunchEntry{
  employeeID: number;
  start: string;
  end: string
}

export interface EventType{
  eventType: string
}

export interface Role{
  role: string
}
