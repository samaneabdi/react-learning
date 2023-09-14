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
            return 0;
        },
        addToProductBasket: ({product}) => {
            const selectedProductIndex = store.selectedProducts.findIndex(x=>x.id == product.id);
            if(selectedProductIndex > -1)
            {
                const product = store.selectedProducts[selectedProductIndex];
                product.quantity += 1;
                store.selectedProducts=[...store.selectedProducts];
            }
            else{
                console.log({product});
                product.quantity = 1;
                store.selectedProducts = [...store.selectedProducts, product]
            }
        },
        removeFromProductBasket: (product) =>{
            console.log({product});
        }
    }
));
return <productStore.Provider value = {store}>{children}</productStore.Provider>
}