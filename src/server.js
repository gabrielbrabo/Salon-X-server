const express = require('express')
const app = express()
const mongoose = require("mongoose");
const cors = require('cors')
const routes = require('./routes')
require("dotenv").config();

app.use(express.json());
app.use(cors())
app.use(routes)

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPassword}@salon-x.1kilhig.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Conectou ao banco!");
    app.listen( process.env.PORT || 5000);
  })
  .catch((err) => console.log(err));