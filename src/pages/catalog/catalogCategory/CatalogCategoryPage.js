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





const cs = new catService();

const CatalogCategoryPage = () => {
    const {token} = useSelector(state => state)
    const {categoryId} = useParams()
    const nav = useNavigate();
    const [createSubcategory, setCreateSubcategory] = useState(false);
    const [list, setList] = useState([])
    const [load, setLoad] = useState(false)

    const toCreatePlate = () => {
        nav(`/catalog/${categoryId}/createPlate`)
    }

    const toEditPlate = (id) => {
        nav(`/catalog/${categoryId}/editPlate/${id}`)
    }


    useEffect(() => {
        if(token && categoryId) {
            setLoad(true)
            cs.getProds(token, {CategoryID: categoryId}).then(res => {
                setList(res)
                console.log(res)
            }).finally(_ => setLoad(false))
        }
    }, [token, categoryId])
    
    return (
        <div className="CatalogCategoryPage page">
            <CreateSubcategory visible={createSubcategory} close={() => setCreateSubcategory(false)}/>
            <HeaderProfile/>
            <main className="Main">
                <div className="pageBody">
                    <Sidebar/>
                    <div className="spc"></div>
                    <div className="CatalogCategoryPage__body pageBody-content">
                        {
                            load ? (
                                <Loader/>
                            ) : (
                                <div className="CatalogCategoryPage__body_list">
                                    <Row gutter={[30, 30]}>
                                        {
                                            list.map((item, index) => {
                                                if(item.IsSubCategory != '0') {
                                                    return (
                                                        <Col span={6}>
                                                            <CatItem 
                                                                {...item}
                                                                
                                                                />
                                                        </Col>
                                                    )
                                                } else {
                                                    return (
                                                        <Col span={6}>
                                                            <CatCard editPlate={toEditPlate} {...item}/>
                                                        </Col>
                                                    )
                                                }
                                            })
                                            
                                        }
                                        <Col className='CatalogCategoryPage__body_list_add' span={6}>
                                            <Pl onClick={toCreatePlate} style={{height: '48%', backgroundColor: '#fff'}} text={'Добавить блюдо'}/>
                                            <Pl onClick={() => setCreateSubcategory(true)} style={{height: '48%', backgroundColor: '#fff'}} text={'Добавить подкатегорию'}/>
                                        </Col>
                                        
                                        
                                    </Row>
                                </div>
                            )
                        }
                        
                        
                    </div>
                </div>
                
            </main>
        </div>
    )
}

export default CatalogCategoryPage;