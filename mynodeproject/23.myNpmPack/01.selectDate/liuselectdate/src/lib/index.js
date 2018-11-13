import example from './example.vue'

const liuselectdate = {
    install(Vue, options) {
        Vue.component(example.name, example)
    }
}

if (typeof window !== 'undefined' && window.Vue) {
    window.liuselectdate = liuselectdate
    Vue.use(liuselectdate)
}
export default liuselectdate