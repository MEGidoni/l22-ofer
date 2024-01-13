const mongoose = require('mongoose');
require('dotenv').config();
main().catch(err => console.log(err));

// console.log(process.env.URL_MONGO);

async function main() {
  await mongoose.connect(process.env.URL_MONGO);
  console.log('mongo shmongo!');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}