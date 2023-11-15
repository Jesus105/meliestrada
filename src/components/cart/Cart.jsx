import React, { useContext } from "react";
import { DataContext } from "../../context/DataProvider";


export const Cart = () =>{

    const value = useContext(DataContext);
    const [menu, setMenu] = value.menu
    const [carrito, setCarrito] = value.carrito
    const [total] = value.total
    const [payment, setPayment] = value.payment;

    const toogleFalse = () =>{
        setMenu(false);
    }
    const makeOrder = () =>{
        setMenu(false);
        setPayment(true);
    }

    const show1 = menu ? "carts show" : "carts";
    const show2 = menu ? "cart show" : "cart";

    const resta = id =>{
        carrito.forEach(item =>{
            if(item.id === id){
                item.cantidad === 1 ? item.cantidad = 1: item.cantidad -= 1;
            }
            setCarrito([...carrito])
        })
    }


    const suma = id =>{
        carrito.forEach(item =>{
            if(item.id === id){
                (item.cantidad == item.amount ? item.cantidad=item.cantidad : item.cantidad++)
            }
            setCarrito([...carrito])
        })
    }

    
    const removeProducto = (id) =>{
        if(window.confirm("¿Desea borrar el producto?")){
            carrito.forEach((item, index) => {
                if(item.id === id){
                    item.cantidad = 1;
                    carrito.splice(index,1)
                }

                setCarrito([...carrito]);
                localStorage.setItem('carrito', JSON.stringify(carrito));
            }
            )}
            
    }

    return (
        <div className={show1}>
            <div className={show2}>
                <div className="cart_close" onClick={toogleFalse}>
                    <box-icon name='x'></box-icon>
                </div>
                <h2>Su carrito</h2>

                <div className="cart_center">
                    
                    {
                        carrito.length  === 0 ? <h2 style={{
                            textAlign: "center", fontSize: "3rem"
                        }}>Carrito vacio</h2> : <>

                        {

                            carrito.map((producto) => (
                                <div className="cart_item" key={producto.id}>
                                    <img src={producto.images[0].url}alt="" />
                                    <div>
                                        <h3>{producto.name}</h3>
                                        <p className="price">${(producto.cantidad >= producto.amount_wholesalePrice ? producto.wholesalePrice : producto.price)}</p>
                                    </div>
                                    <div>
                                        <box-icon name="up-arrow" type="solid" onClick={() => suma(producto.id)}></box-icon>
                                        <p className="cantidad">{producto.cantidad}</p>
                                        <box-icon name="down-arrow" type="solid" onClick={() => resta(producto.id)}></box-icon>
                                    </div>
                                    <div className="remove_item" onClick={() => removeProducto(producto.id)}>
                                        <box-icon name="trash"></box-icon>
                                    </div>
                                </div>
                            ))
                        }
                        </>
                    }

                </div>

                <div className="cart_footer">
                    <h3>
                        Total:${
                            total
                        }
                    </h3>
                    <button onClick={() => (total <= 1000 ? window.alert("La cantidad mínima de compra son $1000 pesos"): makeOrder())}>Pagar</button>
                </div>
                
            </div>
            
        
            
        </div>
    )
}