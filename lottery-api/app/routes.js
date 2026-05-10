const router = require("express").Router();

router.get("/health", (_req, res) => {
  //   throw new Error("Test error");
  res.status(200).json({
    message: "Healthy and running",
  });
});

module.exports = router;
