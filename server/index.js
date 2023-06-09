import express, { json } from "express";
import connectDB from "./config/db";

//Routes
import authRoute from "./routes/auth.js";
import productsRoute from "./routes/products.js";
import usersRoute from "./routes/users.js";
import cartRoute from "./routes/cart.js";
import stockRoute from "./routes/stock.js";
import ordersRoute from "./routes/orders.js";
import notifyRoute from "./routes/notifications.js";
import cors from "cors";
const app = express();

connectDB();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(json({ extended: false }));

app.use(authRoute);
app.use(productsRoute);
app.use(usersRoute);
app.use(cartRoute);
app.use(notifyRoute);
app.use(stockRoute);
app.use(ordersRoute);

app.listen(port, () => {
  console.log("Server listening on port 5000");
});
