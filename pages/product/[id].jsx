import Image from "next/image";
import { useState } from "react";
import style from "../../styles/Product.module.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice";
export default function Product({ pizza }) {
  const [size, setSize] = useState(0);
  const [price, setPrice] = useState(pizza.price[0]);
  const [quantity, setQuantity] = useState(1);
  const [extras, setExtras] = useState([]);
  const dispatch = useDispatch();
  const changePrice = (number) => {
    setPrice(price + number);
  };
  const handleSize = (sizeIndex) => {
    const diffrence = pizza.price[sizeIndex] - pizza.price[size];
    setSize(sizeIndex);
    changePrice(diffrence);
  };
  const handleChange = (e, toping) => {
    const checked = e.target.checked;
    if (checked) {
      changePrice(toping.price);
      setExtras((prev) => [...prev, toping]);
    } else {
      changePrice(-toping.price);
      setExtras(extras.filter((extras) => extras._id !== toping._id));
    }
  };

  const handleClick = () => {
    dispatch(addProduct({ ...pizza, extras, price, quantity }));
  };
  return (
    <div className={style.container}>
      <div className={style.left}>
        <div className={style.imageContainer}>
          <Image src={pizza.image} layout="fill" alt="" />
        </div>
      </div>
      <div className={style.right}>
        <h1 className={style.title}>{pizza.title}</h1>
        <span className={style.price}>RS:{price}</span>
        <span className={style.desc}>{pizza.desc}</span>
        <h3 className={style.innerTitle}>Choose the Size</h3>
        <h3 className={style.sizes}>
          <div className={style.size} onClick={() => handleSize(0)}>
            <Image src={"/img/size.png"} layout="fill" alt="" />
            <span className={style.sizeName}>Small</span>
          </div>
          <div className={style.size} onClick={() => handleSize(1)}>
            <Image src={"/img/size.png"} layout="fill" alt="" />
            <span className={style.sizeName}>Medium</span>
          </div>
          <div className={style.size} onClick={() => handleSize(2)}>
            <Image src={"/img/size.png"} layout="fill" alt="" />
            <span className={style.sizeName}>Large</span>
          </div>
        </h3>

        <h3 className={style.innerTitle}>Choose the additional Ingredians</h3>
        <div className={style.ingrediands}>
          {pizza.topings.map((toping) => {
            return (
              <div className={style.ingrediand} key={toping._id}>
                <input
                  type="checkbox"
                  className={style.checkbox}
                  name={toping.text}
                  id={toping.text}
                  onChange={(e) => handleChange(e, toping)}
                />
                <label htmlFor="double" className={style.ingrediandName}>
                  {toping.text}
                </label>
              </div>
            );
          })}
        </div>
        <input
          type="number"
          className={style.count}
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <button className={style.button} onClick={handleClick}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(
    `http://localhost:${process.env.port}/api/products/${params.id}`
  );
  return { props: { pizza: res.data } };
};
