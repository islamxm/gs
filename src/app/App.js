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

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<AuthPage/>}/>
            <Route path="/auth" element={<AuthPage/>}/>
            <Route path="/organizations" element={<OrgsPage/>}/>
            <Route path="/catalog" element={<CatalogPage/>}/>
            <Route path="/stories" element={<StoriesPage/>}/>
            <Route path="/clients" element={<ClientsPage/>}/>
            <Route path="/catalog/createPlate" element={<CreatePlatePage/>}/>
            <Route path="/catalog/categoryName" element={<CatalogCategoryPage/>}/>
            <Route path="/organizations/item" element={<OrgsPage/>}/>
            <Route path="/organizations/create" element={<OrgsCreatePage/>}/>
            <Route path="/organizations/edit" element={<OrgsCreatePage/>}/>
            <Route path="*" element={<Notfound/>}/>
        </Routes>
    )
}

export default App;