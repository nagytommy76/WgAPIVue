export default {
    getters: {
        getMobileWidth: () => {
            return window.innerWidth <= 700 ? false : true
        }
    }
}