import React, {createContext, useState, useEffect, useMemo } from "react";
import {SolicitanteService} from "../services/SolicitantesService"

export const SolicitanteContext = createContext();

const ProductContextProvider = (props)=>{
    const solicitanteService = useMemo(() => new SolicitanteService(), []);
    
    const [solicitantes, setSolicitantes] = useState([]);

    const [editSolicitante, setEditSolicitante] = useState(null);

    useEffect(() => {
        solicitanteService.readAll().then((data) => setSolicitantes(data));
    }, [solicitanteService, solicitantes]);

    const createSolicitante =(solicitante)=>{
        solicitanteService
            .create(solicitante)
            .then((data)=>setSolicitantes([...solicitante, data]));
    };

    const deleteSolicitante =(id)=>{
        solicitanteService
            .delete(id)
            .then(()=>setSolicitantes(solicitantes.filter((p)=>p.id !== id)));
    };
    
    const findSolicitante =(id)=>{
        const solicitante = solicitantes.find((p)=>p.id === id);
        setEditSolicitante(solicitante);
    };

    const updateSolicitante =(solicitante)=>{
        solicitanteService
        .update(solicitante)
        .then((data)=>
            setSolicitantes(
                solicitante.map((p)=>(p.id === solicitante.id ? data: solicitante))
            )
        );
        setEditSolicitante(null);
    };
    return(
        <SolicitanteContext.Provider 
            value={{
                createSolicitante,
                deleteSolicitante,
                findSolicitante,
                updateSolicitante,
                editSolicitante,
                solicitantes,
            }}>
            {props.children}
        </SolicitanteContext.Provider>
    );
};
export default ProductContextProvider;