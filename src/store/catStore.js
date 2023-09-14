import { useLocalStore } from 'mobx-react';
import {createContext} from 'react';

export const catStore = createContext()
export const CatStoreProvider = ({children}) =>{
const store = useLocalStore(() =>({
    search : '',
    setSearch : (text) =>{
        store.search = text;
    }
}));
return <catStore.Provider value = {store}>{children}</catStore.Provider>
}