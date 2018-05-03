export class URLParser{
  addUser(url: String, object){
    let newURL = url + "/user/addUser/"  + object.email + '/' + object.password + '/' + object.firstName + '/' + object.lastName + '/' + object.phoneNo +'/' + object.restaurant;
      //url = newURL;
    return newURL;
  }

  authenticateUser(url: String, name: String, pwd:String){
    let newURL = url + "/user/getUser/" + name + '/' + pwd;
    return newURL;
  }

  addEmployee(url:String, object){
    let newURL = url + "/employee/addEmployee/" + object.id + '/' + object.fName + '/' + object.lName + '/' + object.title +'/' + object.pay +'/' +
      object.phoneNo
      //url = newURL;
    return newURL;
  }

  addRestaurant(url:String, object){
    let newURL = url + "/restaurant/addRestaurant/" + object.name + '/' + object.addr1 + '/' + object.addr2 + '/' + object.phoneNo;
      //url = newURL;
    return newURL;
  }

  addParty(url:String, object){
    let newURL = url + "/party/addParty/" + object.name + '/' + object.size + '/' + object.time + '/' + object.phoneNo +'/' + object.resv;
      //url = newURL;
    return newURL;
  }

  addShift(url: String, object){
    let newURL = url + "/shift/addShift/" + object.name + '/' + object.startTime + '/' + object.endTime + '/' + object.shiftLen;
      //url = newURL;
    return newURL;
  }
}
