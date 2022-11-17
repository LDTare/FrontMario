import React, {useContext, useState, useEffect} from "react";
import { SolicitanteContext } from "../../context/SolicitantesContext";
import { Panel } from "primereact/panel";
import { DataTable } from "primereact/datatable";
import {Column} from 'primereact/column';
import SolicitanteForm from './SolicitanteForm';
import {InputText} from "primereact/inputtext";
import {Button} from 'primereact/button';
import { FilterMatchMode } from 'primereact/api';
import { Toolbar } from 'primereact/toolbar';
import { useNavigate } from "react-router-dom";

const SolicitanteList = () =>{
    const {solicitantes, findSolicitante} = useContext(SolicitanteContext);
    
    const statusBodyTemplate = (solicitantes) => {
        return <span className={`${solicitantes.estado ? "activo" : "inactivo"}`}>{solicitantes.estado ? " Activo " : " Inactivo "}</span>;
    }

    const [isVisible, setIsVisible] = useState(false);

    const saveSolicitante = (id) => {
        findSolicitante(id);
        setIsVisible(true);
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button className="p-button-raised p-button-rounded mr-2 p-button-info" type="button" icon="pi pi-plus" label="Agregar solicitante" 
                onClick={()=>setIsVisible(true)}/>
            </React.Fragment>
        )
    }

    const navigate = useNavigate();
    function linkRequisicion (){
        navigate('/requisicion')
    }
    function linkPedido (){
        navigate('/pedido')
    }

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Regresar a requisición" icon="pi pi-angle-double-left" className="p-button-rounded mr-2" onClick={linkRequisicion}/>
                <Button label="Regresar a pedido" icon="pi pi-angle-double-left" className="p-button-rounded p-toolbar-separator mr-2" onClick={linkPedido}/>
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
            header="Listado de solicitantes" sortField="category" sortOrder={-1} responsiveLayout="scroll" 
            style={{ textAlign: "justify" }}
        >
            <div>
            <DataTable 
                value={solicitantes}
                responsiveLayout="scroll"
                selectionMode="single"
                onSelectionChange={(e) => saveSolicitante(e.value.id)}
                paginator className="p-datatable-customers" showGridlines rows={10}
                dataKey="id" filters={filters1} filterDisplay="menu"
                globalFilterFields={['nombre', 'cargo', 'estado']} header={header1} emptyMessage="No se encontraron solicitantes."
                >
                <Column field="id" header="No." sortable/>
                <Column field="nombre" header="Nombre" sortable/>
                <Column field="cargo" header="Cargo" sortable/>
                <Column body={statusBodyTemplate} header="Estado" sortable/>
            </DataTable>
            </div>
        </Panel>
        <SolicitanteForm isVisible={isVisible} setIsVisible={setIsVisible}/>
        </div>
    );
}

export default SolicitanteList;