export function URLparser(url: String, object, type: String){
  let i = 0;
  if(type === "UserObject"){
    let newURL = url + "/"  + object.email + '/' + object.password + '/' + object.firstName + '/' + object.lastName + '/' + object.phoneNo +'/' + object.restaurant;
    //url = newURL;
    return newURL;
  }
  return i;

}
