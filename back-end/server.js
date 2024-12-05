const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors")
const bodyParser = require("body-parser");
require("dotenv").config();

const itemRoutes = require("./routes/ItemRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.HOST_URL).then(()=> console.log("MongoDB connected")).catch(err=>console.log(err));

app.use("/api/items/", itemRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=> console.log(`Server running on PORT: ${PORT}.`));