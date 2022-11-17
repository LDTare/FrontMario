import React, {createContext, useState, useEffect, useMemo } from "react";
import { PresentacionService } from "../services/PresentacionService";

export const PresentacionContext = createContext();

const ProductContextProvider = (props)=>{
    const presentacionService = useMemo(() => new PresentacionService(), []);
    
    const [presentaciones, setPresentaciones] = useState([]);

    const [editPresentacion, setEditPresentacion] = useState(null);

    useEffect(() => {
        presentacionService.readAll().then((data) => setPresentaciones(data));
    }, [presentacionService, presentaciones]);

    const createPresentacion =(presentacion)=>{
        presentacionService
            .create(presentacion)
            .then((data)=>setPresentaciones([...presentaciones, data]));
    };

    const deletePresentacion =(id)=>{
        presentacionService
            .delete(id)
            .then(()=>setPresentaciones(presentaciones.filter((p)=>p.id !== id)));
    };
    
    const findPresentacion = (id) => {
        const presentacion = presentaciones.find((p)=>p.id === id);
        setEditPresentacion(presentacion);
    };

    const updatePresentacion =(presentacion)=>{
        presentacionService
        .update(presentacion)
        .then((data)=>
            setPresentaciones(
                presentacion.map((p)=>(p.id === presentacion.id ? data: presentacion))
            )
        );
        setEditPresentacion(null);
    };
    return(
        <PresentacionContext.Provider 
            value={{
                createPresentacion,
                deletePresentacion,
                findPresentacion,
                updatePresentacion,
                editPresentacion,
                presentaciones,
            }}>
            {props.children}
        </PresentacionContext.Provider>
    );
};
export default ProductContextProvider;