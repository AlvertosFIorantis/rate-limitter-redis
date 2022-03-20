const redis = require("redis");
// kano import to prmisify package pou einai built in sto node giati to redis package den kanei supprot apo defalut ta async away . The redis version 4 it doesnt need the promisy it supports async/await by default
const { promisify } = require("util");

const Redisclient = redis.createClient(6379);
// to redis trexei by default sto port locall host  127.0. 0.1

// connect redis
Redisclient.on("connect", () => {
  console.log("Redis Redisclient connected");
});

Redisclient.on("error", (error) => {
  console.log("Redis Error !!!");
  console.error(error);
  // to stop the app
  process.exit(1);
});

// i export all the functions that i have promisify from the main redis library as well as the Redisclient
module.exports = {
  Redisclient,
};
