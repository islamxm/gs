import './OrgsPage.scss';
import Sidebar from '../../../components/Sidebar/Sidebar';
import HeaderProfile from '../../../components/HeaderProfile/HeaderProfile';
import OrgsItem from './components/OrgsItem/OrgsItem';
import Pl from '../../../components/Pl/Pl';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import brandImg from '../../../assets/img/org-brand.png';
import orgImg from '../../../assets/img/org.png';
import useModal from '../../../hooks/useModal';
import AddBrand from '../modals/addBrand/AddBrand';


const orgMock = [
    {
        img: orgImg,
        title: 'Название ресторана'
    },
    {
        img: orgImg,
        title: 'Название ресторана'
    },
]

const brandsMock = [
    {
        img: brandImg,
    },
    {
        img: brandImg
    }
]

const OrgsPage = () => {
    const location = useLocation();
    const [list, setList] = useState([])
    const {visible, showModal, hideModal} = useModal()

  

    useEffect(() => {
        setList(brandsMock)
    }, [location])


    const addBrand = () => {
        showModal();
    }



    return (
        <div className="OrgsPage page">
            <HeaderProfile/>
            
            <AddBrand visible={visible} close={hideModal}/>
            <main className="Main">
                
                <div className="pageBody">
                    <Sidebar/>
                    <div className="OrgsPage__body pageBody-content">
                        <div className="OrgsPage__body_list">
                            {
                                list && list.length > 0? (
                                    list.map((item, index) => (
                                        <div className="OrgsPage__body_item">
                                            <OrgsItem/>
                                        </div>
                                    ))
                                ) : null
                            }
                            <div className="OrgsPage__body_item">
                                <Pl onClick={addBrand} style={{backgroundColor: '#fff'}} text={'Добавить бренд'}/>
                            </div>
                        </div>
                        
                    </div>
                </div>
                
            </main>
        </div>
    )
}

export default OrgsPage;