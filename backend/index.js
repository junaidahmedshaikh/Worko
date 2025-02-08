const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passportConfig = require("./lib/passportConfig");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

// MongoDB
mongoose
  .connect(
    "mongodb+srv://fakeforasuslaptop:addyjames@cluster0.djtfynf.mongodb.net/"
  )
  .then((res) => console.log("Connected to DB"))
  .catch((err) => console.log(err));

// initialising directories
// if (!fs.existsSync("./public")) {
//     fs.mkdirSync("./public");
// }
// if (!fs.existsSync("./public/resume")) {
//     fs.mkdirSync("./public/resume");
// }
// if (!fs.existsSync("./public/profile")) {
//     fs.mkdirSync("./public/profile");
// }

const app = express();
const port = 8080;
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Setting up middlewares
app.use(cors());
app.use(express.json());
app.use(passportConfig.initialize());

// Routing
const auth = require("./routes/authRoutes");
const apiRoutes = require("./routes/apiRoutes");

console.log(auth, "asfdafs");

app.get("/", (req, res) => {
  res.send("root");
});

app.use("/auth", auth);
app.use("/api", apiRoutes);
app.use("/upload", require("./routes/uploadRoutes"));
app.use("/host", require("./routes/downloadRoutes"));

app.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});
