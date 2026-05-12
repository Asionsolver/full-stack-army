const router = require("express").Router();
const myDB = require("../db/db");

router
  .route("/lotteries/t/:lotteryId")
  .get((req, res) => {
    const { lotteryId } = req.params;
    const lottery = myDB.findById(lotteryId);
    if (!lottery) {
      return res.status(404).json({ message: "Lottery not found" });
    }
    res.status(200).json(lottery);
  })
  .patch((req, res) => {
    const { lotteryId } = req.params;
    const { price } = req.body;
    const lottery = myDB.findById(lotteryId);
    if (!lottery) {
      return res.status(404).json({ message: "Lottery not found" });
    }
    if (price) {
      lottery.price = price;
      lottery.updatedAt = new Date();
    }
    res.status(200).json(lottery);
  })
  .delete((req, res) => {
    const { lotteryId } = req.params;
    const lottery = myDB.findById(lotteryId);
    if (!lottery) {
      return res.status(404).json({ message: "Lottery not found" });
    }
    myDB.deleteById(lotteryId);
    res.status(200).json({ message: "Lottery deleted" });
  });

router
  .route("/lotteries/u/:username")
  .get((req, res) => {
    const { username } = req.params;
    const lotteries = myDB.findByUsername(username);
    if (lotteries.length === 0) {
      return res
        .status(404)
        .json({ message: "No lotteries found for this username" });
    }
    res.status(200).json({
      message: "Lotteries found",
      lotteries,
    });
  })
  .patch((req, res) => {
    const { username } = req.params;
    const { price } = req.body;
    const lotteries = myDB.findByUsername(username);
    if (lotteries.length === 0) {
      return res
        .status(404)
        .json({ message: "No lotteries found for this username" });
    }
    const updatedLotteries = myDB.updateByUsername(username, { price });
    res.status(200).json({
      message: "Lotteries updated successfully",
      lotteries: updatedLotteries,
    });
  })
  .delete((req, res) => {
    const { username } = req.params;
    const lotteries = myDB.findByUsername(username);
    if (lotteries.length === 0) {
      return res
        .status(404)
        .json({ message: "No lotteries found for this username" });
    }
    const deletedLotteries = myDB.bulkDeleteByUsername(username);
    res.status(200).json({
      message: "Lotteries deleted for username",
      lotteries: deletedLotteries,
    });
  });

// Sell Lotteries
router.post("/lotteries/sell", (req, res) => {
  const { username, price } = req.body;
  if (!username || !price) {
    return res.status(400).json({ message: "Username and price are required" });
  }
  const newLottery = myDB.create(username, price);
  res.status(201).json({
    message: "Lottery sold successfully",
    lottery: newLottery,
  });
});

// Bulk Sell Lotteries
router.post("/lotteries/sell/bulk", (req, res) => {
  const { username, price, quantity } = req.body;
  const lotteries = myDB.bulkCreate(username, price, quantity);
  res.status(201).json({
    message: "Lotteries sold successfully",
    lotteries,
  });
});

// Get All Lotteries
router.get("/lotteries", (req, res) => {
  const lotteries = myDB.find();
  res.status(200).json({
    message: "All lotteries retrieved successfully",
    lotteries,
  });
});

// Get Lottery Count
router.get("/lotteries/count", (req, res) => {
  const count = myDB.count();
  res.status(200).json({ count });
});

// Get Lottery Total Sales
router.get("/lotteries/total-sales", (req, res) => {
  const totalSales = myDB.getTotalSales();
  res.status(200).json({ totalSales });
});

// Draw Lottery Winners
router.post("/lotteries/draw", (req, res) => {
  const { count } = req.body;
  if (!count || typeof count !== "number" || count <= 0) {
    return res
      .status(400)
      .json({ message: "A valid count of winners is required" });
  }
  const winners = myDB.draw(count);
  res.status(200).json({
    message: "Winners drawn successfully",
    winners,
  });
});

// Get Lottery Winners Names
router.get("/lotteries/winners/names", (req, res) => {
  const winnersNames = myDB.getWinnersNames();
  res.status(200).json({
    message: "Winner names retrieved successfully",
    winnersNames,
  });
});

// Get Lottery Statistics
router.get("/lotteries/statistics", (req, res) => {
  const statistics = myDB.getStatistics();
  res.status(200).json({
    message: "Lottery statistics retrieved successfully",
    statistics,
  });
});

// Get Lottery History
router.get("/lotteries/history", (req, res) => {
  const history = myDB.getHistory();
  res.status(200).json({
    message: "Lottery history retrieved successfully",
    history,
  });
});

// Delete All Lotteries
router.delete("/lotteries/delete/all", (req, res) => {
  const deletedLotteries = myDB.deleteAll();
  res.status(200).json({
    message: "All lotteries deleted successfully",
    lotteries: deletedLotteries,
  });
});

module.exports = router;
