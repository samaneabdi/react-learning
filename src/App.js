import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge } from "antd";
import { Outlet } from "react-router-dom";
import { productInitialList } from "../src/api/productData";
import React, {useState} from "react";
import "./App.css";
import Products from "./pages/product/Products";
import ProductBasket from "./pages/product/ProductBasket";

function App() {

  const [products, setProducts] = useState(productInitialList);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showBasket, setShowBasket] = useState(false); 

  const addToList = (product) => {
    setSelectedProducts((prevSelectedProducts) => {
      const existingProduct = prevSelectedProducts.find((p) => p.id === product.id);

      if (existingProduct) {
        existingProduct.quantity += 1;
        return [...prevSelectedProducts];
      } else {
        const newProduct = { ...product, quantity: 1 };
        return [...prevSelectedProducts, newProduct];
      }
    });

    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.map((p) =>
        p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
      );
      return updatedProducts;
    });

    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price);
  };

  const removeFromList = (product) => {
    setSelectedProducts((prevSelectedProducts) => {
      const existingProduct = prevSelectedProducts.find((p) => p.id === product.id);

      if (existingProduct && existingProduct.quantity > 0) {
        existingProduct.quantity -= 1;
        return [...prevSelectedProducts];
      } else {
        const updatedSelectedProducts = prevSelectedProducts.filter((p) => p.id !== product.id);
        return updatedSelectedProducts;
      }
    });

    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.map((p) =>
        p.id === product.id && p.quantity > 0 ? { ...p, quantity: p.quantity - 1 } : p
      );
      return updatedProducts;
    });

    if (product.quantity > 0) {
      setTotalPrice((prevTotalPrice) => prevTotalPrice - product.price);
    }
  };
  
  const totalSelectedProducts = selectedProducts.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="App">
      <header className="App-header">
        <Badge size="small" count={totalSelectedProducts}>
          <ShoppingCartOutlined onClick={() => setShowBasket(!showBasket)} className="btnIcon"/>
        </Badge>
      </header>
      <main>
        <Products 
          removeFromList={removeFromList} 
          addToList={addToList}
          products={products}
          selectedProducts={selectedProducts}
          totalPrice={totalPrice}
        />
        {showBasket && 
          <ProductBasket 
            productItem={selectedProducts}
            totalPrice={totalPrice}
          />
        }
        <Outlet />
      </main>
      <footer>footer</footer>
    </div>
  );
}

export default App;
