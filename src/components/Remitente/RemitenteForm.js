import React, {useContext, useState, useEffect, useRef } from "react";
import { RemitenteContext } from "../../context/RemitenteContext";
import {Dialog} from "primereact/dialog";
import { Button } from "primereact/button";
import {InputText} from "primereact/inputtext";
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';


const Form =(props) =>{
    const {isVisible, setIsVisible} = props;
    const [isVisibleDelete, setisVisibleDelete] = useState(false);

    const {
        createRemitente,
        deleteRemitente,
        editRemitente,
        updateRemitente
    } = useContext(RemitenteContext);

    const inicialRemitentesState ={
        id:null,
        nombre:"",
        descripcion:""
    };


    const [remitenteData, setRemitenteData] = useState(inicialRemitentesState);

    useEffect(() => {
        if (editRemitente) setRemitenteData(editRemitente);
    }, [editRemitente]);

    const updateField = (data, field) =>{
        setRemitenteData({
            ...remitenteData,
            [field]:data
        })
        console.log(remitenteData);
    };

    const saveRemitente = () => {
        if(remitenteData.nombre===""){
            showInfo();
        }
        else{
            if (!editRemitente) {
                createRemitente(remitenteData);
            } else {
                updateRemitente(remitenteData);
            }
            setRemitenteData(inicialRemitentesState);
            setIsVisible(false);
        }
    };

    const showInfo = () => {
        toast.current.show({severity:'info', summary: 'Mensaje', detail:'Debe de llenar todos los campos requeridos (*)', life: 3000});
    }

    const toast = useRef(null);
    const _deleteRemitente = () => {
        if (editRemitente) {
            deleteRemitente(remitenteData.id);
            setRemitenteData(inicialRemitentesState);
            showError();
        }
        retornar();
    };

    const retornar =()=>{
        setRemitenteData(inicialRemitentesState);
        setIsVisible(false);
    };

    const showError = () => {
        toast.current.show({severity:'error', summary: 'Eliminado', detail:'Se ha eliminado con éxito', life: 3000});
    }

    const dialogFooter=(
        <div className="ui-dialog-buttonpane p-clearfix">
            <ConfirmDialog visible={isVisibleDelete} onHide={() => setisVisibleDelete(false)} message="¿Está seguro de eliminar?"
                header="Confirmación de eliminación" icon="pi pi-info-circle" accept={_deleteRemitente} reject={retornar} 
                acceptClassName="p-button-danger"
                />
            <Button className="p-button-raised p-button-rounded mb-3 p-button-info" 
                onClick={() => setisVisibleDelete(true)} 
                icon="pi pi-times" label="Eliminar" />
            <Button className="p-button-raised p-button-rounded mb-3 p-button-info"
                label="Guardar" icon="pi pi-check"
                onClick={saveRemitente}/>
        </div>
    );

    const clearSelected = () => {
        setIsVisible(false);
        setRemitenteData(inicialRemitentesState);
    };

    return(<div>
        <Toast ref={toast}></Toast>
        <Dialog
            visible={isVisible}
            modal={true}
            style={{maxHeight: "800px", width:"420px", overflow:"auto"}}
            contentStyle={{overflow:"visible"}}
            header = "Detalles de remitente"
            onHide={()=>clearSelected()}
            footer={dialogFooter}
        >
            <div className="p-grid p-fluid">
                <br/>
                <div className="p-float-label">
                    <InputText
                        value={remitenteData.nombre}
                        onChange={(e)=>updateField(e.target.value, "nombre")}
                    />
                    <label>Nombre*</label>
                </div>
                <br />
                <div className="p-float-label">
                    <InputText
                        value={remitenteData.descripcion}
                        onChange={(e)=>updateField(e.target.value, "descripcion")}
                    />
                    <label>Descripción</label>
                </div>
            </div>
        </Dialog>
    </div>);
}

export default Form;