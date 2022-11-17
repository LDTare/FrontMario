import React, {useContext, useState, useEffect, useRef} from "react";
import { ProductoContext } from "../../context/ProductoContext";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown';

import { ConfirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';

const ProductoForm=(props)=>{
    const {isVisible, setIsVisible} = props;
    const [isVisibleDelete, setisVisibleDelete] = useState(false);

    const {
        createProducto,
        deleteProducto,
        editProducto,
        updateProducto
    } = useContext(ProductoContext);

    const inicialProductosState ={
        id:null,
        nombre:"",
        unidadMedida:"",
        estado:1
    };

    const estados = [
        {label: 'Activo', value: 1},
        {label: 'Inactivo', value: 0}
    ];

    const [productoData, setProductoData] = useState(inicialProductosState);

    useEffect(() => {
        if (editProducto) setProductoData(editProducto);
    }, [editProducto]);

    const updateField = (data, field) =>{
        setProductoData({
            ...productoData,
            [field]:data
        })
        console.log(productoData);
    };

    const saveProducto = () => {
        if(productoData.unidadMedida==="" || productoData.nombre===""){
            showInfo();
        }
        else{
        if (!editProducto) {
            createProducto(productoData);
        } else {
            updateProducto(productoData);
        }
        retornar();}
    };
    const showInfo = () => {
        toast.current.show({severity:'info', summary: 'Mensaje', detail:'Debe de llenar todos los campos requeridos (*)', life: 3000});
    }
    const toast = useRef(null);

    const _deleteProducto = () => {
        if (editProducto) {
            deleteProducto(productoData.id);
            setProductoData(inicialProductosState);
            showError();
        }
        retornar();
    };

    const retornar =()=>{
        setProductoData(inicialProductosState);
        setIsVisible(false);
    };

    const showError = () => {
        toast.current.show({severity:'error', summary: 'Eliminado', detail:'Se ha eliminado con éxito', life: 3000});
    }

    const dialogFooter=(
        <div className="ui-dialog-buttonpane p-clearfix">
            <ConfirmDialog visible={isVisibleDelete} onHide={() => setisVisibleDelete(false)} message="¿Está seguro de eliminar?"
                header="Confirmación de eliminación" icon="pi pi-info-circle" accept={_deleteProducto} reject={retornar} 
                acceptClassName="p-button-danger"
                />
            <Button className="p-button-raised p-button-rounded mb-3 p-button-info" 
                icon="pi pi-times" label="Eliminar"
                onClick={() => setisVisibleDelete(true)}/>
            <Button className="p-button-raised p-button-rounded mb-3 p-button-info"
                label="Guardar" icon="pi pi-check"
                onClick={saveProducto}/>
        </div>
    );

    const clearSelected = () => {
        setIsVisible(false);
        setProductoData(inicialProductosState);
    };

    return(<div>
        <Toast ref={toast}></Toast>
        <Dialog
            visible={isVisible}
            modal={true}
            style={{width:"420px"}}
            contentStyle={{overflow:"visible"}}
            header = "Detalles del producto"
            onHide={()=>clearSelected()}
            footer={dialogFooter}
        >
            <div className="p-grid p-fluid">
                <br/>
                <div className="p-float-label">
                    <InputText
                        value={productoData.nombre}
                        onChange={(e)=>updateField(e.target.value, "nombre")}
                    />
                    <label>Nombre*</label>
                </div>
                <br />
                <div className="p-float-label">
                    <InputText
                        value={productoData.unidadMedida}
                        onChange={(e)=>updateField(e.target.value, "unidadMedida")}
                    />
                    <label>Unidad de medida*</label>
                </div>
                <br />
                <div className="p-float-label">
                    <Dropdown value={productoData.estado} options={estados} onChange={(e) => updateField(e.target.value, "estado")}/>
                    <label>Estado</label>
                </div>
            </div>
        </Dialog>
    </div>);
}
export default ProductoForm;