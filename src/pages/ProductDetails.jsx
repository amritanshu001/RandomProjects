import { useParams } from "react-router-dom";

const ProductDetails = (props) => {
  const params = useParams();

  const productTitle = props.catalog.find(
    (prod) => params.productId === prod.id
  ).title;

  return (
    <div>
      <h1> {productTitle} Detail</h1>
      <p>{params.productId}</p>
    </div>
  );
};

export default ProductDetails;
