import React from 'react'
import { useSelector } from 'react-redux';
import productStyle from "./product.module.css"

function ProductBasket() {
  const productItem = useSelector(state => state.rootReducer.product.selectedProducts);
  const totalPrice = useSelector(state => state.rootReducer.product.totalPrice);

  return (
    <div className={productStyle.selected_products}>
      <h3>Selected Products</h3>
      <ul>
        {productItem?.map((item) => (
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