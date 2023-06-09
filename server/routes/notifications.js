import Notification from "../models/Notification";
import { Router } from "express";

const router = Router();

router.post("/api/:type/notification/:id", async (req, res) => {
  try {
    const owner = req.params.id;
    const { orderId, status } = req.body;

    // const product = await Product.findOne({_id: productId})

    const notify = new Notification({ owner, orderId, status });
    await notify.save();

    res.status(200).send(notify);
  } catch (e) {
    res.status(400).send();
  }
});

router.get("/api/:type/notifications/:id", async (req, res) => {
  try {
    const owner = req.params.id;
    const notifies = await Notification.find({ owner });

    res.status(200).send(notifies);
  } catch (e) {
    res.status(400).send();
  }
});

export default router;
