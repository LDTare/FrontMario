import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRouted";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import 'primereact/resources/primereact.min.css';
import Navigation from "./components/MenuBar/Navigate";

import Login from "./components/Login";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Presentacion from "./screens/PresentacionScreen";
import Producto from "./screens/ProductoScreen";
import Lote from "./screens/LoteScreen";
import Servicios from "./screens/ServiciosScreen";
import Ejecutores from "./screens/EjecutoresScreen";
import Solicitantes from "./screens/SolicitantesScreen";
import Kardexs from "./screens/KardexsScreen";
import DKardexs from "./screens/DKardexScreen";
import Pedido from "./screens/PedidoScreen";
import DPedido from "./screens/DPedidoScreen";
import Requisicion from "./screens/RequisicionScreen";
import DRequisicion from "./screens/DRequisicionScreen";
import Auditoria from "./screens/AuditoriaScreen";
import Contact from "./components/Contacts";

import ReporteRequisicion from "./screens/ReporteRequisicionScreen";
import VistaTable from "./components/Vistas/vistaPedidos";
import VistaTableSum from "./components/Vistas/suministrosVistas";
import Usuario from "./screens/UsuarioScreen";
import Remitente from "./screens/RemitenteScreen";
import EditUser from "./components/EditUser";
import ReactFinalFormDemo from "./components/Register"; 


const App = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  useEffect(() => {
    if(currentUser){

    }else {

    }
  }, [currentUser]);


  return (
    <div className="App">
      <Navigation />
      <div className="container mt-3">
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route element={<ProtectedRoute isAllowed={!currentUser} />} >
          <Route path="/register" element={<ReactFinalFormDemo />} />
          <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<ProtectedRoute isAllowed={!!currentUser} />} >
          <Route  path="/producto"     element={<Producto />} />
          <Route  path="/edituser"     element={<EditUser />} />
          <Route  path="/lote"         element={<Lote /> } />
          <Route  path="/presentacion" element={<Presentacion /> } />
          <Route  path="/servicios"    element={<Servicios /> } />
          <Route  path="/auditoria"    element={<Auditoria /> } />
          <Route  path="/solicitantes" element={<Solicitantes /> } />
          <Route  path="/ejecutores"   element={<Ejecutores /> } />
          <Route  path="/kardex"       element={<Kardexs /> } />
          <Route  path="/dkardex/:idK" element={<DKardexs /> } />
          <Route  path="/pedido"       element={<Pedido /> } />
          <Route  path="/dpedido/:idP"  element={<DPedido /> } />
          <Route  path="/requisicion"      element={<Requisicion />} />
          <Route  path="/drequisicion/:idR" element={<DRequisicion />} />
          <Route  path="/requisicionreporte/:idR" element={<ReporteRequisicion />} />
          <Route  path="/profile" element={<Profile />} />
          <Route  path="/usuarios" element={<Usuario />} />
          <Route  path="/vista/:idP" element={<VistaTable />} />
          <Route  path="/suministros/:idK" element={<VistaTableSum />} />
          <Route path="/remitentes" element={<Remitente />} /> 
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;