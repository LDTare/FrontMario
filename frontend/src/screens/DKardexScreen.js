import React from "react";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import DeKardexContextProvider from '../context/DKardexContext';
import DeKardexList from '../components/DetalleKardex/List';

function DeKardexScreen (){
    return (
        <div className='DetalleKardexScreen'>
            <DeKardexContextProvider>
                <DeKardexList />
            </DeKardexContextProvider>
        </div>
    );
}

export default DeKardexScreen;