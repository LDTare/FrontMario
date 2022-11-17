import React, { useContext } from "react";
import { ERequisicionContext } from "../../context/ERequisicionContext";
import { Panel } from "primereact/panel";
import { DataTable } from "primereact/datatable";
import { Column } from 'primereact/column';
import moment from "moment";
import { useParams } from "react-router-dom";
import { Button } from "primereact/button";
import logo from "../../images/fondo2.jpg";

const ReporteRequisicionList = () => {
    const { erequisicions, derequisicions } = useContext(ERequisicionContext);

    const datefecha = (erequisicions) => {
        return moment(erequisicions.fecha).format("DD/MM/YYYY");
    }

    const { idR } = useParams();

    const cols = [
        { field: "Producto", header: "Producto" },
        { field: "Lote", header: "No. Lote" },
        { field: "descripcion", header: "Descripción" },
        { field: "cantidad", header: "Cantidad" },
        { field: "cantidaDespachada", header: "Cantidad despachada" },
        { field: "precioUnitario", header: "Precio unitario" },
        { field: "precioTotal", header: "Precio total" },
    ];
    const cols1 = [
        { field: "Solicitante", header: "Solicitante" },
        { field: "Servicio", header: "Servicio" },
        { field: "fecha", header: "Fecha" },
        { field: "aprobado", header: "Aprobación" },
    ];

    const exportColumns = cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
    }));

    const exportColumns2 = cols1.map((col1) => ({
        title: col1.header,
        dataKey: col1.field,
    }));


    const exportPDF = () => {
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
                doc.text("Reporte de Requisición", 120,32);
                const img1 = new Image();
                img1.src = logo;
                doc.addImage(img1, 'JPEG', 128, 4, 40, 20);
                doc.autoTable(exportColumns2 , erequisicions.filter((q) => q.id === parseInt(idR)), {margin:{top: 45}});
                doc.autoTable(exportColumns, derequisicions.filter((p) => p.Requisicion === parseInt(idR)), {margin:{top: 35}});
                doc.save("Requisicion.pdf");
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

    return (
        <div>
            <Panel
                header="Reporte Requisicion"
                style={{ textAlign: "justify" }}
            >HOSPITAL NACIONAL RETALHULEU TEL: 79328282</Panel>
            <br/><br/>
            <div>
                <h4><center><strong>Requisicion de productos</strong></center></h4>
                <DataTable
                    value={derequisicions.filter((p) => p.Requisicion === parseInt(idR))}
                    responsiveLayout="scroll"
                    selectionMode="single"
                    dataKey="id"
                >
                    <Column field="Producto" header="Producto" sortable/>
                    <Column field="Lote" header="No. lote" />
                    <Column field="descripcion" header="Descripción" />
                    <Column field="cantidad" header="Cantidad pedida" />
                    <Column field="cantidaDespachada" header="Cantidad despachada"/>
                    <Column field="precioUnitario" header="Precio unitario" />
                    <Column field="precioTotal" header="Precio total" />
                </DataTable>
            </div>
            <br/><br/>
            <div>
                <h4><center><strong>Información de requisición</strong></center></h4>
                <DataTable
                    value={erequisicions.filter((q) => q.id === parseInt(idR))}
                    responsiveLayout="scroll"
                    selectionMode="single"
                    dataKey="id"
                >
                    <Column field="Solicitante" header="Solicitante" />
                    <Column field="Servicio" header="Servicio"  />
                    <Column body={datefecha} header="Fecha"  />
                    <Column field="aprobado" header="Aprobación"  />
                </DataTable>
            </div>
            <br/><br/>
            <div className="speeddial-linear-demo" style={{ position: 'relative', height: '100px' }}>
                {header}
            </div>
        </div>


    );
}

export default ReporteRequisicionList;