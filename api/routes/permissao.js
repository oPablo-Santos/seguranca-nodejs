const { Router } = require("express");

const router = Router();

router
  .post("/permissao")
  .get("/permissao")
  .get("/permissao/id/:id")
  .delete("/permissao/id/:id")
  .put("/permissao/id/:id");

module.exports = router;
