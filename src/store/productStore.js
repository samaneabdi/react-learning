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
            if(existingProductIndex > -1)
            {
                const product = store.selectedProducts[existingProductIndex];
                product.quantity += 1;
                store.selectedProducts=[...store.selectedProducts];
            }
            else{
                console.log({product});
                product.quantity = 1;
                store.selectedProducts = [...store.selectedProducts, product]
            }
        },
        removeFromProductBasket: ({product}) =>{
            const existingProductIndex = store.selectedProducts.findIndex(x=> x.id === product.id);

            if (existingProductIndex !== -1) {
                if (store.selectedProducts[existingProductIndex].quantity > 1) {
                    console.log("aa",store.selectedProducts);
                    const selectedProduct = store.selectedProducts[existingProductIndex];
                    selectedProduct.quantity -= 1;
                    store.selectedProducts=[...store.selectedProducts];
                } else {
                    console.log("bb",store.selectedProducts);
                    const selectedProduct = store.selectedProducts.splice(existingProductIndex, 1);
                    store.selectedProducts=[...selectedProduct];

                }
            }

            const productIndex = store.products.findIndex((p) => p.id === product.id);
            if (productIndex !== -1 && store.products[productIndex].quantity > 0) {
                const product = store.products[productIndex];
                console.log("c",product.quantity);
                product.quantity -= 1;
                console.log("d",product.quantity);
                store.products=[...store.products];
            }
        }
    }
));
return <productStore.Provider value = {store}>{children}</productStore.Provider>
}