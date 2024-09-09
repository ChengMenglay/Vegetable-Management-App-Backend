const db = require("../util/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } = require("../config/token_key");
const GetAll = async (req, res) => {
  try {
    const data = await db.query(
      "SELECT * FROM Vegetable_Management.Authentication_info"
    );
    if (data) {
      for (let i = 0; i < data.length; i++) {
        delete data[i].password;
      }
      res.json({
        data: data,
      });
    } else {
      res.json({
        error: true,
        message: "Something went wrong, data accessed fail!",
      });
      return;
    }
  } catch (error) {
    console.log("Get account data was denial!", error);
  }
};
const Signup = async (req, res) => {
  try {
    const { email, password, confirm } = req.body;
    const message = {};
    if (!email) {
      message.email = "You missed the Email, please fill in again!";
    }
    if (!password) {
      message.password = "You missed the Password, please fill in again!";
    }
    if (!confirm) {
      message.confirm_password =
        "You missed the Confirm Password, please fill in again!";
    }
    if (password != confirm) {
      message.compare =
        "Password wasn't match with Confirm Password, Please fill in again!";
    }
    if (Object.keys(message).length > 0) {
      res.json({
        message: message,
      });
      return;
    }
    const hash = await bcrypt.hashSync(password, 10);

    const response = await db.query(
      "INSERT INTO Vegetable_Management.Authentication_info(email,password) VALUES(?,?)",
      [email, hash]
    );
    if (response.affectedRows > 0) {
      res.json({
        message: "Your creating account is successfully!",
      });
    } else {
      res.json({
        error: true,
        message:
          "Your creating got something wrong, Please check and fill in again!",
      });
    }
  } catch (error) {
    console.log("There was something wrong in Signup", error);
  }
};
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const message = {};
    if (!email) {
      message.email = "You missed the Email, please fill in again!";
    }
    if (!password) {
      message.password = "You missed the Password, please fill in again!";
    }
    if (Object.keys(message).length > 0) {
      res.json({
        message: message,
      });
      return;
    }
    const result = await db.query(
      "SELECT * FROM Vegetable_Management.Authentication_info WHERE email= ?",
      [email]
    );
    if (!result || result.length === 0) {
      res.json({
        message: "Email doesn't exist!",
      });
      return;
    } else {
      var hashpass = result[0].password;
      const comparehash = await bcrypt.compareSync(password, hashpass);
      if (!comparehash) {
        res.json({ message: "Password is incorrect!" });
      } else {
        delete result[0].password;

        //Server start create token and refresh
        var access_token = await jwt.sign(
          { data: result[0] },
          ACCESS_TOKEN_KEY,
          {
            expiresIn: "1h",
          }
        );
        var refresh_token = await jwt.sign(
          { data: result[0] },
          REFRESH_TOKEN_KEY
        );
        res.json({
          message: "Login successfully!",
          data: result[0],
          access_token: access_token,
          refresh_token: refresh_token,
        });
      }
    }
  } catch (error) {
    console.log("There was something wrong in Login", error);
  }
};
const Remove = async (req, res) => {
  try {
    const { authentication_info_id } = req.body;
    const result = await db.query(
      "Delete FROM Vegetable_Management.Authentication_info WHERE authentication_info_id =?",
      [authentication_info_id]
    );
    if (!result) {
      res.json({
        message: "Authenication Id is not exist!",
      });
    } else {
      res.json({
        message: "Deleting an account was successfully!",
      });
    }
  } catch (error) {
    console.log("There was something wrong", error);
  }
};
const CheckToken = () => {
  //call this function in middleware
  return (req, res, next) => {
    var authorization = req.headers.authorization;
    var token_from_client = null;
    if (authorization != null && authorization != "") {
      token_from_client = authorization.split(" "); // authorization :"Bearer sdfsdf"
      token_from_client = token_from_client[1]; //get only access token
    }
    if (token_from_client == null) {
      res.status(401).send({
        message: "Unauthorized",
      });
    } else {
      jwt.verify(token_from_client, ACCESS_TOKEN_KEY, (error, result) => {
        if (error) {
          res.status(401).send({
            message: "Unauthorized",
            errro: error,
          });
        } else {
          req.data = result.data; //Write data property
          req.authentication_info_id = result.data.authentication_info_id;
          next();
        }
      });
    }
  };
};
module.exports = {
  GetAll,
  Signup,
  Login,
  Remove,
  CheckToken,
};
