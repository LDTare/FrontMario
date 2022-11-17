import React, {createContext, useState, useEffect, useMemo } from "react";
import { AuditoriaService } from "../services/AuditoriaService";

export const AuditoriaContext = createContext();

const ProductContextProvider = (props)=>{
    const auditoriaService = useMemo(() => new AuditoriaService(), []);
    //const productoService = new ProductoService();
    
    const [auditorias, setAuditorias] = useState([]);

    const [editAuditoria, setEditAuditoria] = useState(null);

    useEffect(() => {
        auditoriaService.readAll().then((data) => setAuditorias(data));
        //console.log(productoService);
    }, [auditoriaService, auditorias]);

    const createAuditoria =(auditoria)=>{
        auditoriaService
            .create(auditoria)
            .then((data)=>setAuditorias([...auditorias, data]));
    };

    const deleteAuditoria =(id)=>{
        auditoriaService
            .delete(id)
            .then(()=>setAuditorias(auditorias.filter((p)=>p.id !== id)));
    };
    
    const findAuditoria =(id)=>{
        const auditoria = auditorias.find((p)=>p.id === id);
        setEditAuditoria(auditoria);
    };

    const updateAuditoria =(auditoria)=>{
        auditoriaService
        .update(auditoria)
        .then((data)=>
            setAuditorias(
                auditoria.map((p)=>(p.id === auditoria.id ? data: auditoria))
            )
        );
        setEditAuditoria(null);
    };
    return(
        <AuditoriaContext.Provider 
            value={{
                createAuditoria,
                deleteAuditoria,
                findAuditoria,
                updateAuditoria,
                editAuditoria,
                auditorias,
            }}>
            {props.children}
        </AuditoriaContext.Provider>
    );
};
export default ProductContextProvider;