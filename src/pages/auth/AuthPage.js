import './AuthPage.scss';
import Header from '../../components/Header/Header';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';




const AuthPage = () => {
    return (
        <div className="AuthPage page">  
            <Header/>
            <main className="Main">
                <div className="AuthPage__in">
                    <div className="AuthPage__body">
                        <h2 className="AuthPage__body_title">Вход в админ-панель</h2>
                        <form className="AuthPage__body_form">
                            <div className="AuthPage__body_form_item">
                                <Input
                                    placeholder={'Логин'}
                                    type={'text'}
                                    />
                            </div>
                            <div className="AuthPage__body_form_item">
                                <Input
                                    placeholder={'Пароль'}
                                    type={'password'}
                                    />
                            </div>
                            <div className="AuthPage__body_form_action">
                                <Button
                                    styles={{minWidth: 315}} 
                                    text={'Войти'}
                                    justify={'center'}
                                    type={'button'}/>
                            </div>
                        </form>
                    </div>
                </div>
                
            </main>
        </div>
    )
}

export default AuthPage;