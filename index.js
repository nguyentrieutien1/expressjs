const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParse = require("body-parser");
const port = 3000;
var cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
var hbs = require("hbs");
const path = require("path");

try {
  mongoose.connect(
    "mongodb+srv://nguyenthanhtung:nguyenthanhtung@cluster0.yeemj.mongodb.net/managerAccounts?retryWrites=true&w=majority"
  );
  console.log(`connect successfully !`);
} catch (error) {
  console.log(error);
}

const schema = new mongoose.Schema({ username: "string", password: "string" });
const Account = mongoose.model("account", schema);
app.use(cors());
app.use(cookieParser());
app.use(express.static(__dirname));
app.use(bodyParse());
app.set("views", path.join(__dirname));
app.set("view engine", "hbs");
// app.get("/", function (req, res) {
//   return res.sendFile(path.resolve("./src/index.html"));
// });

app.get("/login", (req, res) => {
  return res.render("login");
});
app.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const findUser = await Account.findOne({
    username: username,
    password: password,
  });
  if (findUser) {
    const token = jwt.sign({ username: "VMH" }, "hhh", { expiresIn: "10s" });
    res.cookie("token", token);
    res.redirect("/");
  } else {
    res.render("login", { err: "Loi sai mat khau hoac username" });
  }
});

app.get("/", (req, res) => {
  const token = req.cookies.token;
  try {
    jwt.verify(token, "hhh");
    return res.render("home");
  } catch (error) {
    res.redirect("/login");
  }
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
