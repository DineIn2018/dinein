export class URLParser{
  export function parseAdduser(url: String, object){
    let newURL = url + "/user/addUser/"  + object.email + '/' + object.password + '/' + object.firstName + '/' + object.lastName + '/' + object.phoneNo +'/' + object.restaurant;
      //url = newURL;
    return newURL;
  }

  function parseGetuser(url: String, name: String){
    let newURL = url + "/user/getUser" + name;
    return newURL;
  }

}
