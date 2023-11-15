import React, { useContext } from "react";
import { DataContext } from "../../context/DataProvider";
import { ProductItem } from "./ProductItem";
import { ProductDetails } from "./ProductDetails";


export const ProductsList = () => {

    const value = useContext(DataContext);
    const [productos] = value.productos;
    const [details] = value.details;
    const [categoriaActiva] = value.categoriaActiva;

    return(
        <>
            <h1 className="title">Productos</h1>
            <div className="products">

                {
                    productos.map((producto) => {
                        if(categoriaActiva === 'All'){
                            if(!producto.isArchived){
                            
                                return (<ProductItem 
                                    id = {producto.id} 
                                    key = {producto.id}
                                    storeId={producto.storeId}
                                    categoryId = {producto.categoryId}
                                    name = {producto.name}
                                    price = {producto.price}
                                    isArchived={producto.isArchived}
                                    isFeatured={producto.isFeatured}
                                    sizeId={producto.sizeId}
                                    colorId={producto.colorId}
                                    amount={producto.amount}
                                    wholesalePrice={producto.wholesalePrice}
                                    amount_wholesalePrice={producto.amount_wholesalePrice}
                                    createdAt={producto.createdAt}
                                    updatedAt={producto.updatedAt}
                                    images={producto.images}
                                    category={producto.category}
                                    color = {producto.color}
                                    size = {producto.size}
        
                                />)
                            } else{
                                if(categoriaActiva === producto.category.id){
                                    if(!producto.isArchived){
                            
                                        return (<ProductItem 
                                            id = {producto.id} 
                                            key = {producto.id}
                                            storeId={producto.storeId}
                                            categoryId = {producto.categoryId}
                                            name = {producto.name}
                                            price = {producto.price}
                                            isArchived={producto.isArchived}
                                            isFeatured={producto.isFeatured}
                                            sizeId={producto.sizeId}
                                            colorId={producto.colorId}
                                            amount={producto.amount}
                                            wholesalePrice={producto.wholesalePrice}
                                            amount_wholesalePrice={producto.amount_wholesalePrice}
                                            createdAt={producto.createdAt}
                                            updatedAt={producto.updatedAt}
                                            images={producto.images}
                                            category={producto.category}
                                            color = {producto.color}
                                            size = {producto.size}
                
                                        />)
                                    }
                                }
                            }
                        }else{
                            if(categoriaActiva === producto.category.id){
                                return (
                                    <ProductItem 
                                    id = {producto.id} 
                                    key = {producto.id}
                                    storeId={producto.storeId}
                                    categoryId = {producto.categoryId}
                                    name = {producto.name}
                                    price = {producto.price}
                                    isArchived={producto.isArchived}
                                    isFeatured={producto.isFeatured}
                                    sizeId={producto.sizeId}
                                    colorId={producto.colorId}
                                    amount={producto.amount}
                                    wholesalePrice={producto.wholesalePrice}
                                    amount_wholesalePrice={producto.amount_wholesalePrice}
                                    createdAt={producto.createdAt}
                                    updatedAt={producto.updatedAt}
                                    images={producto.images}
                                    category={producto.category}
                                    color = {producto.color}
                                    size = {producto.size}
        
                                />
                                )
                            }
                        }
                    }
                       
                    )
                }

                {
                    (details ? <ProductDetails/> :<></>)
                }

            </div>
            


        </>
    )
}