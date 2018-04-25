export class URLParser{
  addUser(url: String, object){
    let newURL = url + "/user/addUser/"  + object.email + '/' + object.password + '/' + object.firstName + '/' + object.lastName + '/' + object.phoneNo +'/' + object.restaurant;
      //url = newURL;
    return newURL;
  }

  getAUser(url: String, name: String){
    let newURL = url + "/user/getUser/" + name;
    return newURL;
  }

}
