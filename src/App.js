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
          <Route  path="/producto"     element={
              <ProtectedRoute 
              isAllowed={!!currentUser && currentUser.rol === "Administrador"
              }
              >
              <Producto />
              </ProtectedRoute>
            }
          />
          <Route  path="/edituser"     element={
              <ProtectedRoute 
              isAllowed={!!currentUser
              }
              >
              <EditUser />
              </ProtectedRoute>
            }
          />
          <Route  path="/lote"     element={
              <ProtectedRoute 
              isAllowed={!!currentUser && (currentUser.rol === "Administrador" || currentUser.rol === "Despachador")
              }
              >
              <Lote />
              </ProtectedRoute>
            }
          />
          <Route  path="/presentacion"     element={
              <ProtectedRoute 
              isAllowed={!!currentUser && (currentUser.rol === "Administrador" || currentUser.rol === "Despachador")
              }
              >
              <Presentacion />
              </ProtectedRoute>
            }
          />
          <Route  path="/presentacion"     element={
              <ProtectedRoute 
              isAllowed={!!currentUser && (currentUser.rol === "Administrador" || currentUser.rol === "Despachador")
              }
              >
              <Presentacion />
              </ProtectedRoute>
            }
          />
          <Route  path="/servicios"     element={
              <ProtectedRoute 
              isAllowed={!!currentUser && (currentUser.rol === "Administrador" || currentUser.rol === "Despachador")
              }
              >
              <Servicios />
              </ProtectedRoute>
            }
          />
          <Route  path="/auditoria"     element={
              <ProtectedRoute 
              isAllowed={!!currentUser && currentUser.rol === "Administrador"
              }
              >
              <Auditoria />
              </ProtectedRoute>
            }
          />
          <Route  path="/solicitantes"     element={
              <ProtectedRoute 
              isAllowed={!!currentUser && currentUser.rol === "Administrador"
              }
              >
              <Solicitantes />
              </ProtectedRoute>
            }
          />
          <Route  path="/ejecutores"     element={
              <ProtectedRoute 
              isAllowed={!!currentUser && currentUser.rol === "Administrador"
              }
              >
              <Ejecutores />
              </ProtectedRoute>
            }
          />
          <Route  path="/kardex"     element={
              <ProtectedRoute 
              isAllowed={!!currentUser && (currentUser.rol === "Administrador" || currentUser.rol === "Kardex")
              }
              >
              <Kardexs />
              </ProtectedRoute>
            }
          />
          <Route  path="/dkardex/:idK"     element={
              <ProtectedRoute 
              isAllowed={!!currentUser && (currentUser.rol === "Administrador" || currentUser.rol === "Kardex")
              }
              >
              <DKardexs />
              </ProtectedRoute>
            }
          />
          <Route  path="/pedido"     element={
              <ProtectedRoute 
              isAllowed={!!currentUser && (currentUser.rol === "Administrador" || currentUser.rol === "Despachador")
              }
              >
              <Pedido />
              </ProtectedRoute>
            }
          />
          <Route  path="/dpedido/:idP"     element={
              <ProtectedRoute 
              isAllowed={!!currentUser && (currentUser.rol === "Administrador" || currentUser.rol === "Despachador")
              }
              >
              <DPedido/>
              </ProtectedRoute>
            }
          />
          <Route  path="/requisicionreporte/:idR"     element={
              <ProtectedRoute 
              isAllowed={!!currentUser && (currentUser.rol === "Administrador" || currentUser.rol === "Kardex")
              }
              >
              < ReporteRequisicion/>
              </ProtectedRoute>
            }
          />
          <Route  path="/requisicion"     element={
              <ProtectedRoute 
              isAllowed={!!currentUser && (currentUser.rol === "Administrador" || currentUser.rol === "Despachador" || currentUser.rol === "Usuario")
              }
              >
              <Requisicion />
              </ProtectedRoute>
            }
          />
          <Route  path="/drequisicion/:idR"     element={
              <ProtectedRoute 
              isAllowed={!!currentUser && (currentUser.rol === "Administrador" || currentUser.rol === "Despachador" || currentUser.rol === "Usuario")
              }
              >
              <DRequisicion />
              </ProtectedRoute>
            }
          />
         <Route  path="/profile"     element={
              <ProtectedRoute 
              isAllowed={!!currentUser 
              }
              >
              <Profile />
              </ProtectedRoute>
            }
          />
        <Route  path="/usuarios"     element={
              <ProtectedRoute 
              isAllowed={!!currentUser && currentUser.rol === "Administrador"
              }
              >
              <Usuario />
              </ProtectedRoute>
            }
        />
        <Route  path="/vista/:idP"     element={
              <ProtectedRoute 
              isAllowed={!!currentUser && currentUser.rol === "Administrador"
              }
              >
              <VistaTable />
              </ProtectedRoute>
            }
          />
        <Route  path="/suministros/:idK"     element={
              <ProtectedRoute 
              isAllowed={!!currentUser && currentUser.rol === "Administrador"
              }
              >
              <VistaTableSum />
              </ProtectedRoute>
            }
          />
        <Route  path="/remitentes"     element={
              <ProtectedRoute 
              isAllowed={!!currentUser && currentUser.rol === "Administrador"
              }
              >
              <Remitente />
              </ProtectedRoute>
            }
          />

        </Routes>
      </div>
    </div>
  );
};

export default App;