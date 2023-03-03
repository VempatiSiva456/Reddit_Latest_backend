// const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require('cors')
// dotenv.config({ path: "./config.env" });

app.use(express.json());

const DB = process.env.DATABASE;
const PORT = process.env.PORT;

require("./db/conn");
const User = require("./model/userSchema");
const subGreddiitSchema = require("./model/subgreddiitSchema");
app.use(cors())

app.get("/api/users", (req, res) => {
  User.find({}, (err, users) => {
    if (err) return res.status(500).send(err);
    return res.send(users);
  });
});

app.get("/api/fsubgreddiits", (req, res) => {
  subGreddiitSchema.find({}, (err, subgreddiits) => {
    if (err) return res.status(500).send(err);
    return res.send(subgreddiits);
  });
});

app.use(require("./router/auth"));
// app.get('/about', (req, res) => {
//     res.send("Welcome to about page");
// })

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
