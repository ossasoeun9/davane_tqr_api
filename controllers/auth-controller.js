
import { pbkdf2Sync } from "crypto";
import jsonwebtoken from "jsonwebtoken";
import { User, Store } from "../models/index.js";

const sign = jsonwebtoken.sign
const verify = jsonwebtoken.verify

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
        pswd: hashedPassword,
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

    const accessToken = sign(user.toJSON(), process.env.JWT_SECRET, {algorithm: "HS256"});

    return res.status(200).json({ accessToken, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const hashPassword = (password) => {
  const salt = process.env.HASH_SECRET || "default_salt";
  const hash = pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
    return hash;
};

const verifyToken = (req, res, next) => {
  var token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Token is required" });
  }
  token = token.replace("Bearer ", "");

  verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: err.message });
    }
    req.user = user;
    next();
  });
}

const verifyToken2 = (req, res, next) => {
  var token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Token is required" });
  }
  token = token.replace("Bearer ", "");

  verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: err.message });
    }
    if (!user.store) {
      return res.status(403).json({ message: "Please create store first." });
    }
    req.user = user;
    next();
  });
}

export { login, verifyToken, verifyToken2 };
