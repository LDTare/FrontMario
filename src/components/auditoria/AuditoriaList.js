import React, {useContext} from "react";
import { AuditoriaContext } from "../../context/AuditoriaContext";
import { Panel } from "primereact/panel";
import { DataTable } from "primereact/datatable";
import {Column} from 'primereact/column';
import moment from "moment";
import { Button } from "primereact/button";
import logo from "../../images/fondo2.jpg";


const AuditoriaList = () =>{
    const {auditorias} = useContext(AuditoriaContext);

    const datefecha = (auditorias) => {
        return moment(auditorias.fechaCad).format("DD/MM/YYYY");
    };
    const dateInicio = (auditorias) => {
        return moment(auditorias.fechaIngreso).format("DD/MM/YYYY");
    };

    const cols = [
        { field: "no", header: "No." },
        { field: "nombre", header: "Descripción" },
        { field: "presentacion", header: "Presentación" },
        { field: "unidadMedida", header: "Unidad de medida" },
        { field: "fechaIngreso", header: "Fecha de ingreso" },
        { field: "fechaCad", header: "Fecha de caducidad" },
        { field: "lote", header: "No. de lote" },
        { field: "kardex", header: "No. de Kardex" },
        { field: "cantidad", header: "Cantidad" },
        { field: "precioUnitario", header: "Precio unitario" },
        { field: "total", header: "Total" },
    ];

    const exportColumns = cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
    }));

    const exportPDF = () => {
        for (let i = 0; i < auditorias.length; i++) {
            const fechaI = moment(auditorias[i].fechaIngreso).format("DD/MM/YYYY");
            const fechaC = moment(auditorias[i].fechaCad).format("DD/MM/YYYY");
            auditorias[i].fechaIngreso = fechaI;
            auditorias[i].fechaCad = fechaC;
        }
        import("jspdf").then((jsPDF) => {
            let today = new Date();
            let now = new Date(today.toLocaleDateString('en-US'));
            var months, day, year;
            months = now.getMonth()+1;
            day= now.getDate();
            year = now.getFullYear();
            console.log(day);
            console.log(year);
            import("jspdf-autotable").then(() => {
                const doc = new jsPDF.default('l', 'mm', 'a4');
                doc.setFontSize(12);
                doc.setFont("Helvetica", "normal");
                doc.text("Hospital Nacional", 20,15);
                doc.text("de Retalhuleu", 20,20);
                doc.text("Fecha: "+day+" / "+months+" / "+year, 240,20);
                doc.setFontSize(16);
                doc.setFont("Helvetica", "bold");
                doc.text("Reporte de auditoria", 120,32);
                const img1 = new Image();
                img1.src = logo;
                doc.addImage(img1, 'JPEG', 128, 4, 40, 20);
                doc.autoTable(exportColumns, auditorias, {margin:{top: 35}});
                doc.save("Auditoria.pdf");
            })
        })
    };

    const header = (
        <div className="flex align-items-center export-button">
            <Button
                type="button"
                icon="pi pi-file-pdf"
                onClick={exportPDF}
                className="p-button-danger mr-3"
                data-or-tooltip="PDF"
            />
        </div>
    );

    return(
        <div>
        <Panel
            header="Reporte de auditoria" sortField="category" sortOrder={-1} responsiveLayout="scroll" 
            style={{ textAlign: "justify" }}
        >
            <div>
            <DataTable
                value={auditorias}
                responsiveLayout="scroll"
                selectionMode="single"
                dataKey="id"
                emptyMessage="No se encontraron datos."
                >
                <Column field="no" header="No." sortable/>
                <Column field="nombre" header="Descripción" sortable/>
                <Column field="presentacion" header="Presentación" sortable/>
                <Column field="unidadMedida" header="Unidad de medida" sortable/>
                <Column body={dateInicio} header="Fecha de ingreso" sortable/>
                <Column body={datefecha} header="Fecha de caducidad" sortable/>
                <Column field="lote" header="No. de lote" sortable/>
                <Column field="kardex" header="No. de tarjeta kardex" sortable/>
                <Column field="cantidad" header="Cantidad" sortable/>
                <Column field="precioUnitario" header="Precio unitario" sortable/>
                <Column field="total" header="Total" sortable/>
            </DataTable>
            </div>
        </Panel>
        <br/><br/>
        <div className="speeddial-linear-demo" style={{ position: 'relative', height: '100px' }}>
                <h6><strong>PDF</strong></h6>
                {header}
            </div>
        </div>
    );
}

export default AuditoriaList;