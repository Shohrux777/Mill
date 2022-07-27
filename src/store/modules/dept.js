export default {
    state: {
        m_department: {
            rows: [],
            columns: ['name', 'company_name'],
            col: []
        },
        m_toProduct: {
            rows: [],
            columns: ['name', 'created_date'],
            col: []
        },

    },
    actions: {
        async fetchDepartment(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/TegirmonDepartment');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('updateDepartment', res_data);
        },
        async fetchToProduct(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/TegirmonProductToProductPersentage/getPagination?page=0&size=100');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('updateToProduct', res_data);
        },
    },
    mutations: {
        updateDepartment(state, data) {
            state.m_department.rows = data;
        },
        department_delete_row(state, index) {
            state.m_department.rows.splice(parseInt(index), 1);
        },
        updateToProduct(state, data){
            state.m_toProduct.rows = [];
            console.log(data)
            for(let i=0; i<data.items_list.length; i++){
                state.m_toProduct.rows.push({name:data.items_list[i].product.name, created_date: data.items_list[i].product.created_date, id:data.items_list[i].id})
            }
            console.log('state.m_toProduct.rows')
            console.log(state.m_toProduct.rows)
        }

    },
    getters: {
        allDepartment(state) {
            return state.m_department;
        },
        m_toProduct(state) {
            return state.m_toProduct;
        },

    }
}