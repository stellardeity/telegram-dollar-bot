const { Schema, model } = require("mongoose");

const user = new Schema({
  id: { type: String, required: true, unique: true },
});

module.exports = model("User", user);
