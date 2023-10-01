
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { addToProductBasket, removeFromProductBasket } from "../../store/productSlice";
import { Product } from "../../types/productType";
import productStyle from "./product.module.css";


const Products = () => {
  const products = useAppSelector((state) => state.productSlice.products);
  const dispatch = useAppDispatch();

  const addToList = (product:Product) => {
    dispatch(addToProductBasket({product}));
  };

  const removeFromList = (product:Product) => {
    dispatch(removeFromProductBasket({product}));
  };

  return (
    <>
      <div className={productStyle.product_container}>
        {products.map((item) => (
          <div key={item.id} className={productStyle.product_box}>
            <h4>Title: {item.title}</h4>
            <h5>Price: {item.price}</h5>
            <div>
              <div className={productStyle.btn}>
                <PlusOutlined rev={"plus"} className={productStyle.btnIcon} onClick={() => addToList(item)} />
                <span>{item.quantity}</span>
                <DeleteOutlined rev={"delete"} className={productStyle.btnIcon} onClick={() => removeFromList(item)} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Products;