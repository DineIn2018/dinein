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

}
