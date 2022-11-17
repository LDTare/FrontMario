import React from "react";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import PresentacionContextProvider from '../context/PresentacionContext';
import PresentacionList from '../components/presentacion/PresentacionList';

function PresentacionScreen (){
    return (
        <div className='PresentacionScreen'>
            <PresentacionContextProvider>
                <PresentacionList />
            </PresentacionContextProvider>
        </div>
    );
}

export default PresentacionScreen;