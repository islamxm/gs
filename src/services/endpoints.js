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
    addOrg: `${BASE_DOMAIN}/organisation/addOrganisation`,
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

    //каталог
    getCats: `${BASE_DOMAIN}/catalog/categoryes`,
    addCat: `${BASE_DOMAIN}/catalog/addCategory`,
    editCat: `${BASE_DOMAIN}/catalog/editCategory`,
    delCat: `${BASE_DOMAIN}/catalog/deleteCategory`,
    getProds: `${BASE_DOMAIN}/catalog/products`,
    addProd: `${BASE_DOMAIN}/catalog/addProduct`,
    editProd: `${BASE_DOMAIN}/catalog/editProduct`,
    delProd: `${BASE_DOMAIN}/catalog/deleteProduct`,

    getMods: `${BASE_DOMAIN}/catalog/modificators`,
    addMod: `${BASE_DOMAIN}/catalog/addModificators`,
    editMod: `${BASE_DOMAIN}/catalog/editModificators`,
    deleteMod: `${BASE_DOMAIN}/catalog/deleteModificators`,

    getAg: `${BASE_DOMAIN}/catalog/allergens`,
    addAg: `${BASE_DOMAIN}/catalog/addAllergen`,
    editAg: `${BASE_DOMAIN}/catalog/editAllergen`,
    deleteAg: `${BASE_DOMAIN}/catalog/deleteAllergen`,

    getRec: `${BASE_DOMAIN}/catalog/recommendations`,
    addRec: `${BASE_DOMAIN}/catalog/addRecommendation`,
    editRec: `${BASE_DOMAIN}/catalog/editRecommendation`,
    deleteRec: `${BASE_DOMAIN}/catalog/deleteRecommendation`,

    getPriceMass: `${BASE_DOMAIN}/catalog/prices`,
    addPriceMass: `${BASE_DOMAIN}/catalog/addPrice`,
    editPriceMass: `${BASE_DOMAIN}/catalog/editPrice`,
    deletePriceMass: `${BASE_DOMAIN}/catalog/deletePrice`,


}

export default endpoints;