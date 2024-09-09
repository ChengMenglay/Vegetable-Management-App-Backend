const { CheckToken } = require("../controller/authentication_controller");
const controller = require("../controller/vegetable_detail_controller");
const VegetableDetail = (app) => {
  app.get("/api/vegetable_detail/get",CheckToken(), controller.GetAll);
  app.post("/api/vegetable_detail/create",CheckToken(), controller.CreateDetail);
  app.put("/api/vegetable_detail/update",CheckToken(), controller.UpdateDetail);
  app.delete("/api/vegetable_detail/delete",CheckToken(), controller.RemoveDetail);
};

module.exports=VegetableDetail;