import React, {createContext, useState, useEffect, useMemo } from "react";
import { LoteService } from "../services/LoteService";
import { ProductoService} from "../services/ProductoService";
import { PresentacionService} from "../services/PresentacionService";
import { RemitenteService} from "../services/RemitenteService";

export const LoteContext = createContext();

const LoteContextProvider = (props)=>{
    const loteService = useMemo(() => new LoteService(), []);
    const productoService = useMemo(() => new ProductoService(), []);
    const presentacionService = useMemo(() => new PresentacionService(), []);
    const remitenteService = useMemo(() => new RemitenteService(), []);

    const [lotes, setLotes] = useState([]);
    const [rojo, setRojo] = useState([]);
    const [amarillo, setAmarillo] = useState([]);
    const [producto, setProducto] = useState([]);
    const [presentacion, setPresentacion] = useState([]);
    const [remitente, setRemitente] = useState([]);

    const [editLote, setEditLote] = useState(null);

    useEffect(() => {
        loteService.readAll().then((data) => setLotes(data));
        loteService.rojoreadAll().then((data) => setRojo(data));
        loteService.amarilloreadAll().then((data) => setAmarillo(data));
        productoService.readAll().then((data) => setProducto(data));
        presentacionService.readAll().then((data) => setPresentacion(data));
        remitenteService.readAll().then((data) => setRemitente(data));
        
    }, [loteService, lotes, rojo, amarillo, presentacionService, productoService, remitenteService]);

    const createLote =(lote)=>{
        loteService
            .create(lote)
            .then((data)=>setLotes([...lotes, data]));
    };

    const deleteLote =(id)=>{
        loteService
            .delete(id)
            .then(()=>setLotes(lotes.filter((p)=>p.id !== id)));
    };
    
    const findLote =(id)=>{
        const lote = lotes.find((p)=>p.id === id);
        setEditLote(lote);
    };

    const updateLote =(lote)=>{
        loteService
        .update(lote)
        .then((data)=>
            setLotes(
                lote.map((p)=>(p.id === lote.id ? data: lote))
            )
        );
        setEditLote(null);
    };
    return(
        <LoteContext.Provider 
            value={{
                createLote,
                deleteLote,
                findLote,
                updateLote,
                editLote,
                lotes,
                producto,
                presentacion,
                remitente,
                rojo,
                amarillo
            }}>
            {props.children}
        </LoteContext.Provider>
    );
};
export default LoteContextProvider;