import styles from "./Box.module.css";
import BoxLeft from "./BoxLeft";
import BoxRight from "./BoxRight";

function Box() {
  return (
    <div className={styles.Box}>
      <BoxLeft />
      <BoxRight />
    </div>
  );
}
export default Box;
