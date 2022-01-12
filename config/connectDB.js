const Mongoose = require("mongoose");

const connect = async () => {
  try {
    await Mongoose.connect(process.env.db);
    console.log("data connect");
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = connect;
