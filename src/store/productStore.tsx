import { useLocalStore } from 'mobx-react';
import {createContext, ReactNode} from 'react';
import { productInitialList } from '../api/productData';
import { Product } from '../types/productType';

type ProductStore = {
    products: Product[];
    selectedProducts: Product[];
    totalPrice: number;
    totalSelectedProducts: number;
    addToProductBasket: (params: { product: Product }) => void;
    removeFromProductBasket: (params: { product: Product }) => void;
  };

const selected: Product[] = []

export const productStore = createContext<ProductStore | null>(null)
export const ProductStoreProvider = ({children} : {children : ReactNode}) =>{
const store = useLocalStore(() =>(
    {
        products: productInitialList,
        selectedProducts: selected,
        get totalPrice(){
            return store.selectedProducts.reduce((totalPrice, item) => totalPrice += (item.quantity * item.price), 0);
        },
        get totalSelectedProducts(){
            return store.selectedProducts.reduce((total, item) => total + item.quantity, 0);
        },
        addToProductBasket: ({product} : {product:Product}) => {
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
        removeFromProductBasket: ({product} : {product: Product}) =>{
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