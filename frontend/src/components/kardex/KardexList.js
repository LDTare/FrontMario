import React, {useContext, useState, useEffect} from "react";
import { KardexContext } from "../../context/KardexsContext";
import { Panel } from "primereact/panel";
import { DataTable } from "primereact/datatable";
import {Column} from 'primereact/column';
import KardexForm from './KardexForm';
import {InputText} from "primereact/inputtext";
import {Button} from 'primereact/button';
import { FilterMatchMode } from 'primereact/api';

const KardexList = () =>{
    const {kardexs, findKardex} = useContext(KardexContext);

    const [isVisible, setIsVisible] = useState(false);

    const saveKardex = (id) => {
        findKardex(id);
        setIsVisible(true);
    };

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
        <div className="flex flex-column md:flex-row justify-content-between">
            <Button className="p-button-raised p-button-rounded mb-3 p-button-info" type="button" icon="pi pi-plus" label="Agregar kardex" 
                onClick={()=>setIsVisible(true)}/>
        </div>
        
        <Panel
            header="Listado de kardex" sortField="category" sortOrder={-1} responsiveLayout="scroll" 
            style={{ textAlign: "justify" }}
        >
            <div>
            <DataTable 
                value={kardexs}
                responsiveLayout="scroll"
                selectionMode="single"
                onSelectionChange={(e) => saveKardex(e.value.id)}
                paginator className="p-datatable-customers" showGridlines rows={10}
                dataKey="id" filters={filters1} filterDisplay="menu"
                globalFilterFields={['correlativo', 'descripcion', 'codigo', 'areaDSalud', 'dependencia']} header={header1} emptyMessage="No se encontraron kardex."
                >
                <Column field="id" header="No." sortable/>
                <Column field="correlativo" header="Correlativo" sortable/>
                <Column field="descripcion" header="Descripción" sortable/>
                <Column field="codigo" header="Código" sortable/>
            </DataTable>
            </div>
        </Panel>
        <KardexForm isVisible={isVisible} setIsVisible={setIsVisible}/>
        </div>
    );
}
export default KardexList;