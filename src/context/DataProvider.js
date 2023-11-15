import React, { createContext, useState, useEffect } from "react";
import axios from 'axios';


export const DataContext = createContext();


export const DataProvider = (props) =>{
    const [productos, setProductos] = useState([]);
    const [menu, setMenu] = useState(false);
    const [carrito, setCarrito] = useState([]);
    const [total, setTotal] = useState(0);
    const [details, setDetails] = useState(false);
    const [productDetails, setProductDetails] = useState({});
    const [categorias, setCategorias] = useState([]);
    const [categoriaActiva, setCategoriaActiva] = useState('All')
    const [payment, setPayment] = useState(false);
    const [order, setOrder] = useState(false);
    const [ordenes, setOrdenes] = useState([]);



    useEffect(() =>{
      productos.forEach((producto) => (producto.cantidad = 1));
    },[productos])

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('https://ecommerce-admin-eight-vert.vercel.app/api/a268031f-5def-4219-87b8-69c77fcdfbef/products');
            setProductos(response.data);
          } catch (error) {
            console.error('Error al obtener los datos:', error);
          }
        };
    
        fetchData();
      }, []);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('https://ecommerce-admin-eight-vert.vercel.app/api/a268031f-5def-4219-87b8-69c77fcdfbef/categories');
            setCategorias(response.data);
          } catch (error) {
            console.error('Error al obtener los datos:', error);
          }
        };
    
        fetchData();
      }, []);

      const getOrders = (phone) =>{

        fetch('https://ecommerce-admin-eight-vert.vercel.app/api/a268031f-5def-4219-87b8-69c77fcdfbef/orders?=&phone='+phone)
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al obtener los datos');
          }
          return response.json();
        })
        .then(data => {
          // Manejo de los datos obtenidos
          setOrdenes(data)
        })
        .catch(error => {
          // Manejo de errores
          console.error('Error:', error);
        });
      }

    const makeOrder = (dir, tel) =>{
        let idsProductos = carrito.map(function(producto) {
            return producto.id;
        });

        let cantidadProductos = carrito.map(function(producto) {
            return producto.cantidad;
        });

        let order = {
            productIds: idsProductos,
            productsAmount: cantidadProductos,
            phone: tel,
            address: dir,
            totalPrice: total
        }

        fetch("https://ecommerce-admin-eight-vert.vercel.app/api/a268031f-5def-4219-87b8-69c77fcdfbef/checkout", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(order),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then((data) => {
              console.log('Response:', data);
              setCarrito([])

            })
            .catch((error) => {
              console.error('Error:', error);
            });

            if(carrito.length){
                window.alert("Orden enviada de manera exitosa")
            }else{
                window.alert("Se produjo un error, intente nuevamente")
            }

    }

    const addCarrito = (id) => {
        const check = carrito.every(item => {
            return item.id !== id;
        })
        if (check){
            const data = productos.filter(producto =>{
                return producto.id === id
            })
            setCarrito(carrito.concat(data))
        }
        else{
            alert('El producto ya se ha agregado al carrito')   
        }
    }
    
    useEffect(() => {
        const dataCarrito = JSON.parse(localStorage.getItem('carrito'));
        if (Array.isArray(dataCarrito) && dataCarrito.length > 0) {
          setCarrito(dataCarrito);
        }
      }, []);
      

      useEffect(() => {
        localStorage.setItem('carrito', JSON.stringify(carrito));
      }, [carrito]);

      useEffect(() =>{
        const getTotal = () =>{
            const res = carrito.reduce((prev, item) =>{
                return prev + ((item.cantidad >= item.amount_wholesalePrice ? item.wholesalePrice : item.price) * item.cantidad)
            }, 0)
            setTotal(res)
        }

        getTotal()
      }, [carrito])
      
      
    const value = {
        productos : [productos],
        menu: [menu, setMenu],
        addCarrito: addCarrito, 
        carrito: [carrito, setCarrito],
        total: [total, setTotal], 
        details: [details, setDetails],
        productDetails: [productDetails, setProductDetails],
        categorias: [categorias, setCategorias],
        categoriaActiva: [categoriaActiva, setCategoriaActiva],
        payment: [payment, setPayment],
        makeOrder: makeOrder,
        order: [order, setOrder],
        ordenes: [ordenes, setOrdenes],
        getOrders: getOrders
    }

    return (
        <DataContext.Provider value = {value}>
            {props.children}
        </DataContext.Provider>
    )
}