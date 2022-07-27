export default {
    state: {
        m_client: {
            rows: [],
            columns: ['fio','adddress','phone_number','passport_number','addiotionala_information','note'],
            col: []
        },
        auth_list: [],

        client_controler: {
            rows: [],
            columns: ['name' ],
            col: []
        },
    },
    actions: {
        async fetchClient(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/TegirmonClient/getPagination?page=0&size=100');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('updateClient', res_data);
        },
        // async fetchClient_column(ctx, id) {
        //     const res = await fetch(ctx.rootState.hostname + '/TexColumnConfigs/getColumnListAsJsonObj?tableName=pos_client&auth_id=' + id);
        //     const res_data = await res.json();
        //     ctx.commit('updateClient_column', res_data);
        // },

        async fetch_client_controler(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/TegirmonClientGroupControler');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('update_client_controler', res_data);
        },
        // async fetch_client_controler_column(ctx, id) {
        //     const res = await fetch(ctx.rootState.hostname + '/TexColumnConfigs/getColumnListAsJsonObj?tableName=pos_company&auth_id=' + id);
        //     const res_data = await res.json();
        //     ctx.commit('update_client_controler_column', res_data);
        // },
    },
    mutations: {
        updateClient(state, data) {
            console.log(data)
            state.m_client.rows = data.items_list;
        },
        client_delete_row(state, index) {
            state.m_client.rows.splice(parseInt(index), 1);
        },
        updateClient_column(state, data) {
            state.m_client.col = data;
            console.log(data)
                //status true bolgan ustun nomlarini olish uchun
            state.m_client.columns = data.column_default_obj.filter(obj => { return obj.status === true }).map(({ name }) => name);
        },

        update_client_controler(state, data) {
            console.log(data)
            state.client_controler.rows = data;
        },
        client_controler_delete_row(state, index) {
            state.client_controler.rows.splice(parseInt(index), 1);
        },
        update_client_controler_column(state, data) {
            state.client_controler.col = data;
            console.log(data)
                //status true bolgan ustun nomlarini olish uchun
            state.client_controler.columns = data.column_default_obj.filter(obj => { return obj.status === true }).map(({ name }) => name);
        },

    },
    getters: {
        allClient(state) {
            return state.m_client;
        },

        all_client_controler(state) {
            return state.client_controler;
        }

    }
}