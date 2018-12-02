import * as types from '../mutation-types';

const state = {
    selectTab:{},
};
const getters = {
    getSelectTab:function(){
        return state.selectTab;
    }
};

const mutations = {
    [types.SELECT_TAB]: function (state, p) {
        state.selectTab = p;
    },
};
const actions = {};


export default {
    state,
    getters,
    actions,
    mutations
}