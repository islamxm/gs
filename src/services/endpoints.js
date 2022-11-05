const BASE_DOMAIN = 'https://soultri.site/NewAdminPanel';


const endpoints = {
    // авторизация
    auth: `${BASE_DOMAIN}/auth/authorization`,

    //организации
    getBrands: `${BASE_DOMAIN}/organisation/getBrands`,
    addBrand: `${BASE_DOMAIN}/organisation/addBrand`,
    updateBrand: `${BASE_DOMAIN}/organisation/updateBrand`,
    deleteBrand: `${BASE_DOMAIN}/organisation/deleteBrand`,
    getOrgs: `${BASE_DOMAIN}/organisation/getOrganisations`,
    addOrg: `${BASE_DOMAIN}/organisation/addOrganisations`,
    updateOrg: `${BASE_DOMAIN}/organisation/updateOrganisations`,
    deleteOrg: `${BASE_DOMAIN}/organisation/deleteOrganisations`,
    getPols: `${BASE_DOMAIN}/organisation/polygons`,
    addPol: `${BASE_DOMAIN}/organisation/addPolygon`,
    editPol: `${BASE_DOMAIN}/organisation/editPolygon`,
    deletePol: `${BASE_DOMAIN}/organisation/deletePolygon`,
    getPay: `${BASE_DOMAIN}/organisation/payments`,
    addPay: `${BASE_DOMAIN}/organisation/addPayments`,
    editPay: `${BASE_DOMAIN}/organisation/editPayments`,
    deletePay: `${BASE_DOMAIN}/organisation/deletePayments`,
}

export default endpoints;