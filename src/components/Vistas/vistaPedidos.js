import React, { useState, useEffect } from 'react';
import { Panel } from "primereact/panel";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { VistasService } from '../../services/VistasService';
import { useParams } from 'react-router-dom';
import moment from "moment";
import logo from "../../images/fondo2.jpg";
import { Button } from "primereact/button";

const VistaTable = () => {
    const { idP } = useParams();
    const [pedido, setPedido] = useState([]);
    const [pedidoDetalle, setPedidoDetalle] = useState([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const vistaServicePedido = new VistasService();
    
    useEffect(() => {
        vistaServicePedido.readAllPedido(idP)
        .then(data => setPedido(data));
        vistaServicePedido.readAllPedidoDetalle(idP)
        .then(data => setPedidoDetalle(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[vistaServicePedido]);
    const pedidoDatos = {
        codigoUE: pedido.map((e) => e.CodigoUE),
        correlativo:pedido.map((e) => e.Correlativo),
        nombreUE: pedido.map((e) => e.NombreUE),
        solicitante: pedido.map((e) => e.Solicitante),
        fecha: pedido.map((e) => e.Fecha),
        telefono: pedido.map((e) => e.Telefono),
        JO: pedido.map((e) => e.JO),
        nombreS: pedido.map((e) => e.NombreS),
        cargo: pedido.map((e) => e.Cargo),
    }

    const cols = [
        { field: "ID", header: "No." },
        { field: "Cant", header: "Cantidad solicitada" },
        { field: "CantA", header: "Cantidad autorizada" },
        { field: "COI", header: "Código de insumo" },
        { field: "Descripcion", header: "Descripción del bien o servicio solicitado" },
        { field: "RA", header: "Renglón afectado" },
        { field: "VA", header: "Valor estimado (Q)" },
        { field: "PAAC", header: "Incluido en PAAC" },
        { field: "CAB", header: "Esta en contrato abierto" },
    ];

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
                doc.text("Hospital Nacional", 10,15);
                doc.text("de Retalhuleu", 10,20);
                doc.text("Fecha: "+day+"/ "+months+"/ "+year, 160,15);
                doc.setFontSize(16);
                doc.setFont("Helvetica", "bold");
                doc.text("Solicitud de pedidos", 80,32);
                const img1 = new Image();
                img1.src = logo;
                doc.addImage(img1, 'JPEG', 85, 4, 40, 20);
                doc.setFontSize(11);
                doc.setFont("Helvetica", "normal");
                doc.text("Código unidad ejecutora: "+ pedidoDatos.codigoUE, 20,40);
                doc.text("Correlativo sección de compras UE: "+ pedidoDatos.correlativo, 100,40);
                doc.text("Nombre unidad ejecutora: "+ pedidoDatos.nombreUE, 20,45);
                doc.text("Nombre unidad / departamento / sección solicitante: "+ pedidoDatos.solicitante, 20,50);
                doc.text("Fecha de la solicitud: "+ moment(pedidoDatos.fecha).format("DD/MM/YYYY"), 20,55);
                doc.text("Teléfono / ext: "+ pedidoDatos.telefono, 100,55);
                doc.autoTable(exportColumns, pedidoDetalle, {margin:{top: 60}});
                doc.text("Justificación / Observación: "+ pedidoDatos.JO, 15,200);
                //Impresión de Solicitante
                doc.setFont("Helvetica", "bold");
                const distY = 220;
                doc.text("Solicitante", 96,distY);
                doc.setFont("Helvetica", "normal");
                const nombreSoli = "  "+pedidoDatos.nombreS+"  ";
                doc.text(nombreSoli, 25, distY+20);
                const textWidth = doc.getTextWidth(nombreSoli);
                doc.line(20, distY+21, 50 + textWidth, distY+21, 'F');
                doc.text("Nombre completo del",20, distY+25);
                doc.text("servidor público",25, distY+28);
                doc.text("_______________________", 80,distY+20);
                doc.text("Firma", 100, distY+25);
                const cargoSoli = "  "+pedidoDatos.cargo+"  ";
                doc.text(cargoSoli, 150, distY+20);
                const textWidth2 = doc.getTextWidth(cargoSoli);
                doc.line(150, distY+21, 150 + textWidth2, distY+21, 'F');
                doc.text("Cargo", 155, distY+25);
                doc.save("Pedido.pdf");
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
            header="Solicitud de pedido" sortField="category" sortOrder={-1} responsiveLayout="scroll" 
            style={{ textAlign: "center" }}
        >
            <div className='flex justify-content-right'>
            <h4>Solicitud de pedido</h4>
            <p>Código unidad ejecutora: __<u>{pedidoDatos.codigoUE}</u>____ &nbsp; &nbsp; &nbsp; Correlativo sección de compras UE: __<u>{pedidoDatos.correlativo}</u>____</p>
            <p>Nombre unidad ejecutora: __<u>{pedidoDatos.nombreUE}</u>____</p>
            <p>Nombre unidad/depto/sección solicitante: __<u>{pedidoDatos.solicitante}</u>____</p>
            <br/>
            <p>Fecha de la solicitud: __<u>{moment(pedidoDatos.fecha).format("DD/MM/YYYY")}</u>____ &nbsp; &nbsp; &nbsp; Teléfono/ext: __<u>{pedidoDatos.telefono}</u>____</p>     
            
            </div>
            <div>
            <DataTable value={pedidoDetalle} responsiveLayout="scroll" 
                emptyMessage="No se encontraron datos.">
                    <Column field="ID" header="No."/>
                    <Column field="Cant" header="Cantidad solicitada"/>
                    <Column field="CantA" header="Cantidad autorizada"/>
                    <Column field="COI" header="Código de insumo"/>
                    <Column field='Descripcion' header="Descripción del bien o servicio solicitado" />
                    <Column field='RA' header="Renglón afectado"/>
                    <Column field='VA' header="Valor estimado (Q)" />
                    <Column field='PAAC' header="Incluido en PAAC" />
                    <Column field='CAB' header="Esta en contrato abierto"/>
            </DataTable>
            </div>
            <br/>
            <p>
            <strong>
            Justificación / Observación: __<u> {pedidoDatos.JO}</u>____________________________________
            </strong>
            </p>
            <br/>
            <p>
                <b><u>Solicitante:</u></b>
            </p>
            <br/>
            <p>__<u>{pedidoDatos.nombreS}</u>____&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;________________________ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ______<u>{pedidoDatos.cargo}</u>_______</p>
            <p>Nombre completo del servidor público&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Firma&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Cargo&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</p>
            </Panel>
            <br/><br/>
            <div className="speeddial-linear-demo" style={{ position: 'relative', height: '100px' }}>
                <h6><strong>PDF</strong></h6>
                {header}
            </div>
            
        </div>
    )
}
export default VistaTable;