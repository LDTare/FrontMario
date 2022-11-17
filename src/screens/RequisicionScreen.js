import React from "react";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import RequisicionContextProvider from '../context/RequisicionContext';
import RequisicionList from '../components/Requisicion/List';

function RequisicionScreen (){
    return (
        <div className='RequisicionScreen'>
            <RequisicionContextProvider>
                <RequisicionList />
            </RequisicionContextProvider>
        </div>
    );
}

export default RequisicionScreen;