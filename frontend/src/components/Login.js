import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate  } from 'react-router-dom';

import { Form, Field } from 'react-final-form';
import { login } from "../actions/auth";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';

import { Dialog } from 'primereact/dialog';
import { classNames } from 'primereact/utils';


const Login = () => {

  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({}); // eslint-disable-line react-hooks/exhaustive-deps

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validate = (data) => {
      let errors = {};


      if (!data.email) {
          errors.email = '¡El correo electrónico es requerido!!';
      }
      else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
          errors.email = '¡Correo electrónico no valido! Ejemplo: example@email.com';
      }

      if (!data.password) {
          errors.password = '¡Contraseña requerida!';
      }

      return errors;
  };

  const onSubmit = (data, form) => {
        
    setFormData(data);

    dispatch(login(data.email, data.password))
    .then(() => {
        setShowMessage(true);
        navigate("/profile");
        window.location.reload();
    })
    .catch(() => {
        form.restart();
    });
};
  const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
  const getFormErrorMessage = (meta) => {
      return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
  };

  const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false) } /></div>;

  return (
    <div className="form-demo">
      <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="flex align-items-center flex-column pt-6 px-3">
                    <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                    <h5>¡Registro exitoso!</h5>
                    <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                        Your account is registered under name <b>{formData.name}</b> ; it'll be valid next 30 days without activation. Please check <b>{formData.email}</b> for activation instructions.
                    </p>
                </div>
            </Dialog>
        <div className="flex justify-content-center">
        <div className='card card-container'>
                    <h5 className="text-center">Inicio de sesión</h5>
                    <Form onSubmit={onSubmit} initialValues={{ nombre: '', email: '', password: ''}} validate={validate} render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit} className="p-fluid">
                          <Field name="email" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label p-input-icon-right">
                                        <i className="pi pi-envelope" />
                                        <InputText id="email" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} placeholder='example@gmail.com'/>
                                        <label htmlFor="email" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Correo electrónico*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                          <Field name="password" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <Password id="password" {...input} toggleMask className={classNames({ 'p-invalid': isFormFieldValid(meta) })}/>
                                        <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Contraseña*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                                
                                
                            )} />
                            <Button type="submit" label="Ingresar" className="mt-2" />
                            </form>
                          )} />
        </div>
    </div>
    </div>

  );
};

export default Login;