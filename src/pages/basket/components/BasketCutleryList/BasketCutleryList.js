import './BasketCutleryList.scss';
import Input from '../../../../components/Input/Input';
import Pl from '../../../../components/Pl/Pl';
import { useState } from 'react';
import BasketAddCutlery from '../../modals/BasketAddCutlery/BasketAddCutlery';
import BasketEditCutlery from '../../modals/BasketEditCutlery/BasketEditCutlery';

const mock = [
    {value: 'Вилки'},
    {value: 'Ложки'},
]

const BasketCutleryList = () => {
    const [addCutlery, setAddCutlery] = useState(false);
    const [editCutlery, setEditCutlery] = useState(false);

    const openAddCutlery = () => {
        setAddCutlery(true)
    }
    const closeAddCutlery = () => {
        setAddCutlery(false)
    }
    const openEditCutlery = () => {
        setEditCutlery(true)
    }
    const closeEditCutlery = () => {
        setEditCutlery(false)
    }
    
    return (
        <div className="BasketCutleryList">
            <BasketAddCutlery visible={addCutlery} close={closeAddCutlery}/>
            <BasketEditCutlery visible={editCutlery} close={closeEditCutlery}/>
            <h3 className="BasketCutleryList__head" style={{fontWeight: 600, color: '#989898', marginBottom: 10, fontSize: '16px'}}>
            Список столовых приборов
            </h3>
            <div className="BasketCutleryList__list">
                {
                    mock.map((item, index) => (
                        <Input onClick={openEditCutlery} style={{marginBottom: 10}} value={item.value} readOnly/>
                    ))
                }
            </div>
            <div className="BasketCutleryList__action">
                <Pl onClick={openAddCutlery} style={{backgroundColor: '#fff'}} text={'Добавить столовый прибор'}/>
            </div>
        </div>
    )
}

export default BasketCutleryList;