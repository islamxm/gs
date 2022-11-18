import './CatalogCategoryPage.scss';
import Sidebar from '../../../components/Sidebar/Sidebar';
import HeaderProfile from '../../../components/HeaderProfile/HeaderProfile';
import { Col, Row } from 'antd';
import CatCard from './components/CatCard/CatCard';
import CatItem from '../catalog/components/CatItem/CatItem';
import Pl from '../../../components/Pl/Pl';
import { useState, useEffect } from 'react';
import CreateSubcategory from '../modals/createSubcategory/CreateSubcategory';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import catService from '../../../services/catService';
import Loader from '../../../components/Loader/Loader';
import {motion, AnimatePresence} from 'framer-motion';
import pageEnterAnimProps from '../../../funcs/pageEnterAnimProps';
import {handleDragEnd, handleDragLeave, handleDragOver, handleDragStart, handleDrop, sortItems} from '../../../funcs/dragSort'
import authService from '../../../services/dataService';

const as = new authService();
const cs = new catService();

const CatalogCategoryPage = () => {
    const {token} = useSelector(state => state)
    const {categoryId, subcategoryId} = useParams()
    const nav = useNavigate();
    const [createSubcategory, setCreateSubcategory] = useState(false);
    const [selectedSubcat, setSelectedSubcat] = useState(null)
    const [list, setList] = useState([])
    const [load, setLoad] = useState(false)
    const [currentItem, setCurrentItem] = useState(null)


    
    const toCreatePlate = () => {
        
        // if(subcategoryId) {
        //      nav(`/catalog/${categoryId}/${subcategoryId}/createPlate`)
        // } else {
        //     nav(`/catalog/${categoryId}/createPlate`)
        // }
        let data = new FormData()
        data.append('ParentID', subcategoryId ? subcategoryId : 0)
        data.append('CategoryID', categoryId)

        cs.addProd(token, data).then(res => {
            
            if(subcategoryId) {
                nav(`/catalog/${categoryId}/${subcategoryId}/editPlate/${res}/now`)
            } else {
                nav(`/catalog/${categoryId}/editPlate/${res}/now`)
            }
        })
    }

    const toEditPlate = (id) => {
        nav(`/catalog/${categoryId}/editPlate/${id}`)
    }


    useEffect(() => {
        if(token && categoryId && !subcategoryId) {
            setLoad(true)
            cs.getProds(token, {CategoryID: categoryId}).then(res => {
                setList(res.filter(item => item.ParentID == '0'))
            }).finally(_ => setLoad(false))
        }
        if(token && categoryId && subcategoryId) {
            setLoad(true)
            cs.getProds(token, {CategoryID: categoryId}).then(res => {
                setList(res.filter(item => item.ParentID == subcategoryId))
            }).finally(_ => {
                setLoad(false)
            })
        }
    }, [token, categoryId, subcategoryId])

    const updateList = () => {
        if(!subcategoryId) {
            setLoad(true)
            cs.getProds(token, {CategoryID: categoryId}).then(res => {
                setList(res.filter(item => item.ParentID == '0'))
            }).finally(_ => setLoad(false))
        }
        if(subcategoryId) {
            setLoad(true)
            cs.getProds(token, {CategoryID: categoryId}).then(res => {
                setList(res.filter(item => item.ParentID == subcategoryId))
            }).finally(_ => {
                setLoad(false)
            })
        }
    }

    const editSubcat = ({...item}) => {
        setSelectedSubcat(item)
        setCreateSubcategory(true)
    }

    const closeSubcategoryModal = () => {
        setCreateSubcategory(false)
        setSelectedSubcat(null)
    }
    
    const submitOrder = (e, item) => {
        handleDrop(e, item, setList, currentItem, list);
    }
    
    useEffect(() => {
        if(token && list && list.length > 0) {
            as.orderSort(token, 'products', list.map(item => item.ID).join(',')).then(res => {
            })
        }
    }, [list, token])

    return (
        <motion.div
            {...pageEnterAnimProps}
            
            className="CatalogCategoryPage page">

                <CreateSubcategory
                data={selectedSubcat} 
                visible={createSubcategory} 
                close={closeSubcategoryModal} 
                update={updateList}/>
                <main className="Main">
                <div className="pageBody">
                    <div className="CatalogCategoryPage__body pageBody-content">
                        {
                            load ? (
                                <Loader/>
                            ) : (
                                <motion.div
                                   
                                    {...pageEnterAnimProps}
                                    >
                                    <Row gutter={[30, 30]}>
                                        {
                                            list.sort(sortItems).map((item, index) => {
                                                if(item.IsSubCategory == '1') {
                                                    return (
                                                        <Col
                                                            onDragLeave={e => handleDragLeave(e)}
                                                            onDragEnd={(e) => handleDragEnd(e)}
                                                            onDragStart={(e) => handleDragStart(e, item, setCurrentItem)}
                                                            onDragOver={e => handleDragOver(e)}
                                                            onDrop={e => submitOrder(e, item)}
                                                            draggable={true}
                                                            key={index}
                                                            span={4}
                                                            style={{transition: 'all .3s ease'}}
                                                            >
                                                            <CatItem 
                                                                Link={`/catalog/${categoryId}/${item.ID}`}
                                                                {...item}
                                                                selectEdit={editSubcat}
                                                                />
                                                        </Col>
                                                    )
                                                } else {
                                                    return (
                                                        <Col 
                                                        style={{transition: 'all .3s ease'}}
                                                        onDragLeave={e => handleDragLeave(e)}
                                                        onDragEnd={(e) => handleDragEnd(e)}
                                                        onDragStart={(e) => handleDragStart(e, item, setCurrentItem)}
                                                        onDragOver={e => handleDragOver(e)}
                                                        onDrop={e => submitOrder(e, item)}
                                                        draggable={true}
                                                            span={4}
                                                            key={index}
                                                            >
                                                            <CatCard editPlate={toEditPlate} {...item}/>
                                                        </Col>
                                                    )
                                                }
                                            })
                                            
                                        }
                                        <Col className='CatalogCategoryPage__body_list_add' span={4} style={{height: 250}}>
                                            <Pl onClick={toCreatePlate} style={{height: 120, backgroundColor: '#fff'}} text={'Добавить блюдо'}/>
                                            <Pl onClick={() => setCreateSubcategory(true)} style={{height: 120, backgroundColor: '#fff'}} text={'Добавить подкатегорию'}/>
                                        </Col>
                                        
                                        
                                        
                                    </Row>
                                </motion.div>
                                
                                
                            )
                        }
                        
                        
                    </div>
                </div>
                
            </main>
        </motion.div>
    )
}

export default CatalogCategoryPage;