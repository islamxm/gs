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



const as = new authService()
const cs = new catService()



const CatalogPage = () => {
    const {token} = useSelector(state => state)
    const [createCategory, setCreateCategory] = useState(false);
    const [cats, setCats] = useState([])
    const [load, setLoad] = useState(false)
    const [selectedCat, setSelectedCat] = useState(null)
    const [currentItem, setCurrentItem] = useState(null)

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
        if(token && cats && cats.length > 0) {
            as.orderSort(token, 'categories', cats.map(item => item.ID).join(',')).then(res => {
                console.log(res)
            })
        }
    }, [token, cats])

    return (
        <motion.div 
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.5}}
            exit={{opacity: 0}}
            className="CatalogPage page">
            <CreateCategory setSelectedCat={setSelectedCat} editItem={selectedCat} updateList={setCats} visible={createCategory} close={() => setCreateCategory(false)}/>
            <main className="Main">
                <div className="pageBody">
                    <div className="CatalogPage__body pageBody-content">
                        {
                            load ? (
                                <Loader/>
                            ) : (
                                <div className="CatalogPage__body_list">
                                    <Row gutter={[30,30]}>
                                        {
                                            cats.sort(sortItems).map((item, index) => (
                                                <Col
                                                    onDragLeave={e => handleDragLeave(e)}
                                                    onDragEnd={(e) => handleDragEnd(e)}
                                                    onDragStart={(e) => handleDragStart(e, item, setCurrentItem)}
                                                    onDragOver={e => handleDragOver(e)}
                                                    onDrop={e => submitOrder(e, item)}
                                                    draggable={true}
                                                    span={4} 
                                                    key={index}
                                                    style={{transition: 'all .3s ease'}}>
                                                    <CatItem
                                                        {...item}
                                                        Link={`/catalog/${item.ID}`}
                                                        selectEdit={editCategory}/>
                                                </Col>
                                            ))
                                        }
                                        <Col span={4} style={{height: 250}}>
                                            <Pl onClick={() => setCreateCategory(true)} text={'Добавить категорию'} style={{backgroundColor: '#fff'}}/>
                                        </Col>
                                    </Row>
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