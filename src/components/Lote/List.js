import React, {useContext, useState, useEffect} from "react";
import { LoteContext } from "../../context/LoteContext";
import { Panel } from "primereact/panel";
import { DataTable } from "primereact/datatable";
import {Column} from 'primereact/column';
import LoteForm from './Form';
import {InputText} from "primereact/inputtext";
import {Button} from 'primereact/button';
import { FilterMatchMode} from 'primereact/api';
import { Toolbar } from 'primereact/toolbar';
import moment from "moment";
import { Sidebar } from 'primereact/sidebar';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
//import emailjs from '@emailjs/browser';
import { useNavigate } from "react-router-dom";
//import ApiKey from '../../ApiKey';

const LoteList = () =>{
    const {lotes, findLote, rojo, amarillo} = useContext(LoteContext); 
    const [isVisible, setIsVisible] = useState(false);
    const [sidebarVisible, setSidebarVisible] = useState(false);

    const navigate = useNavigate();
    const dateIngreso = (lotes) => {
        return moment(lotes.fechaIngreso).format("DD/MM/YYYY");
    }
    const dateCaducidad = (lotes) => {
        return moment(lotes.fechaCad).format("DD/MM/YYYY");
    }
    const datePrefConsumo = (lotes) => {
        return moment(lotes.fechaConPref).format("DD/MM/YYYY");
    }
    const statusBodyTemplate = (lotes) => {
        if(lotes.estado==="Ingreso")
            return <span className="ingreso">Ingreso</span>;
        else if(lotes.estado==="En uso")
            return <span className="enUso">En uso</span>;
        else if(lotes.estado==="Finalizado")
            return <span className="finalizado">Finalizado</span>;
    }
    const semaforo=(lotes)=>{
        if(lotes.estado!=="Finalizado")
        {
            let today = new Date();
            let fecha2 = new Date(lotes.fechaCad);
            let now = new Date(today.toLocaleDateString('en-US'));
            var months;
            months = (fecha2.getFullYear() - now.getFullYear()) * 12; 
            months -= now.getMonth();
            months += fecha2.getMonth();
            if(months<0)
                return <span className="finalizado">U. vencidas</span>
            else if(months<=6)
                return <span className="inactivo">Faltan: {months}</span>
            else if(months>6 && months<=12)
                return <span className="ama">Faltan: {months}</span>
            else if(months>12)
                return <span className="enUso">Faltan: {months}</span>
        }
        else{
            return <span className="finalizado">Terminado</span>;
        }
    }

    function formatNumber(number){
        return new Intl.NumberFormat('en')
            .format(number);
    }
    const montoTotal = (lotes) =>{
        let monto = lotes.cantidad * lotes.precioUnitario;
        monto = formatNumber(monto);
        return monto;
    }
    const precioU = (lotes) => {
        return formatNumber(lotes.precioUnitario);
    }

    const saveLote = (id) => {
        findLote(id);
        setIsVisible(true);
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button className="p-button-raised p-button-rounded mr-2 p-button-info" type="button" icon="pi pi-plus" label="Agregar lote" 
                onClick={()=>setIsVisible(true)}/>
            </React.Fragment>
        )
    }

    function linkProducto (){
        navigate('/producto')
    }
    function linkPresentacion (){
        navigate('/presentacion')
    }
    function linkRemitente (){
        navigate('/remitentes')
    }

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Ir a producto" icon="pi pi-angle-double-right" className="p-button-rounded mr-2" onClick={linkProducto}/>
                <Button label="Ir a presentacion" icon="pi pi-angle-double-right" className="p-button-rounded p-toolbar-separator mr-2" onClick={linkPresentacion}/>
                <Button label="Ir a remitente" icon="pi pi-angle-double-right" className="p-button-rounded p-toolbar-separator mr-2" onClick={linkRemitente}/>
                <Button icon="pi pi-bell" className="p-button-rounded" onClick={(e) => (setSidebarVisible(true))}/>
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
    }, [ ]);
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
            header="Listado de lotes" sortField="category" sortOrder={-1} responsiveLayout="scroll" 
            style={{ textAlign: "justify" }}
        >
            <div>
            <DataTable 
                value={lotes}
                responsiveLayout="scroll"
                selectionMode="single"
                onSelectionChange={(e) => saveLote(e.value.id)}
                paginator className="p-datatable-customers" showGridlines rows={10}
                dataKey="id" filters={filters1} filterDisplay="menu"
                globalFilterFields={['estado','correlativo', 'producto', 'presentacion', 'cantidad', dateCaducidad, datePrefConsumo, 'cantidad', 'existencia', 'precioUnitario', montoTotal]} 
                header={header1} emptyMessage="No se encontraron lotes."
                >
                <Column field="id" header="No." sortable/>
                <Column body={semaforo} header="Semáforo" sortable/>
                <Column body={statusBodyTemplate} header="Estado" sortable/>
                <Column field="correlativo" header="Correlativo" sortable/>
                <Column field="producto" header="Producto" sortable/>
                <Column field="remitente" header="Remitente" sortable/>
                <Column field="presentacion" header="Presentación" sortable/>
                <Column body={dateCaducidad} header="Fecha de caducidad" sortable/>
                <Column body={datePrefConsumo} header="Fecha de preferencia de consumo" sortable/>
                <Column field="cantidad" header="Cantidad inicial" sortable/>
                <Column field="existencia" header="Existencia" sortable/>
                <Column body={precioU} header="Precio unitario" sortable/>
                <Column body={montoTotal} header="Monto total" sortable/>
                <Column body={dateIngreso} header="Fecha de ingreso" sortable/>
            </DataTable>
            </div>
        </Panel>
        <Sidebar visible={sidebarVisible} position="right" className="p-sidebar-md"  onHide={() => setSidebarVisible(false)}>
            <Card title="Próximos a vencer" style={{ width: '35rem', marginBottom: '2em', backgroundColor: '#FF9696'}}>
                <p className="m-0" style={{lineHeight: '1.5'}}>Listado de lotes menos de 6 meses</p>
                <DataTable 
                    value={rojo}
                    responsiveLayout="scroll"
                    selectionMode="single"
                    paginator className="p-datatable-customers" showGridlines rows={5}
                    >
                    <Column field="correlativo" header="Correlativo" sortable/>
                    <Column field="difMeses" header="Meses" sortable/>
                    <Column field="estado" header="Estado" sortable/>
                </DataTable>
            </Card>
            <Divider type="dashed" />
            <Card title="Próximos a vencer" style={{ width: '35rem', marginBottom: '2em', backgroundColor: '#FCFF96'}}>
                <p className="m-0" style={{lineHeight: '1.5'}}>Listado de lotes entre 6 y 12 meses</p>
                <DataTable 
                    value={amarillo}
                    responsiveLayout="scroll"
                    selectionMode="single"
                    paginator className="p-datatable-customers" showGridlines rows={5}
                    >
                    <Column field="correlativo" header="Correlativo" sortable/>
                    <Column field="difMeses" header="Meses" sortable/>
                    <Column field="estado" header="Estado" sortable/>
                </DataTable>
            </Card>
        </Sidebar>
        <LoteForm isVisible={isVisible} setIsVisible={setIsVisible}/>
        </div>
    );
}

export default LoteList;