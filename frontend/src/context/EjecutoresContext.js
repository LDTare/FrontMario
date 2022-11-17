import React, {createContext, useState, useEffect, useMemo } from "react";
import {EjecutorService} from "../services/EjecutoresService"

export const EjecutorContext = createContext();

const ProductContextProvider = (props)=>{
    const ejecutorService = useMemo(() => new EjecutorService(), []);
    
    const [ejecutores, setEjecutores] = useState([]);

    const [editEjecutor, setEditEjecutor] = useState(null);

    useEffect(() => {
        ejecutorService.readAll().then((data) => setEjecutores(data));
    }, [ejecutorService, ejecutores]);

    const createEjecutor =(ejecutor)=>{
        ejecutorService
            .create(ejecutor)
            .then((data)=>setEjecutores([...ejecutores, data]));
    };

    const deleteEjecutor =(id)=>{
        ejecutorService
            .delete(id)
            .then(()=>setEjecutores(ejecutores.filter((p)=>p.id !== id)));
    };
    
    const findEjecutor =(id)=>{
        const ejecutor = ejecutores.find((p)=>p.id === id);
        setEditEjecutor(ejecutor);
    };

    const updateEjecutor =(ejecutor)=>{
        ejecutorService
        .update(ejecutor)
        .then((data)=>
            setEjecutores(
                ejecutor.map((p)=>(p.id === ejecutor.id ? data: ejecutor))
            )
        );
        setEditEjecutor(null);
    };
    return(
        <EjecutorContext.Provider 
            value={{
                createEjecutor,
                deleteEjecutor,
                findEjecutor,
                updateEjecutor,
                editEjecutor,
                ejecutores,
            }}>
            {props.children}
        </EjecutorContext.Provider>
    );
};
export default ProductContextProvider;