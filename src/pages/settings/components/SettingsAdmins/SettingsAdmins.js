import Input from '../../../../components/Input/Input';
import Pl from '../../../../components/Pl/Pl';

const SettingsAdmins = ({addUser, editUser}) => {
    return (
        <div className="SettingsAdmins part">
            <h3 className="def-label">Пользователи админ-панели</h3>
            <div className="SettingsAdmins__body">
                <Input onClick={editUser} readOnly value={'Admin 112'} style={{marginBottom: 12}}/>
                <Input onClick={editUser} readOnly value={'Developer 2321'} style={{marginBottom: 12}}/>
                <Pl onClick={addUser} text={'Добавить пользователя'} style={{backgroundColor: '#fff'}}/>
            </div>
        </div>
    )
}

export default SettingsAdmins;