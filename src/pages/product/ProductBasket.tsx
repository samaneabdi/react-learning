import { useObserver } from 'mobx-react'
import React, { useContext } from 'react'
import { productStore } from '../../store/productStore'
import productStyle from "./product.module.css"

function ProductBasket() {
 const store = useContext(productStore);

 return useObserver(()=>(
  <div className={productStyle.selected_products}>
  <h3>Selected Products</h3>
  <ul>
    {store!.selectedProducts?.map((item) => (
      <li key={item.id}>
        {item.title} - Quantity: {item.quantity}
      </li>
    ))}
  </ul>
  <div className={productStyle.total_price}>
    Total Price: {store!.totalPrice} $
  </div>
</div>
 ))
}

export default ProductBasket