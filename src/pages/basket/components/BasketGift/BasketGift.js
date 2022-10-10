import './BasketGift.scss';
import Input from '../../../../components/Input/Input';
import Pl from '../../../../components/Pl/Pl';
import { useState } from 'react';
import BasketAddGift from '../../modals/BasketAddGift/BasketAddGift';


const mock = [
    {value: 'Подарок 1'},
    {value: 'Подарок 2'},
]

const BasketGift = () => {
    const [addGift, setAddGift] = useState(false);
    const openAddGift = () => {
        setAddGift(true)
    }
    const closeAddGift = () => {
        setAddGift(false)
    }
    return (
        <div className="BasketGift">
            <BasketAddGift visible={addGift} close={closeAddGift}/>
            <h3 className="BasketRec__head" style={{fontWeight: 600, color: '#989898', marginBottom: 10, fontSize: '16px'}}>
            Подарки
            </h3>
            <div className="BasketRec__list">
                {
                    mock.map((item, index) => (
                        <Input style={{marginBottom: 10}} value={item.value} readOnly/>
                    ))
                }
            </div>
            <div className="BasketRec__action">
                <Pl onClick={openAddGift} style={{backgroundColor: '#fff'}} text={'Добавить подарок'}/>
            </div>
        </div>
    )
}

export default BasketGift;