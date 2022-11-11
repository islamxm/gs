import './SelectPoly.scss';
import {  Modal } from 'antd';
import Input from '../../../../components/Input/Input';
import {Row, Col} from 'antd';
import Pl from '../../../../components/Pl/Pl';
import Button from '../../../../components/Button/Button';
import {BsTrash} from 'react-icons/bs';
import { useEffect, useRef, useState } from 'react';
import { Wrapper, Status} from "@googlemaps/react-wrapper";
import PolyMap from '../../../../components/PolyMap/PolyMap';
import { useSelector } from 'react-redux';
import orgService from '../../../../services/orgService';
import PolyPrice from '../polyPrice/PolyPrice';


const os = new orgService()


const SelectPoly = ({
    visible, 
    close, 
    setLocation, 
    update, 
    orgId,
    data
}) => {
    const {token} = useSelector(state => state)
    const [selected, setSelected] = useState(null);
    const [MinPrice, setMinPrice] = useState('')
    const [DeliveryTime, setDeliveryTime] = useState('')
    const [Delivery, setDelivery] = useState([])
    const [coords, setCoords] = useState(null)
    const [saveLoad, setSaveLoad] = useState(false)
    const [delLoad, setDelLoad] = useState(false)
    const [polyPriceModal, setPolyPriceModal] = useState(false)
    const [editPrice, setEditPrice] = useState(null)
    
    const hideModal = () => {
        setSelected(null)
        setMinPrice('')
        setDeliveryTime('')
        setDelivery([])
        setCoords(null)
        close();
    }

    const closePriceModal = () => {
        setEditPrice(null)
        setPolyPriceModal(false)
    }

    const openPriceModal = () => {
        setPolyPriceModal(true)
    }

    const openEditPrice = ({...item}) => {
        setEditPrice(item)
        console.log(item)
        openPriceModal()
    }



    useEffect(() => {
        if(data) {
            console.log(data)
            setMinPrice(data.MinPrice)
            setDelivery(data.Delivery)
            setDeliveryTime(data.DeliveryTime)
            setCoords(data.Coordinates)
        } else {
            setCoords([
                {lat: 55.5, lng: 37.5},
                {lat: 55.5, lng: 37.3},
                {lat: 55.7, lng: 37.4}
            ])
        }
    }, [data])



    const onSave = () => {    
        if(!data) {
            if(selected) {
                os.addPol(token, {
                    OrganisationID: orgId,
                    Disabled: '0',
                    Coordinates: selected.map(item => {
                        return `${item.lat()},${item.lng()}`
                    }).join(' '),
                    MinPrice,
                    DeliveryTime,
                    Delivery,
                }).then(res => {
                    setLocation(res.map(item => {
                        return {
                            ...item,
                            Coordinates: item.Coordinats.split(' ').map(item => {
                                return {
                                    lat: Number(item.slice(0, item.indexOf(','))),
                                    lng: Number(item.slice(item.indexOf(',') + 1, item.length))
                                }
                            }),
                            Coordinats: null
                        }
                    }))
                    setLocation(res)
                }).finally(_ => {
                    hideModal()
                })
            } else {
                os.addPol(token, {
                    OrganisationID: orgId,
                    Disabled: '0',
                    Coordinates: coords.map(item => {
                        return `${item.lat},${item.lng}`
                    }).join(' '),
                    MinPrice,
                    DeliveryTime,
                    Delivery,
                }).then(res => {
                    setLocation(res.map(item => {
                        return {
                            ...item,
                            Coordinates: item.Coordinats.split(' ').map(item => {
                                return {
                                    lat: Number(item.slice(0, item.indexOf(','))),
                                    lng: Number(item.slice(item.indexOf(',') + 1, item.length))
                                }
                            }),
                            Coordinats: null
                        }
                    }))
                }).finally(_ => {
                    hideModal()
                })
            }
            
        } else {
            if(selected) {
                os.editPol(token, {
                    PolygonID: data.PolygonID,
                    OrganisationID: orgId,
                    Disabled: '0',
                    Coordinates: selected.map(item => {
                        return `${item.lat()},${item.lng()}`
                    }).join(' '),
                    MinPrice,
                    DeliveryTime,
                    Delivery
                }).then(res => {
                    setLocation(res.map(item => {
                        return {
                            ...item,
                            Coordinates: item.Coordinats.split(' ').map(item => {
                                return {
                                    lat: Number(item.slice(0, item.indexOf(','))),
                                    lng: Number(item.slice(item.indexOf(',') + 1, item.length))
                                }
                            }),
                            Coordinats: null
                        }
                    }))
                }).finally(_ => {
                    hideModal()
                })
            } else {
                console.log(Delivery)
                os.editPol(token, {
                    PolygonID: data.PolygonID,
                    OrganisationID: orgId,
                    Disabled: '0',
                    MinPrice,
                    DeliveryTime,
                    Coordinates: data.Coordinates.map(item => {
                        return `${item.lat},${item.lng}`
                    }).join(' '),
                    Delivery
                }).then(res => {
                    setLocation(res.map(item => {
                        return {
                            ...item,
                            Coordinates: item.Coordinats.split(' ').map(item => {
                                return {
                                    lat: Number(item.slice(0, item.indexOf(','))),
                                    lng: Number(item.slice(item.indexOf(',') + 1, item.length))
                                }
                            }),
                            Coordinats: null
                        }
                    }))
                }).finally(_ => {
                    hideModal()
                })
            }
            
        }
        
    }  
    
    const onDelete = () => {
        setDelLoad(true)
        os.deletePol(token, {PolygonID: data.PolygonID}).then(res => {
            setLocation(res)
        }).finally(_ => {
            setDelLoad(false)
            hideModal()
        })
    }




    const removeDelItem = (index) => {
        const r = Delivery;
        const m = r.splice(index, 1)
        setDelivery([...r])
    }

    return (
        <Modal width={1220} className='Modal SelectPoly' open={visible} onCancel={hideModal}>
            <PolyPrice data={editPrice} visible={polyPriceModal} close={closePriceModal} update={setDelivery}/>
            <div className="Modal__head">Выбрать полигон</div>
            <form className="Modal__form">
                <Row gutter={[25, 0]}>
                    <Col span={14}>
                        <Row gutter={[0, 15]}>
                            <Col span={24}>
                                <div className="Modal__form_map" style={{height: 290}}>
                                    <Wrapper 
                                        apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}> 
                                        <PolyMap polyCoords={coords} setSelected={setSelected}/>
                                    </Wrapper>
                                </div>
                            </Col>
                            <Col span={24}>
                                <Input 
                                    value={MinPrice}
                                    onChange={(e) => setMinPrice(e.target.value)}
                                    shadow 
                                    placeholder={'Минимальная сумма заказа'}/>
                            </Col>
                            <Col span={24}>
                                <Input
                                    value={DeliveryTime}
                                    onChange={(e) => setDeliveryTime(e.target.value)} 
                                    shadow 
                                    placeholder={'Время доставки'}/>
                            </Col>
                            <Col span={24}>
                                <Button
                                    styles={{width: '100%'}}
                                    text={'Сохранить'}
                                    before={<BsTrash/>}
                                    load={saveLoad}
                                    type={'button'}
                                    disabled={!MinPrice || !DeliveryTime || Delivery?.length == 0}
                                    onClick={onSave}
                                    />
                                {
                                    data ? (
                                        <Button
                                        styles={{width: '100%', marginTop: 10}}
                                        text={'Удплить'}
                                        before={<BsTrash/>}
                                        variant={'danger'}
                                        load={delLoad}
                                        type={'button'}
                                        onClick={onDelete}
                                        /> 
                                    ) : null
                                }
                            </Col>
                        </Row>
                       
                    </Col>
                    <Col span={10}>
                        <Row gutter={[0,10]}>
                            <Col span={24} className="def-label">
                                Таблица цен доставки
                            </Col>
                            <Col span={24}>
                                <div className="SelectPoly__list">
                                    {
                                        Delivery && Delivery.length > 0 ? (
                                            Delivery.map((item, index) => (
                                                <div className="SelectPoly__item" key={index}>
                                                    <div className="SelectPoly__item_main" onClick={() => openEditPrice({...item})}>
                                                        <div className="SelectPoly__item_p">
                                                            <div className="SelectPoly__item_p_name">Сумма заказа от</div>
                                                            <div className="SelectPoly__item_p_value">{item.MinPrice}</div>
                                                        </div>
                                                        <div className="SelectPoly__item_p">
                                                            <div className="SelectPoly__item_p_name">Цена доставки</div>
                                                            <div className="SelectPoly__item_p_value">{item.DeliveryPrice}</div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="SelectPoly__item_action">
                                                        <Button
                                                            type={'button'}
                                                            styles={{width: '100%'}} 
                                                            variant={'danger'} 
                                                            text={'Удалить цену'} 
                                                            before={<BsTrash/>}
                                                            onClick={() => removeDelItem(index)}
                                                            />
                                                    </div>
                                                </div>
                                            ))
                                        ) : null
                                    }
                                   
                                </div>
                            </Col>
                            <Col span={24}>
                                <Pl 
                                    onClick={openPriceModal}
                                    style={{backgroundColor: '#fff', width: '100%'}} 
                                    text={'Добавить цену'}/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </form>
        </Modal>
    )
}

export default SelectPoly;