import React, { useContext, useState } from "react";
import { DataContext } from "../../context/DataProvider";

export const MakeOrder = () => {
    const value = useContext(DataContext);
    const [payment, setPayment] = value.payment;
    const makeOrder = value.makeOrder;
    const [carrito, setCarrito] = value.carrito;
    const [total] = value.total;

    const [pickupInStore, setPickupInStore] = value.pickupInStore;

    const toogleFalse = () => {
        setPayment(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const nombre = document.getElementById('nombre');
        const direccion = document.getElementById('direccion');
        const telefono = document.getElementById('telefono');

        // Verificar si los campos obligatorios están llenos
        if (!nombre.value || !direccion.value || !telefono.value) {
            alert("Por favor, complete todos los campos obligatorios.");
            // Resaltar campos faltantes con un borde y texto rojo
            if (!nombre.value) nombre.style.border = "2px solid red";
            if (!direccion.value) direccion.style.border = "2px solid red";
            if (!telefono.value) telefono.style.border = "2px solid red";
            return;
        }

        // Reiniciar estilos a valores predeterminados si los campos están llenos
        nombre.style.border = "1px solid #ccc";
        direccion.style.border = "1px solid #ccc";
        telefono.style.border = "1px solid #ccc";

        // Incluye el valor de pickupInStore al realizar el pedido
        makeOrder(nombre.value, direccion.value, telefono.value, pickupInStore);
    };

    const message = () => {
        const nombre = document.getElementById('nombre');
        const direccion = document.getElementById('direccion').value;
        const productos = carrito.map(producto => `${producto.name} Cantidad: ${producto.cantidad} `);

        let mensaje = `Ordena ${nombre.value}.\nLa compra realizada consiste en los siguientes productos:\n${productos.join("\n")}\nCon un total de $${total} pesos.`;

        if (!pickupInStore) {
            mensaje += `\nLa compra será enviada a la dirección: ${direccion}.`;
        } else {
            mensaje += "\nLa compra será recogida en sucursal.";
        }

        setCarrito([]);
        window.open("https://api.whatsapp.com/send?phone=5215563759418&text=" + encodeURIComponent(mensaje), "_blank");
    };

    return (
        !payment ? <></> :
        <div className={"orders"}>
            <div className={"order"}>
                <div className="order_close" onClick={toogleFalse}>
                    <box-icon name='x'></box-icon>
                </div>

                <div className="body_order">
                    <form id="myForm">
                        <label htmlFor="nombre">Nombre:</label>
                        <input type="text" id="nombre" name="nombre" required/>

                        <label htmlFor="direccion">Dirección:</label>
                        <input type="text" id="direccion" name="direccion" required/>

                        <label htmlFor="telefono">Teléfono:</label>
                        <input type="tel" id="telefono" name="telefono" pattern="[0-9]{10}" required/>

                        <label htmlFor="pickupInStore">Recoger en Sucursal:</label>
                        <input
                            type="checkbox"
                            id="pickupInStore"
                            name="pickupInStore"
                            checked={pickupInStore}
                            onChange={() => setPickupInStore(!pickupInStore)}
                        />

                        <br />

                        <button type="submit" onClick={handleSubmit}>Hacer pedido</button>
                        <br />
                        <button type="submit" onClick={message}>Confirmar pedido vía WhatsApp</button>
                    </form>
                </div>
            </div>
        </div>
    );
};