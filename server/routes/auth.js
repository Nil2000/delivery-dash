import Customer from "../models/Customer";
import Retailer from "../models/Retailer";
import Wholesaler from "../models/Wholesaler";
import Delivery from "../models/Delivery";

import { get } from "config";

import { Router } from "express";
import { genSalt, hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { createTransport } from "nodemailer";

const router = Router();
router.post("/api/signup", async (req, res) => {
  const { name, email, password, location, type } = req.body;

  try {
    let user = null;

    if (type === "Customer") {
      user = await Customer.findOne({ email });

      if (user) res.status(400).send("Customer already exists");

      user = new Customer({ name, email, password, location, type });
    }

    if (type === "Retailer") {
      user = await Retailer.findOne({ email });

      if (user) res.status(400).send("Retailer already exists");

      user = new Retailer({ name, email, password, location, type });
    }

    if (type === "Wholesaler") {
      user = await Wholesaler.findOne({ email });
      if (user) res.status(400).send("Wholesaler already exists");

      user = new Wholesaler({ name, email, password, location, type });
    }

    if (type === "Delivery") {
      user = await Delivery.findOne({ email });
      if (user) res.status(400).send("Delivery account already exists");

      user = new Delivery({ name, email, password, location, type });
    }

    const salt = await genSalt(10);
    user.password = await hash(password, salt);

    await user.save();

    res.send(user);
  } catch (error) {
    if (error) console.log(error.data);
  }
});

router.post("/api/google", async (req, res) => {
  const { name, email, password, location, type } = req.body;

  try {
    let user = null;

    if (type === "Customer") {
      user = await Customer.findOne({ email });

      if (user) res.status(400).send("Customer already exists");

      user = new Customer({ name, email, password, location, type });
    }

    if (type === "Retailer") {
      user = await Retailer.findOne({ email });

      if (user) res.status(400).send("Retailer already exists");

      user = new Retailer({ name, email, password, location, type });
    }

    if (type === "Wholesaler") {
      user = await Wholesaler.findOne({ email });
      if (user) res.status(400).send("Wholesaler already exists");

      user = new Wholesaler({ name, email, password, location, type });
    }

    if (type === "Delivery") {
      user = await Delivery.findOne({ email });
      if (user) res.status(400).send("Delivery account already exists");

      user = new Delivery({ name, email, password, location, type });
    }

    const salt = await genSalt(10);
    user.password = await hash(password, salt);

    await user.save();

    const payload = { user: { id: user._id } };

    sign(payload, get("JWT_SECRET"), { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;

      res.status(200).send({ token });
    });
  } catch (error) {
    if (error) console.log(error.data);
  }
});

router.get("/api/checkemail/:email", async (req, res) => {
  let email = req.params.email;

  try {
    let user = await Customer.findOne({ email });
    user = user || (await Retailer.findOne({ email }));
    user = user || (await Wholesaler.findOne({ email }));
    user = user || (await Delivery.findOne({ email }));

    res.status(200).send(user);
  } catch (e) {
    res.status(400).send({ error: "Invalid user email" });
  }
});

router.get("/api/getuser/:id", async (req, res) => {
  let userId = req.params.id;

  try {
    let user = await Customer.findOne({ _id: userId });
    user = user || (await Retailer.findOne({ _id: userId }));
    user = user || (await Wholesaler.findOne({ _id: userId }));
    user = user || (await Delivery.findOne({ _id: userId }));

    res.status(200).send(user);
  } catch (e) {
    res.status(400).send({ error: "Invalid user id" });
  }
});

router.post("/api/:type/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    res.status(400).send("Please provide email and password");

  // console.log(req.body)
  try {
    let user = null;
    if (req.params.type === "customer") {
      user = await Customer.findOne({ email });
    }

    if (req.params.type === "retailer") {
      user = await Retailer.findOne({ email });
    }

    if (req.params.type === "wholesaler") {
      user = await Wholesaler.findOne({ email });
    }

    if (req.params.type === "delivery") {
      user = await Delivery.findOne({ email });
    }

    // console.log(user)

    if (!user) res.status(400).send("Invalid Credentials");

    const isMatch = await compare(password, user.password);

    if (!isMatch) {
      res.status(400).send("Invalid Credentials");
    }

    const payload = { user: { id: user._id } };

    sign(payload, get("JWT_SECRET"), { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;

      res.status(200).send({ token });
    });
  } catch (error) {
    res.status(401).send(error);
  }
});

router.get("/api/otp/:email", async (req, res) => {
  var transporter = createTransport({
    host: "smtp.gmail.com",
    // service: 'gmail',
    secure: true,
    port: 465,
    auth: {
      user: "deliverdashofficial@gmail.com",
      pass: get("OTP_Pass"),
    },
  });

  const sendOTP = (receiverMail, OTP) => {
    var mailOptions = {
      from: "deliverdashofficial@gmail.com",
      to: receiverMail,
      subject: "Deliver Dash OTP Verification",
      text: "OTP: " + OTP + "\nValid for 2 minutes",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  };

  const email = req.params.email;

  if (!email) res.status(400).send("Please provide email and password");

  console.log(email);
  // console.log(req.body)
  try {
    let max = 9999,
      min = 1000;

    const OTP = Math.floor(Math.random() * (max - min + 1) + min);
    sendOTP(email, OTP);

    const payload = { OTP: OTP };

    sign(payload, get("JWT_SECRET"), { expiresIn: 120 }, (err, token) => {
      if (err) throw err;

      res.status(200).send({ token });
    });
  } catch (error) {
    res.status(401).send(error);
  }
});

export default router;
