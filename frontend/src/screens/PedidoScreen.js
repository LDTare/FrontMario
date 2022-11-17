import React from "react";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import PedidoContextProvider from '../context/PedidoContext';
import PedidoList from '../components/Pedido/List';

function PedidoScreen (){
    return (
        <div className='PedidoScreen'>
            <PedidoContextProvider>
                <PedidoList />
            </PedidoContextProvider>
        </div>
    );
}

export default PedidoScreen;