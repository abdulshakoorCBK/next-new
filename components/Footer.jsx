import Image from "next/image";
import style from "../styles/Footer.module.css";
export default function Footer() {
  return (
    <div className={style.footer}>
      <div className={style.image}>
        <Image
          src={"/img/bg.png"}
          className={style.image}
          height={480}
          width={300}
        />
      </div>
      <div className={style.container}>
        <div className={style.textContainer}>
          OH YES DID.THE KATTIPPARA PIZZA, WELL BACKED SLICE OF PIZZA.
        </div>
        <div className={style.contact}>
          <span className={style.headding}>FIND OUR RESTORENT</span>
          <span className={style.body}>
            671 317 MELPARAMBA KASARAGOD,KERALA 9995559990
          </span>
          <span className={style.body}>
            671 317 MELPARAMBA KASARAGOD,KERALA 9995559990
          </span>
          <span className={style.body}>
            671 317 MELPARAMBA KASARAGOD,KERALA 9995559990
          </span>
        </div>
        <div className={style.time}>
          <span className={style.headding}>WORKING HOURS</span>
          <span className={style.body}>MONDAY UNTIL FRIDAY 9:00-22:00 </span>
          <span className={style.body}>MONDAY UNTIL FRIDAY 9:00-22:00 </span>
        </div>
      </div>
    </div>
  );
}
