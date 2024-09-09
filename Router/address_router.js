const controller = require("../controller/address_controller");
const {CheckToken} = require("../controller/authentication_controller")
const address = (app) => {
  app.get("/api/address/get",CheckToken(), controller.GetAll);
  app.post("/api/address/create",CheckToken(), controller.CreateAddress);
  app.put("/api/address/update",CheckToken(), controller.UpdateAddress);
  app.delete("/api/address/delete",CheckToken(), controller.RemoveAddress);
};
module.exports = address;
