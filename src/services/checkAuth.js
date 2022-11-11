const LOCAL_STORAGE = window.localStorage;

const checkAuth = async (response) => {
    if(response.status === 401) {
        LOCAL_STORAGE.removeItem('gs-token')
        window.location.replace(window.location.origin + '/auth')
    } else {
        return response.json()
    }
}

export default checkAuth;