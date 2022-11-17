import React from "react";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import AuditoriaContextProvider from '../context/AuditoriaContext';
import AuditoriaList from '../components/auditoria/AuditoriaList';

function AuditoriaScreen (){
    return (
        <div className='EjecutoresScreen'>
            <AuditoriaContextProvider>
                <AuditoriaList />
            </AuditoriaContextProvider>
        </div>
    );
}

export default AuditoriaScreen;