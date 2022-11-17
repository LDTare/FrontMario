/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

const API_URL = "https://farmaciareu.site/usuario/";

const register = (idRol, nombre, email, password, nroCelular, direccion, estado) => {
  return axios.post(API_URL + "signup", {
    idRol, 
    nombre, 
    email, 
    password,
    nroCelular, 
    direccion, 
    estado,
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "signin", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
 return localStorage.removeItem("user");
};

const signout = () => {
  return axios
  .get(API_URL + 'signout')
  .then((response) => {
    return response.data;
  });
 };

const update = (
  id,
  idRol, 
  nombre, 
  email, 
  password,
  nroCelular, 
  direccion, 
  estado) => {
  return axios.put(API_URL + `${id}`, {
    idRol, 
    nombre, 
    email, 
    password,
    nroCelular, 
    direccion, 
    estado,
  });
}

export default {
  login, 
  logout, 
  register,
  signout,
  update
};