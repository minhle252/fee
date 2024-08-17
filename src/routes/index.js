
const frontend = require("./front-end/index");
// const
const route = (app) => {
 
  app.use("/", frontend);
};

module.exports = route;
