const express = require("express");
const mongoose = require("mongoose")

const app = express();
app.use(express.json());


const userSchema = new mongoose.Schema({
  Email: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
});

const User = mongoose.model("newuser", userSchema);


app.post("/login", async (req, res) => {
  try {
    const {Email, Password} = req.body;

    if (!Email) {
      return res.status(400).json({ message: "Email cannot be empty" });
    }

    if (!Password) {
      return res.status(400).json({ message: "Password cannot be empty" });
    }

    const newUser = new User({ Email, Password });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));






