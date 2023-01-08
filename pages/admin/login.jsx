import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../../styles/Login.module.css";

export default function Login() {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(false);
  const router = useRouter();
  const handleClick = async () => {
    try {
      await axios.post(`http://localhost:3000/api/login`, {
        username,
        password,
      });
      router.push("/admin");
    } catch (err) {
      console.log("err: ", err);
      setError(true);
    }
  };
  return (
    <div className={styles.Login}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Admin Login</h1>

        <div className={styles.item}>
          <span className={styles.span}>username</span>
          <input
            type="text"
            name=""
            className={styles.input}
            id=""
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <span className={styles.span}>password</span>
          <input
            type="text"
            name=""
            className={styles.input}
            id=""
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <button className={styles.button} onClick={handleClick}>
            Submit
          </button>
        </div>
        {error && "wrong credentials"}
      </div>
    </div>
  );
}
