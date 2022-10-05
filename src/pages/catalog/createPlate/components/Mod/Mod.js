import './Mod.scss';
import Pl from '../../../../../components/Pl/Pl';
import AddMod from '../../../modals/addMod/AddMod';
import { useState } from 'react';
import EditMod from '../../../modals/editMod/EditMod';



const Mod = () => {
    const [addMod, setAddMod] = useState(false);
    const [editMod, setEditMod] = useState(false);

    const openAddMod = () => {
        setAddMod(true)
    }
    const closeAddMod = () => {
        setAddMod(false)
    }

    const openEditMod = () => {
        setEditMod(true)
    }

    const closeEditMod = () => {
        setEditMod(false)
    }

    return (
        <div className="Mod">
            <AddMod visible={addMod} close={closeAddMod}/>
            <EditMod visible={editMod} close={closeEditMod}/>
            <h3 className="panel-label Mod__head">Модификаторы</h3>
            <div className="Mod__body panel">
                <div className="Mod__body_action"></div>
                <div className="Mod__body_list">
                    <div className="Mod__body_item">
                        <div className="Mod__body_item_name">Модификатор</div>
                        <div className="Mod__body_item_value">300 ₽</div>
                    </div>
                    <div className="Mod__body_item">
                        <div className="Mod__body_item_name">Модификатор</div>
                        <div className="Mod__body_item_value">300 ₽</div>
                    </div>
                    <div className="Mod__body_item">
                        <div className="Mod__body_item_name">Модификатор</div>
                        <div className="Mod__body_item_value">300 ₽</div>
                    </div>
                </div>
            </div>
            <div className="Mod__add">
                <Pl onClick={openAddMod} text={'Добавить группу модификаторов'} style={{backgroundColor: '#fff'}}/>
            </div>
        </div>
    )
}

export default Mod;