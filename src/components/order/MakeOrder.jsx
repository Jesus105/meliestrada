import React, { useContext } from "react";
import { DataContext } from "../../context/DataProvider";

export const MakeOrder = () =>{

    const value = useContext(DataContext);
    const [payment, setPayment] = value.payment;
    const makeOrder = value.makeOrder;
    const [carrito] = value.carrito;
    const [total] = value.total;

    const toogleFalse = () =>{
        setPayment(false);
    }
    const handleSubmit = () => {
        // Obtener los valores de dirección y teléfono del formulario
        const direccion = document.getElementById('direccion').value;
        const telefono = document.getElementById('telefono').value;

        // Llamar a la función makeOrder con los valores obtenidos
        makeOrder(direccion, telefono);

    };


    return (!payment?<></>:
        <div className={"orders"}>
        <div className={"order"}>
            <div className="order_close" onClick={toogleFalse}>
                <box-icon name='x'></box-icon>
            </div>


            <div className="body_order">

   

                <form id="myForm">
                    <label for="direccion">Dirección:</label>
                    <input type="text" id="direccion" name="direccion" required/>

                    <label for="telefono">Teléfono:</label>
                    <input type="tel" id="telefono" name="telefono" pattern="[0-9]{10}" required/>

                    <br />

                    <a href="google.com"><button type="submit" onClick={handleSubmit}>Hacer pedido</button></a>
                </form>


            </div>

        
        </div>
    

    
    </div>)

}