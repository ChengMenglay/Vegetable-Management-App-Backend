const { CheckToken } = require("../controller/authentication_controller");
const controller = require("../controller/Vegetable_Processing_controller");

const Vegetable_Processing = (app) => {
  app.get("/api/vegetable_processing/get",CheckToken(), controller.GetAll);
  app.post("/api/vegetable_processing/create",CheckToken(), controller.CreateProcessing);
  app.put("/api/vegetable_processing/update",CheckToken(), controller.UpdateProcessing);
  app.delete("/api/vegetable_processing/delete",CheckToken(), controller.RemoveProcessing);
};

module.exports = Vegetable_Processing;
