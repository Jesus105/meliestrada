import React, { useContext } from "react";
import { DataContext } from "../../context/DataProvider";

export const ProductItem = ({
    id,
    storeId,
    name,
    price, 
    isFeatured,
    isArchived,
    sizeId,
    colorId,
    amount,
    wholesalePrice,
    amount_wholesalePrice,
    createdAt,
    updatedAt,
    images,
    category,
    color, 
    size
}) => {

    const value = useContext(DataContext);
    const addCarrito = value.addCarrito;
    const [details, setDetails] = value.details;
    const [productDetails, setProductDetails] = value.productDetails;
    const [productos, setProductos] = value.productos;

    const toogleDetails = (id) =>{
        setDetails(!details);

        const data = productos.filter(producto =>{
            return producto.id === id
        })
        setProductDetails(data[0])
        productDetails.key = productDetails.id
    }

    
    return (
        <div>
            <div className="product">
                <div className="product_img">
                    <a href="#">
                        <img src={images[0].url} alt={name} />
                    </a>
                </div>
                <div className="product_footer">
                    <h1>{name}</h1>
                    <p>{category.name}</p>
                    <p className="price">${price}</p>
                </div>
                <div className="bottom">
                    <button className="btn" onClick={() => addCarrito(id)}>
                        Añadir al carrito
                    </button>
                    <a onClick={() => toogleDetails(id)}>
                        Ver Detalles
                    </a>

                </div>
            </div>
        </div>
    )
}