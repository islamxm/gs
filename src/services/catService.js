import endpoints from "./endpoints";
import checkAuth from "./checkAuth";

const headers = {
    'Content-type': 'application/json',
    'Accept': 'application/json',
}

//'Authorization': `Bearer ${token}`,

class catService {
    getCats = async (token, body) => {

        try {
            let res = await fetch(endpoints.getCats, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`,
                },
                // mode: 'cors'
            })

            return await checkAuth(res)
        } catch(err) {
            console.log(err)
        }
    }

    addCat = async (token, body) => {
        try {
            let res = await fetch(endpoints.addCat, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`,
                },
            })

            return await checkAuth(res)
        } catch(err) {
            console.log(err)
        }
    }

    editCat = async (token, body) => {
        try {
            let res = await fetch(endpoints.editCat, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`,
                },
            })

            return await checkAuth(res)
        } catch(err) {
            console.log(err)
        }
    }

    delCat = async (token, body) => {
        try {
            let res = await fetch(endpoints.delCat, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`,
                },
            })

            return await checkAuth(res)
        } catch(err) {
            console.log(err)
        }
    }

    getProds = async (token, body) => {
        
        try {
            let res = await fetch(endpoints.getProds, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`,
                },
            })

            return await checkAuth(res)
        } catch(err) {
            console.log(err)
        }
    }

    addProd = async (token, body) => {
     
        try {
            let res = await fetch(endpoints.addProd, {
                method: 'POST',
                body,
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
            return await checkAuth(res)
        } catch(err) {
            console.log(err)
        }
    }

    editProd = async (token, body) => {
        try {
            let res = await fetch(endpoints.editProd, {
                method: 'POST',
                body,
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })

            return await checkAuth(res)
        } catch(err) {
            console.log(err)
        }
    }

    delProd = async (token, body) => {
        try {
            let res = await fetch(endpoints.delProd, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`,
                },
            })

            return await checkAuth(res)
        } catch(err) {
            console.log(err)
        }
    }

    getMods = async (token, body) => {
        try {
            let res = await fetch(endpoints.getMods, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`,
                },
            })

            return await checkAuth(res)
        } catch(err) {
            console.log(err)
        }
    }
    addMod = async (token, body) => {
        try {
            let res = await fetch(endpoints.addMod, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`,
                },
            })
            return await checkAuth(res)
        } catch(err) {
            console.log(err)
        }
    }

    editMod = async (token, body) => {
        try {
            let res = await fetch(endpoints.editMod, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`,
                },
            })

            return await checkAuth(res)
        } catch(err) {
            console.log(err)
        }
    }
    deleteMod = async (token, body) => {
        try {
            let res = await fetch(endpoints.deleteMod, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`,
                },
            })

            return await checkAuth(res)
        } catch(err) {
            console.log(err)
        }
    }

    getAllergens = async (token, body) => {
        try {
            let res = await fetch(endpoints.getAg, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`,
                },
            })

            return await checkAuth(res)
        } catch(err) {
            console.log(err)
        }
    }

    addAllergens = async (token, body) => {
        try {
            let res = await fetch(endpoints.addAg, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`,
                },
            })

            return await checkAuth(res)
        } catch(err) {
            console.log(err)
        }
    }

    editAllergens = async (token, body) => {
        try {
            let res = await fetch(endpoints.editAg, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`,
                },
            })

            return await checkAuth(res)
        } catch(err) {
            console.log(err)
        }
    }

    deleteAllergens = async (token, body) => {
        try {
            let res = await fetch(endpoints.deleteAg, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`,
                },
            })

            return await checkAuth(res)
        } catch(err) {
            console.log(err)
        }
    }

    getRec = async (token, body) => {
        try {
            let res = await fetch(endpoints.getRec, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`,
                },
            })

            return await checkAuth(res)
        } catch(err) {
            console.log(err)
        }
    }

    addRec = async (token, body) => {
        try {
            let res = await fetch(endpoints.addRec, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`,
                },
            })

            return await checkAuth(res)
        } catch(err) {
            console.log(err)
        }
    }

    editRec = async (token, body) => {
        try {
            let res = await fetch(endpoints.editRec, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`,
                },
            })

            return await checkAuth(res)
        } catch(err) {
            console.log(err)
        }
    }

    deleteRec = async (token, body) => {
        try {
            let res = await fetch(endpoints.deleteRec, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`,
                },
            })

            return await checkAuth(res)
        } catch(err) {
            console.log(err)
        }
    }

    getPriceMass = async (token, body) => {
        console.log(endpoints.getPriceMass)
        try {
            let res = await fetch(endpoints.getPriceMass, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`,
                },
            })

            return await checkAuth(res)
        } catch(err) {
            console.log(err)
        }
    }

    addPriceMass = async (token, body) => {
        try {
            let res = await fetch(endpoints.addPriceMass, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`,
                },
            })

            return await checkAuth(res)
        } catch(err) {
            console.log(err)
        }
    }

    editPriceMass = async (token, body) => {
        try {
            let res = await fetch(endpoints.editPriceMass, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`,
                },
            })

            return await checkAuth(res)
        } catch(err) {
            console.log(err)
        }
    }
    
    deletePriceMass = async (token, body) => {
        try {
            let res = await fetch(endpoints.deletePriceMass, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`,
                },
            })

            return await checkAuth(res)
        } catch(err) {
            console.log(err)
        }
    }

    addPlateImg = async (token, body) => {
        try {
            let res = await fetch(endpoints.addPlateImg, {
                method: 'POST',
                body,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            return await checkAuth(res)
        } catch(err) {
            console.log(err)
        }
    }

    deletePlateImg = async (token, body) => {
        try {
            let res = await fetch(endpoints.deletePlateImg, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                }
            })
            return await checkAuth(res)
        } catch(err) {
            console.log(err)
        }
    }
}


export default catService;