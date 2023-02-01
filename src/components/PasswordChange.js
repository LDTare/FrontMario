import React, { useState, useRef } from 'react';
import { Form, Field } from 'react-final-form';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Toast } from 'primereact/toast';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import { updatePassword } from '../actions/auth';
import { useSelector } from "react-redux";
const PasswordUser = () => {
    const toast = useRef(null);
    const toastBC = useRef(null);

    const show = () => {
        toast.current.show({ severity: 'success', summary: 'Cambio hecho', detail: 'Su contraseña ha sido cambiada, por favor cierre sesión y compruebe el cambio.' });
    };
    const { user: currentUser } = useSelector((state) => state.auth);
    const [, setFormData] = useState({}); // eslint-disable-line react-hooks/exhaustive-deps
    const validate = (data) => {
        let errors = {};

        if (!data.password) {
            errors.password = '¡Contraseña requerida!';
        }

        if (!data.confirmPassword) {
            errors.confirmPassword = '¡Contraseña requerida!';
        }

        return errors;
    };

    function isConfirm(p1, p2){
        if(p1 === p2){
            return true;
        }else{
            return false;
        }
    }

    const onSubmit = (data, form) => {
        setFormData(data);
        const valid = isConfirm(data.password, data.confirmPassword);
        if(valid){
            updatePassword(currentUser.id, data.password);
            show();
            console.log("No error");
        }else{
            console.log("Error");
        }
    };

    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };
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
            <Toast ref={toast} />
            <Toast ref={toastBC} position="bottom-center" />
            <div className="flex justify-content-center">
                    <div className='card card-container'>
                    <h5 className="text-center">Cambio de contraseña</h5>
                    <Form onSubmit={onSubmit} initialValues={{ password: '', confirmPassword: '',}} validate={validate} render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit} className="p-fluid">

                            <Field name="password" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label p-input-icon-right">
                                        <i className="pi pi-envelope" />
                                        <Password id="password" {...input} toggleMask className={classNames({ 'p-invalid': isFormFieldValid(meta) })} header={passwordHeader} footer={passwordFooter}/>
                                        <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Contraseña*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                            <Field name="confirmPassword" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <Password id="confirmPassword" {...input} toggleMask className={classNames({ 'p-invalid': isFormFieldValid(meta) })} header={passwordHeader} footer={passwordFooter} />
                                        <label htmlFor="confirmPassword" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Confirmar contraseña*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />

                            <Button type="submit" label="Actualizar" className="mt-2" />
                        </form>
                    )} />
                </div>
            </div>
        </div>
    );
}

export default PasswordUser;