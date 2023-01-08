import Image from "next/image";
import style from "../styles/Card.module.css";
import Link from "next/link";
export default function Card({ pizza }) {
  return (
    <div className={style.card}>
      <Link href={`/product/${pizza._id}`} passHref>
        <div className={style.image}>
          <Image src={pizza.image} alt="" width={200} height={200} />
        </div>
      </Link>
      <h3 className={style.title}>{pizza.title}</h3>
      <span className={style.price}>Rs {pizza.price[0]}</span>
      <span className={style.desc}>{pizza.desc}</span>
    </div>
  );
}
