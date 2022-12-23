import './CatalogPage.scss';
import HeaderProfile from '../../../components/HeaderProfile/HeaderProfile';
import Sidebar from '../../../components/Sidebar/Sidebar';
import CatItem from './components/CatItem/CatItem';
import { Col, Row } from 'antd';
import Pl from '../../../components/Pl/Pl';
import CreateCategory from '../modals/createCategory/CreateCategory';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import catService from '../../../services/catService';
import Loader from '../../../components/Loader/Loader';
import {motion} from 'framer-motion';
import {
    handleDragEnd, 
    handleDragLeave, 
    handleDragOver, 
    handleDragStart, 
    handleDrop, 
    sortItems
} from '../../../funcs/dragSort';
import authService from '../../../services/dataService';
import {
    GridContextProvider,
    GridDropZone,
    GridItem,
    swap,
    move
  } from "react-grid-drag";



const as = new authService()
const cs = new catService()



const CatalogPage = () => {
    const {token} = useSelector(state => state)
    const [createCategory, setCreateCategory] = useState(false);
    const [cats, setCats] = useState([])
    const [load, setLoad] = useState(false)
    const [selectedCat, setSelectedCat] = useState(null)
    const [currentItem, setCurrentItem] = useState(null)
    const [gridHeight, setGridHeight] = useState(250)

    useEffect(() => {
        if(cats?.length > 0) {
            if(cats.length % 4 == 0) {
                setGridHeight(Math.round(cats.length / 4 + cats.length % 4) * 280 + 280)
            } else {
                setGridHeight(Math.round(cats.length / 4 + cats.length % 4) * 280)
            }
            
        } else {
            setGridHeight(280)
        }
    }, [cats])
    


    const url = new URLSearchParams(window.location.search)




    useEffect(() => {
        if(token) {
            setLoad(true)
            cs.getCats(token, {OrganisationID: 0}).then(res => {
                setCats(res);
            }).finally(_ => setLoad(false))
        }
    }, [token])

    const editCategory = (obj) => {
        setSelectedCat(obj)
        setCreateCategory(true)
    }

    const submitOrder = (e, item) => {
        handleDrop(e, item, setCats, currentItem, cats);
    }

    useEffect(() => {
       
        // if(token && cats && cats.length > 0) {
        //     as.orderSort(token, 'categories', cats.map(item => item.ID).join(','))
        // }
        console.log(cats.map(item => item?.Name))
    }, [token, cats])


    const orderChange = (sourceId, sourceIndex, targetIndex, targetId) => {
        
        if(sourceIndex == cats.length) {
            return;
        } else {
            const nextState = swap(cats, sourceIndex, targetIndex);
            setCats(nextState)
        }
        console.log('sourceId', sourceId)
        console.log('sourceIndex', sourceIndex)
        console.log('targetIndex', targetIndex)
        console.log('targetId', targetId)
        
    }
    

    return (
        <motion.div 
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.5}}
            exit={{opacity: 0}}
            className="CatalogPage page">
            <CreateCategory setSelectedCat={setSelectedCat} editItem={selectedCat} updateList={setCats} visible={createCategory} close={() => setCreateCategory(false)}/>
            {/* <HeaderProfile/> */}
            <main className="Main">
                <div className="pageBody">
                    <div className="CatalogPage__body pageBody-content">
                        {
                            load ? (
                                <Loader/>
                            ) : (
                                <div className="CatalogPage__body_list">
                                    <GridContextProvider
                                        onChange={orderChange}

                                        >
                                        <GridDropZone
                                            className='ddd'
                                            boxesPerRow={4}
                                            style={{height: gridHeight}}
                                            rowHeight={280}
                                            >
                                            {
                                                cats?.map((item, index)=> (
                                                    <GridItem 
                                                        
                                                        key={index} 
                                                        className={"ddd__item"}>
                                                        <CatItem
                                                            {...item}
                                                            Link={`/catalog/${item.ID}?p=${url.get('p')}&p=${item.Name}`}
                                                            selectEdit={editCategory}/>
                                                    </GridItem>
                                                ))
                                            }
                                            <GridItem
                                            
                                                className='ddd__item ddd__item-ds'
                                                >
                                                <Pl onClick={() => setCreateCategory(true)} text={'Добавить категорию'} style={{backgroundColor: '#fff'}}/>
                                            </GridItem>
                                            
                                        </GridDropZone>
                                    </GridContextProvider>
                                </div>
                                // <div className="CatalogPage__body_list">
                                //     <Row gutter={[30,30]}>
                                //         {
                                //             cats.sort(sortItems).map((item, index) => (
                                //                 <Col
                                //                     // onDragLeave={e => handleDragLeave(e)}
                                //                     // onDragEnd={(e) => handleDragEnd(e)}
                                //                     // onDragStart={(e) => handleDragStart(e, item, setCurrentItem)}
                                //                     // onDragOver={e => handleDragOver(e)}
                                //                     // onDrop={e => submitOrder(e, item)}
                                //                     // draggable={true}
                                //                     // span={6}
                                //                     xxl={4}
                                //                     lg={8}
                                //                     md={12}
                                //                     xs={24}
                                //                     key={index}
                                //                     style={{transition: 'all .3s ease'}}>
                                //                     <CatItem
                                //                         {...item}
                                //                         Link={`/catalog/${item.ID}?p=${url.get('p')}&p=${item.Name}`}
                                //                         selectEdit={editCategory}/>
                                //                 </Col>
                                //             ))
                                //         }
                                //         <Col
                                //             xxl={4}
                                //             lg={8}
                                //             md={12}
                                //             xs={24} 
                                //             style={{height: 250}}>
                                //             <Pl onClick={() => setCreateCategory(true)} text={'Добавить категорию'} style={{backgroundColor: '#fff'}}/>
                                //         </Col>
                                //     </Row>
                                // </div>
                            )
                        }
                    </div>
                </div>
            </main>
        </motion.div>
    )
}

export default CatalogPage;