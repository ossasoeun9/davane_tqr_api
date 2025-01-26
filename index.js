import express from "express";
const { urlencoded, json } = express;
import { verifyToken2 } from "./controllers/auth-controller.js";
import upload from "multer";
import authRouter from "./routes/auth-route.js";
import profileRouter from "./routes/user-route.js";
import storeRouter from "./routes/store-route.js";
import categoryRouter from "./routes/category-route.js";
import ingredientRouter from "./routes/ingredient-route.js";
import supplierRouter from "./routes/supplier-route.js";
import productRouter from "./routes/product-route.js";
import qrCodeRouter from "./routes/qr-code-route.js";

const app = express();

app.use(json());
app.use(urlencoded({ extended: false, limit: "1.5mb" }));
app.use(upload().fields([{ name: "photo", maxCount: 1 }]));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Replace '*' with your app's origin to be more secure
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use("/auth", authRouter);

app.use(verifyToken2);
app.use("/profile", profileRouter);
app.use("/store", storeRouter);
app.use("/category", categoryRouter);
app.use("/ingredient", ingredientRouter);
app.use("/supplier", supplierRouter);
app.use("/product", productRouter);
app.use("/qr_code", qrCodeRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Davane TQR API listening on port ${port}!`);
});
