import './AuthPage.scss';
import Header from '../../components/Header/Header';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import {Formik, Form} from 'formik';
import dataService from '../../services/dataService';
import { useEffect, useState } from 'react';
import {message} from 'antd';
import { useDispatch } from 'react-redux';
import { tokenUpdate } from '../../store/actions';
import { useNavigate } from 'react-router-dom';

const LOCAL_STORAGE = window.localStorage;
const ds = new dataService();

const initValues = {
    Login: '',
    Password: ''
}

const AuthPage = () => {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState('')



    return (
        <div className="AuthPage page">  
            <Header/>
            <main className="Main">
                <div className="AuthPage__in">
                    <div className="AuthPage__body">
                        <h2 className="AuthPage__body_title">Вход в админ-панель</h2>
                        <Formik
                            initialValues={initValues}
                            onSubmit={(values, {setSubmitting}) => {
                                setSubmitting(true);
                                ds.auth(values).then(res => {
                                    console.log(res)
                                    if(res.error) {
                                        setError(res.message)
                                        
                                    } else {
                                        setError('')
                                        LOCAL_STORAGE.setItem('gs-token', res.user.Token)
                                        dispatch(tokenUpdate(res.user.Token))
                                        nav('/organizations', {replace: true})
                                    }   
                                }).finally(_ => {
                                    setSubmitting(false)
                                })
                            }}
                            >
                            {({values, errors, isSubmitting, handleChange, handleBlur}) => (
                                <Form className='AuthPage__body_form'>
                                    <div className="AuthPage__body_form_item">
                                        <Input
                                            name={'Login'}
                                            placeholder={'Логин'}
                                            type={'text'}
                                            value={values.Login}
                                            onChange={handleChange}
                                            error={error}
                                            />
                                    </div>
                                    <div className="AuthPage__body_form_item">
                                        <Input
                                            name={'Password'}
                                            placeholder={'Пароль'}
                                            type={'password'}
                                            value={values.Password}
                                            onChange={handleChange}
                                            error={error}
                                            />
                                    </div>
                                    <div className="AuthPage__body_form_action">
                                        <Button
                                            load={isSubmitting}
                                            styles={{minWidth: 315}} 
                                            text={'Войти'}
                                            justify={'center'}
                                            type={'submit'}/>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                        
                    </div>
                </div>
                
            </main>
        </div>
    )
}

export default AuthPage;