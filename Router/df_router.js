const controller = require("../controller/df_controller");
const {CheckToken} = require("../controller/authentication_controller")
const DF = (app) => {
  app.get("/api/df/get",CheckToken(), controller.GetAll);
  app.post("/api/df/create",CheckToken(), controller.CreateDF);
  app.put("/api/df/update",CheckToken(), controller.UpdateDF);
  app.delete("/api/df/delete",CheckToken(), controller.RemoveDF);
};
module.exports = DF;
