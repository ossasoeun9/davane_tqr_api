
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { User, Store } = require("../models/index.js");

const login = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;

    if (!phoneNumber || !password) {
      return res
        .status(400)
        .json({ message: "Phone number and password are required" });
    }

    const hashedPassword = hashPassword(password);

    const user = await User.findOne({
      where: {
        phoneNumber,
        password: hashedPassword,
      },
      include: {
        model: Store,
        as: "store",
        attributes: { exclude: ["userId"] }
      }
    });

    if (!user) {
      return res
        .status(404)
        .json({ message: "Phone number or password is incorrect" });
    }

    const accessToken = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {algorithm: "HS256", expiresIn: "30d"});

    return res.status(200).json({ accessToken, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const hashPassword = (password) => {
  const salt = process.env.HASH_SECRET || "default_salt";
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
    return hash;
};

const verifyToken = (req, res, next) => {
  var token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Token is required" });
  }
  token = token.replace("Bearer ", "");

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: err.message });
    }
    req.user = user;
    next();
  });
}

module.exports = { login, verifyToken };
