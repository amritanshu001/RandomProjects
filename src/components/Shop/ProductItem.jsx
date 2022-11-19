import Card from "../UI/Card";
import classes from "./ProductItem.module.css";
import { useDispatch } from "react-redux";
import { cartContentActions } from "../../store/cartitem";

const ProductItem = (props) => {
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    const item = {
      id: props.catalogItem.id,
      title: props.catalogItem.title,
      price: props.catalogItem.price,
      quantity: 1,
      amount: props.catalogItem.price,
    };
    dispatch(cartContentActions.addToCart({ item }));
  };

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{props.catalogItem.title}</h3>
          <div className={classes.price}>
            ${props.catalogItem.price.toFixed(2)}
          </div>
        </header>
        <p>{props.catalogItem.description}</p>
        <div className={classes.actions}>
          <button onClick={addToCartHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
