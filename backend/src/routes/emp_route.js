const express = require("express");
const router = express.Router();
const {
  createEmployee,
  updateEmployee,
  getEmployees,
  getEmp,
  delEmp,
} = require("../controllers/employee_controller");

router.get("/emplist", getEmployees);
router.get("/emp/:id", getEmp);
router.post("/emp", createEmployee);
router.delete("/empdel/:id", delEmp);
router.put("/emp/:id", updateEmployee);

module.exports = router;
