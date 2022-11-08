import './AddRec.scss';
import { Modal } from 'antd';
import Input from '../../../../components/Input/Input';
import {Row, Col} from 'antd';
import Pl from '../../../../components/Pl/Pl';
import Button from '../../../../components/Button/Button';
import {BsTrash} from 'react-icons/bs';
import { useEffect, useState } from 'react';
import catService from '../../../../services/catService';
import { useSelector } from 'react-redux';
import {Dropdown} from 'antd';
import SearchResult from '../../createPlate/components/SearchResult/SearchResult';
import SmCard from '../../../../components/SmCard/SmCard';

const cs = new catService()

const AddRec = ({visible, close, data, update, plateId}) => {
    const {token} = useSelector(state => state)
    const [Search, setSearch] = useState('')
    const [plates, setPlates] = useState([])
    const [matches, setMatches] = useState([])
    const [saveLoad, setSaveLoad] = useState(false)
    const [delLoad, setDelLoad] = useState(false)
    const [showRes, setShowRes] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)

    const closeHandle = () => {
        setSearch('')
        setMatches([])
        setShowRes(false)
        setSelectedItem(null)
        close()
    }

    useEffect(() => {
        if(Search) {
            setMatches(plates.filter(item => item.Name.toLowerCase().includes(Search.toLowerCase())))
            setShowRes(true)
        } else {
            setShowRes(false)
        }
    }, [Search])



    useEffect(() => {
        if(token) {
            cs.getProds(token).then(res => {
                setPlates(res)
            })
        }
    }, [token])

    useEffect(() => {
        if(data) {
            setSelectedItem(data)
        }
    }, [data])

    const onSave = () => {
        setSaveLoad(true)
        if(!data) {
            cs.addRec(token, {ItemID: plateId, RecomendedPlateID: selectedItem.ID}).then(res => {
                update(res)
                console.log(res)
            }).finally(_ => {
                setSaveLoad(false)
                closeHandle()
            })
        } else {
            cs.editRec(token, {ID: data.ID, RecomendedPlateID: selectedItem.ID}).then(res => {
                console.log(res)
                update(res)
            }).finally(_ => {
                setSaveLoad(false)
                closeHandle()
            })
        }
    }

    const onDelete = () => {
        setDelLoad(true)
        cs.deleteRec(token, {ID: selectedItem.ID}).then(res => {
            console.log(res)
            
        }).finally(_ => {
            setDelLoad(false)
            closeHandle()
        })
    }

    const selectRec = ({...item}) => {
        console.log(item)
        setSelectedItem(item)
        setShowRes(false)
    }


    return (
        <Modal className='Modal' width={550} open={visible} onCancel={closeHandle}>
            <h3 className="Modal__head">Добавить рекомендованное блюдо</h3>
            <div className="Modal__form">
                <Dropdown 
                    overlay={<SearchResult select={selectRec} list={matches}/>}
                    open={showRes}
                    >
                    <div className="Modal__form_row">
                        <Input
                            value={Search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder={'Поиск блюда'}
                            />
                    </div>
                </Dropdown>
                <div className="Modal__form_row">
                    <div className="AddRec">
                        {
                            selectedItem ? (
                                <>
                                    <Row gutter={[10, 10]}>
                                        <Col span={14}>
                                            <SmCard
                                            image={selectedItem?.ThumbnailPicture}
                                            name={selectedItem?.Name}
                                            // price={selectedItem?.Prices[0]?.Price}
                                            />
                                        </Col>
                                        {/* <Col span={10}>
                                            <Pl style={{backgroundColor: '#fff'}} text={'Выбрать другое'}/>
                                        </Col> */}
                                    </Row>
                                    
                                </>
                            ) : null
                        }
                        
                    </div>
                </div>
                <div className="Modal__form_action">
                    <Button
                        load={saveLoad}
                        disabled={!selectedItem}
                        onClick={onSave}
                        text={'Сохранить'}
                        before={<BsTrash/>}/>
                    {
                        data ? (
                            <Button
                                onClick={onDelete}
                                load={delLoad}
                                styles={{marginTop: 10}}
                                variant={'danger'}
                                text={'Удалить блюдо'}
                                />
                        ) : null
                    }
                </div>
            </div>
        </Modal>
    )
    
}

export default AddRec;