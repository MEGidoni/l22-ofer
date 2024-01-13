const indexR = require("./index");
const usersR = require("./users");
const foodsR = require("./foods");
const carsR = require("./cars");
const drinksR = require("./drinks");
const phonesR = require("././phones");
const bikesR = require("././bikes");
const newsR = require("././news");
const booksR = require("././books");
const cookieR = require("././cookies");

exports.routesInit = (app) => {
  app.use("/",indexR);
  app.use("/users",usersR);
  app.use("/foods",foodsR);
  app.use("/cars",carsR);
  app.use("/drinks",drinksR);
  app.use("/phones",phonesR);
  app.use("/bikes",bikesR);
  app.use("/news",newsR);
  app.use("/books",booksR);
  app.use("/cookies",cookieR);
}