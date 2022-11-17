import React, {useContext, useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Panel } from "primereact/panel";
import { DataTable } from "primereact/datatable";
import {Column} from 'primereact/column';
import {InputText} from "primereact/inputtext";
import {Button} from 'primereact/button';
import { FilterMatchMode} from 'primereact/api';
import { Toolbar } from 'primereact/toolbar';
import { useSelector } from "react-redux";
import DeRequisicionForm from './Form';
import DeRequisicionFormDespachado from './FormD';
import { DRequisicionContext } from "../../context/DRequisicionContext";


const DeRequisicionList = () =>{
    const { user: currentUser } = useSelector((state) => state.auth);
    const {dsRequisicion, findDeRequisicion} = useContext(DRequisicionContext);

    const [isVisible, setIsVisible] = useState(false);
    const [isVisibleF2, setisVisibleF2] = useState(false);

    const { idR } = useParams();

    let cont=0;

    const numero =  () => {
        cont = parseInt(cont) + 1;
        return cont;
    }

    function visibleForms(bool){
        //setIsVisible(bool);
        setisVisibleF2(bool);
    }

    const saveDRequisicion = (id) => {
        findDeRequisicion(id);
        visibleForms(true);
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button className="p-button-raised p-button-rounded mr-2 p-button-info" type="button" icon="pi pi-plus" label="Agregar detalle" 
                onClick={()=>visibleForms(true)}/>
            </React.Fragment>
        )
    }

    const navigate = useNavigate();
    function linkKardex (){
        navigate('/requisicion')
    }
    function linkProducto (){
        navigate('/lote')
    }
    function linkReporte (){
        navigate(`/requisicionreporte/${idR}`)
    }

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Regresar a requisición" icon="pi pi-angle-double-left" className="p-button-rounded mr-2" onClick={linkKardex}/>
                <Button label="Ir a lote" icon="pi pi-angle-double-right" className="p-button-rounded p-toolbar-separator mr-2" onClick={linkProducto}/>
                <Button label="Generar reporte" icon="pi pi-angle-double-right" className="p-button-rounded p-toolbar-separator mr-2" onClick={linkReporte}/>
            </React.Fragment>
        )
    }

    //Filtro
    const [filters1, setFilters1] = useState(null);
    const [globalFilterValue1, setGlobalFilterValue1] = useState('');
    const initFilters1 = () => {
        setFilters1({
            'global': { value: null, matchMode: FilterMatchMode.CONTAINS }
        });
        setGlobalFilterValue1('');
    }
    const clearFilter1 = () => {
        initFilters1();
    }
    useEffect(() => {
        initFilters1();
    }, []);
    
    const onGlobalFilterChange1 = (e) => {
        const value = e.target.value;
        let _filters1 = { ...filters1 };
        _filters1['global'].value = value;

        setFilters1(_filters1);
        setGlobalFilterValue1(value);
    }
    const renderHeader1 = () => {
        return (
            <div className="flex justify-content-between">
                <Button type="button" icon="pi pi-filter-slash" label="Limpiar" className="p-button-outlined" onClick={clearFilter1} />
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue1} onChange={onGlobalFilterChange1} placeholder="Buscar" />
                </span>
            </div>
        )
    }
    const header1 = renderHeader1();
    return(
        <div>
        <Toolbar className="mr-2" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
        <Panel
            header="Listado de detalle requisición" sortField="category" sortOrder={-1} responsiveLayout="scroll" 
            style={{ textAlign: "justify" }}
        >
            <div>
            <DataTable 
                value={dsRequisicion.filter((p)=>p.Requisicion === parseInt(idR))}
                responsiveLayout="scroll"
                selectionMode="single"
                onSelectionChange={(e) => saveDRequisicion(e.value.id)}
                paginator className="p-datatable-customers" showGridlines rows={10}
                dataKey="id" filters={filters1} filterDisplay="menu"
                globalFilterFields={['Requisicion', 'Lote', 'descripcion', 'cantidad', 'cantidaDespachada', 'precioUnitario', 'precioTotal']} 
                header={header1} emptyMessage="No se encontraron detalles de requisición."
                >
                <Column body={numero} header="No." sortable/>
                <Column field="Requisicion" header="Requisición" sortable/>
                <Column field="Producto" header="Producto" sortable/>
                <Column field="Lote" header="Lote" sortable/>
                <Column field="descripcion" header="Descripción" sortable/>
                <Column field="cantidad" header="Cantidad solicitada" sortable/>
                <Column field="cantidaDespachada" header="Cantidad despachada" sortable/>
                <Column field="precioUnitario" header="Precio unitario" sortable/>
                <Column field="precioTotal" header="Precio total" sortable/>
            </DataTable>
            </div>
        </Panel>
        {currentUser.Rol === 'Administrador' ? (<DeRequisicionForm idr={idR} isVisible={isVisible} setIsVisible={setIsVisible}/>):   
        (<DeRequisicionFormDespachado idr={idR} isVisible={isVisibleF2} setIsVisible={setisVisibleF2}/>)}
        </div>
    );
}

export default DeRequisicionList;