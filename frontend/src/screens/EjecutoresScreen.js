import React from "react";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import EjecutoresContextProvider from '../context/EjecutoresContext';
import EjecutorList from '../components/ejecutor/EjecutorList';

function EjecutoresScreen (){
    return (
        <div className='EjecutoresScreen'>
            <EjecutoresContextProvider>
                <EjecutorList />
            </EjecutoresContextProvider>
        </div>
    );
}

export default EjecutoresScreen;