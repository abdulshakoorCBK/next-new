import Order from "../../../models/Order";
import dbConnect from "../../../util/mongo";
export default async function handler(req, res) {
  dbConnect();
  const { method, cookies } = req;
  const token = cookies.token;

  if (method === "GET") {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "POST") {
    try {
      const order = await Order.create(req.body);
      res.status(200).json(order);
    } catch (err) {
      res.status(501).json(err);
    }
  }
}
