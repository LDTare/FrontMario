import React from 'react';
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import ProductoContextProvider from '../context/ProductoContext';
import ProductoList from '../components/Producto/ProductoList';

function ProductoScreen() {
    return (
        <div className='ProductoScreen'>
            <ProductoContextProvider>
                <ProductoList />
            </ProductoContextProvider>
        </div>
    );
}

export default ProductoScreen;