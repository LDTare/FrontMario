import React, { useContext, useState, useEffect } from "react";
import { UsuarioContext } from "../../context/UsuarioContext";
import { Panel } from "primereact/panel";
import { DataTable } from "primereact/datatable";
import { Column } from 'primereact/column';
import FormUsuario from './UsuarioForm';
import { InputText} from "primereact/inputtext";
import { Button} from 'primereact/button';
import { FilterMatchMode} from 'primereact/api';
import { Toolbar } from 'primereact/toolbar';

const UsuarioList = () =>{
    const {usuarios, findUsuario} = useContext(UsuarioContext);

    const [isVisible, setIsVisible] = useState(false);

    const statusBodyTemplate = (usuarios) => {
        return <span className={`${usuarios.estado ? "activo" : "inactivo"}`}>{usuarios.estado ? " Activo " : " Inactivo "}</span>;
    }

    const saveUsuario = (id) => {
        findUsuario(id);
        setIsVisible(true);
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button className="p-button-raised p-button-rounded mr-2 p-button-info" type="button" icon="pi pi-plus" label="Agregar usuario" 
                onClick={()=>setIsVisible(true)}/>
            </React.Fragment>
        )
    }

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
            <Toolbar className="mr-2" left={leftToolbarTemplate}></Toolbar>
        <Panel
            header="Listado de usuarios" sortField="category" sortOrder={-1} responsiveLayout="scroll" 
            style={{ textAlign: "justify" }}
        >
            <div>
            <DataTable 
                value={usuarios}
                responsiveLayout="scroll"
                selectionMode="single"
                onSelectionChange={(e) => saveUsuario(e.value.id)}
                paginator className="p-datatable-customers" showGridlines rows={10}
                dataKey="id" filters={filters1} filterDisplay="menu"
                globalFilterFields={['rol','nombre', 'nroCelular', 'email', 'direccion']} 
                header={header1} emptyMessage="No se encontraron usuarios."
                >
                <Column field="id" header="No." sortable/>
                <Column field="rol" header="Rol" sortable/>
                <Column field="nombre" header="Nombre" sortable/>
                <Column field="email" header="Correo electrónico" sortable/>
                <Column field="nroCelular" header="Contacto" sortable/>
                <Column field="direccion" header="Dirección" sortable/>
                <Column body={statusBodyTemplate} header="Estado" sortable/>
            </DataTable>
            </div>
        </Panel>
        <FormUsuario isVisible={isVisible} setIsVisible={setIsVisible}/>
        </div>
    );
}

export default UsuarioList;