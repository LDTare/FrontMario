import React, {useContext, useState, useEffect, useRef} from "react";
import { useNavigate } from "react-router-dom";
import { KardexContext } from "../../context/KardexsContext";
import {Dialog} from "primereact/dialog";
import { Button } from "primereact/button";
import {InputText} from "primereact/inputtext";

import { ConfirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';

const KardexForm =(props) =>{
    const {isVisible, setIsVisible} = props;
    const [isVisibleButton, setIsVisibleButton] = useState(false);
    const [isVisibleDelete, setisVisibleDelete] = useState(false);

    const {
        createKardex,
        deleteKardex,
        editKardex,
        updateKardex
    } = useContext(KardexContext);

    const inicialKardexsState ={
        id:null,
        correlativo:"",
        descripcion:"",
        codigo: "",
        areaDSalud: "",
        dependencia: ""
    };

    const [kardexData, setKardexData] = useState(inicialKardexsState);

    useEffect(() => {
        if (editKardex) 
        {
            setIsVisibleButton(true);
            setKardexData(editKardex);
        }
    }, [editKardex]);

    const updateField = (data, field) =>{
        setKardexData({
            ...kardexData,
            [field]:data
        })
        console.log(kardexData);
    };

    const saveKardex = () => {
        if(kardexData.correlativo===""){
            showInfo();
        }
        else{
            if (!editKardex) {
                createKardex(kardexData);
            } else {
                updateKardex(kardexData);
            }
            retornar();
        }
    };

    const showInfo = () => {
        toast.current.show({severity:'info', summary: 'Mensaje', detail:'Debe de llenar todos los campos requeridos (*)', life: 3000});
    }

    const toast = useRef(null);
    const _deleteKardex = () => {
        if (editKardex) {
            deleteKardex(kardexData.id);
            setKardexData(inicialKardexsState);
            showError();
        }
        retornar();
    };

    const retornar =()=>{
        setKardexData(inicialKardexsState);
        setIsVisible(false);
    };

    const showError = () => {
        toast.current.show({severity:'error', summary: 'Eliminado', detail:'Se ha eliminado con éxito', life: 3000});
    }

    //Navegacion
    const navigate = useNavigate();
    function linkDeKardex (){
        navigate(`/dkardex/${kardexData.id}`)
    }

    function linkDeReporte (){
        navigate(`/suministros/${kardexData.id}`)
    }

    const dialogFooter=(
        <div className="ui-dialog-buttonpane p-clearfix">
            <ConfirmDialog visible={isVisibleDelete} onHide={() => setisVisibleDelete(false)} message="¿Está seguro de eliminar?"
                header="Confirmación de eliminación" icon="pi pi-info-circle" accept={_deleteKardex} reject={retornar} 
                acceptClassName="p-button-danger"
                />
            <Button className="p-button-raised p-button-rounded mb-3 p-button-info" 
                icon="pi pi-times" label="Eliminar"
                onClick={() => setisVisibleDelete(true)}/>
            <Button className="p-button-raised p-button-rounded mb-3 p-button-info"
                label="Guardar" icon="pi pi-check"
                onClick={saveKardex}/>
            <Button label="Ingresar detalle" icon="pi pi-angle-double-right" 
                className="p-button-rounded mb-3" visible={isVisibleButton} onClick={linkDeKardex}/>
            <Button label="Reporte" className="p-button-rounded" visible={isVisibleButton} onClick={linkDeReporte}/>
        </div>
    );

    const clearSelected = () => {
        setIsVisible(false);
        setKardexData(inicialKardexsState);
        setIsVisibleButton(false);
    };

    return(<div>
        <Toast ref={toast}></Toast>
        <Dialog
            visible={isVisible}
            modal={true}
            style={{width:"420px"}}
            contentStyle={{overflow:"visible"}}
            header = "Detalles del kardex"
            onHide={()=>clearSelected()}
            footer={dialogFooter}
        >
            <div className="p-grid p-fluid">
                <br/>
                <div className="p-float-label">
                    <InputText
                        value={kardexData.correlativo}
                        onChange={(e)=>updateField(e.target.value.trim(), "correlativo")}
                    />
                    <label>Correlativo*</label>
                </div>
                <br/>
                <div className="p-float-label">
                    <InputText
                        value={kardexData.descripcion}
                        onChange={(e)=>updateField(e.target.value, "descripcion")}
                    />
                    <label>Descripción</label>
                </div>
                <br/>
                <div className="p-float-label">
                    <InputText
                        value={kardexData.codigo}
                        onChange={(e)=>updateField(e.target.value.trim(), "codigo")}
                    />
                    <label>Código</label>
                </div>
            </div>
        </Dialog>
    </div>);
}

export default KardexForm;