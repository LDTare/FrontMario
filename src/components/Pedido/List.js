import React, {useContext, useState, useEffect} from "react";
import { PedidoContext } from "../../context/PedidoContext";
import { Panel } from "primereact/panel";
import { DataTable } from "primereact/datatable";
import {Column} from 'primereact/column';
import PedidoForm from './Form';
import {InputText} from "primereact/inputtext";
import {Button} from 'primereact/button';
import { FilterMatchMode} from 'primereact/api';
import { Toolbar } from 'primereact/toolbar';
import moment from "moment";

import { useNavigate } from "react-router-dom";


const PedidoList = () =>{
    const {pedidos, findPedido} = useContext(PedidoContext);

    const [isVisible, setIsVisible] = useState(false);

    const dateSolicitud = (pedidos) => {
        return moment(pedidos.fechaSolicitud).format("L");
    }
    const statusBodyTemplate = (pedidos) => {
        return <span className={`${pedidos.estado ? "activo" : "inactivo"}`}>{pedidos.estado ? " Activo " : " Inactivo "}</span>;
    }

    const savePedido = (id) => {
        findPedido(id);
        setIsVisible(true);
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button className="p-button-raised p-button-rounded mr-2 p-button-info" type="button" icon="pi pi-plus" label="Agregar pedido" 
                onClick={()=>setIsVisible(true)}/>
            </React.Fragment>
        )
    }

    const navigate = useNavigate();
    function linkSolicitante (){
        navigate('/solicitantes')
    }
    function linkEjecutor (){
        navigate('/ejecutores')
    }

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Ir a solicitante" icon="pi pi-angle-double-right" className="p-button-rounded mr-2" onClick={linkSolicitante}/>
                <Button label="Ir a ejecutor" icon="pi pi-angle-double-right" className="p-button-rounded p-toolbar-separator mr-2" onClick={linkEjecutor}/>
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
            header="Listado de pedidos" sortField="category" sortOrder={-1} responsiveLayout="scroll" 
            style={{ textAlign: "justify" }}
        >
            <div>
            <DataTable 
                value={pedidos}
                responsiveLayout="scroll"
                selectionMode="single"
                onSelectionChange={(e) => savePedido(e.value.id)}
                paginator className="p-datatable-customers" showGridlines rows={10}
                dataKey="id" filters={filters1} filterDisplay="menu"
                globalFilterFields={['nombreUE', 'nombre', 'correlativoUE', 'telefonoExt', dateSolicitud, 'justificacion_Observacion', 'montoTotal', 'estado']} 
                header={header1} emptyMessage="No se encontraron lotes."
                >
                <Column field="id" header="No." sortable/>
                <Column field="nombreUE" header="Ejecutor" sortable/>
                <Column field="nombre" header="Solicitante" sortable/>
                <Column field="correlativoUE" header="Correlativo" sortable/>
                <Column body={dateSolicitud} header="Fecha de solicitud" sortable/>
                <Column field="telefonoExt" header="Teléfono / Extensión" sortable/>
                <Column field="justificacion_Observacion" header="Justificación / Observación" sortable/>
                <Column field="montoTotal" header="Monto total" sortable/>
                <Column body={statusBodyTemplate} header="Estado" sortable/>
            </DataTable>
            </div>
        </Panel>
        <PedidoForm isVisible={isVisible} setIsVisible={setIsVisible}/>
        </div>
    );
}

export default PedidoList;