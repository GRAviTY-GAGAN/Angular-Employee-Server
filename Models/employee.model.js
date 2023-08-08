const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    location: { type: String, required: true },
    department: { type: String, required: true },
    age: { type: Number, required: true },
  },
  { versionKey: false, timestamps: true }
);

const EmployeeModel = mongoose.model("employee", employeeSchema);

module.exports = { EmployeeModel };
