const express = require("express");
const cors = require('cors')
const { initialize, fetchBySearch } = require("./APIs/fetchApi");
const mongoose = require("mongoose");
const app = express();
const PORT = 8001;
const MONGO_URI = 'mongodb+srv://kajalkumari:kajal2507@cluster0.ju5ga7g.mongodb.net/transactions?retryWrites=true&w=majority';

mongoose
  .connect(MONGO_URI)
  .then((res) => console.log("Connected to Database !"))
  .catch((err) => console.log(err));

const {
  statistics,
  getBarChart,
  getPieChart,
} = require("./APIs/statisticsApi");

app.use(express.json());
app.use(cors({
  origin: '*',
}))

// Routes
app.get("/initialize", initialize);
app.get("/fetchBySearch", fetchBySearch);
app.get("/statistics/:month", statistics);
app.get("/getBarChart/:month", getBarChart);
app.get("/getPieChart/:month", getPieChart);

app.listen(PORT, () => {
  console.log("Server is running at PORT:", PORT);
});