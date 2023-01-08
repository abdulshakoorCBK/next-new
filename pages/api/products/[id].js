import Product from "../../../models/Product";
import dbConnect from "../../../util/mongo";
export default async function handler(req, res) {
  dbConnect();
  const {
    method,
    query: { id },
  } = req;
  if (method === "GET") {
    try {
      const product = await Product.findById(id);
      res.status(200).json(product);
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
  if (method === "DELETE") {
    try {
      await Product.findByIdAndDelete(id);
      res.status(200).json("product was deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
