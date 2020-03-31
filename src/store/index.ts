import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import app from './modules/app'
import session from './modules/session'
import account from './modules/account'
import user from './modules/user'
import role from './modules/role'
import tenant from './modules/tenant'
import listType from './modules/list-type'
import systemCreatedList from './modules/system-created-list'
import userCreatedList from './modules/user-created-list'
import userCreatedListItem from './modules/user-created-list-item'
const store = new Vuex.Store({
    state: {
        //
    },
    mutations: {
        //
    },
    actions: {

    },
    modules: {
        app,
        session,
        account,
        user,
        role,
        tenant,
        listType,
        systemCreatedList,
        userCreatedList,
        userCreatedListItem
    }
});

export default store;