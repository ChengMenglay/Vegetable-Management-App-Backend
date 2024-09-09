const controller = require("../controller/authentication_controller");
const {CheckToken} = require("../controller/authentication_controller")
const authentication = (app) => {
  app.get("/api/authentication", controller.GetAll);
  app.post("/api/authentication/signup", controller.Signup);
  app.post("/api/authentication/login", controller.Login);
  app.delete("/api/authentication", controller.Remove);
};

module.exports = authentication;
