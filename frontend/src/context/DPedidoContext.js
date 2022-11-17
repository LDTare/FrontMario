import React, {createContext, useState, useEffect, useMemo } from "react";
import { DPedidoService } from "../services/DPedidoService";
import { ProductoService} from "../services/ProductoService";

export const DPedidoContext = createContext();

const DePedidoContextProvider = (props)=>{
    const dPedidoService = useMemo(() => new DPedidoService(), []);
    const productoService = useMemo(() => new ProductoService(), []);

    const [dsPedido, setDsPedido] = useState([]);
    const [producto, setProducto] = useState([]);

    const [editDePedido, setEditDePedido] = useState(null);

    useEffect(() => {
        dPedidoService.readAll().then((data) => setDsPedido(data));
        productoService.readAll().then((data) => setProducto(data));
    }, [dPedidoService, dsPedido, productoService]);

    const createDePedido =(DePedido)=>{
        dPedidoService
            .create(DePedido)
            .then((data)=>setDsPedido([...dsPedido, data]));
    };

    const deleteDePedido =(id)=>{
        dPedidoService
            .delete(id)
            .then(()=>setDsPedido(dsPedido.filter((p)=>p.id !== id)));
    };
    
    const findDePedido =(id)=>{
        const dPedido = dsPedido.find((p)=>p.id === id);
        setEditDePedido(dPedido);
    };

    const updateDePedido =(dpedido)=>{
        dPedidoService
        .update(dpedido)
        .then((data)=>
            setDsPedido(
                dpedido.map((p)=>(p.id === dpedido.id ? data: dpedido))
            )
        );
        setEditDePedido(null);
    };
    return(
        <DPedidoContext.Provider 
            value={{
                createDePedido,
                deleteDePedido,
                findDePedido,
                updateDePedido,
                editDePedido,
                dsPedido,
                producto
            }}>
            {props.children}
        </DPedidoContext.Provider>
    );
};
export default DePedidoContextProvider;