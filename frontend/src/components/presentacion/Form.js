import React, {useContext, useState, useEffect, useRef } from "react";
import { PresentacionContext } from "../../context/PresentacionContext";
import {Dialog} from "primereact/dialog";
import { Button } from "primereact/button";
import {InputText} from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown';

import { ConfirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';


const Form =(props) =>{
    const {isVisible, setIsVisible} = props;
    const [isVisibleDelete, setisVisibleDelete] = useState(false);

    const {
        createPresentacion,
        deletePresentacion,
        editPresentacion,
        updatePresentacion
    } = useContext(PresentacionContext);

    const inicialPresentacionesState ={
        id:null,
        presentacion:"",
        estado:1
    };

    const estados = [
        {label: 'Activo', value: 1},
        {label: 'Inactivo', value: 0}
    ];

    const [presentacionData, setPresentacionData] = useState(inicialPresentacionesState);

    useEffect(() => {
        if (editPresentacion) setPresentacionData(editPresentacion);
    }, [editPresentacion]);

    const updateField = (data, field) =>{
        setPresentacionData({
            ...presentacionData,
            [field]:data
        })
        console.log(presentacionData);
    };

    const savePresentacion = () => {
        if(presentacionData.presentacion===""){
            showInfo();
        }else{
        if (!editPresentacion) {
            createPresentacion(presentacionData);
        } else {
            updatePresentacion(presentacionData);
        }
        setPresentacionData(inicialPresentacionesState);
        setIsVisible(false);}
    };
    const showInfo = () => {
        toast.current.show({severity:'info', summary: 'Mensaje', detail:'Debe de llenar todos los campos requeridos (*)', life: 3000});
    }
    const toast = useRef(null);
    const _deletePresentacion = () => {
        if (editPresentacion) {
            deletePresentacion(presentacionData.id);
            setPresentacionData(inicialPresentacionesState);
            showError();
        }
        retornar();
    };

    const retornar =()=>{
        setPresentacionData(inicialPresentacionesState);
        setIsVisible(false);
    };

    const showError = () => {
        toast.current.show({severity:'error', summary: 'Eliminado', detail:'Se ha eliminado con éxito', life: 3000});
    }

    const dialogFooter=(
        <div className="ui-dialog-buttonpane p-clearfix">
            <ConfirmDialog visible={isVisibleDelete} onHide={() => setisVisibleDelete(false)} message="¿Está seguro de eliminar?"
                header="Confirmación de eliminación" icon="pi pi-info-circle" accept={_deletePresentacion} reject={retornar} 
                acceptClassName="p-button-danger"
                />
            <Button className="p-button-raised p-button-rounded mb-3 p-button-info" 
                onClick={() => setisVisibleDelete(true)} 
                icon="pi pi-times" label="Eliminar" />
            <Button className="p-button-raised p-button-rounded mb-3 p-button-info"
                label="Guardar" icon="pi pi-check"
                onClick={savePresentacion}/>
        </div>
    );

    const clearSelected = () => {
        setIsVisible(false);
        setPresentacionData(inicialPresentacionesState);
    };

    return(<div>
        <Toast ref={toast}></Toast>
        <Dialog
            visible={isVisible}
            modal={true}
            style={{maxHeight: "800px", width:"420px", overflow:"auto"}}
            contentStyle={{overflow:"visible"}}
            header = "Detalles de presentacion"
            onHide={()=>clearSelected()}
            footer={dialogFooter}
        >
            <div className="p-grid p-fluid">
                <br/>
                <div className="p-float-label">
                    <InputText
                        value={presentacionData.presentacion}
                        onChange={(e)=>updateField(e.target.value, "presentacion")}
                    />
                    <label>Nombre*</label>
                </div>
                <br />
                <div className="p-float-label">
                        <Dropdown value={presentacionData.estado} options={estados} onChange={(e) => updateField(e.target.value, "estado")} placeholder="Seleccione un estado"/>
                    <label>Estado</label>
                </div>
            </div>
        </Dialog>
    </div>);
}

export default Form;