import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'

Vue.use(Vuex)

//用于响应组件中的动作
const actions = {
    // setDeep(context,value){
    //     console.log('actions里setDeep被调用了')
    //     context.commit('SetDeep',value)
    // }
}
//用于操作数据state
const mutations = {
    SetTable(state, value) {
        console.log('mutations里SetTable被调用了')
        state.tableData = value
    },
    SetDeep(state,value){
        console.log('mutations里SetDeep被调用了')
        state.deepData = value
    },
    SetListen(state,value){
        console.log('mutations里SetListen被调用了')
        state.listenData = value
    }
}
//用于存储数据
const state = {
    tableData:[],
    deepData:[],
    listenData:[],
}

const getters = {
    overMap(state){
        const map = new Map()
        state.tableData.forEach(item => {
            let list = []
            if (map.has(item.notes)) {
                list = map.get(item.notes)
                list.push(item)
                map.set(item.notes, list)
            } else {
                list.push(item)
                map.set(item.notes, list)
            } 
        });
        return map
    }
}

export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters
})

