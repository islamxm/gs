export const BASE_DOMAIN = `${process.env.REACT_APP_HOST}/NewAdminPanel`;


const endpoints = {
    //порядок

    // авторизация
    auth: `${BASE_DOMAIN}/auth/authorization`,

    //организации
    getBrands: `${BASE_DOMAIN}/organisation/getBrands`,
    addBrand: `${BASE_DOMAIN}/organisation/addBrand`,
    updateBrand: `${BASE_DOMAIN}/organisation/updateBrand`,
    deleteBrand: `${BASE_DOMAIN}/organisation/deleteBrand`,
    getOrgs: `${BASE_DOMAIN}/organisation/getOrganisations`,
    addOrg: `${BASE_DOMAIN}/organisation/addOrganisation`,
    updateOrg: `${BASE_DOMAIN}/organisation/updateOrganisation`,
    deleteOrg: `${BASE_DOMAIN}/organisation/deleteOrganisation`,
    getPols: `${BASE_DOMAIN}/organisation/polygons`,
    addPol: `${BASE_DOMAIN}/organisation/addPolygon`,
    editPol: `${BASE_DOMAIN}/organisation/editPolygon`,
    deletePol: `${BASE_DOMAIN}/organisation/deletePolygon`,
    getPay: `${BASE_DOMAIN}/organisation/payments`,
    addPay: `${BASE_DOMAIN}/organisation/addPayments`,
    editPay: `${BASE_DOMAIN}/organisation/editPayment`,
    deletePay: `${BASE_DOMAIN}/organisation/deletePayment`,

    //каталог
    addPlateImg: `${BASE_DOMAIN}/catalog/addPlateImage`,
    deletePlateImg: `${BASE_DOMAIN}/catalog/deleteImage`,

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



    //integration settings
    getIntSettings: `${BASE_DOMAIN}/catalog/integrationSettings`,
    editIntSettings: `${BASE_DOMAIN}/catalog/editIntegrationSettings`,
    startIntegr: `${BASE_DOMAIN}/integration/startIntegration`,



    //analytics
    getOrders: `${BASE_DOMAIN}/analytics/getOrders`,
    getStatuses: `${BASE_DOMAIN}/analytics/getStatuses`,
    getUsers: `${BASE_DOMAIN}/analytics/getUsers`,
    sendMailToAllUsers: `${BASE_DOMAIN}/analytics/sendMailToAllUsers`,
    editOrderStatus: `${BASE_DOMAIN}/analytics/editOrderStatus`,
    editOrderPaidStatus: `${BASE_DOMAIN}/analytics/editOrderPaidStatus`



}

export default endpoints;