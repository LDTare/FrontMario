import React from "react";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import DePedidoContextProvider from '../context/DPedidoContext';
import DePedidoList from '../components/DetallePedido/List';

function DPedidoScreen (){
    return (
        <div className='DetallePedidoScreen'>
            <DePedidoContextProvider>
                <DePedidoList />
            </DePedidoContextProvider>
        </div>
    );
}

export default DPedidoScreen;