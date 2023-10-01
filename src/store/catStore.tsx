import { useLocalStore } from 'mobx-react';
import {createContext} from 'react';

type CatStore = {
    search: string;
    setSearch: (text: string) => void;
}

export const catStore = createContext<CatStore | null>(null);
export const CatStoreProvider = ({children} : {children:React.ReactNode}) =>{
const store = useLocalStore<CatStore>(() =>({
    search : '',
    setSearch : (text: string) =>{
        store.search = text;
    }
}));
return <catStore.Provider value={store}>{children}</catStore.Provider>;
}