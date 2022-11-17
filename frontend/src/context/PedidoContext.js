import React, {createContext, useState, useEffect, useMemo } from "react";
import { PedidoService } from "../services/PedidoService";
import { EjecutorService } from "../services/EjecutoresService";
import { SolicitanteService} from "../services/SolicitantesService";

export const PedidoContext = createContext();

const PedidoContextProvider = (props)=>{
    const pedidoService = useMemo(() => new PedidoService(), []);
    const ejecutorService = useMemo(() => new EjecutorService(), []);
    const solicitanteService = useMemo(() => new SolicitanteService(), []);

    const [pedidos, setPedidos] = useState([]);
    const [ejecutor, setEjecutor] = useState([]);
    const [solicitante, setSolicitante] = useState([]);

    const [editPedido, setEditPedido] = useState(null);

    useEffect(() => {
        pedidoService.readAll().then((data) => setPedidos(data));
        ejecutorService.readAll().then((data) => setEjecutor(data));
        solicitanteService.readAll().then((data) => setSolicitante(data));
    }, [pedidoService, pedidos, solicitanteService, ejecutorService]);

    const createPedido =(pedido)=>{
        pedidoService
            .create(pedido)
            .then((data)=>setPedidos([...pedidos, data]));
    };

    const deletePedido =(id)=>{
        pedidoService
            .delete(id)
            .then(()=>setPedidos(pedidos.filter((p)=>p.id !== id)));
    };
    
    const findPedido =(id)=>{
        const pedido = pedidos.find((p)=>p.id === id);
        setEditPedido(pedido);
    };

    const updatePedido =(pedido)=>{
        pedidoService
        .update(pedido)
        .then((data)=>
            setPedidos(
                pedido.map((p)=>(p.id === pedido.id ? data: pedido))
            )
        );
        setEditPedido(null);
    };
    return(
        <PedidoContext.Provider 
            value={{
                createPedido,
                deletePedido,
                findPedido,
                updatePedido,
                editPedido,
                pedidos,
                ejecutor,
                solicitante
            }}>
            {props.children}
        </PedidoContext.Provider>
    );
};
export default PedidoContextProvider;