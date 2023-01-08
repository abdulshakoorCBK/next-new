import styles from "../styles/Add.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Add({ setClose }) {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [prices, setPrices] = useState([]);
  const [extra, setExtra] = useState(null);
  const [extraOptions, setExtraOptions] = useState([]);
  const changePrices = (e, index) => {
    const currentPrices = prices;
    currentPrices[index] = e.target.value;
    setPrices(currentPrices);
  };
  const handleExtraInput = (e) => {
    setExtra({ ...extra, [e.target.name]: e.target.value });
  };
  const handleExtras = () => {
    setExtraOptions((prev) => [...prev, extra]);
  };
  const handleCreate = async () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/desv0ugoq/image/upload",
        data
      );
      const newProduct = {
        title,
        desc,
        price: prices,
        topings: extraOptions,
        image: uploadRes.data.secure_url,
      };
      await axios.post(`http://localhost:3000/api/products`, newProduct);
      setClose(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={styles.add}>
      <div className={styles.wrapper}>
        <span className={styles.x} onClick={() => setClose(false)}>
          {" "}
          X
        </span>

        <h1>Add New Pizza</h1>
        <div className={styles.item}>
          <span className={styles.span}>Image</span>
          <input
            className={styles.file}
            type="file"
            name=""
            id=""
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className={styles.item}>
          <span className={styles.span}>Title</span>
          <input
            className={styles.input}
            type="text"
            name=""
            id=""
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <span className={styles.span}>Description</span>
          <input
            className={styles.input}
            type="text"
            name=""
            id=""
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <span className={styles.span}>Prices</span>
          <input
            className={`${styles.input} ${styles.small}`}
            type="number"
            name=""
            id=""
            placeholder="small"
            onChange={(e) => changePrices(e, 0)}
          />
          <input
            className={`${styles.input} ${styles.small}`}
            type="number"
            name=""
            id=""
            placeholder="medium"
            onChange={(e) => changePrices(e, 1)}
          />
          <input
            className={`${styles.input} ${styles.small}`}
            type="number"
            name=""
            id=""
            placeholder="large"
            onChange={(e) => changePrices(e, 2)}
          />
        </div>
        <div className={styles.item}>
          <span className={styles.span}>Extras</span>
          <div>
            <input
              className={styles.input}
              type="text"
              name="text"
              id=""
              onChange={handleExtraInput}
            />
            <input
              className={styles.input}
              type="number"
              name="price"
              id=""
              onChange={handleExtraInput}
            />
            <button className={styles.addbutton} onClick={handleExtras}>
              Add
            </button>
          </div>
        </div>
        <div className={styles.item}>
          <span>extra items</span>
          {extraOptions.map((option) => (
            <div key={option.text}>
              <span>{option.text}=</span>
              <span>{option.price}</span>
            </div>
          ))}
        </div>
        <button className={styles.create} onClick={handleCreate}>
          Create
        </button>
      </div>
    </div>
  );
}
