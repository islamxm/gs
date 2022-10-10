import './CatalogPage.scss';
import HeaderProfile from '../../../components/HeaderProfile/HeaderProfile';
import Sidebar from '../../../components/Sidebar/Sidebar';
import CatItem from './components/CatItem/CatItem';
import { Col, Row } from 'antd';
import Pl from '../../../components/Pl/Pl';
import CreateCategory from '../modals/createCategory/CreateCategory';
import { useState } from 'react';


const CatalogPage = () => {
    const [createCategory, setCreateCategory] = useState(false);

    return (
        <div className="CatalogPage page">
            <CreateCategory visible={createCategory} close={() => setCreateCategory(false)}/>
            <HeaderProfile/>
            <main className="Main">
                <div className="pageBody">
                    <Sidebar/>
                    <div className="spc"></div>
                    <div className="CatalogPage__body pageBody-content">
                        <div className="CatalogPage__body_list">
                            <Row gutter={[30, 30]}>
                                <Col span={6}>
                                    <CatItem link={true}/>
                                </Col>
                                <Col span={6}>
                                    <CatItem link={true}/>
                                </Col>
                                <Col span={6}>
                                    <Pl onClick={() => setCreateCategory(true)} text={'Добавить категорию'} style={{backgroundColor: '#fff'}}/>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default CatalogPage;