import './PolyPrice.scss';
import {  Modal } from 'antd';
import Input from '../../../../components/Input/Input';
import {Row, Col} from 'antd';
import Pl from '../../../../components/Pl/Pl';
import Button from '../../../../components/Button/Button';
import {BsTrash} from 'react-icons/bs';
import { useEffect, useRef, useState } from 'react';
import SaveIcon from '../../../../icons/SaveIcon/SaveIcon';
import orgService from '../../../../services/orgService';
import { useSelector } from 'react-redux';





const PolyPrice = ({
    visible, 
    close,
    data,
    update,
}) => {

    const [MinPrice, setMinPrice] = useState('')
    const [DeliveryPrice, setDeliveryPrice] = useState('')

    const closeModal = () => {
        setMinPrice('')
        setDeliveryPrice('')
        close()
    }

    useEffect(() => {
        if(data) {
            setMinPrice(data?.MinPrice)
            setDeliveryPrice(data?.DeliveryPrice)
        }
    }, [data])

    const onSave = () => {
        if(data) {
            update(state => {
                const r = state;
                const m = r.splice(r.findIndex(item => item.ID == data.ID), 1, {
                    ID: data.ID,
                    MinPrice,
                    DeliveryPrice,
                    Disabled: '0',
                    PolygonID: data.PolygonID
                })
                return [...r];
            })
            closeModal()
        } else {
            update(state => {
                return [
                    ...state,
                    {
                        MinPrice,
                        DeliveryPrice,
                        Disabled: '0'
                    }
                ]
            })
            closeModal()
        }
        
    }


  


    return (
        <Modal width={550} className='Modal SelectPoly' open={visible} onCancel={closeModal}>
            <div className="Modal__head">Добавить цену</div>
            <form className="Modal__form">
                <Row gutter={[0,10]}>
                    <Col span={24}>
                        <Input 
                            onChange={e => setMinPrice(e.target.value)}
                            value={MinPrice}
                            placeholder={'Сумма заказа от'}/>
                    </Col>
                    <Col span={24}>
                        <Input
                            value={DeliveryPrice}
                            onChange={e => setDeliveryPrice(e.target.value)} 
                            placeholder={'Цена доставки'}/>
                    </Col>
                    <Col span={24}>
                        <Button
                            styles={{width: '100%'}}
                            onClick={onSave}
                            disabled={!DeliveryPrice || !MinPrice}
                            text={'Сохранить'}
                            type={'button'}
                            before={<SaveIcon color={'#fff'} size={20}/>}
                            />
                        
                    </Col>
                </Row>
            </form>
        </Modal>
    )
}

export default PolyPrice;