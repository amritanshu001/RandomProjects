import { Link } from "react-router-dom";
import styles from "./Products.module.css";

const mapCatalog = (item) => {
  return (
    <li key={item.id}>
      <Link to={`/products/${item.id}`}>{item.title}</Link>
    </li>
  );
};

const Products = (props) => {
  return (
    <div className={styles.products}>
      <h1>Welcome to Products Page</h1>
      <ul>{props.catalog.map(mapCatalog)}</ul>
    </div>
  );
};

export default Products;
