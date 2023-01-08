import styles from "../styles/AddButton.module.css";

export default function AddButton({ setClose }) {
  return (
    <div onClick={() => setClose(true)} className={styles.addbutton}>
      Add New Pizza
    </div>
  );
}
