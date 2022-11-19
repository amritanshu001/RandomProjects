import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const prodCatalog = [
  {
    id: "01",
    title: "Test",
    price: 6,
    description: "This is a first product - amazing!",
  },
  {
    id: "02",
    title: "Another Test",
    price: 7.99,
    description: "This second product is even better!",
  },
];

const Products = (props) => {
  const mapProdCatalog = (item) => {
    return <ProductItem key={item.id} catalogItem={item}></ProductItem>;
  };

  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>{prodCatalog.map(mapProdCatalog)}</ul>
    </section>
  );
};

export default Products;
