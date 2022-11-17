import React, {useContext, useState, useEffect, useRef} from "react";
import { useNavigate } from "react-router-dom";
import { PedidoContext } from "../../context/PedidoContext";
import {Dialog} from "primereact/dialog";
import { Button } from "primereact/button";
import {InputText} from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown';
import {Calendar} from 'primereact/calendar';
import moment from "moment";
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';

const Form =(props) =>{
    const {isVisible, setIsVisible} = props;

    const [isVisibleButton, setIsVisibleButton] = useState(false);
    const [isVisibleDelete, setisVisibleDelete] = useState(false);

    const {
        createPedido,
        deletePedido,
        editPedido,
        updatePedido,
        ejecutor,
        solicitante
    } = useContext(PedidoContext);
    
    const inicialPedidosState ={
        id:null,
        idUE: 0,
        idSolicitante: 0,
        correlativoUE:"",
        fechaSolicitud: "",
        telefonoExt: 0,
        montoTotal: 0.0,
        justificacion_Observacion: 0,
        estado: 0
    };
    const [pedidoData, setPedidoData] = useState(inicialPedidosState);

    const estados = [
        {label: 'Activo', value: 1},
        {label: 'Inactivo', value: 0}
    ];


    useEffect(() => {
        if (editPedido) {
            setIsVisibleButton(true);
            setPedidoData(editPedido);
        }
    }, [editPedido]);

    const updateField = (data, field) =>{
        setPedidoData({
            ...pedidoData,
            [field]:data
        })
    };

    const savePedido = () => {
        if(pedidoData.idUE===0 || pedidoData.idSolicitante===0 || pedidoData.correlativoUE==="" || pedidoData.fechaSolicitud===""){
            showInfo();
        }
        else{
            if (!editPedido) {
                createPedido(pedidoData);
            } else {
                pedidoData.fechaSolicitud = moment(pedidoData.fechaSolicitud).format("YYYY-MM-DD");
                updatePedido(pedidoData);
            }
            retornar();
        }
    };
    const showInfo = () => {
        toast.current.show({severity:'info', summary: 'Mensaje', detail:'Debe de llenar todos los campos requeridos (*)', life: 3000});
    }
    const toast = useRef(null);

    const _deletePedido = () => {
        if (editPedido) {
            deletePedido(pedidoData.id);
            showError();
        }
        retornar();
    };

    const retornar =()=>{
        setPedidoData(inicialPedidosState);
        setIsVisible(false);
    };

    const showError = () => {
        toast.current.show({severity:'error', summary: 'Eliminado', detail:'Se ha eliminado con éxito', life: 3000});
    }

    //Navegacion
    const navigate = useNavigate();
    function linkPedido (){
        navigate(`/dpedido/${pedidoData.id}`)
    }
    function linkPedidoReporte (){
        navigate(`/vista/${pedidoData.id}`)
    }

    const dialogFooter=(
        <div className="ui-dialog-buttonpane p-clearfix">
            <ConfirmDialog visible={isVisibleDelete} onHide={() => setisVisibleDelete(false)} message="¿Está seguro de eliminar?"
                header="Confirmación de eliminación" icon="pi pi-info-circle" accept={_deletePedido} reject={retornar} 
                acceptClassName="p-button-danger"
                />
            <Button className="p-button-raised p-button-rounded mb-3 p-button-info" 
                icon="pi pi-times" label="Eliminar"
                onClick={() => setisVisibleDelete(true)}/>
            <Button className="p-button-raised p-button-rounded mb-3 p-button-info"
                label="Guardar" icon="pi pi-check"
                onClick={savePedido}/>
            <Button label="Ingresar detalle" icon="pi pi-angle-double-right" 
                className="p-button-rounded mb-3" visible={isVisibleButton} onClick={linkPedido}/>
                            <Button label="Ver reporte" icon="pi pi-angle-double-right" 
                className="p-button-rounded mb-3" visible={isVisibleButton} onClick={linkPedidoReporte}/>
        </div>
    );

    const clearSelected = () => {
        setIsVisible(false);
        setPedidoData(inicialPedidosState);
        setIsVisibleButton(false);
    };

    return(<div>
        <Toast ref={toast}></Toast>
        <Dialog
            visible={isVisible}
            modal={true}
            style={{width:"430px", overflow:"scroll"}}
            contentStyle={{overflow:"visible"}}
            header = "Detalles del pedido"
            onHide={()=>clearSelected()}
            footer={dialogFooter}
        >
            <div className="p-grid p-fluid">
                <br/>
                <div className="p-float-label">
                    <Dropdown value={pedidoData.idUE} options={ejecutor} optionLabel="nombreUE" optionValue="id" 
                    onChange={(e) => updateField(e.target.value, "idUE")} filter showClear filterBy="nombreUE" placeholder="Seleccione un ejecutor"/>
                    <label>Ejecutor*</label>
                </div><br />
                <div className="p-float-label">
                    <Dropdown value={pedidoData.idSolicitante} options={solicitante} optionLabel="nombre" optionValue="id" 
                    onChange={(e) => updateField(e.target.value, "idSolicitante")} filter showClear filterBy="nombre" placeholder="Seleccione un solicitante"/>
                    <label>Solicitante*</label>
                </div><br />
                <div className="p-float-label">
                    <InputText
                        value={pedidoData.correlativoUE}
                        onChange={(e)=>updateField(e.target.value.trim(), "correlativoUE")}
                    />
                    <label>CorrelativoUE*</label>
                </div><br />
                <div className="p-float-label">
                    <Calendar
                        value={pedidoData.fechaSolicitud && new Date(pedidoData.fechaSolicitud + " ")}
                        onChange={(e) => updateField( e.target.value.toISOString().substring(0, 10), "fechaSolicitud")}
                        dateFormat="dd-mm-yy"
                    />
                    <label>Fecha de solicitud*</label>
                </div><br />
                <div className="p-float-label">
                    <InputText keyfilter="int"
                        value={pedidoData.telefonoExt}
                        onChange={(e)=>updateField(e.target.value, "telefonoExt")}
                    />
                    <label>Teléfono o extensión</label>
                </div><br />
                <div className="p-float-label">
                    <InputText
                        value={pedidoData.justificacion_Observacion}
                        onChange={(e)=>updateField(e.target.value, "justificacion_Observacion")}
                    />
                    <label>Justificación o observación</label>
                </div><br />
                <div className="p-float-label">
                        <Dropdown value={pedidoData.estado} options={estados} onChange={(e) => updateField(e.target.value, "estado")}/>
                    <label>Estado</label>
                </div>
            </div>
        </Dialog>
    </div>);
}

export default Form;