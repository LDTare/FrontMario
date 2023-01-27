import React from "react";
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Panel } from 'primereact/panel';
import { Divider } from 'primereact/divider';
import { Card } from 'primereact/card';
import imagen6 from '../images/fondo6.jpg';
const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const header = (
    <img alt="Card" src={imagen6} />
    );
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  function bienvenida(currentUser) {
    if(currentUser.rol === "Administrador"){
      return `Con el rol de administrador tienes acceso a todas las páginas, con permisos de lectura, escritura y edición de todos los datos, asimismo acceso a todos los reportes.`
    }else if(currentUser.rol === "Despachador"){
      return `Recuerda de que tienes acceso a todas las páginas determinadas a su cargo, recuerde que a las aprobaciones de algunos datos, usted tiene que comunicarse con el administrador de la página que este más cerce de usted..`
    }else if(currentUser.rol === "Kardex"){
      return `Recuerda de que tienes acceso a todas las páginas determinadas a tu cargo, o sea al Kardex, aunque es una página, recuerde que es información importante para la empresa.`
    }else if(currentUser.rol === "Usuario"){
      return `Recuerda de que tienes acceso a todas las páginas para pedir un medicamento y poder imprimir el reporte, asimismo si existiera un problema con su medicamento envie un mensaje al soporte del sistema.`
    }else if(!currentUser){
      return null;
    }
  }
  const text = bienvenida(currentUser);

  return (
    <div className="card flex justify-content-center">
      <Card title={currentUser.rol} subTitle={currentUser.nombre} header={header} className="md:w-25rem">
      <Panel header={currentUser.rol} toggleable>
        <p className="m-0">
            {text}
        </p>
      </Panel>
      <Divider />
      <Panel header="Recomendaciones" toggleable>
        <p className="m-0">
            El sistema es privado, por ese motivo, debe de seguir las siguientes recomendaciones: &nbsp;
            1. No dejar abierto una sesión en computadoras extrañas. &nbsp;
            2. Siempre cerrar sesión si entra por otro dispositivo. &nbsp;
            3. Cualquier anomalía, reportarla con el administrador que tenga cerca. &nbsp;
            4. No olvidar su contraseña. &nbsp;
            5. Siempre revisar su correo electrónico. &nbsp;
            Estas recomendaciones son para el correcto uso del sistema, recuerde que la seguridad depende de todos. 
        </p>
      </Panel>
      </Card>
    </div>
  );
};

export default Profile;