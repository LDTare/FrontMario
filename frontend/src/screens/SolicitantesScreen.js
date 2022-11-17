import React from "react";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import SolicitantesContextProvider from '../context/SolicitantesContext';
import SolicitanteList from '../components/solicitante/SolicitanteList';

function SolicitantesScreen (){
    return (
        <div className='SolicitantesScreen'>
            <SolicitantesContextProvider>
                <SolicitanteList />
            </SolicitantesContextProvider>
        </div>
    );
}

export default SolicitantesScreen;