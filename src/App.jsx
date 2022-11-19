import { Route, Switch } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Products from "./pages/Products";
import MainHeader from "./components/MainHeader";
import ProductDetails from "./pages/ProductDetails";

const catalog = [
  { id: "p1", title: "Book" },
  { id: "p2", title: "Toy Car" },
  { id: "p3", title: "Utensils" },
];

function App() {
  return (
    <div>
      <MainHeader></MainHeader>
      <main>
        <Switch>
          <Route path="/welcome">
            <Welcome></Welcome>
          </Route>
          <Route path="/products" exact>
            <Products catalog={catalog}></Products>
          </Route>
          <Route path="/products/:productId">
            <ProductDetails catalog={catalog}></ProductDetails>
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
