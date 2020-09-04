const router = require("express").Router();
const budgetRoutes = require("./savings");

router.use("/budget", budgetRoutes);

router.use(function(req, res) {
    res.sendFile(path.join(__dirname, "../client/public/index.html"));
  });  

module.exports = router;
