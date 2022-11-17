import React, {createContext, useState, useEffect, useMemo } from "react";
import { RemitenteService } from "../services/RemitenteService";

export const RemitenteContext = createContext();

const ProductContextProvider = (props)=>{
    const remitenteService = useMemo(() => new RemitenteService(), []);
    
    const [remitentes, setRemitentes] = useState([]);

    const [editRemitente, setEditRemitente] = useState(null);

    useEffect(() => {
        remitenteService.readAll().then((data) => setRemitentes(data));
    }, [remitenteService, remitentes]);

    const createRemitente =(remitente)=>{
        remitenteService
            .create(remitente)
            .then((data)=>setRemitentes([...remitentes, data]));
    };

    const deleteRemitente =(id)=>{
        remitenteService
            .delete(id)
            .then(()=>setRemitentes(remitentes.filter((p)=>p.id !== id)));
    };
    
    const findRemitente = (id) => {
        const remitente = remitentes.find((p)=>p.id === id);
        setEditRemitente(remitente);
    };

    const updateRemitente =(remitente)=>{
        remitenteService
        .update(remitente)
        .then((data)=>
            setRemitentes(
                remitente.map((p)=>(p.id === remitente.id ? data: remitente))
            )
        );
        setEditRemitente(null);
    };
    return(
        <RemitenteContext.Provider 
            value={{
                createRemitente,
                deleteRemitente,
                findRemitente,
                updateRemitente,
                editRemitente,
                remitentes,
            }}>
            {props.children}
        </RemitenteContext.Provider>
    );
};
export default ProductContextProvider;