import { useState } from "react";
import styles from "../styles/OrderDetails.module.css";

export default function OrderDetails({ total, createOrder }) {
  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");
  const handleClick = () => {
    createOrder({ customer, total, address, method: 0 });
    return;
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>You Want To Pay {total}</h2>
        <div className={styles.item}>
          <span className={styles.label}>Name :</span>
          <input
            type="text"
            className={styles.input}
            onChange={(e) => setCustomer(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <span className={styles.label}>Phone Number :</span>
          <input
            type="text"
            className={styles.input}
            onChange={(e) => setCustomer(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <span className={styles.label}>Address :</span>
          <textarea
            onChange={(e) => setAddress(e.target.value)}
            className={styles.area}
          />
        </div>

        <div className={styles.item}>
          <button className={styles.button} onClick={handleClick}>
            submit
          </button>
        </div>
      </div>
    </div>
  );
}
