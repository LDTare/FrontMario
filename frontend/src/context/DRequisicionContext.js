import React, {createContext, useState, useEffect, useMemo } from "react";
import { DRequisicionService } from "../services/DRequisicionService";
import { LoteService} from "../services/LoteService";
import { ProductoService} from "../services/ProductoService";

export const DRequisicionContext = createContext();

const DeRequisicionContextProvider = (props)=>{
    const dRequisicionService = useMemo(() => new DRequisicionService(), []);
    const loteService = useMemo(() => new LoteService(), []);
    const productoService = useMemo(() => new ProductoService(), []);

    const [dsRequisicion, setDsRequisicion] = useState([]);
    const [lote, setLote] = useState([]);
    const [producto, setProducto] = useState([]);

    const [editDeRequisicion, setEditDeRequisicion] = useState(null);

    useEffect(() => {
        dRequisicionService.readAll().then((data) => setDsRequisicion(data));
        loteService.readAll().then((data) => setLote(data));
        productoService.readAll().then((data) => setProducto(data));
    }, [dRequisicionService, dsRequisicion, loteService, productoService]);

    const createDeRequisicion =(deRequisicion)=>{
        dRequisicionService
            .create(deRequisicion)
            .then((data)=>setDsRequisicion([...dsRequisicion, data]));
    };

    const createSolicitudDeRequisicion =(deRequisicion)=>{
        dRequisicionService
            .createSolicitud(deRequisicion)
            .then((data)=>setDsRequisicion([...dsRequisicion, data]));
    };

    const deleteDeRequisicion =(id)=>{
        dRequisicionService
            .delete(id)
            .then(()=>setDsRequisicion(dsRequisicion.filter((p)=>p.id !== id)));
    };
    
    const findDeRequisicion =(id)=>{
        const dRequisicion = dsRequisicion.find((p)=>p.id === id);
        setEditDeRequisicion(dRequisicion);
    };

    const updateDeRequisicion =(drequisicion)=>{
        dRequisicionService
        .update(drequisicion)
        .then((data)=>
            setDsRequisicion(
                drequisicion.map((p)=>(p.id === drequisicion.id ? data: drequisicion))
            )
        );
        setEditDeRequisicion(null);
    };

    const updateSolicitudDeRequisicion =(drequisicion)=>{
        dRequisicionService
        .updateSolicitud(drequisicion)
        .then((data)=>
            setDsRequisicion(
                drequisicion.map((p)=>(p.id === drequisicion.id ? data: drequisicion))
            )
        );
        setEditDeRequisicion(null);
    };

    return(
        <DRequisicionContext.Provider 
            value={{
                createDeRequisicion,
                createSolicitudDeRequisicion,
                deleteDeRequisicion,
                findDeRequisicion,
                updateDeRequisicion,
                updateSolicitudDeRequisicion,
                editDeRequisicion,
                dsRequisicion,
                lote,
                producto
            }}>
            {props.children}
        </DRequisicionContext.Provider>
    );
};
export default DeRequisicionContextProvider;