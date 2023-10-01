import React, { useContext } from 'react'
import { BasketContext } from '../../App';
import productStyle from "./product.module.css";

function ProductBasket({ totalPrice}:{totalPrice?: number}) {
const basket = useContext(BasketContext);
console.log({basket});
  return (
    <div className={productStyle.selected_products}>
      <h3>Selected Products</h3>
      <ul>
        {basket?.map((item) => (
          <li key={item.id}>
            {item.title} - Quantity: {item.quantity}
          </li>
        ))}
      </ul>
      <div className={productStyle.total_price}>
        Total Price: {totalPrice} $
      </div>
    </div>
  )
}

export default ProductBasket