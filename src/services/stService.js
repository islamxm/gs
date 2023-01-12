import endpoints from "./endpoints";
import checkAuth from "./checkAuth";

const headers = {
    'Content-type': 'application/json',
    'Accept': 'application/json',
}
//'Authorization': `Bearer ${token}`,


class stService {
    getStories = async (token) => {
        try {
            let res = await fetch(endpoints.getStories, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`,
                }
            })
            return await checkAuth(res)
        } catch(err) {
            console.log(err)
        }
    }
}

export default stService;