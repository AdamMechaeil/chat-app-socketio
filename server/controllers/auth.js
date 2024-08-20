const User=require("../models/user");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      const validPass = await bcrypt.compare(password, user.password);
      if (validPass) {
        const token = jwt.sign(
          { email: email, passwod: user.password },
          process.env.SECRET,
          {
            expiresIn: "1hr",
          }
        );
        res.send({ token, userId: user._id, msg: "Authenticated!" });
      } else {
        res.status(401).send("Authentication failed");
      }
    } else {
      res.status(404).send("Not Found!");
    }
  } catch (error) {
    console.log(error.red.bold);
  }
};

exports.signup = async (req, res) => {
  try {
    const { name, username, password, age, email, phone, gender } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    const toBeCreatedUser = new User({
      name,
      username,
      password: hashPassword,
      age,
      email,
      phone,
      gender,
    });
    const user = await toBeCreatedUser.save();
    const token = jwt.sign({ email, hashPassword }, process.env.SECRET, {
      expiresIn: "1hr",
    });
    res.send({ userId: user._id, token, msg: "Created User" });
  } catch (error) {
    console.log(error);
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    await User.findByIdAndUpdate(req.params.id, { password: hashPassword });
    res.send("Password Updated");
  } catch (error) {
    console.log(error);
  }
};

exports.checkLogin = async (req, res) => {
  try {
    const { token } = req.body;
    const verified = await jwt.verify(token, process.env.SECRET);
    res.send({ msg: "Token Valid" });
  } catch (error) {
    console.log(error);
    res.status(401).send({ msg: "Signin again" });
  }
};
