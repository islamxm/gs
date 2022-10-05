import './ExMass.scss';
import Pl from '../../../../../components/Pl/Pl';
import AddMassModal from '../../../modals/addMassModal/AddMassModal';
import useModal from '../../../../../hooks/useModal';
import { useState } from 'react';
import EditMass from '../../../modals/editMass/EditMass';

const ExMass = () => {
    const [editMass, setEditMass] = useState(false);
    const [addMass, setAddMass] = useState(false);

    const openAddMass = () => {
        setAddMass(true)
    }
    const closeAddMass = () => {
        setAddMass(false)
    }

    const openEditMass = () => {
        setEditMass(true)
    }
    const closeEditMass = () => {
        setEditMass(false)
    }


    return (
        <div className="ExMass">
            <AddMassModal visible={addMass} close={closeAddMass}/>
            <EditMass visible={editMass} close={closeEditMass}/>
            <h3 className="ExMass__head panel-label">Список дополнительных масс</h3>
            <div className="ExMass__body">
                <div className="ExMass__body_list">
                    <div onClick={openEditMass} className="ExMass__body_item panel">
                        <div  className="ExMass__body_item_mass ExMass__body_item_val">Масса: 100 г</div>
                        <div className="ExMass__body_item_prices">
                            <div className="ExMass__body_item_prices_main ExMass__body_item_val">Цена: 300 ₽</div>
                            <div className="ExMass__body_item_prices_discount ExMass__body_item_val">Цена со скидкой: 300 ₽</div>
                        </div>
                    </div>
                    <div onClick={openEditMass} className="ExMass__body_item panel">
                        <div  className="ExMass__body_item_mass ExMass__body_item_val">Масса: 100 г</div>
                        <div className="ExMass__body_item_prices">
                            <div className="ExMass__body_item_prices_main ExMass__body_item_val">Цена: 300 ₽</div>
                            
                        </div>
                    </div>
                </div>
                <div className="ExMass__add">
                    <Pl onClick={openAddMass} text={'Добавить массу'} style={{backgroundColor: '#fff'}}/>
                </div>
            </div>
        </div>
    )
}

export default ExMass;