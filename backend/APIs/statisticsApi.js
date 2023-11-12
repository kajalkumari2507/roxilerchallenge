const Item = require("../Models/Item");

const statistics = async (req, res) => {
  const month = Number(req.params.month);
  try {
    const itemsList = await Item.aggregate([
      { $project: { month: { $month: "$dateOfSale" }, price: 1, sold: 1 } },
      { $match: { month: month } },
    ]);

    let totalSaleAmount = 0,
      totalSoldItems = 0,
      totalUnsoldItems = 0;

    itemsList.forEach((item) => {
      if (item.sold) {
        totalSaleAmount += item.price;
        totalSoldItems++;
      } else totalUnsoldItems++;
    });

    return res.send({
      status: 200,
      message: "Successfully fetched statistics",
      data: {
        totalSaleAmount,
        totalSoldItems,
        totalUnsoldItems,
      },
    });
  } catch (err) {
    return res.send({
      status: 500,
      message: "Failed to get statistics",
      data: err,
    });
  }
};

const getBarChart = async (req, res) => {
  const month = Number(req.params.month);

  const priceRanges = [0, 101, 201, 301, 401, 501, 601, 701, 801];

  try {
    const itemBucket = await Item.aggregate([
      { $project: { month: { $month: "$dateOfSale" }, price: 1 } },
      { $match: { month: month } },
      {
        $bucket: {
          groupBy: "$price",
          boundaries: priceRanges,
          default: 901,
          output: {
            count: { $sum: 1 },
          },
        },
      },
    ]);

    return res.send({
      status: 200,
      message: "successfully fetched grouped data",
      data: itemBucket,
    });
  } catch (err) {
    return res.send({
      status: 500,
      message: "could not fetch data",
      data: err,
    });
  }
};

const getPieChart = async (req, res) => {
  const month = Number(req.params.month);

  try {
    const itemsList = await Item.aggregate([
      { $project: { month: { $month: "$dateOfSale" }, category: 1 } },
      { $match: { month: month } },
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);

    return res.send({
      status: 200,
      message: "Successfully fetched the count of items from all categories",
      data: itemsList,
    });
  } catch (err) {
    return res.send({
      status: 400,
      message: "Failed to fetch category details",
      data: err,
    });
  }
};

module.exports = { statistics, getBarChart, getPieChart };
