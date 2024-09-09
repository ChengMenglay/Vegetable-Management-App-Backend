const controller = require("../controller/farmer_controller");
const {CheckToken} = require("../controller/authentication_controller")
const farmer = (app) => {
  app.get("/api/farmer/get",CheckToken(), controller.GetAll);
  app.post("/api/farmer/create",CheckToken(), controller.CreateFarmer);
  app.put("/api/farmer/update",CheckToken(), controller.UpdateFarmer);
  app.delete("/api/farmer/delete",CheckToken(), controller.RemoveFarmer);
};
module.exports = farmer;
