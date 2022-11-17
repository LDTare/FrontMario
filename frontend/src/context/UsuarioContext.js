import React, {createContext, useState, useEffect, useMemo } from "react";
import { UsuarioService } from "../services/UsuarioServicio";
import { RolService } from "../services/RolService";
export const UsuarioContext = createContext();

const UsuarioContextProvider = (props) => {
    const usuarioService = useMemo(() => new UsuarioService(), []);
    const rolService = useMemo(() => new RolService(), []);
    const [usuarios, setUsuario] = useState([]);

    const [editUsuario, setEditUsuario] = useState(null);

    const [roles, setRoles] = useState([]);

    useEffect(() => {
        rolService.readAll().then((data) => setRoles(data));
        usuarioService.readAll().then((data) => setUsuario(data));
    }, [rolService, usuarioService]);

    const createUsuario = (usuario) => {
        usuarioService
            .create(usuario)
            .then((data)=>setUsuario([...usuarios, data]));
    };

    const deleteUsuario =(id)=>{
        usuarioService
            .delete(id)
            .then(()=>setUsuario(usuarios.filter((p)=>p.id !== id)));
    };
    
    const findUsuario = (id) =>{
        const usuario = usuarios.find((p)=>p.id === id);
        setEditUsuario(usuario);
    };

    const updateUsuario =(usuario)=>{
        usuarioService
        .update(usuario)
        .then((data)=>
            setUsuario(
                usuarios.map((p)=>(p.id === usuario.id ? data: usuario))
            )
        );
        setEditUsuario(null);
    };
    return(
        <UsuarioContext.Provider 
            value={{
                createUsuario,
                deleteUsuario,
                findUsuario,
                updateUsuario,
                editUsuario,
                roles,
                usuarios,
            }}>
            {props.children}
        </UsuarioContext.Provider>
    );
};
export default UsuarioContextProvider;