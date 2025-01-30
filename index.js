import express from "express";
import cors from "cors";
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
app.use(urlencoded({ extended: true, limit: "1.5mb" }));
app.use(upload().fields([{ name: "photo", maxCount: 1 }]));

app.use(
  cors({
    origin: "*",
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    allowedHeaders: "Content-Type, Authorization",
  })
);

app.use((req, res, next) => {
  console.log(req.files);
  console.log(req.body);
  next();
});

app.get("/", (_req, res) => {
  res.send("Welcome to Davane TQR API");
});
app.use("/auth", authRouter);
app.use("/store", storeRouter);

app.use(verifyToken2);
app.use("/profile", profileRouter);
app.use("/category", categoryRouter);
app.use("/ingredient", ingredientRouter);
app.use("/supplier", supplierRouter);
app.use("/product", productRouter);
app.use("/qr_code", qrCodeRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Davane TQR API listening on port ${port}!`);
});
