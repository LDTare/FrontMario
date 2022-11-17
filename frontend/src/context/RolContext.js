import React, {createContext, useState, useEffect, useMemo } from "react";
import { RolService } from "../services/RolService";

export const RolContext = createContext();

const RolContextProvider = (props) => {
    const rolService = useMemo(() => new RolService(), []);
    
    const [rols, setRol] = useState([]);

    const [editRol, setEditRol] = useState(null);

    useEffect(() => {
        rolService.readAll().then((data) => setRol(data));
        //console.log(productoService);
    }, [rolService, rols]);

    const createRol =(rol)=>{
        rolService
            .create(rol)
            .then((data)=>setRol([...rols, data]));
    };

    const deleteRol = (id) => {
        rolService
            .delete(id)
            .then(()=>setRol(rols.filter((p)=>p.id !== id)));
    };
    
    const findRol =(id)=>{
        const rol = rols.find((p)=>p.id === id);
        setEditRol(rol);
    };

    const updateRol =(rol)=>{
        rolService
        .update(rol)
        .then((data)=>
            setRol(
                rols.map((p)=>(p.id === rol.id ? data: rol))
            )
        );
        setEditRol(null);
    };
    return(
        <RolContext.Provider 
            value={{
                createRol,
                deleteRol,
                findRol,
                updateRol,
                editRol,
                rols,
            }}>
            {props.children}
        </RolContext.Provider>
    );
};
export default RolContextProvider;