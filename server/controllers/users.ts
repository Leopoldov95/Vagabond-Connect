import Users from "../models/users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await Users.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "User Does Not Exist..." });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test123",
      { expiresIN: "1h" }
    );
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName, avatar } =
    req.body;

  try {
    const existingUser = await Users.findOne({ email });
    if (existingUser)
      return res.status(404).json({ message: "User already exists" });

    if (password !== confirmPassword)
      return res.status(404).json({ message: "Passwords don't match!" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await Users.create({
      firstName,
      lastName,
      email,
      avatar: avatar ? avatar : "",
      password: hashedPassword,
    });
    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });
    res.status(200).json({ result: result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};
