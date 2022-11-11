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

const cs = new catService()



const CatalogPage = () => {
    const {token} = useSelector(state => state)
    const [createCategory, setCreateCategory] = useState(false);
    const [cats, setCats] = useState([])
    const [load, setLoad] = useState(false)
    const [selectedCat, setSelectedCat] = useState(null)

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
                                            cats.map((item, index) => (
                                                <Col span={6} key={index}>
                                                    <CatItem
                                                        {...item}
                                                        Link={`/catalog/${item.ID}`}
                                                        selectEdit={editCategory}/>
                                                </Col>
                                            ))
                                        }
                                        <Col span={6}>
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