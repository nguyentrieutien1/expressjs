const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParse = require("body-parser");
const port = 3000;

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
app.use(bodyParse());
app.get("/", async (req, res) => {
  return res.json(await Account.find({}));
});

app.post("/account/create", async function (req, res) {
  const data = req.body;
  console.log(data);
  try {
    await Account.create(data);
    return res.json({ message: "Create success", statusCode: 200 });
  } catch (error) {
    return res.json({ message: "Create fail", statusCode: 400 });
  }
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
