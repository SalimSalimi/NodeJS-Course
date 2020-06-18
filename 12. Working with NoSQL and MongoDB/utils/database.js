const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
  MongoClient.connect('mongodb+srv://node-js-course:fXeLxxb9Dc39xQIK@cluster0-ik3vp.mongodb.net/test?retryWrites=true&w=majority')
  .then(client => {
    console.log("Connected");
    callback(client);
  })
  .catch(error => {
    console.log(error);
  });
}

module.exports = mongoConnect;