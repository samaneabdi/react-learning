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
    const existingProductIndex = selectedProducts.findIndex((p) => p.id === product.id);

    if (existingProductIndex !== -1) {
      selectedProducts[existingProductIndex].quantity += 1;
      setSelectedProducts(selectedProducts);
    } else {
      selectedProducts.push({ ...product, quantity: 1 });
      setSelectedProducts(selectedProducts);
    }

    const productIndex = products.findIndex((p) => p.id === product.id);
    if (productIndex !== -1) {
      products[productIndex].quantity += 1;
      setProducts(products);
    }

    let price = totalPrice;
    price += product.price;
    setTotalPrice(price);
  };

  const removeFromList = (product) => {
    const existingProductIndex = selectedProducts.findIndex((p) => p.id === product.id);

    if (existingProductIndex !== -1) {
      if (selectedProducts[existingProductIndex].quantity > 1) {
        selectedProducts[existingProductIndex].quantity -= 1;
        setSelectedProducts(selectedProducts);
      } else {
        selectedProducts.splice(existingProductIndex, 1);
        setSelectedProducts(selectedProducts);
      }
    }

    const productIndex = products.findIndex((p) => p.id === product.id);
    if (productIndex !== -1 && products[productIndex].quantity > 0) {
      products[productIndex].quantity -= 1;

      let price = totalPrice;
      price -= product.price;
      setTotalPrice(price);
      setProducts(products);
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
