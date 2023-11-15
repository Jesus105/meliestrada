import React, { useContext } from "react";
import { DataContext } from "../../context/DataProvider";


export const ProductDetails = () =>{

    const value = useContext(DataContext);
    const [setDetails] = value.details;
    const [productDetails, setProductDetails] = value.productDetails;
    const addCarrito = value.addCarrito;

    const toogleFalse = () =>{
        setDetails(false);
        setProductDetails({})
    }


    
    return (
        <div className={"details"}>
            <div className={"detail"}>
                <div className="detail_close" onClick={toogleFalse}>
                    <box-icon name='x'></box-icon>
                </div>
                <h2>{productDetails.name}</h2>

                <div className="body_details">

                    <p>Precio unitario: {productDetails.price}$</p>
                    <p>Precio mayoreo: {productDetails.wholesalePrice}$</p>
                    <p>Cantidad minima para mayoreo: {productDetails.amount_wholesalePrice}</p>
                    <p>Unidades disponibles: {productDetails.amount}</p>
                    
                    {  
                        productDetails.images.map(img =>{
                            return <img src={img.url}/>
                        })
                    }

                    <a onClick={toogleFalse}><button onClick={() => addCarrito(productDetails.id)}>Añadir al carrito</button></a>

                </div>


                
            </div>
            
        
            
        </div>
    )
}