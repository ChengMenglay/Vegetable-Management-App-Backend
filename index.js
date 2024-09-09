const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());

app.use(cors());
app.listen(8080, (error) => {
  if (!error) {
    console.log("http://localhost:" + 8080);
  } else {
    console.log("Error occered, server can't start", error);
  }
});
const authentication = require("./Router/authentication_router");
authentication(app);
const address = require("./Router/address_router");
address(app);
const farmer = require("./Router/farmer_router");
farmer(app);
const AC = require("./Router/ac_router");
AC(app);
const DF = require("./Router/df_router");
DF(app);
const Vegetable = require("./Router/vegetable_info_router");
Vegetable(app);
const Vegetable_Processing = require("./Router/Vegetable_Processing_router");
Vegetable_Processing(app);
const VegetableDetail = require("./Router/Vegetable_Detail_router");
VegetableDetail(app);
