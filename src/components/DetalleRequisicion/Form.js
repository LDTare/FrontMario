import React, {useContext, useState, useEffect, useRef} from "react";
import {Dialog} from "primereact/dialog";
import { Button } from "primereact/button";
import {InputText} from "primereact/inputtext";
import {InputNumber} from "primereact/inputnumber";
import { Dropdown } from 'primereact/dropdown';

import { ConfirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';

import { DRequisicionContext } from "../../context/DRequisicionContext";

const Form =(props) =>{
    const {idr, isVisible, setIsVisible} = props;
    const [isVisibleDelete, setisVisibleDelete] = useState(false);

    const {
        createSolicitudDeRequisicion,
        deleteDeRequisicion,
        editDeRequisicion,
        updateSolicitudDeRequisicion,
        producto
    } = useContext(DRequisicionContext);
    
    const inicialDRequisicionState ={
        id:null,
        idRequisicion: idr,
        idProducto: 0,
        idLote: 0,
        descripcion: "",
        cantidad: 0,
        cantidaDespachada: 0,
        precioUnitario: 0,
        precioTotal: 0
    };

    const [dRequisicionData, setdRequisicionData] = useState(inicialDRequisicionState);

    useEffect(() => {
        if (editDeRequisicion) setdRequisicionData(editDeRequisicion);
    }, [editDeRequisicion]);

    const updateField = (data, field) =>{
        setdRequisicionData({
            ...dRequisicionData,
            [field]:data
        })
    };

    const saveDRequisicion = () => {
        if(dRequisicionData.idProducto===0 || dRequisicionData.cantidad===0){
            showInfo();
        }
        else{
            if (!editDeRequisicion) {
                createSolicitudDeRequisicion(dRequisicionData);
            } else {
                updateSolicitudDeRequisicion(dRequisicionData);
            }
            retornar();
        }
    };
    const showInfo = () => {
        toast.current.show({severity:'info', summary: 'Mensaje', detail:'Debe de llenar todos los campos requeridos (*)', life: 3000});
    }

    const toast = useRef(null);

    const _deleteDRequisicion = () => {
        if (editDeRequisicion) {
            deleteDeRequisicion(dRequisicionData.id);
            setdRequisicionData(inicialDRequisicionState);
            showError();
        }
        retornar();
    };

    const retornar =()=>{
        setdRequisicionData(inicialDRequisicionState);
        setIsVisible(false);
    };

    const showError = () => {
        toast.current.show({severity:'error', summary: 'Eliminado', detail:'Se ha eliminado con éxito', life: 3000});
    }

    const dialogFooter=(
        <div className="ui-dialog-buttonpane p-clearfix">
            <ConfirmDialog visible={isVisibleDelete} onHide={() => setisVisibleDelete(false)} message="¿Está seguro de eliminar?"
                header="Confirmación de eliminación" icon="pi pi-info-circle" accept={_deleteDRequisicion} reject={retornar} 
                acceptClassName="p-button-danger"
                />
            <Button className="p-button-raised p-button-rounded mb-3 p-button-info" 
                icon="pi pi-times" label="Eliminar"
                onClick={() => setisVisibleDelete(true)}/>
            <Button className="p-button-raised p-button-rounded mb-3 p-button-info"
                label="Guardar" icon="pi pi-check"
                onClick={saveDRequisicion}/>
        </div>
    );

    const clearSelected = () => {
        setIsVisible(false);
        setdRequisicionData(inicialDRequisicionState);
    };

    return(<div>
        <Toast ref={toast}></Toast>
        <Dialog
            visible={isVisible}
            modal={true}
            style={{width:"430px", overflow:"scroll"}}
            contentStyle={{overflow:"visible"}}
            header = "Formulario"
            onHide={()=>clearSelected()}
            footer={dialogFooter}
        >
            <div className="p-grid p-fluid">
                <br/>
                <div className="p-float-label">
                    <Dropdown value={dRequisicionData.idProducto} options={producto} optionLabel="nombre" optionValue="id" 
                    onChange={(e) => updateField(e.target.value, "idProducto")} filter showClear filterBy="nombre" placeholder="Seleccione un producto"/>
                    <label>Producto*</label>
                </div><br />
                <div className="p-float-label">
                    <InputNumber
                        value={dRequisicionData.cantidad}
                        onChange={(e)=>updateField(e.value, "cantidad")}
                        locale="en-US"
                    />
                    <label>Cantidad solicitada*</label>
                </div><br />
                <div className="p-float-label">
                    <InputText
                        value={dRequisicionData.descripcion}
                        onChange={(e)=>updateField(e.target.value, "descripcion")}
                    />
                    <label>Descripción</label>
                </div>
            </div>
        </Dialog>
    </div>);
}

export default Form;