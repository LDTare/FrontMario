import React, {useContext, useState, useEffect} from "react";
import { EjecutorContext } from "../../context/EjecutoresContext";
import { Panel } from "primereact/panel";
import { DataTable } from "primereact/datatable";
import {Column} from 'primereact/column';
import EjecutorForm from './EjecutorForm';
import {InputText} from "primereact/inputtext";
import {Button} from 'primereact/button';
import { FilterMatchMode } from 'primereact/api';
import { Toolbar } from 'primereact/toolbar';
import { useNavigate } from "react-router-dom";

const EjecutorList = () =>{
    const {ejecutores, findEjecutor} = useContext(EjecutorContext);
    
    const statusBodyTemplate = (ejecutores) => {
        return <span className={`${ejecutores.estado ? "activo" : "inactivo"}`}>{ejecutores.estado ? " Activo " : " Inactivo "}</span>;
    }

    const [isVisible, setIsVisible] = useState(false);

    const saveEjecutor = (id) => {
        findEjecutor(id);
        setIsVisible(true);
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button className="p-button-raised p-button-rounded mr-2 p-button-info" type="button" icon="pi pi-plus" label="Agregar ejecutor" 
                onClick={()=>setIsVisible(true)}/>
            </React.Fragment>
        )
    }

    const navigate = useNavigate();
    function linkPedido (){
        navigate('/pedido')
    }

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Regresar a pedido" icon="pi pi-angle-double-left" className="p-button-rounded p-toolbar-separator mr-2" onClick={linkPedido}/>
            </React.Fragment>
        )
    }

    //Filtro
    const [filters1, setFilters1] = useState(null);
    const [globalFilterValue1, setGlobalFilterValue1] = useState('');
    const initFilters1 = () => {
        setFilters1({
            'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
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
            header="Listado de ejecutores" sortField="category" sortOrder={-1} responsiveLayout="scroll" 
            style={{ textAlign: "justify" }}
        >
            <div>
            <DataTable 
                value={ejecutores}
                responsiveLayout="scroll"
                selectionMode="single"
                onSelectionChange={(e) => saveEjecutor(e.value.id)}
                paginator className="p-datatable-customers" showGridlines rows={10}
                dataKey="id" filters={filters1} filterDisplay="menu"
                globalFilterFields={['codigoUE', 'nombreUE', 'solicitanteDepto', 'estado']} header={header1} emptyMessage="No se encontraron ejecutores."
                >
                <Column field="id" header="No." sortable/>
                <Column field="codigoUE" header="Código UE" sortable/>
                <Column field="nombreUE" header="Nombre UE" sortable/>
                <Column field="solicitanteDepto" header="Departamento solicitante" sortable/>
                <Column body={statusBodyTemplate} header="Estado" sortable/>
            </DataTable>
            </div>
        </Panel>
        <EjecutorForm isVisible={isVisible} setIsVisible={setIsVisible}/>
        </div>
    );
}

export default EjecutorList;