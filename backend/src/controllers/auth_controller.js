const { z } = require("zod");
//const jwt = require("jsonwebtoken");
const t_login = require("../models/t_login");
const bcrypt = require("bcryptjs");
//const JWT_SECRET = "PASSWORD";

const userSchema = z.object({
  username: z.string().min(1, { message: "Name is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

const createUser = async (req, res) => {
  try {
    // Validate request body using Zod
    const Data = userSchema.parse(req.body);

    // Check if the user with the email exists
    const existingUser = await t_login.findOne({ username: Data.username });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        msg: "Sorry, a user with this email already exists!",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(Data.password, 10);

    // Create a new user
    const user = await t_login.create({
      username: Data.username,
      password: hashedPassword, // Storing the hashed password
    });

    // Send success response
    res.status(201).send({ success: true, msg: "User created successfully!" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Validation errors
      return res.status(400).json({
        success: false,
        errors: error.errors.map((err) => err.message),
      });
    }
    console.error(error.message);
    res.status(500).send({ success: false, msg: "Internal server error" });
  }
};

const logIn = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  try {
    // Check if the user exists
    const user = await t_login.findOne({ username });
    if (!user) {
      return res.status(400).json({
        success: false,
        msg: "Invalid username or password , Give alert Invali login",
      });
    }
    console.log("user found");
    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        msg: "Invalid username or password ,2 Give alert Invalid Login",
      });
    }

    // Generate JWT token
    //const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error during log-in:", error);
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
};

module.exports = { createUser, logIn };
