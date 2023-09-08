import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge } from "antd";
import { useSelector } from "react-redux";
import { Outlet, Link, useNavigate } from "react-router-dom";
import "./App.css";

function App() {
  const navigate = useNavigate();
  const selectedProducts = useSelector(state => state.rootReducer.product.selectedProducts);
  const totalSelectedProducts = selectedProducts.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <li>
            <Link to="/Cats"> Cats</Link>
          </li>
          <li>
            <Link to="/Todos"> Todos</Link>
          </li>
          <li>
            <Link to="/Products"> Products</Link>
          </li>
        </div>
        <Badge size="small" count={totalSelectedProducts}>
          <ShoppingCartOutlined onClick={() => navigate("/ProductBasket")} className="btnIcon"/>
        </Badge>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>footer</footer>
    </div>
  );
}

export default App;
