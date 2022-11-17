import React, {useContext, useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Panel } from "primereact/panel";
import { DataTable } from "primereact/datatable";
import {Column} from 'primereact/column';
import {InputText} from "primereact/inputtext";
import {Button} from 'primereact/button';
import { FilterMatchMode} from 'primereact/api';
import { Toolbar } from 'primereact/toolbar';
import moment from "moment";

import DeKardexForm from './Form';
import { DKardexContext } from "../../context/DKardexContext";


const DeKardexList = () =>{
    const {dsKardex, findDeKardex} = useContext(DKardexContext);

    const [isVisible, setIsVisible] = useState(false);

    const navigate = useNavigate();
    const { idK } = useParams();

    let cont=0;

    const numero =  () => {
        cont = parseInt(cont) + 1;
        return cont;
    }

    const datefecha = (dkardexs) => {
        return moment(dkardexs.fecha).format("DD/MM/YYYY");
    }
    const dateRequisicion = (dkardexs) => {
        return moment(dkardexs.fechaRequisicion).format("DD/MM/YYYY");
    }

    const saveDkardex = (id) => {
        findDeKardex(id);
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

    function linkKardex (){
        navigate('/kardex')
    }

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Regresar a Kardex" icon="pi pi-angle-double-left" className="p-button-rounded mr-2" onClick={linkKardex}/>
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
            header="Listado de detalle Kardex" sortField="category" sortOrder={-1} responsiveLayout="scroll" 
            style={{ textAlign: "justify" }}
        >
            <div>
            <DataTable 
                value={dsKardex.filter((p)=>p.idKardex === parseInt(idK))}
                responsiveLayout="scroll"
                selectionMode="single"
                onSelectionChange={(e) => saveDkardex(e.value.id)}
                paginator className="p-datatable-customers" showGridlines rows={10}
                dataKey="id" filters={filters1} filterDisplay="menu"
                globalFilterFields={['KardexCorrelativo', 'LoteCorrelativo', datefecha, 'nroReferencia', 'remitente', 'entradaCantidad', 'entradaPrecio', 'salidadPrecio',
                'salidaCantidad', 'reajusteCantidad', 'reajustePrecio', 'saldoCantidad', 'saldoPrecio', dateRequisicion]} 
                header={header1} emptyMessage="No se encontraron detalles de kardex."
                >
                <Column body={numero} header="No." sortable/>
                <Column field="KardexCorrelativo" header="Kardex" sortable/>
                <Column field="LoteCorrelativo" header="Lote" sortable/>
                <Column body={datefecha} header="Fecha" sortable/>
                <Column field="nroReferencia" header="Número de referencia" sortable/>
                <Column field="remitente" header="Remitente" sortable/>
                <Column field="entradaCantidad" header="Entrada cantidad" sortable/>
                <Column field="entradaPrecio" header="Entrada precio" sortable/>
                <Column field="salidaCantidad" header="Salida cantidad" sortable/>
                <Column field="salidadPrecio" header="Salida precio" sortable/>
                <Column field="reajusteCantidad" header="Reajuste cantidad" sortable/>
                <Column field="reajustePrecio" header="Reajuste precio" sortable/>
                <Column field="saldoCantidad" header="Saldo cantidad" sortable/>
                <Column field="saldoPrecio" header="Saldo precio" sortable/>
                <Column body={dateRequisicion} header="Fecha requisición" sortable/>
            </DataTable>
            </div>
        </Panel>
        <DeKardexForm idk={idK} isVisible={isVisible} setIsVisible={setIsVisible}/>
        </div>
    );
}

export default DeKardexList;