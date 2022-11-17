import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import { update } from '../actions/auth';
import emailjs from '@emailjs/browser';
import ApiKey from '../ApiKey';
import { useSelector } from "react-redux";
const ActualizarUser = () => {
    const { user: currentUser } = useSelector((state) => state.auth);
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({}); // eslint-disable-line react-hooks/exhaustive-deps

    const validate = (data) => {
        let errors = {};

        if (!data.nombre) {
            errors.nombre = 'Name is required.';
        }

        if (!data.email) {
            errors.email = '¡Correo electrónico es requerido!';
        }
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
            errors.email = '¡Correo electrónico invalido! Ejemplo: example@email.com';
        }

        if (!data.password) {
            errors.password = '¡Contraseña requerida!';
        }

        if (!data.nroCelular){
            errors.nroCelular = "¡Numero de celular requerido!"
        }

        return errors;
    };

    const onSubmit = (data, form) => {
        setFormData(data);
        const email = {
            message: `Es un placer anunciarle que el 
            dia de hoy se actualizo un usuario, 
            con el email ${data.email}, para que observe
            si el usuario necesita tener un rol.`
        }
        emailjs.send(ApiKey.SERVICE_ID, ApiKey.TEMPLATE_ID, email, ApiKey.USER_ID)
        .then(() => {
            console.log("Enviado con exito");
        },() => {
            console.log("Error");
        });
        update(currentUser.id, currentUser.idR, data.nombre, data.email, data.password, data.nroCelular, data.direccion, 1)
        .then(() => {
            setShowMessage(true);
            form.restart();
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
    const passwordHeader = <h6>Coloque una contraseña</h6>;
    const passwordFooter = (
        <React.Fragment>
            <Divider />
            <p className="mt-2">Requerimientos</p>
            <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: '1.5' }}>
                <li>Una minúscula</li>
                <li>Una mayúscula</li>
                <li>Un numero minimo</li>
                <li>Minimo 8 caracteres</li>
            </ul>
        </React.Fragment>
    );

    return (

        <div className="form-demo">
            <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="flex align-items-center flex-column pt-6 px-3">
                    <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                    <h5>¡Actualización hecha!</h5>
                    <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                        ¿Que tal señor@ <b>{formData.name}</b>? ; Ya puede iniciar en el sistema como un usuario.<b>{formData.email}</b>.
                    </p>
                </div>
            </Dialog>


            <div className="flex justify-content-center">
                    <div className='card card-container'>
                    <h5 className="text-center">Perfil</h5>
                    <Form onSubmit={onSubmit} initialValues={{ nombre: '', email: '', password: '', nroCelular: '', direccion: ''}} validate={validate} render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit} className="p-fluid">

                            <Field name="nombre" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label p-input-icon-right">
                                    <i className="pi pi-user" />
                                        <InputText placeholder={currentUser.nombre}  id="nombre" {...input} autoFocus className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="nombre" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Nombre*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />

                            <Field name="email" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label p-input-icon-right">
                                        <i className="pi pi-envelope" />
                                        <InputText id="email" {...input} placeholder={currentUser.email} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="email" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Correo electrónico*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                            <Field name="password" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <Password id="password" {...input} toggleMask className={classNames({ 'p-invalid': isFormFieldValid(meta) })} header={passwordHeader} footer={passwordFooter} />
                                        <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Contraseña*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />

                            <Field name="nroCelular" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label p-input-icon-right">
                                    <i className="pi pi-id-card" />
                                        <InputText id="nroCelular" placeholder={currentUser.nroCelular}  {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="nroCelular" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Contacto*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />

                            <Field name="direccion" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label p-input-icon-right">
                                    <i className="pi pi-send" />
                                        <InputTextarea id="direccion" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} rows={5} cols={30} autoResize/>
                                        <label htmlFor="direccion" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Dirección*</label>
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
}

export default ActualizarUser;