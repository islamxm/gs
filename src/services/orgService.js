import endpoints from "./endpoints";
const headers = {
    'Content-type': 'application/json',
    'Accept': 'application/json',
}


class orgService {

    //БРЕНДЫ
    getBrands = async (token) => {
        try {
            let res = await fetch(endpoints.getBrands, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    ...headers
                }
            })

            return await res.json()
        } catch(err) {
            console.log(err)
        }
    }

    addBrand = async (token, body) => {
        try {
            let res = await fetch(endpoints.addBrand, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body,
            })

            return await res.json()
        } catch(err) {
            console.log(err)
        }
    }

    updateBrand = async (token, body) => {
        try {
            let res = await fetch(endpoints.updateBrand, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body,
            })

            return await res.json()
        } catch(err) {
            console.log(err)
        }
    } 

    deleteBrand = async (token, body) => {
        try {
            let res = await fetch(endpoints.deleteBrand, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    ...headers
                },
                body: JSON.stringify(body)
            })

            return await res.json()
        } catch(err) {
            console.log(err)
        }
    }

    //ОРГАНИЗАЦИИ
    getOrgs = async (token, body) => {
        try {
            let res = await fetch(endpoints.getOrgs, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    ...headers
                },
                body: JSON.stringify(body),
                mode: 'cors'
            })

            return await res.json()
        } catch(err) {
            console.log(err)
        }
    }

    addOrg = async (token, body) => {
        try {
            let res = await fetch(endpoints.addOrg, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body,
                // mode: 'cors'
            })

            return await res.json()
        } catch(err) {
            console.log(err)
        }
    }

    editOrg = async (token, body) => {
        try {
            let res = await fetch(endpoints.editOrg, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body
            })

            return await res.json()
        } catch(err) {
            console.log(err)
        }
    }

    deleteOrg = async (token, body) => {
        try {
            let res = await fetch(endpoints.deleteOrg, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    ...headers
                },
                body: JSON.stringify(body)
            })

            return await res.json()
        } catch(err) {
            console.log(err)
        }
    }

    getPols = async (token, body) => {
        try {
            let res = await fetch(endpoints.getPols, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    ...headers
                },
                body: JSON.stringify(body)
            })

            return await res.json()
        } catch(err) {
            console.log(err)
        }
    }

    addPol = async (token, body) => {
        try {
            let res = await fetch(endpoints.addPol, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    ...headers
                },
                body: JSON.stringify(body)
            })

            return await res.json()
        } catch(err) {
            console.log(err)
        }
    }

    editPol = async (token, body) => {
        try {
            let res = await fetch(endpoints.editPol, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    ...headers
                },
                body: JSON.stringify(body)
            })

            return await res.json()
        } catch(err) {
            console.log(err)
        }
    }

    getPay = async (token, body) => {
        try {
            let res = await fetch(endpoints.getPay, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    ...headers
                },
                body: JSON.stringify(body)
            })

            return await res.json()
        } catch(err) {
            console.log(err)
        }
    }
    
    addPay = async (token, body) => {
        try {
            let res = await fetch(endpoints.addPay, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    ...headers
                },
                body: JSON.stringify(body)
            })

            return await res.json()
        } catch(err) {
            console.log(err)
        }
    }

    editPay = async (token, body) => {
        try {
            let res = await fetch(endpoints.editPay, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    ...headers
                },
                body: JSON.stringify(body)
            })

            return await res.json()
        } catch(err) {
            console.log(err)
        }
    }

    deletePay = async (token, body) => {
        try {
            let res = await fetch(endpoints.deletePay, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    ...headers
                },
                body: JSON.stringify(body)
            })

            return await res.json()
        } catch(err) {
            console.log(err)
        }
    }

}

export default orgService;