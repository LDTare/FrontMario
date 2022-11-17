import React, {useContext, useState, useEffect, useRef} from "react";
import {Dialog} from "primereact/dialog";
import { Button } from "primereact/button";
import {InputText} from "primereact/inputtext";
import {InputNumber} from "primereact/inputnumber";
import { Dropdown } from 'primereact/dropdown';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';

import { DPedidoContext } from "../../context/DPedidoContext";

const Form =(props) =>{
    const {idp, isVisible, setIsVisible} = props;
    const [isVisibleDelete, setisVisibleDelete] = useState(false);

    const {
        createDePedido,
        deleteDePedido,
        editDePedido,
        updateDePedido,
        producto
    } = useContext(DPedidoContext);
    
    const inicialDPedidosState ={
        id:null,
        idPedido: idp,
        idProducto: 0,
        codInsumo:"",
        cantidad: 0,
        cantidadAutorizada: 0,
        descripcion: "",
        renglonAfectado: 0,
        valorEstimado: 0,
        IncluidoPAAC: 0,
        contratoAbierto: 0
    };

    const estados = [
        {label: 'Si', value: 1},
        {label: 'No', value: 0}
    ];

    const [dPedidoData, setdPedidoData] = useState(inicialDPedidosState);

    useEffect(() => {
        if (editDePedido) setdPedidoData(editDePedido);
    }, [editDePedido]);

    const updateField = (data, field) =>{
        setdPedidoData({
            ...dPedidoData,
            [field]:data
        })
    };

    const saveDPedido = () => {
        if(dPedidoData.idProducto===0 || dPedidoData.codInsumo==="" || dPedidoData.cantidad===0 || dPedidoData.renglonAfectado === "" || dPedidoData.valorEstimado === 0){
            showInfo();
        }
        else{
            if (!editDePedido) {
                createDePedido(dPedidoData);
            } else {
                updateDePedido(dPedidoData);
            }
            retornar();
        }
    };

    const showInfo = () => {
        toast.current.show({severity:'info', summary: 'Mensaje', detail:'Debe de llenar todos los campos requeridos (*)', life: 3000});
    }

    const toast = useRef(null);

    const _deleteDPedido = () => {
        if (editDePedido) {
            deleteDePedido(dPedidoData.id);
            setdPedidoData(inicialDPedidosState);
            showError();
        }
        retornar();
    };

    const retornar =()=>{
        setdPedidoData(inicialDPedidosState);
        setIsVisible(false);
    };

    const showError = () => {
        toast.current.show({severity:'error', summary: 'Eliminado', detail:'Se ha eliminado con éxito', life: 3000});
    }

    const dialogFooter=(
        <div className="ui-dialog-buttonpane p-clearfix">
            <ConfirmDialog visible={isVisibleDelete} onHide={() => setisVisibleDelete(false)} message="¿Está seguro de eliminar?"
                header="Confirmación de eliminación" icon="pi pi-info-circle" accept={_deleteDPedido} reject={retornar} 
                acceptClassName="p-button-danger"
                />
            <Button className="p-button-raised p-button-rounded mb-3 p-button-info" 
                icon="pi pi-times" label="Eliminar"
                onClick={() => setisVisibleDelete(true)}/>
            <Button className="p-button-raised p-button-rounded mb-3 p-button-info"
                label="Guardar" icon="pi pi-check"
                onClick={saveDPedido}/>
        </div>
    );

    const clearSelected = () => {
        setIsVisible(false);
        setdPedidoData(inicialDPedidosState);
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
                    <InputNumber
                        value={dPedidoData.cantidad}
                        onChange={(e)=>updateField(e.value, "cantidad")}
                        locale="en-US"
                    />
                    <label>Cantidad solicitada*</label>
                </div><br />
                <div className="p-float-label">
                    <InputNumber
                        value={dPedidoData.cantidadAutorizada}
                        onChange={(e)=>updateField(e.value, "cantidadAutorizada")}
                        locale="en-US"
                    />
                    <label>Cantidad autorizada</label>
                </div><br />
                <div className="p-float-label">
                    <InputText
                        value={dPedidoData.codInsumo}
                        onChange={(e)=>updateField(e.target.value.trim(), "codInsumo")}
                    />
                    <label>Código de insumo*</label>
                </div><br />
                <div className="p-float-label">
                    <Dropdown value={dPedidoData.idProducto} options={producto} optionLabel="nombre" optionValue="id" 
                    onChange={(e) => updateField(e.target.value, "idProducto")} filter showClear filterBy="nombre" placeholder="Seleccione un producto"/>
                    <label>Producto*</label>
                </div><br />
                <div className="p-float-label">
                    <InputText
                        value={dPedidoData.descripcion}
                        onChange={(e)=>updateField(e.target.value, "descripcion")}
                    />
                    <label>Descripción</label>
                </div><br />
                <div className="p-float-label">
                    <InputText
                        value={dPedidoData.renglonAfectado}
                        onChange={(e)=>updateField(e.target.value, "renglonAfectado")}
                    />
                    <label>Renglón afectado*</label>
                </div><br />
                <div className="p-float-label">
                    <InputNumber
                        value={dPedidoData.valorEstimado}
                        onChange={(e)=>updateField(e.value, "valorEstimado")}
                        mode="decimal" locale="en-US" minFractionDigits={2}
                    />
                    <label>Valor estimado*</label>
                </div><br />
                <div className="p-float-label">
                    <Dropdown 
                        value={dPedidoData.IncluidoPAAC} options={estados} 
                        onChange={(e) => updateField(e.target.value, "IncluidoPAAC")}/>
                    <label>Incluido en PAAC</label>
                </div><br />
                <div className="p-float-label">
                    <Dropdown 
                        value={dPedidoData.contratoAbierto} options={estados} 
                        onChange={(e) => updateField(e.target.value, "contratoAbierto")}/>
                    <label>Esta en contrato abierto</label>
                </div>
            </div>
        </Dialog>
    </div>);
}

export default Form;