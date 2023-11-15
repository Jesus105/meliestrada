import React, { useContext } from "react";
import { DataContext } from "../../context/DataProvider";

export const MakeOrder = () =>{

    const value = useContext(DataContext);
    const [payment, setPayment] = value.payment;
    const makeOrder = value.makeOrder;
    const [carrito, setCarrito] = value.carrito;
    const [total] = value.total;

    const toogleFalse = () =>{
        setPayment(false);
    }
    const handleSubmit = (event) => {

        event.preventDefault(); // Evita la recarga de la página al enviar el formulario

        // Obtener los valores de dirección y teléfono del formulario
        const direccion = document.getElementById('direccion').value;
        const telefono = document.getElementById('telefono').value;

        // Llamar a la función makeOrder con los valores obtenidos
        makeOrder(direccion, telefono);

    };


    const message = () =>{
        const direccion = document.getElementById('direccion').value;
        const productos = carrito.map(producto => `${producto.name} Cantidad: ${producto.cantidad} `);


        let mensaje = 'La compra realizada se envia a la dirección: ' + direccion + " y consiste en los siguientes productos: \n" + productos.join("\n") + '\nCon un total de $'+total+' pesos'

        setCarrito([])
        window.open("https://api.whatsapp.com/send?phone=5215563759418&text="+encodeURIComponent(mensaje), "_blank");
    }

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

                    <button type="submit" onClick={handleSubmit}>Hacer pedido</button>
                    <br />
                    <button type="submit" onClick={message}>Confirmar pedido vía whatsapp</button>
                </form>


            </div>

        
        </div>
    

    
    </div>)

}