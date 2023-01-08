import Product from "../../../models/Product";
import dbConnect from "../../../util/mongo";
export default async function handler(req, res) {
  dbConnect();
  const { method, cookies } = req;
  const token = cookies.token;
  if (method === "GET") {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "POST") {
    if (!token || token != process.env.TOKEN) {
      return res.status(401).json("you are not authenticated");
    }
    try {
      const product = await Product.create(req.body);
      res.status(200).json(product);
    } catch (err) {
      res.status(501).json(err);
    }
  }
}
