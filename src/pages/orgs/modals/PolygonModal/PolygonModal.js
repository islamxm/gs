import './PolygonModal.scss';
import {  message, Modal } from 'antd';
import Input from '../../../../components/Input/Input';
import {Row, Col} from 'antd';
import Pl from '../../../../components/Pl/Pl';
import Button from '../../../../components/Button/Button';
import {BsTrash} from 'react-icons/bs';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import orgService from '../../../../services/orgService';
import PolyPrice from '../polyPrice/PolyPrice';
import SaveIcon from '../../../../icons/SaveIcon/SaveIcon';
import MapPolygon from '../../../../components/MapPolygon/MapPolygon';
import SelectColor from './SelectColor/SelectColor';
import Checkbox from '../../../../components/Checkbox/Checkbox';
import Text from '../../../../components/Text/Text';
const os = new orgService()


const PolygonModal = ({visible, close, data, orgId,setPolList}) => {

    const {token} = useSelector(state => state)
    const [selected, setSelected] = useState(null);
    const [Name, setName] = useState('')
    const [MinPrice, setMinPrice] = useState('')
    const [DeliveryTime, setDeliveryTime] = useState('')
    const [Delivery, setDelivery] = useState([])
    const [coords, setCoords] = useState(null)
    const [saveLoad, setSaveLoad] = useState(false)
    const [delLoad, setDelLoad] = useState(false)
    const [polyPriceModal, setPolyPriceModal] = useState(false)
    const [editPrice, setEditPrice] = useState(null)
    const [Color, setColor] = useState('')
    const [IsOnlyForOnlinePayment, setIsOnlyForOnlinePayment] = useState('0')

    const [textCoords, setTextCoords] = useState()

    useEffect(() => {
        if(data) {
            
            setMinPrice(data?.MinPrice)
            setDelivery(data?.Delivery)
            setDeliveryTime(data?.DeliveryTime)
            // setCoords(data?.Coordinates)
            setTextCoords(data?.Coordinates.map(item => {
                return `${item.lat},${item.lng}`
            }).join(' '))
            setColor(data?.Color)
            setName(data?.Name)
            setIsOnlyForOnlinePayment(data?.IsOnlyForOnlinePayment)
        } else {
            // setCoords(null)
            setTextCoords('')
            setColor('#000000')
        }
    }, [data, visible])
    
    const closePriceModal = () => {
        setEditPrice(null)
        setPolyPriceModal(false)
    }
    const openPriceModal = () => {
        setPolyPriceModal(true)
    }
    const openEditPrice = ({...item}) => {
        setEditPrice(item)
        openPriceModal()
    }
    const closeHandle = () => {
        setSelected(null)
        setMinPrice('')
        setDeliveryTime('')
        setDelivery([])
        setCoords(null)
        setName('')
        setIsOnlyForOnlinePayment('0')
        close();
    }

    useEffect(() => {
        if(textCoords) {
            console.log(textCoords)
            const arr = textCoords.split(' ');
            const r = arr.filter(item => {
                const ff = item.split(',')
                if(ff.length == 2) {
                    return item
                }
                
            }).map(g => {
                const tt = g.split(',')
                return {
                    lat: Number(tt[0]),
                    lng: Number(tt[1])
                }
            })
            setCoords(r)
        }
    }, [textCoords])

    const removeDelItem = (index) => {
        const r = Delivery;
        const m = r.splice(index, 1)
        setDelivery([...r])
    }

    useEffect(() => {
        if(selected?.length > 0) {
            setTextCoords(selected.map(item => {
                return `${item.lat()},${item.lng()}`
            }).join(' '))
        }
    }, [selected])

    const onSave = () => {    
        if(!data) {
            if(textCoords) {
                const data = {
                    OrganisationID: orgId,
                    Disabled: '0',
                    // Coordinates: selected.map(item => {
                    //     return `${item.lat()},${item.lng()}`
                    // }).join(' '),
                    Coordinates: textCoords,
                    MinPrice,
                    DeliveryTime,
                    Delivery,
                    Name,
                    Color,
                    IsOnlyForOnlinePayment
                }
                os.addPol(token, data).then(res => {
                    setPolList(res.map(item => {
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
                    // setPolList(res)
                }).finally(_ => {
                    closeHandle()
                })
            } else {
                // os.addPol(token, {
                //     OrganisationID: orgId,
                //     Disabled: '0',
                //     Coordinates: coords.map(item => {
                //         return `${item.lat},${item.lng}`
                //     }).join(' '),
                //     MinPrice,
                //     DeliveryTime,
                //     Delivery,
                // }).then(res => {
                //     setLocation(res.map(item => {
                //         return {
                //             ...item,
                //             Coordinates: item.Coordinats.split(' ').map(item => {
                //                 return {
                //                     lat: Number(item.slice(0, item.indexOf(','))),
                //                     lng: Number(item.slice(item.indexOf(',') + 1, item.length))
                //                 }
                //             }),
                //             Coordinats: null
                //         }
                //     }))
                // }).finally(_ => {
                //     closeHandle()
                // })
                message.error('?????????????? ???? ????????????')
                
                console.log('????????????-???? ?????? SELECTED')
            }
            
        } else {
            if(textCoords) {
                os.editPol(token, {
                    PolygonID: data.PolygonID,
                    OrganisationID: orgId,
                    Disabled: '0',
                    // Coordinates: selected.map(item => {
                    //     return `${item.lat()},${item.lng()}`
                    // }).join(' '),
                    Coordinates: textCoords,
                    MinPrice,
                    DeliveryTime,
                    Delivery,
                    Name,
                    Color,
                    IsOnlyForOnlinePayment
                }).then(res => {
                    setPolList(res.map(item => {
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
                    closeHandle()
                })
            } else {
                os.editPol(token, {
                    PolygonID: data.PolygonID,
                    OrganisationID: orgId,
                    Disabled: '0',
                    MinPrice,
                    DeliveryTime,
                    // Coordinates: data.Coordinates.map(item => {
                    //     return `${item.lat},${item.lng}`
                    // }).join(' '),
                    Coordinates: textCoords,
                    Delivery,
                    Name,
                    Color,
                    IsOnlyForOnlinePayment
                }).then(res => {
                    setPolList(res.map(item => {
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
                    closeHandle()
                })
            }
            
        }
        
    }  
    
    const onDelete = () => {
        setDelLoad(true)
        os.deletePol(token, {PolygonID: data.PolygonID, Delete: 'hard'}).then(res => {
            setPolList(res.map(item => {
                return {
                    ...item,
                    Coordinates: item.Coordinats.split(' ').map(item => {
                        
                        return {
                            lat: Number(item.slice(0, item.indexOf(','))),
                            lng: Number(item.slice(item.indexOf(',') + 1, item.length))
                        }
                    }),
                    Coordinats: null,
                }
            }))
        }).finally(_ => {
            setDelLoad(false)
            closeHandle()
        })
    }

    

    return (
        <Modal width={1220} className="Modal" open={visible} onCancel={closeHandle}>
            <PolyPrice data={editPrice} visible={polyPriceModal} close={closePriceModal} update={setDelivery}/>
            <div className="Modal__head">?????????????? ??????????????</div>
            <form className="Modal__form">
                <Row gutter={[25, 0]}>
                    <Col span={14}>
                        <Row gutter={[0, 20]}>
                            <Col span={24}>
                                <div className="Modal__form_map" style={{height: 290}}>  
                                    <MapPolygon
                                        color={Color}
                                        id={'polygon-modal'}
                                        setSelected={setSelected} 
                                        polygonCoords={coords} 
                                        center={{lat: 55.7522200,lng: 37.6155600}}/>
                                </div>
                            </Col>
                            <Col span={24}>
                                <div className="def-label">???????????????? ???????? ????????????????</div>
                                <SelectColor color={Color} setColor={setColor}/>
                            </Col>
                            <Col span={24}>
                                <Checkbox
                                    shadow={true}
                                    id={'IsOnlyForOnlinePayment'}
                                    text={'???????????? ?????? ???????????? ????????????'}
                                    checked={IsOnlyForOnlinePayment == '1'}
                                    onChange={e => e.target.checked ? setIsOnlyForOnlinePayment('1') : setIsOnlyForOnlinePayment('0')}
                                    />
                            </Col>
                            <Col span={24}>
                                <Input
                                    maskType={String}
                                    shadow={true}
                                    placeholder={'????????????????'}
                                    value={Name}
                                    onChange={e => setName(e.target.value)}
                                    />
                            </Col>
                            <Col span={24}>
                                <Input 
                                    scale={5}
                                    maskType={Number}
                                    value={MinPrice}
                                    onChange={(e) => setMinPrice(e.target.value)}
                                    shadow 
                                    placeholder={'?????????????????????? ?????????? ????????????'}/>
                            </Col>
                            <Col span={24}>
                                <Input
                                    maskType={Number}
                                    value={DeliveryTime}
                                    onChange={(e) => setDeliveryTime(e.target.value)} 
                                    shadow 
                                    placeholder={'?????????? ????????????????'}/>
                            </Col>
                            <Col span={24}>
                                <Button
                                    styles={{width: '100%'}}
                                    text={'??????????????????'}
                                    before={<SaveIcon color={'#fff'} size={20}/>}
                                    load={saveLoad}
                                    type={'button'}
                                    onClick={onSave}
                                    />
                                {
                                    data ? (
                                        <Button
                                        styles={{width: '100%', marginTop: 10}}
                                        text={'??????????????'}
                                        before={<BsTrash size={20}/>}
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
                        <Row gutter={[0,20]}>
                            <Col span={24}>
                                {/* <Input
                                    shadow={true}
                                    placeholder={'????????????????????'}
                                    value={textCoords}
                                    maskType={String}
                                    /> */}
                                <Text
                                    value={textCoords}
                                    placeholder={'????????????????????'}
                                    shadow
                                    onChange={(e) => setTextCoords(e.target.value)}
                                    />
                            </Col>
                            <Col span={24} className="def-label" style={{margin: 0}}>
                                ?????????????? ?????? ????????????????
                            </Col>
                            {
                                Delivery && Delivery.length > 0 ? (
                                    <Col span={24}>
                                        <div className="SelectPoly__list">
                                            {
                                                Delivery.map((item, index) => (
                                                    <div className="SelectPoly__item" key={index}>
                                                        <div className="SelectPoly__item_main" onClick={() => openEditPrice({...item})}>
                                                            <div className="SelectPoly__item_p">
                                                                <div className="SelectPoly__item_p_name">?????????? ???????????? ????</div>
                                                                <div className="SelectPoly__item_p_value">{item.MinPrice}</div>
                                                            </div>
                                                            <div className="SelectPoly__item_p">
                                                                <div className="SelectPoly__item_p_name">???????? ????????????????</div>
                                                                <div className="SelectPoly__item_p_value">{item.DeliveryPrice}</div>
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="SelectPoly__item_action">
                                                            <Button
                                                                type={'button'}
                                                                styles={{width: '100%'}} 
                                                                variant={'danger'} 
                                                                text={'?????????????? ????????'} 
                                                                before={<BsTrash/>}
                                                                onClick={() => removeDelItem(index)}
                                                                />
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        
                                        </div>
                                    </Col>
                                ) : null
                            }
                            
                            <Col span={24}>
                                <Pl 
                                    shadow={true}
                                    onClick={openPriceModal}
                                    style={{backgroundColor: '#fff', width: '100%'}} 
                                    text={'???????????????? ????????'}/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </form>
        </Modal>
    )
}

export default PolygonModal;