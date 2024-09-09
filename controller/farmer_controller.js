const db = require("../util/db");

const GetAll = async (req, res) => {
  try {
    const result = await db.query(
      "SELECT Vegetable_Management.Farmer.*, Vegetable_Management.Address.* FROM Vegetable_Management.Farmer INNER JOIN Vegetable_Management.Address ON Vegetable_Management.Farmer.address_id= Vegetable_Management.Address.address_id ORDER BY Vegetable_Management.Farmer.farmer_id DESC"
    );
    if (!result) {
      res.json({
        message: "Getting farmer data is denial!",
      });
    } else {
      res.json({
        message: "Getting farmer data is successfully!",
        data: result,
      });
    }
  } catch (error) {
    console.log("There was something went wrong!", error);
  }
};
const CreateFarmer = async (req, res) => {
  try {
    const { first_name, last_name, address_id } = req.body;
    const result = await db.query(
      "INSERT INTO Vegetable_Management.Farmer(first_name, last_name, address_id) VALUES (?,?,?)",
      [first_name, last_name, address_id]
    );
    if (!result) {
      res.json({
        message: "Creating farmer data is denial!",
      });
    } else {
      res.json({
        message: "Creating farmer data is successfully!",
      });
    }
  } catch (error) {
    console.log("There was something went wrong!", error);
  }
};
const UpdateFarmer = async (req, res) => {
  try {
    const { farmer_id, first_name, last_name, address_id } = req.body;
    const result = await db.query(
      "UPDATE Vegetable_Management.Farmer SET first_name=?,last_name=?,address_id=? WHERE farmer_id=?",
      [first_name, last_name, address_id, farmer_id]
    );
    if (!result) {
      res.json({
        message: "Updating farmer data is denial!",
      });
    } else {
      res.json({
        message: "Updating farmer data is successfully!",
      });
    }
  } catch (error) {
    console.log("There was something went wrong!", error);
  }
};
const RemoveFarmer = async (req, res) => {
  const { farmer_id } = req.body;
  const result = await db.query(
    "DELETE FROM Vegetable_Management.Farmer WHERE farmer_id=?",
    [farmer_id]
  );
  if (!result) {
    res.json({
      message: "Deleting farmer data is denial!",
    });
  } else {
    res.json({
      message: "Deleting farmer data is successfully!",
    });
  }
};

module.exports = {
  GetAll,
  CreateFarmer,
  UpdateFarmer,
  RemoveFarmer,
};
