import './SelectKmlPol.scss';
import { Modal } from 'antd';
import Checkbox from '../../../../../components/Checkbox/Checkbox';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import orgService from '../../../../../services/orgService';
import { useParams } from 'react-router-dom';
import {Row, Col} from 'antd';
import { useState } from 'react';
import Button from '../../../../../components/Button/Button';

const os = new orgService()



const SelectKmlPol = ({visible, close, list, updatePolList, resetFile}) => {
    const {token} = useSelector(state => state)
    const {orgId} = useParams()
    const [selected, setSelected] = useState([])
    const [transformed, setTransformed] = useState([])
    const [load, setLoad] = useState(false)
    const [indx, setIndx] = useState(0)



    const closeHandle = () => {
        setSelected([])
        resetFile()
        close()
    }

    useEffect(() => {
        if(transformed.length > 0) {
            os.addPol(token, transformed[indx]).then(res => {
                if(res && indx <= transformed.length) {
                    setIndx(state => state + 1)
                } else {
                    updatePolList()
                    setLoad(false)
                    closeHandle()
                }
            })
        }

       
    }, [transformed, indx])

    const selectAll = () => {
        setSelected(list)
    }

    const onSave = () => {
        setLoad(true)
        console.log(selected)
        const transformedPolygons = selected.map(item => {
            return {
                OrganisationID: orgId,
                Disabled: '0',
                Coordinates: item.geometry.coordinates.map(item => {
                    return item.map(it => {
                        return it.filter(i => i != 0).reverse()
                    }).join(' ')
                }).join(''),
                Delivery: [],
                MinPrice: '',
                DeliveryTime: '',
                Name: item?.properties?.name ? item?.properties?.name : '',
                Color: item.properties.fill,
                IsOnlyForOnlinePayment: '0'
            }
        })

        setTransformed(transformedPolygons)
        
       
        // Promise.all(transformedPolygons.map(item => os.addPol(token, item))).then(res => {
        //     console.log(res)
        //     updatePolList()
        // }).finally(_ => {
        //     setLoad(false)
        //     closeHandle()
        // })
    }


    return (
        <Modal width={500} className='Modal SelectKmlPol' onCancel={closeHandle} open={visible}>
            <div className="Modal__head">
                ?????????????? ???????????????? 
                {
                    selected.length != 0 ? (
                        <span>
                            {` (${selected.length})`}
                        </span>
                    ) : null
                }
                
            </div>
            <div className="Modal__body">
                <div className="SelectKmlPol__list gs-scroll">
                    <Row gutter={[20, 20]}>
                        {
                            list && list.length > 0 ? (
                                list.map((item, index) => (
                                    <Col span={24} key={index}>
                                        <Checkbox
                                            shadow={true}
                                            id={index + item.properties.name}
                                            checked={selected.find(i => i.id == item.id)}
                                            onChange={e => {
                                                if(e.target.checked) {
                                                    setSelected(state => {
                                                        return [
                                                            ...state,
                                                            item
                                                        ]
                                                    }) 
                                                } else {
                                                    const m = selected;
                                                    const rm = m.splice(m.findIndex(i => i.id == item.id), 1)
                                                    setSelected([...m])
                                                }
                                            }}
                                            text={item.properties.name}
                                            />
                                    </Col>
                                ))
                            ) : null
                        }
                    </Row>
                    
                </div>
                <div className="SelectKmlPol__action">
                    <Row  gutter={[0, 20]}>
                        <Col className='SelectKmlPol__action_all' span={24}>
                            <Checkbox
                                shadow={true}
                                id={'selectAll'}
                                text={'?????????????? ??????'}
                                onChange={e => {
                                    if(e.target.checked) {
                                        selectAll()
                                    } else {
                                        setSelected([])
                                    }
                                }}
                                />
                            
                        </Col>
                        <Col span={24}>
                            <Button
                                onClick={onSave}
                                load={load}
                                disabled={selected.length == 0}
                                text={'???????????????? ?????????????????? ????????????????'}
                                />
                        </Col>
                    </Row>
                    
                </div>
            </div>
        </Modal>
    )
}

export default SelectKmlPol;