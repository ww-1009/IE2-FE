import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    inputStr: "",
    value: "1",
    hasSearched:[],
    entityNode: [],
    entityLinks: [],
    porpertyNode:[],
    porpertyLinks:[],
  },
  mutations: {
    changeInputStr(state,item){
      state.inputStr=item
    },
    changeValue(state,item){
      state.value=item
    },
    changeSearched(state,item){
      state.hasSearched=item
    },
    changeEntityNode(state,item){
      state.entityNode=item
    },
    changeEntityLinks(state,item){
      state.entityLinks=item
    },
    changePorpertyLinks(state,item){
      state.porpertyLinks=item
    },
    changePorpertyNode(state,item){
      state.porpertyNode=item
    },
  },
  actions: {
  },
  modules: {
  }
})
