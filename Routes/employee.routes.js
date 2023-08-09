const express = require("express");
const { EmployeeModel } = require("../Models/employee.model");

const employeeRouter = express.Router();

employeeRouter.get("/:page", async (req, res) => {
  const dataLimit = 5;
  const page = req.params.page;

  try {
    const employees = await EmployeeModel.find()
      .limit(dataLimit)
      .skip(dataLimit * page);
    const employeesCount = await EmployeeModel.find().countDocuments();

    res.json({
      msg: "Success",
      employees,
      maxPages: Math.ceil(employeesCount / dataLimit),
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

employeeRouter.post("/", async (req, res) => {
  const { name, email, location, age, department } = req.body;

  try {
    const employee = new EmployeeModel({
      name,
      email,
      location,
      age,
      department,
    });

    await employee.save();

    res.json({ msg: "Success", data: employee });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

employeeRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await EmployeeModel.findOneAndDelete({ _id: id });

    if (employee) {
      res.json({ msg: "Success", employee });
    } else {
      res.json({ msg: "Failed", detail: "Employee Not Found." });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

employeeRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await EmployeeModel.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );

    if (employee) {
      res.json({ msg: "Success", employee });
    } else {
      res.json({ msg: "Failed", detail: "Employee Not Found." });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

module.exports = { employeeRouter };
