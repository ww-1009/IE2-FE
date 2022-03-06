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
    typeNode:[],
    typeLinks:[],
    newstop:[],
    img:"",
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
    changetypeLinks(state,item){
      state.typeLinks=item
    },
    changetypeNode(state,item){
      state.typeNode=item
    },
    changePorpertyLinks(state,item){
      state.porpertyLinks=item
    },
    changePorpertyNode(state,item){
      state.porpertyNode=item
    },
    changeNewsTop(state,item){
      state.newstop=item
    },
    changeImg(state,item){
      state.img=item
    },
  },
  actions: {
  },
  modules: {
  }
})
