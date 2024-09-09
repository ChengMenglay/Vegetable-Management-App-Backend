const controller = require("../controller/ac_controller");
const { CheckToken } = require("../controller/authentication_controller");
const AC = (app) => {
  app.get("/api/ac/get",CheckToken(), controller.GetAll);
  app.post("/api/ac/create",CheckToken(), controller.CreateAC);
  app.put("/api/ac/update",CheckToken(), controller.UpdateAC);
  app.delete("/api/ac/delete",CheckToken(), controller.RemoveAC);
};
module.exports = AC;
