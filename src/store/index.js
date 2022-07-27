import Vue from 'vue'
import Vuex from 'vuex'
import company from '../store/modules/company'
import invoice from '../store/modules/invoice'
import district from '../store/modules/district'
import category from '../store/modules/category'
import productTag from '../store/modules/productTag'
import productType from '../store/modules/productType'
import user from '../store/modules/user'
import brend from '../store/modules/brend'
import product from '../store/modules/product'
import dept from '../store/modules/dept'
import sklad from '../store/modules/sklad'
import buy from '../store/modules/buy'  
import measurment from '../store/modules/measurment'
import client from '../store/modules/client'
import device from '../store/modules/device'
import contragent from '../store/modules/contragent'
import notification from '../store/modules/notification'
import check from '../store/modules/check'
import sell from '../store/modules/sell'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        hostname: 'https://localhost:5006/api',
        server_ip: 'https://localhost:5006/',
        deviceId: '',
        // hostname: 'http://10.1.12.27:5003/api',
        // server_ip: 'http://10.1.12.27:5003/',
        alert: false,

        pagination: {
            page: 0,
            size: 10
        },
        current_list: {
            current_item_count: 10,
            current_page: 1,
            items_count: localStorage.Items_count,
        },
        dontShowPagination: true,

    },
    mutations: {
        update_pagination(state, { size, page }) {
            // console.log('hiy girl')
            // console.log(size)
            // console.log(page)
            state.pagination.page = page;
            state.pagination.size = size;
            //   console.log(size)
        },
        update_pagination_first(state, { current_item_count, current_page, items_count }) {
            state.current_list.current_item_count = current_item_count;
            state.current_list.current_page = current_page;
            state.current_list.items_count = items_count;
            localStorage.Items_count = items_count;
            state.dontShowPagination = true;

        },
        update_deviceId(state,data){
            state.deviceId = data;
            console.log('state.device', state.deviceId)
        }


    },
    getters: {
        get_pagination(state) {
            return state.pagination;
        },
        get_current_list(state) {
            return state.current_list
        },
        dontShowPagination(state) {
            return state.dontShowPagination
        },
        deviceId(state){
            return state.deviceId
        },
    },
    actions: {

    },
    modules: {
        company,
        invoice,
        district,
        user,
        category,
        contragent,
        productTag,
        productType,
        brend,
        product,
        dept,
        sklad,
        buy,
        measurment,
        client,
        device,
        notification,
        sell,
        check
    }
})