import React, { useContext} from "react";
import logo from '../../img/logo.webp'
import { DataContext } from "../../context/DataProvider";
import '../../index.css'
import MenuButton from "./MenuButton";
import Navbar from "./Navbar";


export const Header = () => {

    const value = useContext(DataContext);
    const [menu, setMenu] = value.menu;
    const [carrito] = value.carrito;
    const [categorias] = value.categorias;
    const [categoriaActiva, setCategoriaActiva] = value.categoriaActiva;
    const [order, setOrder] = value.order;
    const [open, setOpen] = value.open;

    const handleClick = () => {
        setOpen(!open);
      };

    const togleCActiva = (id) =>{
        setCategoriaActiva(id)
        console.log(categoriaActiva)
    }

    const toogleMenu = () =>{
        setMenu(!menu);
    }


    const toogleOrder = () =>{
        setOrder(!order);
    }

    return(
        <header>

            <a href="#" className="img-logo">
                <div className="logo">
                    <img src={logo} alt="logo import e-nova" />
                </div>
            </a>

            <ul>
                    <li><a onClick={() => togleCActiva("All")}>Productos</a></li>
                    {
                        categorias.map((categoria) =>{
                            return <li key={categoria.id}><a onClick={() => togleCActiva(categoria.id)}>{categoria.name}</a></li>
                        })
                    }
                    <li><a onClick={toogleOrder}>Mis Compras</a></li>
            </ul>

            <div className="carrito" onClick={toogleMenu}>
                <box-icon name="cart"></box-icon>
                <span className="item-total">
                    {carrito.length}
                </span>
            </div>
        </header>
    )
}