import React from "react";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import ERequisicionContextProvider from '../context/ERequisicionContext';
import ReporteRequisicionList from '../components/reporterequisicion/ReporteRequisicionList';

function ReporteRequisicionScreen (){
    return (
        <div className='EjecutoresScreen'>
            <ERequisicionContextProvider>
                <ReporteRequisicionList />
            </ERequisicionContextProvider>
        </div>
    );
}

export default ReporteRequisicionScreen;