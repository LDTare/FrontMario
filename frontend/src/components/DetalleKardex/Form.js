import React, {useContext, useState, useEffect, useRef} from "react";
import {Dialog} from "primereact/dialog";
import { Button } from "primereact/button";
import {InputText} from "primereact/inputtext";
import {InputNumber} from "primereact/inputnumber";
import { Dropdown } from 'primereact/dropdown';
import {Calendar} from 'primereact/calendar';
import moment from "moment";
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';

import { DKardexContext } from "../../context/DKardexContext";

const Form =(props) =>{
    const {idk, isVisible, setIsVisible} = props;
    const [isVisibleDelete, setisVisibleDelete] = useState(false);

    const {
        createDeKardex,
        deleteDeKardex,
        editDeKardex,
        updateDeKardex,
        lote
    } = useContext(DKardexContext);
    
    const inicialDKardexsState ={
        id:null,
        idKardex: idk,
        idLote: 0,
        fecha:"",
        nroReferencia: "",
        entradaCantidad: 0,
        salidaCantidad: 0,
        reajusteCantidad: 0,
        saldoCantidad: 0,
        fechaRequisicion: ""
    };
    const [dKardexData, setdKardexData] = useState(inicialDKardexsState);

    useEffect(() => {
        if (editDeKardex) setdKardexData(editDeKardex);
    }, [editDeKardex]);

    const updateField = (data, field) =>{
        setdKardexData({
            ...dKardexData,
            [field]:data
        })
    };

    const saveDKardex = () => {
        if(dKardexData.idLote===0 || dKardexData.nroReferencia==="" || dKardexData.saldoCantidad ===""){
            showInfo();
        }
        else{
            if (!editDeKardex) {
                createDeKardex(dKardexData);
            } else {
                dKardexData.fecha = moment(dKardexData.fecha).format("YYYY-MM-DD");
                dKardexData.fechaRequisicion = moment(dKardexData.fechaRequisicion).format("YYYY-MM-DD");
                updateDeKardex(dKardexData);
            }
            retornar();
        }
    };

    const showInfo = () => {
        toast.current.show({severity:'info', summary: 'Mensaje', detail:'Debe de llenar todos los campos requeridos (*)', life: 3000});
    }

    const toast = useRef(null);
    const _deleteDKardex = () => {
        if (editDeKardex) {
            deleteDeKardex(dKardexData.id);
            showError();
        }
        retornar();
    };

    const retornar =()=>{
        setdKardexData(inicialDKardexsState);
        setIsVisible(false);
    };

    const showError = () => {
        toast.current.show({severity:'error', summary: 'Eliminado', detail:'Se ha eliminado con éxito', life: 3000});
    }

    const dialogFooter=(
        <div className="ui-dialog-buttonpane p-clearfix">
            <ConfirmDialog visible={isVisibleDelete} onHide={() => setisVisibleDelete(false)} message="¿Está seguro de eliminar?"
                header="Confirmación de eliminación" icon="pi pi-info-circle" accept={_deleteDKardex} reject={retornar} 
                acceptClassName="p-button-danger"
                />
            <Button className="p-button-raised p-button-rounded mb-3 p-button-info" 
                icon="pi pi-times" label="Eliminar"
                onClick={() => setisVisibleDelete(true)}/>
            <Button className="p-button-raised p-button-rounded mb-3 p-button-info"
                label="Guardar" icon="pi pi-check"
                onClick={saveDKardex}/>
        </div>
    );

    const clearSelected = () => {
        setIsVisible(false);
        setdKardexData(inicialDKardexsState);
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
                    <Dropdown value={dKardexData.idLote} options={lote} optionLabel="correlativo" optionValue="id" 
                    onChange={(e) => updateField(e.target.value, "idLote")} filter showClear filterBy="correlativo" placeholder="Seleccione un lote"/>
                    <label>Lote*</label>
                </div><br />
                <div className="p-float-label">
                    <Calendar
                        value={dKardexData.fecha && new Date(dKardexData.fecha + " ")}
                        onChange={(e) => updateField( e.target.value.toISOString().substring(0, 10), "fecha")}
                        dateFormat="dd-mm-yy"
                    />
                    <label>Fecha</label>
                </div><br />
                <div className="p-float-label">
                    <InputText
                        value={dKardexData.nroReferencia}
                        onChange={(e)=>updateField(e.target.value.trim(), "nroReferencia")}
                    />
                    <label>Número de referencia*</label>
                </div><br />
                <div className="p-float-label">
                    <InputNumber
                        value={dKardexData.entradaCantidad}
                        onChange={(e)=>updateField(e.value, "entradaCantidad")}
                        locale="en-US"
                    />
                    <label>Cantidad de entrada</label>
                </div><br />
                <div className="p-float-label">
                    <InputNumber
                        value={dKardexData.salidaCantidad}
                        onChange={(e)=>updateField(e.value, "salidaCantidad")}
                        locale="en-US"
                    />
                    <label>Cantidad de salida</label>
                </div><br />
                <div className="p-float-label">
                    <InputNumber
                        value={dKardexData.reajusteCantidad}
                        onChange={(e)=>updateField(e.value, "reajusteCantidad")}
                        locale="en-US"
                    />
                    <label>Reajuste de cantidad</label>
                </div><br />
                <div className="p-float-label">
                    <InputNumber
                        value={dKardexData.saldoCantidad}
                        onChange={(e)=>updateField(e.value, "saldoCantidad")}
                        locale="en-US"
                    />
                    <label>Saldo de cantidad*</label>
                </div><br />
                <div className="p-float-label">
                    <Calendar
                        value={dKardexData.fechaRequisicion && new Date(dKardexData.fechaRequisicion + " ")}
                        onChange={(e) => updateField( e.target.value.toISOString().substring(0, 10), "fechaRequisicion")}
                        dateFormat="dd-mm-yy"
                    />
                    <label>Fecha de requisición</label>
                </div>
            </div>
        </Dialog>
    </div>);
}

export default Form;