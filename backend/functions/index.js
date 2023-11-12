require("dotenv").config();
const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const serverless = require('serverless-http');

const { initialize, fetchBySearch } = require("../APIs/fetchApi");
const { statistics, getBarChart, getPieChart } = require("../APIs/statisticsApi");

const app = express();
const router = express.Router();

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI)
  .then((res) => console.log("Connected to Database !"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(cors({ origin: '*' }));

// Routes
router.get("/initialize", initialize);
router.get("/fetchBySearch", fetchBySearch);
router.get("/statistics/:month", statistics);
router.get("/getBarChart/:month", getBarChart);
router.get("/getPieChart/:month", getPieChart);


// Serve any other routes here or handle errors
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Start the server
app.listen(PORT, () => {
  console.log("Server is running at PORT:", PORT);
});
app.use('/.netlify/functions/index', router);

module.exports.handler = serverless(app);
