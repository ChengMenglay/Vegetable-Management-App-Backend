const db = require("../util/db");

const GetAll = async (req, res) => {
  try {
    const result = await db.query(
      "SELECT Vegetable_Management.DF.*, Vegetable_Management.Address.* FROM Vegetable_Management.DF INNER JOIN Vegetable_Management.Address ON Vegetable_Management.DF.address_id= Vegetable_Management.Address.address_id ORDER BY Vegetable_Management.DF.df_id DESC"
    );
    if (!result) {
      res.json({
        message: "Getting DF data is denial!",
      });
    } else {
      res.json({
        message: "Getting DF data is successfully!",
        data: result,
      });
    }
  } catch (error) {
    console.log("There was something went wrong!", error);
  }
};
const CreateDF = async (req, res) => {
  try {
    const { df_name, address_id } = req.body;
    const result = await db.query(
      "INSERT INTO Vegetable_Management.DF(df_name, address_id) VALUES (?,?)",
      [df_name, address_id]
    );
    if (!result) {
      res.json({
        message: "Creating DF data is denial!",
      });
    } else {
      res.json({
        message: "Creating DF data is successfully!",
      });
    }
  } catch (error) {
    console.log("There was something went wrong!", error);
  }
};
const UpdateDF = async (req, res) => {
  try {
    const { df_id, df_name, address_id } = req.body;
    const result = await db.query(
      "UPDATE Vegetable_Management.DF SET df_name=? ,address_id=? WHERE df_id=?",
      [df_name, address_id, df_id]
    );
    if (!result) {
      res.json({
        message: "Updating DF data is denial!",
      });
    } else {
      res.json({
        message: "Updating DF data is successfully!",
      });
    }
  } catch (error) {
    console.log("There was something went wrong!", error);
  }
};
const RemoveDF = async (req, res) => {
  const { df_id } = req.body;
  const result = await db.query(
    "DELETE FROM Vegetable_Management.DF WHERE df_id=?",
    [df_id]
  );
  if (!result) {
    res.json({
      message: "Deleting DF data is denial!",
    });
  } else {
    res.json({
      message: "Deleting DF data is successfully!",
    });
  }
};

module.exports = {
  GetAll,
  CreateDF,
  UpdateDF,
  RemoveDF,
};
