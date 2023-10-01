import React from 'react'
import { useAppSelector } from '../../store/hook';
import productStyle from "./product.module.css"

function ProductBasket() {
  const productItem = useAppSelector((state) => state.productSlice.selectedProducts);
  const totalPrice = useAppSelector((state) => state.productSlice.totalPrice);

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