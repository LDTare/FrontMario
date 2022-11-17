import React, {createContext, useState, useEffect, useMemo } from "react";
import {KardexsService} from "../services/KardexsService"

export const KardexContext = createContext();

const ProductContextProvider = (props)=>{
    const kardexService = useMemo(() => new KardexsService(), []);
    
    const [kardexs, setKardexs] = useState([]);

    const [editKardex, setEditKardex] = useState(null);

    useEffect(() => {
        kardexService.readAll().then((data) => setKardexs(data));
    }, [kardexService, kardexs]);

    const createKardex =(kardex)=>{
        kardexService
            .create(kardex)
            .then((data)=>setKardexs([...kardex, data]));
    };

    const deleteKardex =(id)=>{
        kardexService
            .delete(id)
            .then(()=>setKardexs(kardexs.filter((p)=>p.id !== id)));
    };
    
    const findKardex =(id)=>{
        const kardex = kardexs.find((p)=>p.id === id);
        setEditKardex(kardex);
    };

    const updateKardex =(kardex)=>{
        kardexService
        .update(kardex)
        .then((data)=>
            setKardexs(
                kardex.map((p)=>(p.id === kardex.id ? data: kardex))
            )
        );
        setEditKardex(null);
    };
    return(
        <KardexContext.Provider 
            value={{
                createKardex,
                deleteKardex,
                findKardex,
                updateKardex,
                editKardex,
                kardexs,
            }}>
            {props.children}
        </KardexContext.Provider>
    );
};
export default ProductContextProvider;