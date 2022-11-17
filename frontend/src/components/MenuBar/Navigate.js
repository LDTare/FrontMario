import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Menubar } from 'primereact/menubar';
import { SplitButton } from 'primereact/splitbutton';
import { logout } from "../../actions/auth";
import { clearMessage } from "../../actions/message";
import logo from "../../images/fondo2.ico";
const Navigation = () => {
    const dispatch = useDispatch();
    const { user: currentUser } = useSelector((state) => state.auth);
    const logOut = useCallback(() => {
        dispatch(logout());
      }, [dispatch]);
    let location = useLocation();
    useEffect(() => {
      if (["/login", "/register"].includes(location.pathname)) {
        dispatch(clearMessage()); // clear message when changing location
      }
    }, [dispatch, location]);
    useEffect(() => {
      if(currentUser){
  
      }else {
  
      }
    }, [currentUser]);
    /* Items */
    const navlistW = [
      {
        label: "Inicio", 
        icon: "pi pi-fw pi-home",
        command: () => {
          window.location.href = '/';
        },
      },
      {
        label: "Contáctanos", 
        icon: "pi pi-fw pi-send",
        command: () => {
          window.location.href = '/contact';
        },
      }
  ];
  
  const navlistDespachador = [
    {
      label: "Inicio", 
      icon: "pi pi-fw pi-home",
      command: () => {
        window.location.href = '/';
      }
    },
    {
      label: "Lote",
      icon: "pi pi-fw pi-car",
      command: () => {
        window.location.href = '/lote';
      },
    },
    {
      label: "Presentación",
      icon: "pi pi-fw pi-briefcase",
      command: () => {
        window.location.href = '/presentacion';
      },
    },
    {
      label: "Requisición",
      icon: "pi pi-fw pi-directions",
      command: () => {
        window.location.href = '/requision';
      },
    },
    {
      label: "Servicio",
      icon: "pi pi-fw pi-envelope",
      command: () => {
        window.location.href = '/servicios';
      },
    },
    {
      label: "Pedido",
      icon: "pi pi-fw pi-mobile",
      command: () => {
        window.location.href = '/pedido';
      },
    },
    {
      label: "Contáctanos", 
      icon: "pi pi-fw pi-send",
      command: () => {
        window.location.href = '/contact';
      },
    }
  ];
  
  const navListKardex = [
    {
      label: "Inicio", 
      icon: "pi pi-fw pi-home",
      command: () => {
        window.location.href = '/';
      }
    },
    {
      label: "Contáctanos", 
      icon: "pi pi-fw pi-send",
      command: () => {
        window.location.href = '/contact';
      }, 
    },
    {
      label: "Kardex",
      icon: "pi pi-fw pi-shopping-bag",
      command: () => {
        window.location.href = '/kardex';
      }
    },
      {
        label: "Detalle kardex",
        icon: "pi pi-fw pi-shopping-cart",
        command: () => {
          window.location.href = '/detalleKardex/:id';
        },
      },
  ]
  
  const navListAdmin = [
    {
      label: "Inicio", 
      icon: "pi pi-fw pi-home",
      command: () => {
        window.location.href = '/';
      }
    },
    {
      label: "Auditoria", 
      icon: "pi pi-fw pi-bolt",
      command: () => {
        window.location.href = '/auditoria';
      }
    },
    {
      label: "Contáctanos", 
      icon: "pi pi-fw pi-send",
      command: () => {
        window.location.href = '/contact';
      },
    },
    {
      label: "Registros", 
      icon: "pi pi-fw pi-compass",
      items:[
        {
          label: "Productos", 
          icon: "pi pi-fw pi-shopping-bag",
          command: () => {
            window.location.href = '/producto';
          }
        },
        {
          label: "Lote", 
          icon: "pi pi-fw pi-shopping-cart",
          command: () => {
            window.location.href = '/lote';
          }
        },
        {
          label: "Presentación", 
          icon: "pi pi-fw pi-sitemap",
          command: () => {
            window.location.href = '/presentacion';
          }
        },
        {
          label: "Servicios", 
          icon: "pi pi-fw pi-sort",
          command: () => {
            window.location.href = '/servicios';
          }
        },
        {
          separator: true,
        },
        {
          label: "Solicitantes", 
          icon: "pi pi-fw pi-share-alt",
          command: () => {
            window.location.href = '/solicitantes';
          }
        },
        {
          label: "Ejecutores", 
          icon: "pi pi-fw pi-search",
          command: () => {
            window.location.href = '/ejecutores';
          }
        },
        {
          label: "Kardex", 
          icon: "pi pi-fw pi-spinner",
          command: () => {
            window.location.href = '/kardex';
          }
        },
        {
          separator: true,
        },
        {
          label: "Pedidos", 
          icon: "pi pi-fw pi-plus",
          command: () => {
            window.location.href = '/pedido';
          }
        },
        {
          label: "Requisición", 
          icon: "pi pi-fw pi-plus-circle",
          command: () => {
            window.location.href = '/requisicion';
          }
        },
        {
          label: "Remitentes", 
          icon: "pi pi-fw pi-plus-circle",
          command: () => {
            window.location.href = '/remitentes';
          }
        }
      ],
    },
    {
      label: "Lista de usuarios", 
      icon: "pi pi-fw pi-users",
      command: () => {
        window.location.href = '/usuarios';
      }
    }
  ]
  
  const navListUsuario = [
      {
        label: "Inicio", 
        icon: "pi pi-fw pi-home",
        command: () => {
          window.location.href = '/';
        }
      },
      {
        label: "Contáctanos", 
        icon: "pi pi-fw pi-send",
        command: () => {
          window.location.href = '/contact';
        },
      },
      {
        label: "Requisión", 
        icon: "pi pi-fw pi-home",
        command: () => {
          window.location.href = '/requisicion';
        }
      },
      {
        label: "Requisicion",
        icon: "pi pi-fw pi-home",
        command: () => {
          window.location.href = '/requisicion';
        }
      },
  ]
    /*Items 2 */
    const items = [
      {
        label: "Inicio de sesión", 
        icon: "pi pi-fw pi-user",
        command: () => {
          window.location.href = '/login';
        }
      },
      {
        label: "Registrarse", 
        icon: "pi pi-fw pi-sign-in",
        command: () => {
          window.location.href = '/register';
        }
      }
    ]
    const items2 = [
      {
        label: "Perfil", 
        icon: "pi pi-fw pi-user",
        command: () => {
          window.location.href = '/profile';
        }
      },
      {
        label: "Editar perfil", 
        icon: "pi pi-fw pi-users",
        command: () => {
          window.location.href = '/edituser';
        }
      },
      {
        label: "Salir", 
        icon: "pi pi-fw pi-sign-out",
        command: () => {
          window.location.href = '/profile';
          window.onclick = logOut();
        }
      }
    ]

    
    function isLogin(currentUser, items, items2){
      if(!currentUser){
        return <SplitButton className="mr-2 mb-2 p-button-rounded p-button-info" label="Acciones" model={items} />;
      }else if(currentUser)
      {
        return <SplitButton className="mr-2 mb-2 p-button-rounded p-button-success" label={currentUser.nombre}  model={items2} />;
      }
    }

    function isRol(currentUser, navList1, navList2, navList3, navList4, navList5){
      if(!currentUser){
        return navList1;
      }else if(currentUser.rol === "Administrador"){
        return navList2;
      }else if(currentUser.rol === "Despachador"){
        return navList3;
      }else if(currentUser.rol === "Kardex"){
        return navList4;
      }else if(currentUser.rol === "Usuario"){
        return navList5;
      }
    }
    const end = isLogin(currentUser, items, items2);
    const start = <img alt="logo" src={logo} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} height="40" className="mr-2"></img>;
    return (
        <header>
        <Menubar model={isRol(currentUser, navlistW, navListAdmin, navlistDespachador, navListKardex, navListUsuario)} start={start} end={end} />
        </header>
    );
}

export default Navigation;