import { Link } from "react-router-dom";
import styles from "./NoPage.module.css";

const NoPage = (props) => {
  return (
    <div className={styles.section}>
      <p>No Page Found</p>
      <Link className="btn" to="/allquotes">
        Goto Home Page
      </Link>
    </div>
  );
};

export default NoPage;
