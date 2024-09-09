const db = require("../util/db");

const GetAll = async (req, res) => {
  try {
    const query = await db.query(
      "SELECT vd.*,f.*,ad.*, df.df_name AS df_name, ac.first_name AS ac_first_name, ac.last_name AS ac_last_name,v.vegetable_name, vp.* FROM Vegetable_Management.VegetableDetail vd " +
        "INNER JOIN Vegetable_Management.Farmer f ON vd.farmer_id = f.farmer_id " +
        "INNER JOIN Vegetable_Management.Address ad ON vd.address_id = ad.address_id " +
        "INNER JOIN Vegetable_Management.AC ac ON vd.ac_id = ac.ac_id " +
        "INNER JOIN Vegetable_Management.DF df ON vd.df_id= df.df_id " +
        "INNER JOIN Vegetable_Management.VegetableProcessing vp ON vd.vegetable_processing_id = vp.vegetable_processing_id " +
        "INNER JOIN Vegetable_Management.Vegetable v ON vp.vegetable_id = v.vegetable_id" +
        " ORDER BY vd.vegetable_detail_id DESC"
    );
    if (!query) {
      res.json({
        message: "Getting Vegetable Detail data is denial!",
      });
      return;
    } else {
      res.json({
        message: "Getting Vegetable Detail data is successfully.",
        data: query,
      });
    }
  } catch (error) {
    console.log("There is something went wrong", error);
  }
};
const CreateDetail = async (req, res) => {
  try {
    const { farmer_id, ac_id, df_id, address_id, vegetable_processing_id } =
      req.body;
    const query = await db.query(
      "INSERT INTO Vegetable_Management.VegetableDetail(farmer_id, ac_id, df_id,address_id, vegetable_processing_id) VALUES(?,?,?,?,?)",
      [farmer_id, ac_id, df_id, address_id, vegetable_processing_id]
    );
    if (!query) {
      res.json({
        message: "Insetion Vegetable Detail data is denial!",
      });
      return;
    } else {
      res.json({
        message: "Insertion Vegetable Detail data is successfully.",
      });
    }
  } catch (error) {
    console.log("There is something went wrong", error);
  }
};
const UpdateDetail = async (req, res) => {
  try {
    const {
      farmer_id,
      ac_id,
      df_id,
      address_id,
      vegetable_processing_id,
      vegetable_detail_id,
      vegetable_id,
      vegetable_growing,
      land_vegetable_cultivation,
      date_of_seeding,
      date_of_planting,
      date_of_harvesting,
      estimated_product,
    } = req.body;
    const query = await db.query(
      "UPDATE Vegetable_Management.VegetableDetail SET farmer_id=?, ac_id=?, df_id=?,address_id=?, vegetable_processing_id=? WHERE vegetable_detail_id=?",
      [
        farmer_id,
        ac_id,
        df_id,
        address_id,
        vegetable_processing_id,
        vegetable_detail_id,
      ]
    );
    const updateProcessing = await db.query(
      "UPDATE Vegetable_Management.VegetableProcessing SET vegetable_id=?, vegetable_growing=?, land_vegetable_cultivation=?, date_of_seeding=?, date_of_planting=?, date_of_harvesting=?, estimated_product=? WHERE vegetable_processing_id =? ",
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
    if (!query || !updateProcessing) {
      res.json({
        message: "Updating Vegetable Detail data is denial!",
      });
      return;
    } else {
      res.json({
        message: "Updating Vegetable Detail data is successfully.",
      });
    }
  } catch (error) {
    console.log("There is something went wrong", error);
  }
};
const RemoveDetail = async (req, res) => {
  try {
    const { vegetable_detail_id, vegetable_processing_id } = req.body;
    const query = await db.query(
      "DELETE FROM Vegetable_Management.VegetableDetail WHERE vegetable_detail_id = ?",
      [vegetable_detail_id]
    );
    const delProcess = await db.query(
      "DELETE FROM Vegetable_Management.VegetableProcessing WHERE vegetable_processing_id=?",
      [vegetable_processing_id]
    );
    if (!query || !delProcess) {
      res.json({
        message: "Deleting Vegetable Detail data is denial!",
      });
      return;
    } else {
      res.json({
        message: "Deleting Vegetable Detail data is successfully.",
      });
    }
  } catch (error) {
    console.log("There is something went wrong", error);
  }
};

module.exports = { CreateDetail, GetAll, UpdateDetail, RemoveDetail };
