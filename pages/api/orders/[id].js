import Order from "../../../models/Order";
import dbConnect from "../../../util/mongo";
export default async function handler(req, res) {
  dbConnect();
  const {
    method,
    cookies,
    query: { id },
  } = req;
  const token = cookies.token;

  if (method === "GET") {
    try {
      const order = await Order.findById(id);
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "POST") {
    try {
      const product = await Product.create(req.body);
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "PUT") {
    if (!token || token != process.env.TOKEN) {
      return res.status(401).json("you are not authenticated");
    }
    try {
      const order = await Order.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
