import React, {useContext, useState, useEffect, useRef} from "react";
import { LoteContext } from "../../context/LoteContext";
import {Dialog} from "primereact/dialog";
import { Button } from "primereact/button";
import {InputText} from "primereact/inputtext";
import {InputNumber} from "primereact/inputnumber";
import { Dropdown } from 'primereact/dropdown';
import {Calendar} from 'primereact/calendar';
import moment from "moment";
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';

const Form =(props) =>{
    const {isVisible, setIsVisible} = props;

    const [isVisibleButton, setIsVisibleButton] = useState(true);
    const [isVisibleDelete, setisVisibleDelete] = useState(false);

    const {
        createLote,
        deleteLote,
        editLote,
        updateLote,
        producto,
        presentacion,
        remitente
    } = useContext(LoteContext);
    
    const inicialLotesState ={
        id:null,
        idProducto: 0,
        correlativo:"",
        fechaCad: "",
        fechaConPref: "",
        cantidad: 0,
        existencia: 0,
        precioUnitario: 0.0,
        idPresentacion: 0,
        idRemitente: 0
    };
    const [loteData, setLoteData] = useState(inicialLotesState);


    useEffect(() => {
        if (editLote) {
            setIsVisibleButton(false);
            setLoteData(editLote);
        }
    }, [editLote]);

    const updateField = (data, field) =>{
        setLoteData({
            ...loteData,
            [field]:data
        })
    };

    const saveLote = () => {
        if(loteData.idProducto===0 || loteData.correlativo==="" || loteData.fechaCad==="" || loteData.fechaConPref==="" || loteData.cantidad===0 || loteData.precioUnitario===0.0 || loteData.idPresentacion===0 || loteData.idRemitente===0 ){
            showInfo();
        }
        else{
            if (!editLote) {
                createLote(loteData);
            } else {
                loteData.fechaCad = moment(loteData.fechaCad).format("YYYY-MM-DD");
                loteData.fechaConPref = moment(loteData.fechaConPref).format("YYYY-MM-DD");
                updateLote(loteData);
            }
            retornar();
        }
    };

    const showInfo = () => {
        toast.current.show({severity:'info', summary: 'Mensaje', detail:'Debe de llenar todos los campos requeridos (*)', life: 3000});
    }

    const toast = useRef(null);

    const _deleteLote = () => {
        if (editLote) {
            deleteLote(loteData.id);
            setLoteData(inicialLotesState);
            showError();
        }
        retornar();
    };

    const retornar =()=>{
        setLoteData(inicialLotesState);
        setIsVisible(false);
    };

    const showError = () => {
        toast.current.show({severity:'error', summary: 'Eliminado', detail:'Se ha eliminado con éxito', life: 3000});
    }


    const dialogFooter=(
        <div className="ui-dialog-buttonpane p-clearfix">
            <ConfirmDialog visible={isVisibleDelete} onHide={() => setisVisibleDelete(false)} message="¿Está seguro de eliminar?"
                header="Confirmación de eliminación" icon="pi pi-info-circle" accept={_deleteLote} reject={retornar} 
                acceptClassName="p-button-danger"
                />
            <Button className="p-button-raised p-button-rounded mb-3 p-button-info" 
                icon="pi pi-times" label="Eliminar"
                onClick={() => setisVisibleDelete(true)}/>
            <Button className="p-button-raised p-button-rounded mb-3 p-button-info"
                label="Guardar" icon="pi pi-check"
                onClick={saveLote}/>
        </div>
    );

    const clearSelected = () => {
        setIsVisible(false);
        setLoteData(inicialLotesState);
        setIsVisibleButton(true);
    };

    return(<div>
        <Toast ref={toast}></Toast>
        <Dialog
            visible={isVisible}
            modal={true}
            style={{width:"430px", overflow:"scroll"}}
            contentStyle={{overflow:"visible"}}
            header = "Detalles del lote"
            onHide={()=>clearSelected()}
            footer={dialogFooter}
        >
            <div className="p-grid p-fluid">
                <br/>
                <div className="p-float-label">
                    <InputText
                        value={loteData.correlativo}
                        onChange={(e)=>updateField(e.target.value.trim(), "correlativo")}
                    />
                    <label>Correlativo*</label>
                </div><br />
                <div className="p-float-label">
                    <Dropdown value={loteData.idProducto} options={producto} optionLabel="nombre" optionValue="id" 
                    onChange={(e) => updateField(e.target.value, "idProducto")} filter showClear filterBy="nombre" placeholder="Seleccione un producto"/>
                    <label>Producto*</label>
                </div><br />
                <div className="p-float-label">
                    <Calendar
                        value={loteData.fechaCad && new Date(loteData.fechaCad + " ")}
                        onChange={(e) => updateField( e.target.value.toISOString().substring(0, 10), "fechaCad")}
                        dateFormat="dd-mm-yy"
                    />
                    <label>Fecha caducidad*</label>
                </div><br />
                <div className="p-float-label">
                    <Calendar
                        value={loteData.fechaConPref && new Date(loteData.fechaConPref + " ")}
                        onChange={(e) => updateField( e.target.value.toISOString().substring(0, 10), "fechaConPref")}
                        dateFormat="dd-mm-yy"
                    />
                    <label>Fecha de consumo de preferencia* </label>
                </div><br />
                <div className="p-float-label">
                    <InputNumber
                        value={loteData.cantidad}
                        onChange={(e)=>updateField(e.value, "cantidad")}
                    />
                    <label>Cantidad*</label>
                </div><br />
                <div className="p-float-label" visible={isVisibleButton}>
                    <InputNumber
                        value={loteData.existencia}
                        onChange={(e)=>updateField(e.value, "existencia")}
                        locale="en-US"
                        disabled={isVisibleButton}
                    />
                    <label >Existencia</label>
                </div><br />
                <div className="p-float-label">
                    <InputNumber
                        value={loteData.precioUnitario}
                        onChange={(e)=>updateField(e.value, "precioUnitario")}
                        mode="decimal" locale="en-US" minFractionDigits={2}
                    />
                    <label>Precio unitario*</label>
                </div><br />
                <div className="p-float-label">
                    <Dropdown value={loteData.idPresentacion} options={presentacion} optionLabel="presentacion" optionValue="id" 
                    onChange={(e) => updateField(e.target.value, "idPresentacion")} filter showClear filterBy="presentacion" placeholder="Seleccione una presentación"/>
                    <label>Presentación*</label>
                </div><br />
                <div className="p-float-label">
                    <Dropdown value={loteData.idRemitente} options={remitente} optionLabel="nombre" optionValue="id" 
                    onChange={(e) => updateField(e.target.value, "idRemitente")} filter showClear filterBy="nombre" placeholder="Seleccione un remitente"/>
                    <label>Remitente*</label>
                </div>
            </div>
        </Dialog>
    </div>);
}

export default Form;