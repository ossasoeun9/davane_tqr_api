const express = require("express");
const authRouter = require("./routes/auth-route.js");
const { User, Store } = require("./models/index.js");
const { verifyToken } = require("./controllers/auth-controller.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use(verifyToken);
app.get("/", async (req, res) => {
  try {
    const users = await User.findAll({
      include: [{
        model: Store,
        as: "store",
        attributes: { exclude: ["userId"] }
      }],
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`ChatTask app listening on port ${port}!`);
});