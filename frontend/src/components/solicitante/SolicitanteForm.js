import React, {useContext, useState, useEffect, useRef} from "react";
import { SolicitanteContext } from "../../context/SolicitantesContext";
import {Dialog} from "primereact/dialog";
import { Button } from "primereact/button";
import {InputText} from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown';

import { ConfirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';

const SolicitanteForm =(props) =>{
    const {isVisible, setIsVisible} = props;
    const [isVisibleDelete, setisVisibleDelete] = useState(false);

    const {
        createSolicitante,
        deleteSolicitante,
        editSolicitante,
        updateSolicitante
    } = useContext(SolicitanteContext);

    const inicialSolicitantesState ={
        id:null,
        nombre:"",
        cargo:"",
        estado:1
    };

    const estados = [
        {label: 'Activo', value: 1},
        {label: 'Inactivo', value: 0}
    ];

    const [solicitanteData, setSolicitanteData] = useState(inicialSolicitantesState);

    useEffect(() => {
        if (editSolicitante) setSolicitanteData(editSolicitante);
    }, [editSolicitante]);

    const updateField = (data, field) =>{
        setSolicitanteData({
            ...solicitanteData,
            [field]:data
        })
        console.log(solicitanteData);
    };

    const saveSolicitante = () => {
        if(solicitanteData.cargo==="" || solicitanteData.nombre===""){
            showInfo();
        }
        else{
            if (!editSolicitante) {
                createSolicitante(solicitanteData);
            } else {
                updateSolicitante(solicitanteData);
            }
            retornar();
        }
    };

    const showInfo = () => {
        toast.current.show({severity:'info', summary: 'Mensaje', detail:'Debe de llenar todos los campos requeridos (*)', life: 3000});
    }

    const toast = useRef(null);

    const _deleteSolicitante = () => {
        if (editSolicitante) {
            deleteSolicitante(solicitanteData.id);
            showError();
        }
        retornar();
    };

    const retornar =()=>{
        setSolicitanteData(inicialSolicitantesState);
        setIsVisible(false);
    };

    const showError = () => {
        toast.current.show({severity:'error', summary: 'Eliminado', detail:'Se ha eliminado con éxito', life: 3000});
    }

    const dialogFooter=(
        <div className="ui-dialog-buttonpane p-clearfix">
            <ConfirmDialog visible={isVisibleDelete} onHide={() => setisVisibleDelete(false)} message="¿Está seguro de eliminar?"
                header="Confirmación de eliminación" icon="pi pi-info-circle" accept={_deleteSolicitante} reject={retornar} 
                acceptClassName="p-button-danger"
                />
            <Button className="p-button-raised p-button-rounded mb-3 p-button-info" 
                icon="pi pi-times" label="Eliminar"
                onClick={() => setisVisibleDelete(true)}/>
            <Button className="p-button-raised p-button-rounded mb-3 p-button-info"
                label="Guardar" icon="pi pi-check"
                onClick={saveSolicitante}/>
        </div>
    );

    const clearSelected = () => {
        setIsVisible(false);
        setSolicitanteData(inicialSolicitantesState);
    };

    return(<div>
        <Toast ref={toast}></Toast>
        <Dialog
            visible={isVisible}
            modal={true}
            style={{width:"420px"}}
            contentStyle={{overflow:"visible"}}
            header = "Detalles de solicitantes"
            onHide={()=>clearSelected()}
            footer={dialogFooter}
        >
            <div className="p-grid p-fluid">
                <br/>
                <div className="p-float-label">
                    <InputText
                        value={solicitanteData.nombre}
                        onChange={(e)=>updateField(e.target.value, "nombre")}
                    />
                    <label>Nombre*</label>
                </div>
                <br/>
                <div className="p-float-label">
                    <InputText
                        value={solicitanteData.cargo}
                        onChange={(e)=>updateField(e.target.value, "cargo")}
                    />
                    <label>Cargo*</label>
                </div>
                <br />
                <div className="p-float-label">
                    <Dropdown value={solicitanteData.estado} options={estados} onChange={(e) => updateField(e.target.value, "estado")} placeholder="Seleccione un estado"/>
                    <label>Estado</label>
                </div>
            </div>
        </Dialog>
    </div>);
}

export default SolicitanteForm;