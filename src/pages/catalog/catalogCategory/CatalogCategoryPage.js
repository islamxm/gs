import './CatalogCategoryPage.scss';
import Sidebar from '../../../components/Sidebar/Sidebar';
import HeaderProfile from '../../../components/HeaderProfile/HeaderProfile';
import { Col, Row } from 'antd';
import CatCard from './components/CatCard/CatCard';
import CatItem from '../catalog/components/CatItem/CatItem';
import Pl from '../../../components/Pl/Pl';
import { useState } from 'react';
import CreateSubcategory from '../modals/createSubcategory/CreateSubcategory';
import { useNavigate } from 'react-router-dom';

const CatalogCategoryPage = () => {
    const nav = useNavigate();
    const [createSubcategory, setCreateSubcategory] = useState(false);

    const toCreatePlate = () => {
        nav('/catalog/createPlate')
    }
    
    return (
        <div className="CatalogCategoryPage page">
            <CreateSubcategory visible={createSubcategory} close={() => setCreateSubcategory(false)}/>
            <HeaderProfile/>
            <main className="Main">
                <div className="pageBody">
                    <Sidebar/>
                    <div className="spc"></div>
                    <div className="CatalogCategoryPage__body pageBody-content">
                        <div className="CatalogCategoryPage__body_list">
                            <Row gutter={[30, 30]}>
                                <Col span={6}>
                                    <CatItem/>
                                </Col>
                                <Col span={6}>
                                    <CatCard/>
                                </Col>
                                <Col className='CatalogCategoryPage__body_list_add' span={6}>
                                    <Pl onClick={toCreatePlate} style={{height: '48%', backgroundColor: '#fff'}} text={'Добавить блюдо'}/>
                                    <Pl onClick={() => setCreateSubcategory(true)} style={{height: '48%', backgroundColor: '#fff'}} text={'Добавить подкатегорию'}/>
                                </Col>
                            </Row>
                        </div>
                        
                    </div>
                </div>
                
            </main>
        </div>
    )
}

export default CatalogCategoryPage;