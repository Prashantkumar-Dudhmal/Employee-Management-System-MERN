const t_employee = require("../models/t_employee");
const z = require("zod");

const empSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email(),
  mobileNo: z.string(),
  designation: z.string(),
  gender: z.string(),
  course: z.string(),
  imgUpload: z.string().optional(),
});

const createEmployee = async (req, res) => {
  try {
    const data = empSchema.parse(req.body);
    const existingEmp = await t_employee.findOne({ email: data.email });
    if (existingEmp) {
      return res.status(400).json({
        success: false,
        msg: "Sorry, a employee with this email already exists!",
      });
    }
    let employee = await t_employee.create({
      name: data.name,
      email: data.email,
      mobileNo: data.mobileNo,
      designation: data.designation,
      gender: data.gender,
      course: data.course,
      imgUpload: data.imgUpload,
    });
    console.log("Employee created successfully!");
    res.json(employee);
  } catch (e) {
    console.log(e);
    res.json({ msg: "create failed , Internal Server Error" });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const empid = req.params.id;
    const data = req.body;
    console.log(data);
    const existingEmp = await t_employee.findOne({ email: data.email });
    if (existingEmp) {
      return res.status(400).json({
        success: false,
        msg: "Sorry, a employee with this email already exists!",
      });
    }
    let emp = await t_employee.findById(empid);
    if (!emp) {
      return res.status(404).json({ message: "Employee not not found" });
    }
    //console.log(data);

    (emp.name = data.name),
      (emp.email = data.email),
      (emp.mobileNo = data.mobileNo),
      (emp.designation = data.designation),
      (emp.gender = data.gender),
      (emp.course = data.course),
      (emp.imgUpload = data.imgUpload);

    await emp.save();

    res.json({ message: "Employee updated successfully" });
  } catch (error) {
    console.log(error);
    res.json({ msg: "Internal server error at updateEmployee" });
  }
};

const getEmployees = async (req, res) => {
  try {
    const emps = await t_employee.find({});
    res.json(emps);
  } catch (error) {
    console.log(error);
    res.json({ msg: "Cannot retrive employees , Internal Server Error" });
  }
};

const getEmp = async (req, res) => {
  try {
    const empid = req.params.id;
    //console.log(empid);
    const emps = await t_employee.findById(empid);
    if (!emps) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.status(200).json(emps);
  } catch (error) {
    console.log(error);
    res.json({ msg: "Cannot retrive employees , Internal Server Error" });
  }
};
const delEmp = async (req, res) => {
  try {
    const empid = req.params.id;
    console.log(empid);
    const result = await t_employee.findByIdAndDelete(empid);
    if (result) {
      console.log(`Person with email ${email} deleted successfully.`);
    } else {
      res.json({ msg: "No person found" });
    }
  } catch (error) {
    res.json({ msg: "Delete failed Internal Server Error" });
  }
};

module.exports = {
  createEmployee,
  updateEmployee,
  getEmployees,
  getEmp,
  delEmp,
};
