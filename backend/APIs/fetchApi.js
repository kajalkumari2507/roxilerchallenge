const Item = require("../Models/Item");

const initialize = async (req, res) => {
  let dataList;

  // Fetch data from the api
  try {
    const response = await fetch(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    dataList = await response.json();
  } catch (err) {
    return res.send({
      status: 500,
      message: "Failed to fetch data",
      data: err,
    });
  }

  // Insert those data into the database
  try {
    await Item.insertMany(dataList);
    return res.send({
      status: 201,
      message: "Inserted data into the database successfully",
    });
  } catch (err) {
    return res.send({
      status: 500,
      message: "Failed to insert data into the database",
      data: err,
    });
  }
};

const fetchBySearch = async (req, res) => {
  const search = req.query.q || '';
  const page = Number(req.query.page) || 1;
  const month = Number(req.query.month);
  const skip = 10;
  let queryObj = {};
  if (search) {
    queryObj = Number(search)
      ? { price: Number(search) }
      : {
          $or: [
            { title: { $regex: new RegExp(search, "i") } },
            { description: { $regex: new RegExp(search, "i") } },
          ],
        };
  }

  try {
    const ItemList = await Item.aggregate([
      {
        $addFields: {
          month: { $month: "$dateOfSale" },
        },
      },
      {
        $match: {
          $and: [{ month: month }, queryObj],
        },
      },
      { $skip: (page - 1) * skip },
      { $limit: 10 },
    ]);
    if (ItemList.length == 0) {
      return res.send({
        status: 404,
        message: "Not found",
      });
    }
    return res.send({
      status: 200,
      message: "Successfully fetched data",
      data: ItemList,
    });
  } catch (err) {
    return res.send({
      status: 400,
      message: "Could not fetch data",
      data: err,
    });
  }
};

module.exports = { initialize, fetchBySearch };
