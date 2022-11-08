import endpoints from "./endpoints";
const headers = {
    'Content-type': 'application/json',
    'Accept': 'application/json',
}

class authService {
    
    auth = async (data) => {
        try {
            let res = await fetch(endpoints.auth, {
                method: 'POST',
                // mode: 'no-cors',
                headers,
                body: JSON.stringify(data)
            })

            return await res.json();
        } catch(err) {
            console.log(err)
        }
    }


}

export default authService;