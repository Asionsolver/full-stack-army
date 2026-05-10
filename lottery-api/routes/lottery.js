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
    myDB.delete(lotteryId);
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
    res.status(200).json(lotteries);
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
    const updatedLotteries = myDB.bulkUpdateByUsername(username, { price });
    res.status(200).json(updatedLotteries);
  })
  .delete((req, res) => {
    const { username } = req.params;
    const lotteries = myDB.findByUsername(username);
    if (lotteries.length === 0) {
      return res
        .status(404)
        .json({ message: "No lotteries found for this username" });
    }
    lotteries.forEach((lottery) => myDB.delete(lottery.id));
    res.status(200).json({ message: "Lotteries deleted" });
  });

module.exports = router;
