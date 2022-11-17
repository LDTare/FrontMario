import React from "react";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import ServiciosContextProvider from '../context/ServiciosContext';
import ServicioList from '../components/servicio/ServicioList';

function ServiciosScreen (){
    return (
        <div className='ServiciosScreen'>
            <ServiciosContextProvider>
                <ServicioList />
            </ServiciosContextProvider>
        </div>
    );
}

export default ServiciosScreen;