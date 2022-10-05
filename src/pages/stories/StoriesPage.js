import HeaderProfile from "../../components/HeaderProfile/HeaderProfile";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Row, Col } from "antd";
import Pl from "../../components/Pl/Pl";
import StorieItem from "./components/StorieItem/StorieItem";
import Settings from "./components/Settings/Settings";
import AddStorie from "./modals/addStorie/AddStorie";
import SelectCat from "./modals/selectCat/SelectCat";
import { useState } from "react";

const StoriesPage = () => {
    const [addStorie, setAddStorie] = useState(false);
    const [selectCat, setSelectCat] = useState(false);


    const openAddStorie = () => {
        setAddStorie(true)
    }

    const closeAddStorie = () => {
        setAddStorie(false)
    }

    const openSelectCat = () => {
        setSelectCat(true)
    }

    const closeSelectCat = () => {
        setSelectCat(false)
    }

    return (
        <div className="StoriesPage page">
            <SelectCat visible={selectCat} close={closeSelectCat}/>
            <AddStorie visible={addStorie} selectCat={openSelectCat} close={closeAddStorie}/>
            <HeaderProfile/>
            <main className="Main">
                <div className="pageBody">
                    <Sidebar/>
                    <div className="StoriesPage__body pageBody-content">
                        <Row gutter={[40, 0]}>
                            <Col span={14}>
                                <Row gutter={[20, 20]}>
                                    <Col span={8}>
                                        <StorieItem/>
                                    </Col>
                                    <Col span={8}>
                                        <StorieItem/>
                                    </Col>
                                    <Col span={8}>
                                        <StorieItem/>
                                    </Col>
                                    <Col span={8}>
                                        <StorieItem/>
                                    </Col>
                                    <Col span={8}>
                                        <Pl onClick={openAddStorie} text={'Добавить сториз'} style={{backgroundColor: '#fff'}}/>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={10}>
                                <Settings/>
                            </Col>
                        </Row>
                        
                    </div>
                </div>
            </main>
        </div>
    )
}

export default StoriesPage;