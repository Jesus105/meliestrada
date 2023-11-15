import React, { useContext, useState } from "react";
import { DataContext } from "../../context/DataProvider";

export const Orders = () =>{

    const value = useContext(DataContext);
    const [ordenes] = value.ordenes;

    return (
        <div>

        {
            ordenes.map((orden) =>{
                <p>{orden.id}</p>
            })
        }
    
        </div>
    )


}