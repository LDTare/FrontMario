import React, { useState, useEffect } from 'react';
import { VistasService } from '../../services/VistasService';
import Table from 'react-bootstrap/Table';
import { useParams } from "react-router-dom"
const VistaTableSum = (props) => {
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

    return (
        <div className='p-grid p-fluid'>
        <p>
                {kardex.map((e) => (
                    <div>
                    <p>AREA DE SALUD<u>___Retahuleu___</u>DEPENDENCIA<u>____Hospital_______</u></p>
                    <p>DESCRIPCION<u>___{e.descripcion}___</u>CODIGO<u>_____{e.codigo}______</u></p>
                    </div>
                ))}
        </p>
        <Table border={2} bordered={4} hover>
            <thead>
                <tr>
                    <th>FECHA</th>
                    <th>NO. DE REF</th>
                    <th>REMITENTE/DESTINATARIO</th>
                    <th>
                        <tr colSpan={2} align="middle">ENTRADA</tr>
                        <tr>
                        <th>CANTIDAD</th>
                        <th>PRECIO</th>
                        </tr>
                    </th>  
                    <th>FECHA VENCIMIENTO</th>
                    <th>NUMERO DE LOTE</th>
                    <th>
                        <tr colSpan={2}>SALIDA</tr>
                        <tr>
                        <th>CANTIDAD</th>
                        <th>PRECIO</th>
                        </tr>
                    </th>
                    <th>
                        <tr colSpan={2}>REAJUSTE</tr>
                        <tr>
                        <th>CANTIDAD</th>
                        <th>PRECIO</th>
                        </tr>
                    </th>
                    <th>
                        <tr colSpan={2}>SALDO</tr>
                        <tr>
                        <th>CANTIDAD</th>
                        <th>PRECIO</th>
                        </tr>
                    </th>
                    <th>FECHA REQUISICIÓN</th>
                </tr>
            </thead>
            <tbody>
                {suministros.map((e) => 
                    <tr>
                        <td>{e.FDK}</td>
                        <td>{e.IDK}</td>
                        <td>{e.Remitente}</td>
                        <td>{e.EntradaC}</td>
                        <td>{e.EntradaP}</td>
                        <td>{e.FDK}</td>
                        <td>{e.LoteCorrelativo}</td>
                        <td>{e.SalidaC}</td>
                        <td>{e.SalidaP}</td>
                        <td>{e.ReajusC}</td>
                        <td>{e.ReajusP}</td>
                        <td>{e.SaldoC}</td>
                        <td>{e.SaldoP}</td>
                        <td>{e.FechaReq}</td>
                    </tr>
                )}
            </tbody>
        </Table>
        </div>
    );
}

export default VistaTableSum;