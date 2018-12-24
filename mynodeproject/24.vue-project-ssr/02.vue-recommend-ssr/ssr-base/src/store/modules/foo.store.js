export default {
    namespaced: true,
    state() {
        return {
            count: 0
        }
    },
    actions: {
        inc: ({ commit }) => commit('inc')
    },
    mutations: {
        inc: state => state.count++
    }
}