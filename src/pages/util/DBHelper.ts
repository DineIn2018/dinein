import { MongoClient } from 'mongodb';
import { Injectable } from "@angular/core";
//import * as mongodb from 'mongodb';
//import {Db as MongoDb} from 'mongodb';

@Injectable()
export class DBHelper {

  constructor(MonClient: MongoClient) {
    // let mongodb = require('mongodb');
    // let mongoClient: MongoClient = mongodb.MongoClient;

  }
  addUser(mail, pwd, fName, lName, pNo, rest) {
    const MongoClient = require('mongodb').MongoClient; /////?????????????
    const url = "mongodb+srv://cnitz:9W7LZ2Bsq9ahOli6@startingcluster-wkejy.mongodb.net/DineInDB";
    const user = {
      email: mail,
      password: pwd,
      firstName: fName,
      lastName: lName,
      phoneNo: pNo,
      restaurant: rest
    };
    const dbName = "DineInDB"

    MongoClient.connect(url, function (err, client) {
      const db = client.db(dbName);
      const collection = db.collection('Users');

      let results = collection.insertOne({
        email: user.email,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNo: user.phoneNo,
        restaurant: user.restaurant
      });

    });
  }
}