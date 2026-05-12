const router = require("express").Router();

router.use("/api/v1/", require("../routes/lottery"));

router.get("/health", (_req, res) => {
  //   throw new Error("Test error");
  res.status(200).json({
    message: "Healthy and running",
  });
});

module.exports = router;
