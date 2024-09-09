const db = require("../util/db");

const GetAll = async (req, res) => {
  try {
    const data = await db.query("SELECT * FROM Vegetable_Management.Address ORDER BY Vegetable_Management.Address.address_id DESC");
    if (!data) {
      res.json({
        message: "Getting data is denial!",
      });
    } else {
      res.json({
        message: "Getting Address data is successfully.",
        data: data,
      });
    }
  } catch (error) {
    console.log("There was something went wrong", error);
  }
};
const CreateAddress = async (req, res) => {
  try {
    const { village, commune, district, province } = req.body;
    const result = await db.query(
      "INSERT INTO Vegetable_Management.Address(village,commune,district, province) VALUES(?,?,?,?)",
      [village, commune, district, province]
    );
    if (!result) {
      res.json({
        message: "Creating address is denial!",
      });
    } else {
      res.json({
        message: "Create Address is successfully!",
      });
    }
  } catch (error) {
    console.log("There was something went wrong", error);
  }
};
const UpdateAddress = async (req, res) => {
  try {
    const { address_id, village, commune, district, province } = req.body;
    const result = await db.query(
      "UPDATE Vegetable_Management.Address SET village=?, commune=?,district=?,province=? WHERE address_id=?",
      [village, commune, district, province, address_id]
    );
    if (!result) {
      res.json({
        message: "Updating address is denial!",
      });
    } else {
      res.json({
        message: "Updating Address is successfully!",
      });
    }
  } catch (error) {
    console.log("There was something went wrong", error);
  }
};
const RemoveAddress = async (req, res) => {
  try {
    const { address_id } = req.body;
    const result = await db.query(
      "DELETE FROM Vegetable_Management.Address WHERE address_id= ?",
      [address_id]
    );
    if (!result) {
      res.json({
        message: "Deleting address is denial!",
      });
    } else {
      res.json({
        message: "Deleting Address is successfully!",
      });
    }
  } catch (error) {
    console.log("There was something went wrong", error);
  }
};

module.exports = {
  GetAll,
  CreateAddress,
  UpdateAddress,
  RemoveAddress,
};
