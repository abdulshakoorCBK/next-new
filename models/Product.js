import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: 60,
    },
    price: {
      type: [Number],
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
      maxLength: 200,
    },
    topings: {
      type: [
        {
          text: { type: String, required: true },
          price: { type: Number, required: true },
        },
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
