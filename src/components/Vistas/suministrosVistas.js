import React, { useState, useEffect } from 'react';
import { Panel } from "primereact/panel";
import { VistasService } from '../../services/VistasService';
//import Table from 'react-bootstrap/Table';
import { useParams } from "react-router-dom"
import moment from "moment";
import { Button } from "primereact/button";
import logo from "../../images/fondo2.jpg";
import { DataTable } from "primereact/datatable";
import {Column} from 'primereact/column';
const VistaTableSum = (props) => {
    const datefecha = (suministros) => {
        return moment(suministros.FV).format("DD/MM/YYYY");
    };
    const dateFechaK = (suministros) => {
        return moment(suministros.FDK).format("DD/MM/YYYY");
    };
    const dateFechaReq = (suministros) => {
        return moment(suministros.FechaReq).format("DD/MM/YYYY");
    };

    const [suministros, setSuministros] = useState([]);
    const [kardex, setKardex] = useState([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const vistaServicePedido = new VistasService();
    const {idK} = useParams();
    useEffect(() => {
        vistaServicePedido.readAllSuministros(idK)
        .then(data => setSuministros(data));
        vistaServicePedido.readAllKardex(idK)
        .then(data => setKardex(data));
    },[idK, vistaServicePedido]);

    const kardexDatos = {
        correlativo: kardex.map((e) => e.correlativo),
        descripcion: kardex.map((e) => e.descripcion),
        codigo:kardex.map((e) => e.codigo),
    }

    const cols = [
        { field: "FDK", header: "Fecha" },
        { field: "Ref", header: "No. de referencia" },
        { field: "Remitente", header: "Remitente / destinatario" },
        { field: "EntradaC", header: "Entrada cantidad" },
        { field: "EntradaP", header: "Entrada precio" },
        { field: "FV", header: "Fecha de vencimiento" },
        { field: "LoteCorrelativo", header: "Número de lote" },
        { field: "SalidaC", header: "Salida cantidad" },
        { field: "SalidaP", header: "Salida precio" },
        { field: "ReajusC", header: "Reajuste cantidad" },
        { field: "ReajusP", header: "Reajuste Precio" },
        { field: "SaldoC", header: "Saldo cantidad" },
        { field: "SaldoP", header: "Saldo precio" },
        { field: "FechaReq", header: "Fecha requisición" },
    ];

    const exportColumns = cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
    }));

    const exportPDF = () => {
        for (let i = 0; i < suministros.length; i++) {
            const fechaK = moment(suministros[i].FDK).format("DD/MM/YYYY");
            const fechaV = moment(suministros[i].FV).format("DD/MM/YYYY");
            const fechaReq = moment(suministros[i].FechaReq).format("DD/MM/YYYY");
            suministros[i].FDK = fechaK;
            suministros[i].FV = fechaV;
            suministros[i].FechaReq = fechaReq;
        }
        import("jspdf").then((jsPDF) => {
            let today = new Date();
            let now = new Date(today.toLocaleDateString('en-US'));
            var months, day, year;
            months = now.getMonth()+1;
            day= now.getDate();
            year = now.getFullYear();
            import("jspdf-autotable").then(() => {
                const doc = new jsPDF.default('l', 'mm', 'a4');
                doc.setFontSize(12);
                doc.setFont("Helvetica", "normal");
                doc.text("Ministerio de salud pública y asistencia social", 20,8);
                doc.text("Hospital Nacional", 20,15);
                doc.text("de Retalhuleu", 20,20);
                doc.text("Fecha: "+day+" / "+months+" / "+year, 240,15);
                doc.setFontSize(16);
                doc.setFont("Helvetica", "bold");
                doc.text("Tarjeta de control de suministros", 110,32);
                const img1 = new Image();
                img1.src = logo;
                doc.addImage(img1, 'JPEG', 128, 4, 40, 20);
                doc.setFontSize(11);
                doc.setFont("Helvetica", "normal");
                doc.text("Área de salud: Retalhuleu  ", 20,40);
                doc.text("Dependencia: Hospital", 100,40);
                doc.text("Descripción: "+ kardexDatos.descripcion, 20,45);
                doc.text("Código: "+ kardexDatos.codigo, 20,50);
                const distX = 210;
                const distY = 30;
                doc.line(distX, distY-9, distX+75, distY-9, 'F');
                doc.line(distX, distY-4, distX+75, distY-4, 'F');
                doc.text('Niveles de seguridad', distX+20,  distY-5);
                doc.line(distX, distY-9, distX, distY+15, 'F');
                doc.line(distX+75, distY-9, distX+75, distY+15, 'F');
                doc.text('Minimo', distX+13, distY);
                doc.text('Máximo', distX+50, distY);
                doc.line(distX+38, distY-4, distX+38, distY+15, 'F');
                doc.line(distX, distY+1, distX+75, distY+1, 'F');
                doc.line(distX, distY+15, distX+75, distY+15, 'F');
                doc.setFont("Helvetica", "normal");
                doc.autoTable(exportColumns, suministros, {margin:{top: 55}});
                doc.setTextColor(255,0,0);
                doc.text('No. '+kardexDatos.correlativo, 250, 53);
                doc.save("Suministros.pdf");
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
        <div className='p-grid p-fluid'>
            <Panel
            header="Tarjeta de control de suministros" sortField="category" sortOrder={-1} responsiveLayout="scroll" 
            style={{ textAlign: "center" }}
            >
            <p>
                {kardex.map((e) => (
                    <div>
                    <p>Área de salud<u>___Retalhuleu___</u>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;DEPENDENCIA<u>____Hospital_______</u></p>
                    <p>DESCRIPCIÓN<u>___{e.descripcion}___</u>&nbsp; &nbsp; &nbsp;CÓDIGO<u>_____{e.codigo}______</u></p>
                    </div>
                ))}
        </p>
        <div>
            <DataTable
                value={suministros}
                responsiveLayout="scroll"
                selectionMode="single"
                dataKey="id"
                //header={header1}
                emptyMessage="No se encontraron datos."
                >
                <Column body={dateFechaK} header="Fecha" sortable/>
                <Column field="Ref" header="No. de referencia" sortable/>
                <Column field="Remitente" header="Remitente / Destinatario" sortable/>
                <Column field="EntradaC" header="Entrada cantidad" sortable/>
                <Column field="EntradaP" header="Entrada precio" sortable/>
                <Column body={datefecha} header="Fecha vencimiento" sortable/>
                <Column field="LoteCorrelativo" header="Número de lote" sortable/>
                <Column field="SalidaC" header="Salida cantidad" sortable/>
                <Column field="SalidaP" header="Salida precio" sortable/>
                <Column field="ReajusC" header="Reajuste cantidad" sortable/>
                <Column field="ReajusP" header="Reajuste precio" sortable/>
                <Column field="SaldoC" header="Saldo cantidad" sortable/>
                <Column field="SaldoP" header="Saldo precio" sortable/>
                <Column body={dateFechaReq} header="Fecha requisición" sortable/>
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

export default VistaTableSum;