import React from "react";
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  function bienvenida(currentUser) {
    if(currentUser.rol === "Administrador"){
      return `Recuerda de que tienes acceso a todas
      las 
      página del sistema.`
    }else if(currentUser.rol === "Despachador"){
      return `Recuerda de que tienes acceso a las 
      página
      determinadas en tu cargo.`
    }else if(currentUser.rol === "Kardex"){
      return `Recuerda de que tienes acceso a las 
      página
      determinadas en tu cargo, o sea al Kardex.`
    }else if(currentUser.rol === "Usuario"){
      return `Recuerda de que tienes acceso a la 
      página
      para pedir un medicamento.`
    }else if(!currentUser){
      return null;
    }
  }
  const text = bienvenida(currentUser);

  return (
    <div className="flex justify-content-center">
      <div className="card">
        <h3>
        ¡Bienvenido! <strong>{currentUser.nombre}</strong>!
        </h3>
      <p>
        !Es una placer tenerlo {currentUser.rol}¡Tenemos mucho que hacer el dia de hoy!
      </p>
      <p>
        {text}
      </p>
      </div>
    </div>
  );
};

export default Profile;