import React from "react";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import LoteContextProvider from '../context/LoteContext';
import LoteList from '../components/Lote/List';

function LoteScreen (){
    return (
        <div className='LoteScreen'>
            <LoteContextProvider>
                <LoteList />
            </LoteContextProvider>
        </div>
    );
}

export default LoteScreen;