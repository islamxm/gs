import {  Modal } from 'antd';
import Input from '../../../../components/Input/Input';
import {Row, Col} from 'antd';
import Pl from '../../../../components/Pl/Pl';
import Button from '../../../../components/Button/Button';
import {BsTrash} from 'react-icons/bs';
import DropCollapse from '../../../../components/DropCollapse/DropCollapse';
import { useState } from 'react';
import './BasketTable.scss';

const tableList = [
    {
        from: 0,
        to: 1,
        free: 3
    },
    {
        from: 0,
        to: 1,
        free: 3
    },
    {
        from: 0,
        to: 1,
        free: 3
    }
]


const BasketTable = ({visible, close, addTable, editTable}) => {
    const handleClose = () => {
        close();
    }

    const addTableHandle = () => {
        addTable()
    }

    const editTableHandle = () => {
        editTable();
    }

    
    
    return (
        <Modal width={500} className='Modal' open={visible} onCancel={handleClose}>
            <h2 className="Modal__head">Таблица дополнений</h2>
            <form className="Modal__form">
                <div className="BasketTable">
                    <div className="BasketTable__row BasketTable__row-head">
                        <div className="BasketTable__row_item BasketTable__head">Позиции от</div>
                        <div className="BasketTable__row_item BasketTable__head">Позиции до</div>
                        <div className="BasketTable__row_item BasketTable__head">FREE</div>
                    </div>
                    {
                        tableList.map((item, index) => (
                            <div className="BasketTable__row" onClick={editTableHandle}>
                                <div className="BasketTable__row_item">{item.from}</div>
                                <div className="BasketTable__row_item">{item.to}</div>
                                <div className="BasketTable__row_item">{item.free}</div>
                            </div>
                        ))
                    }
                    <Pl onClick={addTableHandle} text={'Добавить позицию'} style={{justifyContent: 'center', backgroundColor: '#fff'}}/>
                </div>
                <div className="Modal__form_action">
                    <Button 
                        type={'button'} 
                        styles={{paddingTop: 15, paddingBottom: 15}} 
                        before={<BsTrash/>} 
                        justify={'flex-start'} 
                        text={'Сохранить'}/>
                    
                </div>
            </form>
        </Modal>
    )
}

export default BasketTable;