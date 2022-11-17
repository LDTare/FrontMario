import React from "react";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import DeRequisicionContextProvider from '../context/DRequisicionContext';
import DeRequisicionList from '../components/DetalleRequisicion/List';

function DRequisicionScreen (){
    return (
        <div className='DetalleRequisicionScreen'>
            <DeRequisicionContextProvider>
                <DeRequisicionList />
            </DeRequisicionContextProvider>
        </div>
    );
}

export default DRequisicionScreen;