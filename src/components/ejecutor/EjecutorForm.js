import React, {useContext, useState, useEffect, useRef} from "react";
import { EjecutorContext } from "../../context/EjecutoresContext";
import {Dialog} from "primereact/dialog";
import { Button } from "primereact/button";
import {InputText} from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';

const EjecutorForm =(props) =>{
    const {isVisible, setIsVisible} = props;
    const [isVisibleDelete, setisVisibleDelete] = useState(false);

    const {
        createEjecutor,
        deleteEjecutor,
        editEjecutor,
        updateEjecutor
    } = useContext(EjecutorContext);

    const inicialEjecutoresState ={
        id:null,
        codigoUE:"",
        nombreUE: "",
        solicitanteDepto:"",
        estado:1
    };

    const estados = [
        {label: 'Activo', value: 1},
        {label: 'Inactivo', value: 0}
    ];

    const [ejecutorData, setEjecutorData] = useState(inicialEjecutoresState);

    useEffect(() => {
        if (editEjecutor) setEjecutorData(editEjecutor);
    }, [editEjecutor]);

    const updateField = (data, field) =>{
        setEjecutorData({
            ...ejecutorData,
            [field]:data
        })
        console.log(ejecutorData);
    };

    const saveEjecutor = () => {
        if(ejecutorData.codigoUE==="" || ejecutorData.nombreUE==="" || ejecutorData.solicitanteDepto===""){
            showInfo();
        }
        else{
            if (!editEjecutor) {
                createEjecutor(ejecutorData);
            } else {
                updateEjecutor(ejecutorData);
            }
            retornar();
        }
    };
    const showInfo = () => {
        toast.current.show({severity:'info', summary: 'Mensaje', detail:'Debe de llenar todos los campos requeridos (*)', life: 3000});
    }

    
    const toast = useRef(null);

    const _deleteEjecutor = () => {
        if (editEjecutor) {
            deleteEjecutor(ejecutorData.id);
            setEjecutorData(inicialEjecutoresState);
            showError();
        }
        retornar();
    };

    const retornar =()=>{
        setEjecutorData(inicialEjecutoresState);
        setIsVisible(false);
    };

    const showError = () => {
        toast.current.show({severity:'error', summary: 'Eliminado', detail:'Se ha eliminado con éxito', life: 3000});
    }

    const dialogFooter=(
        <div className="ui-dialog-buttonpane p-clearfix">
            <ConfirmDialog visible={isVisibleDelete} onHide={() => setisVisibleDelete(false)} message="¿Está seguro de eliminar?"
                header="Confirmación de eliminación" icon="pi pi-info-circle" accept={_deleteEjecutor} reject={retornar} 
                acceptClassName="p-button-danger"
                />
            <Button className="p-button-raised p-button-rounded mb-3 p-button-info" 
                icon="pi pi-times" label="Eliminar"
                onClick={() => setisVisibleDelete(true)}/>
            <Button className="p-button-raised p-button-rounded mb-3 p-button-info"
                label="Guardar" icon="pi pi-check"
                onClick={saveEjecutor}/>
        </div>
    );

    const clearSelected = () => {
        setIsVisible(false);
        setEjecutorData(inicialEjecutoresState);
    };

    return(<div>
        <Toast ref={toast}></Toast>
        <Dialog
            visible={isVisible}
            modal={true}
            style={{width:"420px"}}
            contentStyle={{overflow:"visible"}}
            header = "Detalles de ejecutores"
            onHide={()=>clearSelected()}
            footer={dialogFooter}
        >
            <div className="p-grid p-fluid">
                <br/>
                <div className="p-float-label">
                    <InputText
                        value={ejecutorData.codigoUE}
                        onChange={(e)=>updateField(e.target.value, "codigoUE")}
                    />
                    <label>Código UE*</label>
                </div>
                <br/>
                <div className="p-float-label">
                    <InputText
                        value={ejecutorData.nombreUE}
                        onChange={(e)=>updateField(e.target.value, "nombreUE")}
                    />
                    <label>Nombre UE*</label>
                </div>
                <br/>
                <div className="p-float-label">
                    <InputText
                        value={ejecutorData.solicitanteDepto}
                        onChange={(e)=>updateField(e.target.value, "solicitanteDepto")}
                    />
                    <label>Departamento solicitante*</label>
                </div>
                <br />
                <div className="p-float-label">
                        <Dropdown value={ejecutorData.estado} options={estados} onChange={(e) => updateField(e.target.value, "estado")} placeholder="Seleccione un estado"/>
                    <label>Estado</label>
                </div>
            </div>
        </Dialog>
    </div>);
}

export default EjecutorForm;