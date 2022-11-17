import React, {useContext, useState, useEffect, useRef} from "react";
import { useNavigate } from "react-router-dom";
import { useSelector} from "react-redux";
import { RequisicionContext } from "../../context/RequisicionContext";
import {Dialog} from "primereact/dialog";
import { Button } from "primereact/button";
import { Dropdown } from 'primereact/dropdown';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';

const Form =(props) =>{
    const {isVisible, setIsVisible} = props;

    const { user: currentUser } = useSelector((state) => state.auth);

    const [isVisibleButton, setIsVisibleButton] = useState(false);
    const [isVisibleDelete, setisVisibleDelete] = useState(false);
    
    const {
        createRequisicion,
        deleteRequisicion,
        editRequisicion,
        updateRequisicion,
        servicio,
        solicitante
    } = useContext(RequisicionContext);
    
    const inicialRequisicionesState ={
        id:null,
        idUsuarioEncargado: currentUser.id,
        idServicio: 0,
        idSolicitante: 0,
        aprobado: 0,
        categoria:""
    };
    const [requisicionData, setRequisicionData] = useState(inicialRequisicionesState);

    const estados = [
        {label: 'Si', value: 1},
        {label: 'No', value: 0}
    ];
    const categorias = [
        {label: 'Reactivos químicos', value: 'Reactivos Quimicos'},
        {label: 'Productos medicinales', value: 'Productos Medicinales'}
    ];


    useEffect(() => {
        if (editRequisicion) {
            setIsVisibleButton(true);
            setRequisicionData(editRequisicion);
        }
    }, [editRequisicion]);

    const updateField = (data, field) =>{
        setRequisicionData({
            ...requisicionData,
            [field]:data
        })
    };

    const saveRequisicion = () => {
        if(requisicionData.idServicio===0 || requisicionData.idSolicitante===0 || requisicionData.categoria===""){
            showInfo();
        }
        else{
            if (!editRequisicion) {
                createRequisicion(requisicionData);
            } else {
                updateRequisicion(requisicionData);
            }
            setRequisicionData(inicialRequisicionesState);
            setIsVisible(false);
        }
    };
    const showInfo = () => {
        toast.current.show({severity:'info', summary: 'Mensaje', detail:'Debe de llenar todos los campos requeridos (*)', life: 3000});
    }

    const toast = useRef(null);

    const _deleteRequisicion = () => {
        if (editRequisicion) {
            deleteRequisicion(requisicionData.id);
            setRequisicionData(inicialRequisicionesState);
            showError();
        }
        retornar();
    };

    const retornar =()=>{
        setRequisicionData(inicialRequisicionesState);
        setIsVisible(false);
    };

    const showError = () => {
        toast.current.show({severity:'error', summary: 'Eliminado', detail:'Se ha eliminado con éxito', life: 3000});
    }

    //Navegacion
    const navigate = useNavigate();
    function linkRequisicion (){
        navigate(`/drequisicion/${requisicionData.id}`)
    }

    function linkRequisicionReporte (){
        navigate(`/requisicionreporte/${requisicionData.id}`)
    }

    const dialogFooter=(
        <div className="ui-dialog-buttonpane p-clearfix">
            <ConfirmDialog visible={isVisibleDelete} onHide={() => setisVisibleDelete(false)} message="¿Está seguro de eliminar?"
                header="Confirmación de eliminación" icon="pi pi-info-circle" accept={_deleteRequisicion} reject={retornar} 
                acceptClassName="p-button-danger"
                />
            <Button className="p-button-raised p-button-rounded mb-3 p-button-info" 
                onClick={() => setisVisibleDelete(true)} 
                icon="pi pi-times" label="Eliminar" />
            <Button className="p-button-raised p-button-rounded mb-3 p-button-info"
                label="Guardar" icon="pi pi-check"
                onClick={saveRequisicion}/>
            <Button label="Ingresar detalle" icon="pi pi-angle-double-right" 
                className="p-button-rounded mb-3" visible={isVisibleButton} onClick={linkRequisicion}/>
            <Button label="Reporte" icon="pi pi-angle-double-right" 
                className="p-button-rounded mb-3" visible={isVisibleButton} onClick={linkRequisicionReporte}/>
        </div>
    );

    const clearSelected = () => {
        setIsVisible(false);
        setRequisicionData(inicialRequisicionesState);
        setIsVisibleButton(false);
    };

    return(<div>
        <Toast ref={toast}></Toast>
        <Dialog
            visible={isVisible}
            modal={true}
            style={{width:"430px", overflow:"scroll"}}
            contentStyle={{overflow:"visible"}}
            header = "Detalles de requisición"
            onHide={()=>clearSelected()}
            footer={dialogFooter}
        >
            <div className="p-grid p-fluid">
                <br/>
                <div className="p-float-label">
                    <Dropdown value={requisicionData.idServicio} options={servicio} optionLabel="nombre" optionValue="id" 
                    onChange={(e) => updateField(e.target.value, "idServicio")} filter showClear filterBy="nombre" placeholder="Seleccione un servicio"/>
                    <label>Servicio*</label>
                </div><br />
                <div className="p-float-label">
                    <Dropdown value={requisicionData.idSolicitante} options={solicitante} optionLabel="nombre" optionValue="id" 
                    onChange={(e) => updateField(e.target.value, "idSolicitante")} filter showClear filterBy="nombre" placeholder="Seleccione un solicitante"/>
                    <label>Solicitante*</label>
                </div><br />
                <div className="p-float-label">
                    <Dropdown value={requisicionData.categoria} options={categorias} onChange={(e) => updateField(e.target.value, "categoria")}/>
                    <label>Categoría*</label>
                </div><br />
                <div className="p-float-label">
                        <Dropdown value={requisicionData.aprobado} options={estados} onChange={(e) => updateField(e.target.value, "aprobado")}/>
                    <label>Aprobación</label>
                </div>
            </div>
        </Dialog>
    </div>);
}

export default Form;