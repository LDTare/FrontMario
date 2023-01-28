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
    const { idR } = useParams();

    const { erequisicions, derequisicions } = useContext(ERequisicionContext);

    const datefecha = (erequisicions) => {
        return moment(erequisicions.fecha).format("DD/MM/YYYY");
    }
    const statusAprovado = (requisiciones) => {
        return requisiciones.aprobado ? " Si " : " No ";
    }

    const requisicion = erequisicions.filter((q) => q.id === parseInt(idR));

    const requisicionDatos = {
        solicitante: requisicion.map((e) => e.Solicitante),
        servicio: requisicion.map((e) => e.Servicio),
        fecha: new Date( requisicion.map((e) => e.fecha)).toLocaleDateString(),
        categoria: requisicion.map((e) => e.categoria),
        aprobado: requisicion.map((e) => e.aprobado),
    }

    const cols = [
        { field: "Producto", header: "Producto" },
        { field: "Lote", header: "No. Lote" },
        { field: "descripcion", header: "Descripción" },
        { field: "cantidad", header: "Cantidad pedida" },
        { field: "cantidaDespachada", header: "Cantidad despachada" },
        { field: "precioUnitario", header: "Precio unitario" },
        { field: "precioTotal", header: "Precio total" },
    ];

    let rfecha = moment(requisicionDatos.fecha).format("DD/MM/YYYY");
    const exportColumns = cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
    }));


    const exportPDF = () => {
        import("jspdf").then((jsPDF) => {
            let today = new Date();
            let now = new Date(today.toLocaleDateString('en-US'));
            var months, day, year;
            months = now.getMonth()+1;
            day= now.getDate();
            year = now.getFullYear();
            import("jspdf-autotable").then(() => {
                const doc = new jsPDF.default('h', 'mm', 'a4');
                doc.setFontSize(12);
                doc.setFont("Helvetica", "normal");
                doc.text("Hospital Nacional", 10,10);
                doc.text("de Retalhuleu Tel.: 7932-8282", 10,15);
                doc.text("Farmacia interna", 10,20);
                doc.text("Fecha: "+day+"/ "+months+"/ "+year, 160,10);
                doc.setFontSize(16);
                doc.setFont("Helvetica", "bold");
                doc.text("Requisición de "+ requisicionDatos.categoria, 60,32);
                const img1 = new Image();
                img1.src = logo;
                doc.addImage(img1, 'JPEG', 85, 4, 40, 20);
                doc.setFontSize(11);
                doc.setFont("Helvetica", "normal");
                doc.text("Solicitante: "+ requisicionDatos.solicitante, 15,40);
                doc.text("Servicio: "+ requisicionDatos.servicio, 120,40);
                doc.text("Firma / Encargado, Jefe: ________________________", 15,48);
                doc.text("Fecha: "+ requisicionDatos.fecha, 120,48);
                doc.text("Firma de quién entrega en farmacia: ______________________________________________________", 15,57);
                doc.text("Nombre, Firma y Sello / Jefe Depto. Solicitante: _____________________________________________", 15,65);
                doc.autoTable(exportColumns, derequisicions.filter((p) => p.Requisicion === parseInt(idR)), {margin:{top: 70}});
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
            >
                Hospital Nacional de Retalhuleu TEL: 79328282
            <br/>
                Farmacia interna
            <br/>
            <div>
                <h4><center><strong>Información de requisición</strong></center></h4>
                <DataTable
                    value={requisicion}
                    responsiveLayout="scroll"
                    selectionMode="single"
                    dataKey="id"
                >
                    <Column field="Solicitante" header="Solicitante" />
                    <Column field="Servicio" header="Servicio"  />
                    <Column field="categoria" header="Categoría"  />
                    <Column body={datefecha} header="Fecha"  />
                    <Column body={statusAprovado} header="Aprobación"  />
                </DataTable>
            </div>
            <br/><br/>
            <div>
                <h4><center><strong>Requisición de productos</strong></center></h4>
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
            </Panel>
            <br/><br/>
            <div className="speeddial-linear-demo" style={{ position: 'relative', height: '100px' }}>
                {header}
            </div>
        </div>


    );
}

export default ReporteRequisicionList;