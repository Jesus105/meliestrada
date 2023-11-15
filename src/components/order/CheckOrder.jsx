import React, { useContext, useState } from "react";
import { DataContext } from "../../context/DataProvider";

export const CheckOrder = () =>{

    const value = useContext(DataContext);
    const [order, setOrder] = value.order;
    const [ordenes, setOrdenes] = value.ordenes;
    const getOrders = value.getOrders

    const toogleFalse = () =>{
        setOrder(false);
        setOrdenes([])
    }
    const handleSubmit = (event) => {
        event.preventDefault(); // Evita la recarga de la página al enviar el formulario
    
        const telefono = document.getElementById('telefonoOrden').value;
        getOrders(telefono);
    };
    

    return (!order?<></>:
        <div className={"orders"}>
        <div className={"order"}>
            <div className="order_close" onClick={toogleFalse}>
                <box-icon name='x'></box-icon>
            </div>
            

            <div className="body_order">
            <h2>Recuperar pedidos</h2>
                <form id="getOrders">

                    <label for="telefono">Teléfono:</label>
                    <input type="tel" id="telefonoOrden" name="telefono" pattern="[0-9]{10}" required/>

                    <br />

                    <button type="submit" onClick={handleSubmit}>Recuperar pedidos</button>
                </form>


                {ordenes.map((orden) => {
                    const fecha = new Date(orden.createdAt);
                    const update = new Date(orden.updatedAt);

                    return (
                        <div className="card" key={orden.id}>
                            <p>Fecha de creación: {fecha.getDate()}/{fecha.getMonth()}/{fecha.getFullYear()}</p>
                            <p>Última actualización: {(update.getHours()<=9? "0"+update.getHours(): update.getHours())}:{(update.getMinutes()<=9? "0"+update.getMinutes(): update.getMinutes())} {update.getDate()}/{update.getMonth()}/{update.getFullYear()}</p>
                            <p className={orden.isPaid ? 'paid' : 'pending'}>{(orden.isPaid ? "Orden Pagada" : "Orden pendiente de pago")}</p>
                            <p>Monto total de la orden: {orden.totalPrice}</p>
                        </div>
                    );
                })}

                


            </div>

        
        </div>
    

    
    </div>)

}