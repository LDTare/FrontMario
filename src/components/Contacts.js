import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';

import emailjs from '@emailjs/browser';
import ApiKey from '../ApiKey';

import { Dialog } from 'primereact/dialog';
import { classNames } from 'primereact/utils';

const Contact = () => {
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});
    const validate = (data) => {
        let errors = {};
        if (!data.email) {
            errors.email = 'Correo electrónico es requerido.';
        }
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
            errors.email = 'Invalid email address. E.g. example@email.com';
        }
    return errors;
    };

    const onSubmit = (data, form) => {
        setFormData(data);
        emailjs.send(ApiKey.SERVICE_ID, "template_tgks2n9", formData ,ApiKey.USER_ID)
        .then(() => {
            console.log("Enviado con exito");
        },() => {
            console.log("Sin exito");
        })
        setShowMessage(true);
        form.restart();
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
                    <h5>Mensaje hecho!</h5>
                    <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                        ¿Que tal señor@ <b>{formData.nombre}</b>? ; Su mensaje ha sido enviado al Administrador.
                    </p>
                </div>
            </Dialog>
            <div className="flex justify-content-center">
                    <div className='card card-container'>
                    <h5 className="text-center">Contáctanos</h5>
                    <Form onSubmit={onSubmit} initialValues={{ nombre: '', email: '', asunto: '', mensaje: ''}} validate={validate} render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit} className="p-fluid">
                            <Field name="nombre" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label p-input-icon-right">
                                        <InputText placeholder='Nombre'  id="nombre" {...input} autoFocus className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="nombre" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Nombre*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                            <Field name="email" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label p-input-icon-right">
                                        <InputText placeholder='Email'  id="email" {...input} autoFocus className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="email" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Correo electrónico</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />

                            <Field name="asunto" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label p-input-icon-right">
                                        <InputText placeholder='Asunto'  id="asunto" {...input} autoFocus className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="asunto" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Asunto</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />

                            <Field name="mensaje" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label p-input-icon-right">
                                        <InputTextarea rows={5} cols={30} autoResize placeholder='Asunto'  id="mensaje" {...input} autoFocus className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="mensaje" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Mensaje</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />  
                            <Button type="submit" label="Enviar" className="mt-2" />                          
                        </form>
                    )}/>
                </div>
            </div>
        </div>
      );
}

export default Contact;