
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { useObserver } from "mobx-react";
import React, { useContext } from "react";
import { productStore } from "../../store/productStore";
import productStyle from "./product.module.css";


const Products = () => {
 const store = useContext(productStore);

  const addToList = (product) => {
    store.addToProductBasket({product});
  };

  const removeFromList = (product) => {
    store.removeFromProductBasket({product});
  };
return useObserver(()=>(
  <>
  <div className={productStyle.product_container}>
    {store.products.map((item) => (
      <div key={item.id} className={productStyle.product_box}>
        <h4>Title: {item.title}</h4>
        <h5>Price: {item.price}</h5>
        <div>
          <div className={productStyle.btn}>
            <PlusOutlined className={productStyle.btnIcon} onClick={() => addToList(item)} />
            <span>{item.quantity}</span>
            <DeleteOutlined className={productStyle.btnIcon} onClick={() => removeFromList(item)} />
          </div>
        </div>
      </div>
    ))}

  </div>
  
</>
))

};

export default Products;