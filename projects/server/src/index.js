require("dotenv/config");
const express = require("express");
const cors = require("cors");
const { join } = require("path");
const bearerToken = require('express-bearer-token');
require('dotenv').config({path:join(__dirname,'../.env')});

const PORT = process.env.PORT || 2343;
const app = express();
// app.use(
//   cors({
//     origin: [
//       process.env.WHITELISTED_DOMAIN &&
//         process.env.WHITELISTED_DOMAIN.split(","),
//     ],
//   })
// );
app.use(cors());
app.use(bearerToken());
app.use(express.json());
app.use(express.static("src/public"));

app.use("/api", express.static(__dirname + "/public"));

//#region API ROUTES
const userRouter = require('./routers/userRouter');
const adminRoute = require('./routers/adminRouter');
const productRouter = require('./routers/productRouter');
const categoryRouter = require('./routers/categoryRouter');
const cartRouter = require('./routers/cartRouter')
const shippingRouter = require('./routers/shippingRouter');
const transactionRouter = require('./routers/transaction');
const discountRouter = require('./routers/discountRouter');
const addressRouter = require('./routers/addressRouter');
const branchRouter = require('./routers/branchRouter');
// ===========================
// NOTE : Add your routes here

app.use("/api/product", productRouter);
app.use('/api/user', userRouter);
app.use('/api/admin', adminRoute);
app.use("/api/category", categoryRouter);
app.use('/api/cart', cartRouter);
app.use('/api/shipping', shippingRouter)
app.use('/api/transaction', transactionRouter)
app.use('/api/discount', discountRouter);
app.use('/api/address', addressRouter);
app.use('/api/branch', branchRouter);


app.get("/api", (req, res) => {
  res.send(`Hello, this is my API`);
});

app.get("/api/greetings", (req, res, next) => {
  res.status(200).json({
    message: "Hello, Student !",
  });
});


// ===========================

// not found
app.use((req, res, next) => {
  if (req.path.includes("/api/")) {
    res.status(404).send("Not found !");
  } else {
    next();
  }
});

// error
app.use((err, req, res, next) => {
  if (req.path.includes("/api/")) {
    console.error("Error : ", err.stack);
    res.status(500).send("Error !");
  } else {
    next();
  }
});

//#endregion

//#region CLIENT
const clientPath = "../../client/build";
app.use(express.static(join(__dirname, clientPath)));


// Serve the HTML page
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, clientPath, "index.html"));
});

//#endregion

app.listen(PORT, (err) => {
  if (err) {
    console.log(`ERROR: ${err}`);
  } else {
    console.log(`APP RUNNING at ${PORT} ✅`);
  }
});
