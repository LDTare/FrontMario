import React, {createContext, useState, useEffect, useMemo } from "react";
import { DERequisicionService } from "../services/DERequisicionService";

export const DERequisicionContext = createContext();

const ProductContextProvider = (props)=>{
    const derequisicionService = useMemo(() => new DERequisicionService(), []);
    //const productoService = new ProductoService();
    
    const [derequisicions, setDErequisicions] = useState([]);

    const [editDErequisicion, setEditDErequisicion] = useState(null);

    useEffect(() => {
        derequisicionService.readAll().then((data) => setDErequisicions(data));
    }, [derequisicionService, derequisicions]);

    const createDErequisicion =(derequisicion)=>{
        derequisicionService
            .create(derequisicion)
            .then((data)=>setDErequisicions([...derequisicions, data]));
    };

    const deleteDErequisicion =(id)=>{
        derequisicionService
            .delete(id)
            .then(()=>setDErequisicions(derequisicions.filter((p)=>p.id !== id)));
    };
    
    const findDErequisicion =(id)=>{
        const derequisicion = derequisicions.find((p)=>p.id === id);
        setEditDErequisicion(derequisicion);
    };

    const updateDErequisicion =(derequisicion)=>{
        derequisicionService
        .update(derequisicion)
        .then((data)=>
            setDErequisicions(
                derequisicion.map((p)=>(p.id === derequisicion.id ? data: derequisicion))
            )
        );
        setEditDErequisicion(null);
    };
    return(
        <DERequisicionContext.Provider 
            value={{
                createDErequisicion,
                deleteDErequisicion,
                findDErequisicion,
                updateDErequisicion,
                editDErequisicion,
                derequisicions,
            }}>
            {props.children}
        </DERequisicionContext.Provider>
    );
};
export default ProductContextProvider;