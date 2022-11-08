import './OrgsPage.scss';
import Sidebar from '../../../components/Sidebar/Sidebar';
import HeaderProfile from '../../../components/HeaderProfile/HeaderProfile';
import BrandItem from './components/BrandItem/BrandItem';
import OrgItem from './components/OrgItem/OrgItem';
import Pl from '../../../components/Pl/Pl';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import brandImg from '../../../assets/img/org-brand.png';
import orgImg from '../../../assets/img/org.png';
import useModal from '../../../hooks/useModal';
import AddBrand from '../modals/addBrand/AddBrand';
import orgService from '../../../services/orgService';
import { useSelector } from 'react-redux';
import EditBrand from '../modals/editBrand/EditBrand';
import { useParams } from 'react-router-dom';
import Loader from '../../../components/Loader/Loader';


const os = new orgService();




const OrgsPage = () => {
    const {brandId} = useParams()
    const {token} = useSelector(state => state)
    const nav = useNavigate();
    const location = useLocation();
    const [list, setList] = useState([])
    const [loadList, setLoadList] = useState(false)
    const [selected, setSelected] = useState({})
    const [addBrandModal, setAddBrandModal] = useState(false)
    const [editBrandModal, setEditBrandModal] = useState(false)

    

    useEffect(() => {
        console.log(token)
        if(token && brandId) {
            
            setLoadList(true)
            os.getOrgs(token, {BrandID: brandId})
                .then(res => {
                    setList(res)
                    console.log(res)
                })
                .finally(_ => setLoadList(false))
        }
        if(token && !brandId) {
            setLoadList(true)
            os.getBrands(token)
                .then(res => {
                    console.log(res)
                    setList(res)
                })
                .finally(_ => setLoadList(false))
        }
    }, [location, token, brandId])



    const updateList = () => {
        setLoadList(true)
        if(brandId) {
            os.getOrgs(token, {BrandID: brandId})
            .then(res => setList(res))
            .finally(_ => setLoadList(false))
        } 
        if(!brandId) {
            os.getBrands(token)
                .then(res => setList(res))
                .finally(_ => setLoadList(false))
        }
        
    }


    const openAddBrand = () => setAddBrandModal(true)
    const closeAddBrand = () => setAddBrandModal(false)
    const openEditBrand = (ID, ItemOrder, LogoUrl, MarkerID) => {
        const data = {
            ID,
            ItemOrder,
            LogoUrl,
            MarkerID
        }
        setSelected(data)
        setEditBrandModal(true)
    }
    const closeEditBrand = () => setEditBrandModal(false)

    



    if(location.pathname != '/organizations' && location.pathname.includes('/organizations/')) {
        return (
            <div className="OrgsPage page">
            <HeaderProfile/>
            
            {/* <AddBrand visible={visible} close={hideModal}/> */}
            <main className="Main">
                <div className="pageBody">
                    <Sidebar/>
                    <div className="spc"></div>
                    <div className="OrgsPage__body pageBody-content">
                        {
                            loadList ? (
                                <Loader/>
                            ) : (
                                <div className="OrgsPage__body_list">
                                    {
                                        list && list.length > 0? (
                                            list.map((item, index) => (
                                                <div className="OrgsPage__body_item" key={index}>
                                                    <OrgItem {...item}/>
                                                </div>
                                            ))
                                        ) : null
                                    }
                                    <div className="OrgsPage__body_item">
                                        <Pl onClick={() => nav(`/organizations/${brandId}/create`)} style={{backgroundColor: '#fff', minHeight: 223}} text={'Добавить ресторан'}/>
                                    </div>
                                </div>
                            )
                        }
                        
                        
                    </div>
                </div>
            </main>
        </div>
    
        )
    }

    if(location.pathname == '/organizations') {
        return (
            <div className="OrgsPage page">
            <HeaderProfile/>
            
            <EditBrand updateList={setList} visible={editBrandModal} close={closeEditBrand} selected={selected}/>
            <AddBrand updateList={setList} visible={addBrandModal} close={closeAddBrand}/>
            <main className="Main">
                
                <div className="pageBody">
                    <Sidebar/>
                    <div className="spc"></div>
                    <div className="OrgsPage__body pageBody-content">
                        {
                            loadList ? (
                                <Loader/>
                            ) : (
                                <div className="OrgsPage__body_list">
                                    {
                                        list && list.length > 0? (
                                            list.map((item, index) => (
                                                <div className="OrgsPage__body_item" key={index}>
                                                    <BrandItem 
                                                        Disabled={item.Disabled}
                                                        ID={item.ID}
                                                        ItemOrder={item.ItemOrder}
                                                        LogoUrl={item.LogoUrl}
                                                        MarkerID={item.MarkerID}
                                                        editModal={openEditBrand}
                                                        />
                                                </div>
                                            ))
                                        ) : null
                                    }
                                    <div className="OrgsPage__body_item">
                                        <Pl onClick={openAddBrand} style={{backgroundColor: '#fff', height: 223}} text={'Добавить бренд'}/>
                                    </div>
                                </div>
                            )
                        }
                        
                        
                    </div>
                </div>
                
            </main>
        </div>
    
        )
    }
        
}

export default OrgsPage;