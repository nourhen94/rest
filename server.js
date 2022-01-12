const express = require("express");
const connect = require("./config/connectDB");
const user = require("./models/user");
require("dotenv").config({ path: "./config/.env" });
var app = express();
app.use(express.json());
connect();

app.post("/add", async (req, res) => {
  const { fullName, email, phone } = req.body;
  try {
    const newuser = new user({
      fullName,
      email,
      phone,
    });
    await newuser.save();
    res.send(newuser);
  } catch (error) {
    console.log(error);
  }
});

app.get("/get", async (req, res) => {
  const users = await user.find();
  res.send(users);
});
app.put("/update/:id", async (req, res) => {
  try {
    const edituser = await user.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
      },
      { new: true }
    );
    res.send(edituser);
  } catch (error) {
    console.log(error);
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    await user.findByIdAndUpdate(req.params.id);

    res.send("user deleted");
  } catch (error) {
    console.log(error);
  }
});

var PORT = process.env.PORT || 5000;
app.listen(PORT, (err) =>
  err ? console.error(err) : console.log(`server is running on port ${PORT}`)
);
