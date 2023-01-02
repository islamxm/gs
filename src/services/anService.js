import endpoints from "./endpoints";
import checkAuth from "./checkAuth";

const headers = {
    'Content-type': 'application/json',
    'Accept': 'application/json',
}


class anService {


    getOrders = async (token, body) => {
        try {
            let res = await fetch(endpoints.getOrders, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    ...headers
                },
                body: JSON.stringify(body)
            })

            const result = await checkAuth(res)
            return result;
        } catch(err) {
            console.log(err)
        }
    }

    editOrderStatus = async (token, body) => {
        try {
            let res = await fetch(endpoints.editOrderStatus, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(body)
            })
            const result = await checkAuth(res)
            return result;
        } catch(err) {
            console.log(err)
        }
    }

    editOrderPaidStatus = async (token, body) => {
        try {
            let res = await fetch(endpoints.editOrderPaidStatus, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(body)
            })
            const result = await checkAuth(res)
            return result;
        }catch(err) {
            console.log(err)
        }
    }

    getStatuses = async (token) => {
        try {
            let res = await fetch(endpoints.getStatuses, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            const result = await checkAuth(res)
            return result;
        } catch(err) {
            console.log(err)
        }
    }

    getUsers = async (token, body) => {
        try {
            let res = await fetch(endpoints.getUsers, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Authorization': `Bearer ${token}`,
                    ...headers
                }
            })
            const result = await checkAuth(res)
            return result;
        } catch(err) {
            console.log(err)
        }
    }

    sendMailToAllUsers = async (token, title, body) => {
        try {
            let res = await fetch(endpoints.sendMailToAllUsers, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    ...headers
                },
                body: JSON.stringify({
                    Title: title,
                    Body: body
                })
            })
            const result = await checkAuth(res)
            return result;
        }catch(err) {
            console.log(err)
        }
    }
}

export default anService;