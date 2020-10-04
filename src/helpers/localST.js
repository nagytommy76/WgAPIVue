export default class LocalSTClass{
    static setTokenLocalStorage(key = 'token', tokenData){
        localStorage.setItem(key, JSON.stringify(tokenData))
    }

    static getTokenLocalStorage(key = 'token'){
        return JSON.parse(localStorage.getItem(key))
    }

    static removeTokenLocalStroage(key = 'token'){
        localStorage.removeItem(key)
    }
}