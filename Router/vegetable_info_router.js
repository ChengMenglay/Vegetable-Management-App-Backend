const { CheckToken } = require("../controller/authentication_controller");
const controller = require("../controller/vegetable_controller");
const Vegetable = (app) => {
  app.get("/api/vegetable/get",CheckToken(), controller.GetAll);
  app.post("/api/vegetable/create",CheckToken(), controller.CreateVegetable);
  app.put("/api/vegetable/update",CheckToken(), controller.UpdateVegetable);
  app.delete("/api/vegetable/delete",CheckToken(), controller.RemoveVegetable);
};
module.exports = Vegetable;
