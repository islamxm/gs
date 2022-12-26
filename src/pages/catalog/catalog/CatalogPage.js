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

import authService from '../../../services/dataService';
import {
    GridContextProvider,
    GridDropZone,
    GridItem,
    swap
  } from "react-grid-drag";



const as = new authService()
const cs = new catService()





const CatalogPage = () => {
    const {token} = useSelector(state => state)
    const [createCategory, setCreateCategory] = useState(false);
    const [cats, setCats] = useState([])
    const [load, setLoad] = useState(false)
    const [selectedCat, setSelectedCat] = useState(null)
    const [gridHeight, setGridHeight] = useState(250)
    const [boxRow, setBoxRows]= useState(5)

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

    useEffect(() => {
        windowResize()
        window.addEventListener('resize', windowResize)
        return () => window.removeEventListener('resize', windowResize)
    }, []) 
    


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



    useEffect(() => {
       
        if(token && cats && cats.length > 0) {
            as.orderSort(token, 'categories', cats.map(item => item.ID).join(','))
        }

    }, [token, cats])


    const orderChange = (sourceId, sourceIndex, targetIndex, targetId) => {
        if(sourceIndex == cats.length) {
            return;
        } else {
            const nextState = swap(cats, sourceIndex, targetIndex);
            setCats(nextState)
        }
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
                                            
                                            // className='ddd'
                                            boxesPerRow={boxRow}
                                            style={{height: gridHeight}}
                                            rowHeight={280}
                                            >
                                            {
                                                cats?.map((item, index)=> (
                                                    <GridItem 
                                                        key={item.Name} 
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
                                
                                
                                    

                            )
                        }
                    </div>
                </div>
            </main>
        </motion.div>
    )
}

export default CatalogPage;