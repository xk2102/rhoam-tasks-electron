// CSS, REACT ICONS --------------------------------------
import styles from "./Footer.module.css";
import { MdOutlineCopyright } from "react-icons/md";
// COMPONENT----------------------------------------------
export default function Footer() {
  return (
    <div className={styles.footer}>
      <MdOutlineCopyright />
      <a href="https://www.christoskipouros.com" rel="noreferrer" target="_blank">
        C.K 2022
      </a>
    </div>
  );
}
