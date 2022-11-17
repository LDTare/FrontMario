import React from "react";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import KardexsContextProvider from '../context/KardexsContext';
import KardexList from '../components/kardex/KardexList';

function KardexsScreen (){
    return (
        <div className='KardexsScreen'>
            <KardexsContextProvider>
                <KardexList/>
            </KardexsContextProvider>
        </div>
    );
}

export default KardexsScreen;