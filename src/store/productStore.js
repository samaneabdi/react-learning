import { useLocalStore } from 'mobx-react';
import {createContext} from 'react';
import { productInitialList } from '../api/productData';

export const productStore = createContext()
export const ProductStoreProvider = ({children}) =>{
const store = useLocalStore(() =>(
    {
        products: productInitialList,
        selectedProducts: [],
        get totalPrice(){
            return store.selectedProducts.reduce((totalPrice, item) => totalPrice += (item.quantity * item.price), 0);
        },
        get totalSelectedProducts(){
            return store.selectedProducts.reduce((total, item) => total + item.quantity, 0);
        },
        addToProductBasket: ({product}) => {
            const existingProductIndex = store.selectedProducts.findIndex(x=> x.id === product.id);
            if(existingProductIndex !== -1)
            {
                const selectedProduct = store.selectedProducts[existingProductIndex];
                selectedProduct.quantity += 1;
                store.selectedProducts=[...store.selectedProducts];
            }
            else{
                product.quantity = 1;
                store.selectedProducts = [...store.selectedProducts, product]
            }
        },
        removeFromProductBasket: ({product}) =>{
            const existingProductIndex = store.selectedProducts.findIndex(x=> x.id === product.id);

            if (existingProductIndex !== -1) {
                if (store.selectedProducts[existingProductIndex].quantity > 1) {
                    const selectedProduct = store.selectedProducts[existingProductIndex];
                    selectedProduct.quantity -= 1;
                    store.selectedProducts=[...store.selectedProducts];
                } else {
                    const selectedProduct = store.selectedProducts[existingProductIndex];
                    selectedProduct.quantity -= 1;
                    store.selectedProducts.splice(existingProductIndex, 1);
                    store.selectedProducts=[...store.selectedProducts];

                }
            }
        }
    }
));
return <productStore.Provider value = {store}>{children}</productStore.Provider>
}