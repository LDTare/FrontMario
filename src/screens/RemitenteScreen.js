import React from "react";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import RemitenteContextProvider from '../context/RemitenteContext';
import RemitenteList from '../components/Remitente/RemitenteList';

function RemitenteScreen (){
    return (
        <div className='RemitenteScreen'>
            <RemitenteContextProvider>
                <RemitenteList />
            </RemitenteContextProvider>
        </div>
    );
}

export default RemitenteScreen;