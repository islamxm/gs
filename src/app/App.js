import { Route, Routes } from "react-router-dom";

//pages
import AuthPage from "../pages/auth/AuthPage";
import OrgsPage from "../pages/orgs/orgs/OrgsPage";
import OrgsCreatePage from "../pages/orgs/orgsCreate/OrgsCreatePage";


const App = () => {
    return (
        <Routes>
            <Route path="/" element={<AuthPage/>}/>
            <Route path="/auth" element={<AuthPage/>}/>
            <Route path="/organizations" element={<OrgsPage/>}/>
            <Route path="/organizations/brand_name" element={<OrgsPage/>}/>
            <Route path="/organizations/create" element={<OrgsCreatePage/>}/>
        </Routes>
    )
}

export default App;