import Vue from 'vue'
import Vuex from 'vuex'
import Tab from '../store/tab'
Vue.use(Vuex)

// const store = new Vuex.Store({
//     modules: {
//         Tab
//     }
// })
export default new Vuex.Store({
    modules: {
        Tab
    }
})
// export default store