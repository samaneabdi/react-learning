export type Product = {
    id: number,
    title: string,
    price: number,
    quantity: number
}
export type ProductProps = {
    products?:Product[],
    addToList?: (product:Product) => void, 
    removeFromList?: (product:Product) => void, 
}