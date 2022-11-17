import React, {useContext, useState, useEffect, useRef} from "react";
import { ServicioContext } from "../../context/ServiciosContext";
import {Dialog} from "primereact/dialog";
import { Button } from "primereact/button";
import {InputText} from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown';

import { ConfirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';

const ServicioForm =(props) =>{
    const {isVisible, setIsVisible} = props;
    const [isVisibleDelete, setisVisibleDelete] = useState(false);

    const {
        createServicio,
        deleteServicio,
        editServicio,
        updateServicio
    } = useContext(ServicioContext);

    const inicialServiciosState ={
        id:null,
        nombre:"",
        descripcion:"",
        estado:1
    };

    const estados = [
        {label: 'Activo', value: 1},
        {label: 'Inactivo', value: 0}
    ];

    const [servicioData, setServicioData] = useState(inicialServiciosState);

    useEffect(() => {
        if (editServicio) setServicioData(editServicio);
    }, [editServicio]);

    const updateField = (data, field) =>{
        setServicioData({
            ...servicioData,
            [field]:data
        })
        console.log(servicioData);
    };

    const saveServicio = () => {
        if(servicioData.nombre==="" || servicioData.descripcion===""){
            showInfo();
        }
        else{
        if (!editServicio) {
            createServicio(servicioData);
        } else {
            updateServicio(servicioData);
        }
        retornar();}
    };

    const toast = useRef(null);
    const showInfo = () => {
        toast.current.show({severity:'info', summary: 'Mensaje', detail:'Debe de llenar todos los campos requeridos (*)', life: 3000});
    }

    const _deleteServicio = () => {
        if (editServicio) {
            deleteServicio(servicioData.id);
            showError();
        }
        retornar();
    };
    const retornar =()=>{
        setServicioData(inicialServiciosState);
        setIsVisible(false);
    };

    const showError = () => {
        toast.current.show({severity:'error', summary: 'Eliminado', detail:'Se ha eliminado con éxito', life: 3000});
    }

    const dialogFooter=(
        <div className="ui-dialog-buttonpane p-clearfix">
            <ConfirmDialog visible={isVisibleDelete} onHide={() => setisVisibleDelete(false)} message="¿Está seguro de eliminar?"
                header="Confirmación de eliminación" icon="pi pi-info-circle" accept={_deleteServicio} reject={retornar} 
                acceptClassName="p-button-danger"
                />
            <Button className="p-button-raised p-button-rounded mb-3 p-button-info" 
                icon="pi pi-times" label="Eliminar"
                onClick={() => setisVisibleDelete(true)}/>
            <Button className="p-button-raised p-button-rounded mb-3 p-button-info"
                label="Guardar" icon="pi pi-check"
                onClick={saveServicio}/>
        </div>
    );

    const clearSelected = () => {
        setIsVisible(false);
        setServicioData(inicialServiciosState);
    };

    return(<div>
        <Toast ref={toast}></Toast>
        <Dialog
            visible={isVisible}
            modal={true}
            style={{width:"420px"}}
            contentStyle={{overflow:"visible"}}
            header = "Detalles de servicios"
            onHide={()=>clearSelected()}
            footer={dialogFooter}
        >
            <div className="p-grid p-fluid">
                <br/>
                <div className="p-float-label">
                    <InputText
                        value={servicioData.nombre}
                        onChange={(e)=>updateField(e.target.value, "nombre")}
                    />
                    <label>Nombre*</label>
                </div>
                <br/>
                <div className="p-float-label">
                    <InputText
                        value={servicioData.descripcion}
                        onChange={(e)=>updateField(e.target.value, "descripcion")}
                    />
                    <label>Descripción*</label>
                </div>
                <br />
                <div className="p-float-label">
                        <Dropdown value={servicioData.estado} options={estados} onChange={(e) => updateField(e.target.value, "estado")} placeholder="Seleccione un estado"/>
                    <label>Estado</label>
                </div>
            </div>
        </Dialog>
    </div>);
}

export default ServicioForm;