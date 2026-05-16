const router = require("express").Router();
const myDB = require("../db/db");

const VALIDATION = {
  MIN_PRICE: 1,
  MAX_PRICE: 10000,
  MAX_QUANTITY: 100,
  MAX_DRAW_COUNT: 100,
};

const validatePrice = (price) => {
  if (typeof price !== 'number') return 'Price must be a number';
  if (price < VALIDATION.MIN_PRICE) return `Price must be at least ${VALIDATION.MIN_PRICE}`;
  if (price > VALIDATION.MAX_PRICE) return `Price must not exceed ${VALIDATION.MAX_PRICE}`;
  return null;
};

const validateQuantity = (quantity) => {
  if (typeof quantity !== 'number') return 'Quantity must be a number';
  if (quantity < 1) return 'Quantity must be at least 1';
  if (quantity > VALIDATION.MAX_QUANTITY) return `Quantity must not exceed ${VALIDATION.MAX_QUANTITY}`;
  return null;
};

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
/**
 * @swagger
 * /api/v1/lotteries/sell:
 *   post:
 *     summary: Sell a single lottery
 *     tags: [Lotteries]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LotteryInput'
 *     responses:
 *       201:
 *         description: Lottery created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 lottery:
 *                   $ref: '#/components/schemas/Lottery'
 *       400:
 *         description: Validation error
 */
router.post("/lotteries/sell", (req, res) => {
  const { username, price } = req.body;
  if (!username || !price) {
    return res.status(400).json({ message: "Username and price are required" });
  }
  const priceError = validatePrice(price);
  if (priceError) {
    return res.status(400).json({ message: priceError });
  }
  const newLottery = myDB.create(username, price);
  res.status(201).json({
    message: "Lottery sold successfully",
    lottery: newLottery,
  });
});

// Bulk Sell Lotteries
/**
 * @swagger
 * /api/v1/lotteries/sell/bulk:
 *   post:
 *     summary: Sell multiple lotteries at once
 *     tags: [Lotteries]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BulkSellInput'
 *     responses:
 *       201:
 *         description: Lotteries created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 lotteries:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Lottery'
 *       400:
 *         description: Validation error
 */
router.post("/lotteries/sell/bulk", (req, res) => {
  const { username, price, quantity } = req.body;
  if (!username || !price || !quantity) {
    return res.status(400).json({ message: "Username, price and quantity are required" });
  }
  const priceError = validatePrice(price);
  if (priceError) {
    return res.status(400).json({ message: priceError });
  }
  const quantityError = validateQuantity(quantity);
  if (quantityError) {
    return res.status(400).json({ message: quantityError });
  }
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
/**
 * @swagger
 * /api/v1/lotteries/draw:
 *   post:
 *     summary: Draw random winners
 *     tags: [Lotteries]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DrawInput'
 *     responses:
 *       200:
 *         description: Winners drawn successfully
 *       400:
 *         description: Validation error
 */
router.post("/lotteries/draw", (req, res) => {
  const { count } = req.body;
  if (!count || typeof count !== "number" || count <= 0) {
    return res
      .status(400)
      .json({ message: "A valid count of winners is required" });
  }
  if (count > VALIDATION.MAX_DRAW_COUNT) {
    return res.status(400).json({ message: `Count must not exceed ${VALIDATION.MAX_DRAW_COUNT}` });
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

// Get Daily Report
/**
 * @swagger
 * /api/v1/lotteries/reports/daily:
 *   get:
 *     summary: Get daily sales report
 *     tags: [Reports]
 *     parameters:
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         description: Date in YYYY-MM-DD format (optional)
 *     responses:
 *       200:
 *         description: Daily report retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Report'
 */
router.get("/lotteries/reports/daily", (req, res) => {
  const { date } = req.query;
  const reportDate = date ? new Date(date) : new Date();
  const report = myDB.getDailyReport(reportDate);
  res.status(200).json({
    message: "Daily report retrieved successfully",
    report,
  });
});

// Get Weekly Report
/**
 * @swagger
 * /api/v1/lotteries/reports/weekly:
 *   get:
 *     summary: Get weekly sales report
 *     tags: [Reports]
 *     parameters:
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         description: End date in YYYY-MM-DD format (optional)
 *     responses:
 *       200:
 *         description: Weekly report retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Report'
 */
router.get("/lotteries/reports/weekly", (req, res) => {
  const { date } = req.query;
  const reportDate = date ? new Date(date) : new Date();
  const report = myDB.getWeeklyReport(reportDate);
  res.status(200).json({
    message: "Weekly report retrieved successfully",
    report,
  });
});

// Get Monthly Report
/**
 * @swagger
 * /api/v1/lotteries/reports/monthly:
 *   get:
 *     summary: Get monthly sales report
 *     tags: [Reports]
 *     parameters:
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *         description: Year (optional, defaults to current year)
 *       - in: query
 *         name: month
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 12
 *         description: Month (optional, defaults to current month)
 *     responses:
 *       200:
 *         description: Monthly report retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Report'
 */
router.get("/lotteries/reports/monthly", (req, res) => {
  const { year, month } = req.query;
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const reportYear = year ? parseInt(year) : currentYear;
  const reportMonth = month ? parseInt(month) : currentMonth;
  const report = myDB.getMonthlyReport(reportYear, reportMonth);
  res.status(200).json({
    message: "Monthly report retrieved successfully",
    report,
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
