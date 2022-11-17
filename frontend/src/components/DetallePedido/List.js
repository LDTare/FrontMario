import React, {useContext, useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Panel } from "primereact/panel";
import { DataTable } from "primereact/datatable";
import {Column} from 'primereact/column';
import {InputText} from "primereact/inputtext";
import {Button} from 'primereact/button';
import { FilterMatchMode} from 'primereact/api';
import { Toolbar } from 'primereact/toolbar';

import DePedidoForm from './Form';
import { DPedidoContext } from "../../context/DPedidoContext";


const DePedidoList = () =>{
    const {dsPedido, findDePedido} = useContext(DPedidoContext);

    const [isVisible, setIsVisible] = useState(false);

    const navigate = useNavigate();
    const { idP } = useParams();

    const statusContrato = (dePedidos) => {
        return <span className={`${dePedidos.contratoAbierto ? "activo" : "inactivo"}`}>{dePedidos.contratoAbierto ? " Si " : " No "}</span>;
    }
    const statusIPaac = (dePedidos) => {
        return <span className={`${dePedidos.IncluidoPAAC ? "activo" : "inactivo"}`}>{dePedidos.IncluidoPAAC ? " Si " : " No "}</span>;
    }

    let cont=0;

    const numero =  () => {
        cont = parseInt(cont) + 1;
        return cont;
    }

    const saveDpedido = (id) => {
        findDePedido(id);
        setIsVisible(true);
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button className="p-button-raised p-button-rounded mr-2 p-button-info" type="button" icon="pi pi-plus" label="Agregar detalle" 
                onClick={()=>setIsVisible(true)}/>
            </React.Fragment>
        )
    }

    function linkPedido (){
        navigate('/pedido')
    }
    
    function linkProducto (){
        navigate('/producto')
    }

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Regresar a pedido" icon="pi pi-angle-double-left" className="p-button-rounded mr-2" onClick={linkPedido}/>
                <Button label="Ir a producto" icon="pi pi-angle-double-right" className="p-button-rounded p-toolbar-separator mr-2" onClick={linkProducto}/>
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
            header="Listado de detalle pedido" sortField="category" sortOrder={-1} responsiveLayout="scroll" 
            style={{ textAlign: "justify" }}
        >
            <div>
            <DataTable 
                value={dsPedido.filter((p)=>p.idPedido === parseInt(idP))}
                responsiveLayout="scroll"
                selectionMode="single"
                onSelectionChange={(e) => saveDpedido(e.value.id)}
                paginator className="p-datatable-customers" showGridlines rows={10}
                dataKey="id" filters={filters1} filterDisplay="menu"
                globalFilterFields={['cantidad', 'cantidadAutorizada', 'codInsumo', 'pedido', 'unidadMedida', 'producto',
                'descripcion', 'renglonAfectado', 'valorEstimado', 'IncluidoPAAC', 'contratoAbierto']}
                header={header1} emptyMessage="No se encontraron detalles del pedido."
                >
                <Column field={numero} header="No."/>
                <Column field="cantidad" header="Cantidad solicitada" sortable/>
                <Column field="cantidadAutorizada" header="Cantidad autorizada" sortable/>
                <Column field="codInsumo" header="Código de insumo" sortable/>
                <Column field="pedido" header="Pedido" sortable/>
                <Column field="unidadMedida" header="Unidad de medida" sortable/>
                <Column field="producto" header="Producto" sortable/>
                <Column field="descripcion" header="Descripcion" sortable/>
                <Column field="renglonAfectado" header="Renglón afectado" sortable/>
                <Column field="valorEstimado" header="Valor estimado" sortable/>
                <Column body={statusIPaac} header="Incluido en PAAC" sortable/>
                <Column body={statusContrato} header="Esta en contrato abierto" sortable/>
            </DataTable>
            </div>
        </Panel>
        <DePedidoForm idp={idP} isVisible={isVisible} setIsVisible={setIsVisible}/>
        </div>
    );
}

export default DePedidoList;