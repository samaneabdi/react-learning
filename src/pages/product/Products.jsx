
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import React from "react";
import productStyle from "./product.module.css";


const Products = ({products, addToList, removeFromList}) => {
  return (
    <>
      <div className={productStyle.product_container}>
        {products.map((item) => (
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
      {/* <ProductBasket 
        productItem={selectedProducts}
        totalPrice={totalPrice}
      /> */}
    </>
  );
};

export default Products;