import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
  } from "./type.js";
  
  import AuthService from "../services/auth.service";
  
  export const register = (idRol, nombre, email, password, nroCelular, direccion, estado) => (dispatch) => {
    return AuthService.register(idRol, nombre, email, password, nroCelular, direccion, estado).then(
      (response) => {
        dispatch({
          type: REGISTER_SUCCESS,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: response.data.message,
        });
  
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: REGISTER_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };
  
  export const login = (email, password) => (dispatch) => {
    return AuthService.login(email, password).then(
      (data) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { user: data },
        });
  
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: LOGIN_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };
  
  export const logout = () => (dispatch) => {
    AuthService.logout();
    AuthService.signout();
  
    dispatch({
      type: LOGOUT,
    });
  };  
  export const update = (  
    id,
    idRol, 
    nombre, 
    email,
    nroCelular, 
    direccion, 
    estado) => {
      AuthService.update(  
        id,
        idRol, 
        nombre, 
        email,
        nroCelular, 
        direccion, 
        estado);
  }

  export const updateProfile = (  
    id,
    idRol, 
    nombre, 
    email,
    nroCelular, 
    direccion, 
    estado) => {
      AuthService.updatePerfil(  
        id,
        idRol, 
        nombre, 
        email, 
        nroCelular, 
        direccion, 
        estado);
  }

  export const updatePassword = (
    id,
    password,
  ) => {
    AuthService.updatepdw(id, password);
  }