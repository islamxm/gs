import HeaderProfile from '../../components/HeaderProfile/HeaderProfile';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Row, Col } from 'antd';
import SettingsAdmins from './components/SettingsAdmins/SettingsAdmins';
import SettingsContacts from './components/SettingsContacts/SettingsContacts';
import Button from '../../components/Button/Button';
import { BsTrash } from 'react-icons/bs';
import Pl from '../../components/Pl/Pl';
import { useState } from 'react';
import SettingsAddUser from './modals/SettingsAddUser/SettingsAddUser';
import SettingsEditUser from './modals/SettingsEditUser/SettingsEditUser';


const SettingsPage = () => {
    const [addUser, setAddUser] = useState(false)
    const [editUser, setEditUser] = useState(false);

    const openAddUser = () => {
        setAddUser(true)
    }
    const closeAddUser = () => {
        setAddUser(false)
    }
    
    const openEditUser = () => {
        setEditUser(true)
    }
    const closeEditUser = () => {
        setEditUser(false)
    }



    return (
        <div className="SettingsPage page">
            <SettingsAddUser visible={addUser} close={closeAddUser}/>
            <SettingsEditUser visible={editUser} close={closeEditUser}/>
            <HeaderProfile/>
            <div className="pageBody">
                <Sidebar/>
                <div className="spc"></div>
                <div className="SettingsPage__body pageBody-content">
                    <Row gutter={[30, 0]}>
                        <Col span={12}>
                            <Row className="row-custom">
                                <SettingsAdmins editUser={openEditUser} addUser={openAddUser}/>
                            </Row>
                            <Row className="row-custom">
                                <SettingsContacts/>
                            </Row>
                            <Row className="row-custom" style={{marginTop: 30}}>
                                <Button text={'Сохранить'} before={<BsTrash/>} styles={{width: '100%'}}/>
                            </Row>
                        </Col>
                        <Col span={12}>
                            {/* <Row className="row-custom">
                                <Pl text={'Доставка и оплата'} style={{backgroundColor: '#fff', justifyContent:'flex-sar'}}/>
                            </Row> */}
                            <Row className="row-custom">
                                <Button text={'Доставка и оплата'} variant={'light'} styles={{width: '100%'}}/>
                            </Row>
                            <Row className="row-custom">
                                <Button text={'Политика конфиденциальности'} variant={'light'} styles={{width: '100%'}}/>
                            </Row>
                            <Row className="row-custom">
                                <Button text={'Карта лояльности'} variant={'light'} styles={{width: '100%'}}/>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}


export default SettingsPage;
