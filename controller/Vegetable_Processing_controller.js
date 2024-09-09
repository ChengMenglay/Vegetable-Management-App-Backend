const db = require("../util/db");
const moment = require("moment");
const GetAll = async (req, res) => {
  try {
    const result = await db.query(
      "SELECT Vegetable_Management.VegetableProcessing.*, " +
        "Vegetable_Management.Vegetable.vegetable_name " +
        "FROM Vegetable_Management.VegetableProcessing " +
        "INNER JOIN Vegetable_Management.Vegetable " +
        "ON Vegetable_Management.VegetableProcessing.vegetable_id = Vegetable_Management.Vegetable.vegetable_id"
    );
    if (!result) {
      res.json({
        message: "Getting Vegetable Processing data is denial!",
      });
      return;
    } else {
      res.json({
        message: "Getting Vegetable Processing data is successfully!",
        data: result,
      });
    }
  } catch (error) {
    console.log("There is something went wrong", error);
  }
};
const CreateProcessing = async (req, res) => {
  try {
    const {
      vegetable_id,
      vegetable_growing,
      land_vegetable_cultivation,
      date_of_seeding,
      date_of_planting,
      date_of_harvesting,
      estimated_product,
    } = req.body;

    const query = await db.query(
      "INSERT INTO Vegetable_Management.VegetableProcessing(vegetable_id, vegetable_growing, land_vegetable_cultivation, date_of_seeding, date_of_planting, date_of_harvesting, estimated_product) VALUES(?,?,?,?,?,?,?)",
      [
        vegetable_id,
        vegetable_growing,
        land_vegetable_cultivation,
        date_of_seeding,
        date_of_planting,
        date_of_harvesting,
        estimated_product,
      ]
    );

    if (query.affectedRows === 0) {
      return res.json({
        message: "Insertion of Vegetable Processing data failed!",
      });
    }

    const result = await db.query(
      "SELECT vegetable_processing_id FROM Vegetable_Management.VegetableProcessing ORDER BY vegetable_processing_id DESC"
    );
    res.json({
      message: "Insertion of Vegetable Processing data was successful.",
      data: result[0], // Assuming result is an array
    });
  } catch (error) {
    console.log("There was an error:", error);
    res.status(500).json({
      message: "There was an error processing your request.",
      error: error.message,
    });
  }
};

const UpdateProcessing = async (req, res) => {
  try {
    const {
      vegetable_id,
      vegetable_growing,
      land_vegetable_cultivation,
      date_of_seeding,
      date_of_planting,
      date_of_harvesting,
      estimated_product,
      vegetable_processing_id,
    } = req.body;
    const query = await db.query(
      "UPDATE Vegetable_Management.VegetableProcessing SET vegetable_id=?, vegetable_growing=?, land_vegetable_cultivation=?,date_of_seeding=?, date_of_planting=?, date_of_harvesting=?, estimated_product=? WHERE vegetable_processing_id =? ",
      [
        vegetable_id,
        vegetable_growing,
        land_vegetable_cultivation,
        date_of_seeding,
        date_of_planting,
        date_of_harvesting,
        estimated_product,
        vegetable_processing_id,
      ]
    );
    if (!query) {
      res.json({
        message: "Updating Vegetable Processing data is denial!",
      });
    } else {
      res.json({
        message: "Updating Vegetable Processing data is successfully!",
      });
    }
  } catch (error) {
    console.log("There is something went wrong!", error);
  }
};
const RemoveProcessing = async (req, res) => {
  const { vegetable_processing_id } = req.body;
  const query = await db.query(
    "DELETE FROM Vegetable_Management.VegetableProcessing WHERE vegetable_processing_id=?",
    [vegetable_processing_id]
  );
  if (!query) {
    res.json({
      message: "Deleting Vegetable Processing data is denial!",
    });
  } else {
    res.json({
      message: "Deleting Vegetable Processing data is successfully!",
    });
  }
};

module.exports = {
  GetAll,
  CreateProcessing,
  UpdateProcessing,
  RemoveProcessing,
};
