import style from "../styles/Cards.module.css";
import Card from "./Card";
export default function Cards({ pizzaLists }) {
  return (
    <div className={style.cards}>
      <div className={style.top}>
        <div className={style.headding}>THE BEST PIZZA IN CITY</div>
        <div className={style.texts}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
          assumenda doloremque repudiandae saepe amet ducimus dolore quae id
          laudantium at ea sunt explicabo maiores voluptas non officia et,
          libero quis soluta velit dolor quaerat quo recusandae.
        </div>
      </div>
      <div className={style.bottom}>
        <div className={style.cardContainer}>
          {pizzaLists.map((pizza) => {
            return <Card pizza={pizza} key={pizza._id} />;
          })}
        </div>
      </div>
    </div>
  );
}
