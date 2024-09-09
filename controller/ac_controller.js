const db = require("../util/db");

const GetAll = async (req, res) => {
  try {
    const result = await db.query(
      "SELECT Vegetable_Management.AC.*, Vegetable_Management.Address.* FROM Vegetable_Management.AC INNER JOIN Vegetable_Management.Address ON Vegetable_Management.AC.address_id= Vegetable_Management.Address.address_id ORDER BY Vegetable_Management.AC.ac_id DESC"
    );
    if (!result) {
      res.json({
        message: "Getting AC data is denial!",
      });
    } else {
      res.json({
        message: "Getting AC data is successfully!",
        data: result,
      });
    }
  } catch (error) {
    console.log("There was something went wrong!", error);
  }
};
const CreateAC = async (req, res) => {
  try {
    const { first_name, last_name, address_id } = req.body;
    const result = await db.query(
      "INSERT INTO Vegetable_Management.AC(first_name, last_name, address_id) VALUES (?,?,?)",
      [first_name, last_name, address_id]
    );
    if (!result) {
      res.json({
        message: "Creating AC data is denial!",
      });
    } else {
      res.json({
        message: "Creating AC data is successfully!",
      });
    }
  } catch (error) {
    console.log("There was something went wrong!", error);
  }
};
const UpdateAC = async (req, res) => {
  try {
    const { ac_id, first_name, last_name, address_id } = req.body;
    const result = await db.query(
      "UPDATE Vegetable_Management.AC SET first_name=?,last_name=?,address_id=? WHERE ac_id=?",
      [first_name, last_name, address_id, ac_id]
    );
    if (!result) {
      res.json({
        message: "Updating AC data is denial!",
      });
    } else {
      res.json({
        message: "Updating AC data is successfully!",
      });
    }
  } catch (error) {
    console.log("There was something went wrong!", error);
  }
};
const RemoveAC = async (req, res) => {
  const { ac_id } = req.body;
  const result = await db.query(
    "DELETE FROM Vegetable_Management.AC WHERE ac_id=?",
    [ac_id]
  );
  if (!result) {
    res.json({
      message: "Deleting AC data is denial!",
    });
  } else {
    res.json({
      message: "Deleting AC data is successfully!",
    });
  }
};

module.exports = {
  GetAll,
  CreateAC,
  UpdateAC,
  RemoveAC,
};
