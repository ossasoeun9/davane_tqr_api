const express = require("express");
const { verifyToken2 } = require("./controllers/auth-controller.js");
const upload = require("multer")();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false, limit: "1.5mb" }));
app.use(upload.fields([{ name: "photo", maxCount: 1 }]));

app.use("/auth", require("./routes/auth-route.js"));
app.use("/profile", require("./routes/user-route.js"));
app.use("/store", require("./routes/store-route.js"));

app.use(verifyToken2);
app.use("/category", require("./routes/category-route.js"));
app.use("/ingredient", require("./routes/ingredient-route.js"));
app.use("/supplier", require("./routes/supplier-route.js"));
app.use("/product", require("./routes/product-route.js"));
app.use("/qr_code", require("./routes/qr-code-route.js"));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Davane TQR API listening on port ${port}!`);
});
