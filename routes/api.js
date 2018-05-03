
//Dependencies
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
router.use(bodyParser.json()); // support json encoded bodies

var Schema = mongoose.Schema;
//create Schemas
var userSchema = new Schema({
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  phoneNo: Number,
  restaurant: String
});
var User = mongoose.model('User', userSchema);

var jso = {
  name: "casey",
  day: "monday"
}

//Product.methods(['get', 'put', 'post', 'delete']);
//Product.register(router, '/products');

router.get('/', function(req,res){
  console.log(jso);
  console.log(JSON.stringify(jso));
  console.log("should print this out");
});

//USER methods
router.get('/user/getUser/:email/:pwd', function(req,res){
  console.log('finding ' + req.params.email + ' and ' + req.params.pwd + ' at /user/getUser');
  User.findOne({ 'email': req.params.email, 'password': req.params.pwd }, function(err,user){
    if(err){
      console.log("user not found");
      res.send(err);
    }
    if(user){
      console.log("found: " + user);
      res.send(user);
    }
  })

});

router.post('/user/addUser/:email/:pwd/:fName/:lName/:phoneNo/:restaurant', function(req,res){

  console.log('email = ' + req.params.email);
  console.log('phoneNo = ' + req.params.phoneNo);

  User.create({
    email: req.params.email,
    password: req.params.pwd,
    firstName: req.params.fName,
    lastName: req.params.lName,
    phoneNo: req.params.phoneNo,
    restaurant: req.params.restaurant
  }, function(err, review){
    if(err)
      res.send(err);
  });

});

router.post('/employee/addEmployee/:id/:fname/:lname/:title/:pay/:phoneNo', function(req,res){
  console.log("post called on employee/addEmployee");
});

router.post('restaurant/addRestarant/:name/:addr1/:addr2/:capacity/:phoneNo/:totalEmploy/:managerpin', function(req,res){
  console.log("post called on restaurant/addRestarant");
});

router.post('party/addParty/:id/:name/:size/:time/:phoneNo/:resv', function(req,res){
  console.log("post called on party/addParty");
});

router.post('shift/addShift/:name/:startTime/:endTime/:shiftLen', function(req,res){
  console.log("post called on shift/addShift");
});

router.get('/user/getUsers', function(req,res){
  console.log('called user/getUsers API');
  User.find(function(err,user){
    if(err)
      res.send(err);
    res.send(user);

  })
});

//return Router
module.exports = router;
