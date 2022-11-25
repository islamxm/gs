import { Route, Routes } from "react-router-dom";

//pages
import AuthPage from "../pages/auth/AuthPage";
import OrgsPage from "../pages/orgs/orgs/OrgsPage";
import OrgsCreatePage from "../pages/orgs/orgsCreate/OrgsCreatePage";
import Notfound from "../pages/notfound/Notfound";
import CatalogPage from "../pages/catalog/catalog/CatalogPage";
import CatalogCategoryPage from "../pages/catalog/catalogCategory/CatalogCategoryPage";
import CreatePlatePage from "../pages/catalog/createPlate/CreatePlatePage";
import StoriesPage from "../pages/stories/StoriesPage";
import ClientsPage from "../pages/clients/ClientsPage";
import OrdersPage from "../pages/orders/OrdersPage";
import StatPage from "../pages/stat/StatPage";
import BasketPage from "../pages/basket/BasketPage";
import IntegrPage from "../pages/integr/IntegrPage";
import SettingsPage from "../pages/settings/SettingsPage";
import CheckAuth from "../hoc/ChekAuth";
import EditPlatePage from "../pages/catalog/createPlate/EditPlatePage";
import Sidebar from "../components/Sidebar/Sidebar";
import HeaderProfile from "../components/HeaderProfile/HeaderProfile";
import Header from "../components/Header/Header";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import MapTestPage from "../pages/maptest/MapTestPage";
import OrgsNewPage from "../pages/orgs/orgsCreate/OrgsNewPage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateBrands } from "../store/actions";
import EditPlateNew from "../pages/catalog/createPlate/EditPlateNew";
const App = () => {
    const loc = useLocation()
    const {token, settings} = useSelector(state => state)
    const dispatch = useDispatch()


    return (
        <>
            {
                loc.pathname == '/auth' ? (
                    <Header/>
                ) : (
                    <HeaderProfile/>
                    
                )
            }
            {
                loc.pathname != '/auth' ? (
                    <Sidebar updateCat/>
                ) : null
            }
            <Routes>
                <Route path="/test" element={<MapTestPage/>}/>
                <Route path="/" element={<CheckAuth><OrgsPage/></CheckAuth>}/>
                <Route path="/auth" element={<AuthPage/>}/>
                <Route path="/organizations" element={<CheckAuth><OrgsPage/></CheckAuth>}/>
                <Route path="/catalog" element={<CheckAuth><CatalogPage/></CheckAuth>}/>
                <Route path="/stories" element={<CheckAuth><StoriesPage/></CheckAuth>}/>
                <Route path="/clients" element={<CheckAuth><ClientsPage/></CheckAuth>}/>
                <Route path="/orders" element={<CheckAuth><OrdersPage/></CheckAuth>}/>
                <Route path="/statistic" element={<CheckAuth><StatPage/></CheckAuth>}/>
                <Route path="/basket" element={<CheckAuth><BasketPage/></CheckAuth>}/>
                <Route path="/integr" element={<CheckAuth><IntegrPage/></CheckAuth>}/>
                <Route path="/settings" element={<CheckAuth><SettingsPage/></CheckAuth>}/>
                <Route path="/catalog/:categoryId/createPlate" element={<CheckAuth><CreatePlatePage/></CheckAuth>}/>
                <Route path="/catalog/:categoryId/:subcategoryId/createPlate" element={<CheckAuth><CreatePlatePage/></CheckAuth>}/>
                <Route path="/catalog/:categoryId/editPlate/:plateId" element={<CheckAuth><EditPlatePage/></CheckAuth>}/>
                <Route path="/catalog/:categoryId/editPlate/:plateId/now" element={<CheckAuth><EditPlateNew/></CheckAuth>}/>
                <Route path="/catalog/:categoryId/:subcategoryId/editPlate/:plateId" element={<CheckAuth><EditPlatePage/></CheckAuth>}/>
                <Route path="/catalog/:categoryId/:subcategoryId/editPlate/:plateId/now" element={<CheckAuth><EditPlateNew/></CheckAuth>}/>
                <Route path="/catalog/:categoryId" element={<CheckAuth><CatalogCategoryPage/></CheckAuth>}/>
                <Route path="/catalog/:categoryId/:subcategoryId" element={<CheckAuth><CatalogCategoryPage/></CheckAuth>}/>
                <Route path="/organizations/:brandId" element={<CheckAuth><OrgsPage/></CheckAuth>}/>
                <Route path="/organizations/:brandId/create" element={<CheckAuth><OrgsCreatePage/></CheckAuth>}/>
                <Route path="/organizations/:brandId/:orgId" element={<CheckAuth><OrgsCreatePage/></CheckAuth>}/>
                <Route path="/organizations/:brandId/:orgId/now" element={<CheckAuth><OrgsNewPage/></CheckAuth>}/>
                <Route path="/organizations/create" element={<CheckAuth><OrgsCreatePage/></CheckAuth>}/>
                <Route path="/organizations/edit" element={<CheckAuth><OrgsCreatePage/></CheckAuth>}/>
                <Route path="*" element={<CheckAuth><Notfound/></CheckAuth>}/>
            </Routes>
        </>
        
    )
}

export default App;