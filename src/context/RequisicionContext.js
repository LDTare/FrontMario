import React, {createContext, useState, useEffect, useMemo } from "react";
import { RequisicionService } from "../services/RequisicionService";
import { ServicioService } from "../services/ServiciosService";
import { SolicitanteService} from "../services/SolicitantesService";

export const RequisicionContext = createContext();

const RequisicionContextProvider = (props)=>{
    const requisicionService = useMemo(() => new RequisicionService(), []);
    const servicioService = useMemo(() => new ServicioService(), []);
    const solicitanteService = useMemo(() => new SolicitanteService(), []);

    const [requisiciones, setRequisiciones] = useState([]);
    const [servicio, setServicio] = useState([]);
    const [solicitante, setSolicitante] = useState([]);

    const [editRequisicion, setEditRequisicion] = useState(null);

    useEffect(() => {
        requisicionService.readAll().then((data) => setRequisiciones(data));
        servicioService.readAll().then((data) => setServicio(data));
        solicitanteService.readAll().then((data) => setSolicitante(data));
    }, [requisicionService, requisiciones, solicitanteService, servicioService]);

    const createRequisicion =(requisicion)=>{
        requisicionService
            .create(requisicion)
            .then((data)=>setRequisiciones([...requisiciones, data]));
    };

    const deleteRequisicion =(id)=>{
        requisicionService
            .delete(id)
            .then(()=>setRequisiciones(requisiciones.filter((p)=>p.id !== id)));
    };
    
    const findRequisicion =(id)=>{
        const requisicion = requisiciones.find((p)=>p.id === id);
        setEditRequisicion(requisicion);
    };

    const updateRequisicion =(requisicion)=>{
        requisicionService
        .update(requisicion)
        .then((data)=>
            setRequisiciones(
                requisicion.map((p)=>(p.id === requisicion.id ? data: requisicion))
            )
        );
        setEditRequisicion(null);
    };
    return(
        <RequisicionContext.Provider 
            value={{
                createRequisicion,
                deleteRequisicion,
                findRequisicion,
                updateRequisicion,
                editRequisicion,
                requisiciones,
                servicio,
                solicitante
            }}>
            {props.children}
        </RequisicionContext.Provider>
    );
};
export default RequisicionContextProvider;