import React, {createContext, useState, useEffect, useMemo } from "react";
import { DKardexService } from "../services/DetalleKardexService";
import { LoteService} from "../services/LoteService";

export const DKardexContext = createContext();

const DeKardexContextProvider = (props)=>{
    const dKardexService = useMemo(() => new DKardexService(), []);
    const loteService = useMemo(() => new LoteService(), []);

    const [dsKardex, setDsKardex] = useState([]);
    const [lote, setLote] = useState([]);

    const [editDeKardex, setEditDeKardex] = useState(null);

    useEffect(() => {
        dKardexService.readAll().then((data) => setDsKardex(data));
        loteService.readAll().then((data) => setLote(data));
    }, [dKardexService, dsKardex, loteService]);

    const createDeKardex =(lote)=>{
        dKardexService
            .create(lote)
            .then((data)=>setDsKardex([...dsKardex, data]));
    };

    const deleteDeKardex =(id)=>{
        dKardexService
            .delete(id)
            .then(()=>setDsKardex(dsKardex.filter((p)=>p.id !== id)));
    };
    
    const findDeKardex =(id)=>{
        const dKardex = dsKardex.find((p)=>p.id === id);
        setEditDeKardex(dKardex);
    };

    const updateDeKardex =(dkardex)=>{
        dKardexService
        .update(dkardex)
        .then((data)=>
            setDsKardex(
                dkardex.map((p)=>(p.id === dkardex.id ? data: dkardex))
            )
        );
        setEditDeKardex(null);
    };
    return(
        <DKardexContext.Provider 
            value={{
                createDeKardex,
                deleteDeKardex,
                findDeKardex,
                updateDeKardex,
                editDeKardex,
                dsKardex,
                lote
            }}>
            {props.children}
        </DKardexContext.Provider>
    );
};
export default DeKardexContextProvider;