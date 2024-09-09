const db = require("../util/db");

const GetAll = async (req, res) => {
  try {
    const data = await db.query("SELECT * FROM Vegetable_Management.Vegetable");
    if (!data) {
      res.json({
        message: "Getting Vegetable data is denial!",
      });
    } else {
      res.json({
        message: "Getting Vegetable data is successfully.",
        data: data,
      });
    }
  } catch (error) {
    console.log("There was something went wrong", error);
  }
};
const CreateVegetable = async (req, res) => {
  try {
    const { vegetable_name } = req.body;
    const result = await db.query(
      "INSERT INTO Vegetable_Management.Vegetable(vegetable_name) VALUES(?)",
      [vegetable_name]
    );
    if (!result) {
      res.json({
        message: "Creating Vegetable is denial!",
      });
    } else {
      res.json({
        message: "Create Vegetable is successfully!",
      });
    }
  } catch (error) {
    console.log("There was something went wrong", error);
  }
};
const UpdateVegetable = async (req, res) => {
  try {
    const { vegetable_name, vegetable_id } = req.body;
    const result = await db.query(
      "UPDATE Vegetable_Management.Vegetable SET vegetable_name=? WHERE vegetable_id=?",
      [vegetable_name, vegetable_id]
    );
    if (!result) {
      res.json({
        message: "Updating Vegetable is denial!",
      });
    } else {
      res.json({
        message: "Updating Vegetable is successfully!",
      });
    }
  } catch (error) {
    console.log("There was something went wrong", error);
  }
};
const RemoveVegetable = async (req, res) => {
  try {
    const { vegetable_id } = req.body;
    const result = await db.query(
      "DELETE FROM Vegetable_Management.Vegetable WHERE vegetable_id= ?",
      [vegetable_id]
    );
    if (!result) {
      res.json({
        message: "Deleting Vegetable data is denial!",
      });
    } else {
      res.json({
        message: "Deleting Vegetable data is successfully!",
      });
    }
  } catch (error) {
    console.log("There was something went wrong", error);
  }
};

module.exports = {
  GetAll,
  CreateVegetable,
  UpdateVegetable,
  RemoveVegetable,
};
