import liuselectdate from './example.vue'

const liuselect = {
    install(Vue, options) {
        Vue.component(liuselectdate.name, liuselectdate)
    }
}

if (typeof window !== 'undefined' && window.Vue) {
    window.liuselect = liuselect
    Vue.use(liuselect)
}
export default liuselect

export {
    liuselectdate
}