const express = require("express");
const upload = require("multer")();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false, limit: "1.5mb" }));
app.use(
  upload.fields([
    { name: "photo", maxCount: 1 },
  ])
);

app.use("/auth", require("./routes/auth-route.js"));
app.use("/profile", require("./routes/user-route.js"));
app.use("/store", require("./routes/store-route.js"));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`ChatTask app listening on port ${port}!`);
});
