import React, {useContext, useState, useEffect} from "react";
import { Panel } from "primereact/panel";
import { DataTable } from "primereact/datatable";
import {Column} from 'primereact/column';
import {InputText} from "primereact/inputtext";
import {Button} from 'primereact/button';
import { FilterMatchMode} from 'primereact/api';
import { Toolbar } from 'primereact/toolbar';
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RequisicionContext } from "../../context/RequisicionContext";
import RequisicionForm from './Form';

const RequisicionList = () =>{
    const {requisiciones, findRequisicion} = useContext(RequisicionContext);
    const { user: currentUser } = useSelector((state) => state.auth);
    const [isVisible, setIsVisible] = useState(false);

    const date = (requisiciones) => {
        return moment(requisiciones.fecha).format("DD/MM/YYYY");
    }
    const statusAprovado = (requisiciones) => {
        return <span className={`${requisiciones.aprobado ? "activo" : "inactivo"}`}>{requisiciones.aprobado ? " Si " : " No "}</span>;
    }

    const saveRequisicion = (id) => {
        findRequisicion(id);
        setIsVisible(true);
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button className="p-button-raised p-button-rounded mr-2 p-button-info" type="button" icon="pi pi-plus" label="Agregar requisición" 
                onClick={()=>setIsVisible(true)}/>
            </React.Fragment>
        )
    }

    const navigate = useNavigate();
    function linkSolicitante (){
        navigate('/solicitantes')
    }
    function linkServicio (){
        navigate('/servicios')
    }

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Ir a solicitante" icon="pi pi-angle-double-right" className="p-button-rounded mr-2" onClick={linkSolicitante}/>
                <Button label="Ir a servicio" icon="pi pi-angle-double-right" className="p-button-rounded p-toolbar-separator mr-2" onClick={linkServicio}/>
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
        <Toolbar className="mr-2" left={leftToolbarTemplate} right={currentUser.rol !== "Usuario" && rightToolbarTemplate}></Toolbar>
        <Panel
            header="Listado de requisiciones" sortField="category" sortOrder={-1} responsiveLayout="scroll" 
            style={{ textAlign: "justify" }}
        >
            <div>
            <DataTable 
                value={requisiciones}
                responsiveLayout="scroll"
                selectionMode="single"
                onSelectionChange={(e) => saveRequisicion(e.value.id)}
                paginator className="p-datatable-customers" showGridlines rows={10}
                dataKey="id" filters={filters1} filterDisplay="menu"
                globalFilterFields={['id', 'Encargado', 'Servicio', 'Solicitante', date, 'categoria', 'codigoAprobacion', 'aprovado']} 
                header={header1} emptyMessage="No se encontraron requisiciones."
                >
                <Column field="id" header="No." sortable/>
                <Column field="Encargado" header="Encargado" sortable/>
                <Column field="Servicio" header="Servicio" sortable/>
                <Column field="Solicitante" header="Solicitante" sortable/>
                <Column body={date} header="Fecha de aprobación" sortable/>
                <Column field="categoria" header="Categoría" sortable/>
                <Column body={statusAprovado} header="Aprobado" sortable/>
            </DataTable>
            </div>
        </Panel>
        <RequisicionForm isVisible={isVisible} setIsVisible={setIsVisible}/>
        </div>
    );
}

export default RequisicionList;