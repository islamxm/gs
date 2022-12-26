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
import SubCard from './components/SubCard/SubCard';
import {
    GridContextProvider,
    GridDropZone,
    GridItem,
    swap
  } from "react-grid-drag";
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
    const [gridHeight, setGridHeight] = useState(250)
    const [boxRow, setBoxRows]= useState(5)

    const url = new URLSearchParams(window.location.search)

    const windowResize = () => {
        if(window.innerWidth >= 1200) {
            setBoxRows(5)
        }
        if(window.innerWidth >= 768 && window.innerWidth < 1200) {
            setBoxRows(3)
        }
        if(window.innerWidth < 768) {
            setBoxRows(2)
        }
        
    }

    useEffect(() => {
        windowResize()
        window.addEventListener('resize', windowResize)
        return () => window.removeEventListener('resize', windowResize)
    }, []) 
    
    const toCreatePlate = () => {
        let data = new FormData()
        data.append('ParentID', subcategoryId ? subcategoryId : 0)
        data.append('CategoryID', categoryId)

        cs.addProd(token, data).then(res => {
            
            if(subcategoryId) {
                nav(`/catalog/${categoryId}/${subcategoryId}/editPlate/${res}/now?p=Создать блюдо`)
            } else {
                nav(`/catalog/${categoryId}/editPlate/${res}/now?p=Создать блюдо`)
            }
        })
    }

    const toEditPlate = (id, name) => {
        nav(`/catalog/${categoryId}/editPlate/${id}?${url.getAll('p').map(item => `p=${item}`).join('&')}&p=${name}`)
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

    const orderChange = (sourceId, sourceIndex, targetIndex, targetId) => {
        if(sourceIndex == list.length) {
            return;
        } else {
            const nextState = swap(list, sourceIndex, targetIndex);
            setList(nextState)
        }
    }

    useEffect(() => {
        if(list?.length > 0) {
            if(list.length % boxRow == 0) {
                setGridHeight(Math.round(list.length / boxRow + list.length % boxRow) * 280 + 280)
            } else {
                setGridHeight(Math.round(list.length / boxRow + list.length % boxRow) * 280)
            }
            
        } else {
            setGridHeight(280)
        }
    }, [list, boxRow])

    return (
        <motion.div
            {...pageEnterAnimProps}
            
            className="CatalogCategoryPage page">

                <CreateSubcategory
                data={selectedSubcat} 
                visible={createSubcategory} 
                close={closeSubcategoryModal} 
                update={updateList}/>
                {/* <HeaderProfile/> */}
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
                                    <GridContextProvider
                                        onChange={orderChange}
                                        >
                                        <GridDropZone
                                            boxesPerRow={boxRow}
                                            style={{height: gridHeight}}
                                            rowHeight={280}
                                            >
                                            {
                                                list?.map((item, index) => {
                                                    if(item.IsSubCategory == '1')  {
                                                        return (
                                                            <GridItem
                                                                key={item.ID}
                                                                className={'ddd__item'}
                                                                >
                                                                <SubCard
                                                                    Link={`/catalog/${categoryId}/${item.ID}?${url.getAll('p').map(item => `p=${item}`).join('&')}&p=${item.Name}`}
                                                                    {...item}
                                                                    selectEdit={editSubcat}
                                                                    />
                                                            </GridItem>
                                                        )
                                                    } else {
                                                        return (
                                                            
                                                            <GridItem
                                                                key={item.Name}
                                                                className={'ddd__item'}
                                                                >
                                                                <CatCard editPlate={toEditPlate} {...item}/>
                                                            </GridItem>
                                                        )
                                                    }
                                                    
                                                })
                                            }
                                            <GridItem 
                                            className='ddd__item ddd__item-ds CatalogCategoryPage__body_list_add'>
                                            <Pl onClick={toCreatePlate} style={{height: '49%', backgroundColor: '#fff'}} text={'Добавить блюдо'}/>
                                            <Pl onClick={() => setCreateSubcategory(true)} style={{height: '49%', backgroundColor: '#fff'}} text={'Добавить подкатегорию'}/>
                                            </GridItem>

                                        </GridDropZone>
                                    </GridContextProvider>
                         
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