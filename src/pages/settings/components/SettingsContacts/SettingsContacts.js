import Input from '../../../../components/Input/Input';
import Pl from '../../../../components/Pl/Pl';
const SettingsContacts = () => {
    return (
        <div className="SettingsContacts part">
            <h3 className="def-label">Контакты</h3>
            <div className="SettingsContacts__body">
                <Input style={{marginBottom: 10}} value={'+7 (977) 524 73 08'}/> 
                <Input style={{marginBottom: 10}} value={'https://whats.app/user/nj423jh4hk3...'}/> 
                <Pl text={'Добавить контакт'} style={{backgroundColor: '#fff'}}/>
            </div>
        </div>
    )
}

export default SettingsContacts;