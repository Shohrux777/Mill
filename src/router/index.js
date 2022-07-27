import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'login',
        meta: { layout: 'empty' },
        component: () =>
            import ('../views/login/login.vue')
    },
    {
        path: '/company',
        name: 'company',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/company/company.vue')
    },
    {
        path: '/company_add/:id',
        name: 'company_add',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/company/company_Add.vue')
    },
    {
        path: '/product',
        name: 'product',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/product/product.vue')
    },
    {
        path: '/product_add/:id',
        name: 'product_add',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/product/product_Add.vue')
    },
    {
        path: '/contragent',
        name: 'contragent',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/contragent/contragent.vue')
    },
    {
        path: '/contragent_add/:id',
        name: 'contragent_add',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/contragent/contragent_Add.vue')
    },
    {
        path: '/district',
        name: 'district',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/district/district.vue')
    },
    {
        path: '/district_add/:id',
        name: 'district_add',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/district/district_Add.vue')
    },
    {
        path: '/measurment',
        name: 'measurment',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/measurment/measurment.vue')
    },
    {
        path: '/measurment_Add/:id',
        name: 'measurment_Add',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/measurment/measurment_Add.vue')
    },
    {
        path: '/user',
        name: 'user',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/user/user.vue')
    },
    {
        path: '/user_add/:id',
        name: 'user_add',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/user/user_Add.vue')
    },
    {
        path: '/department',
        name: 'department',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/department/department.vue')
    },
    {
        path: '/department_add/:id',
        name: 'department_add',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/department/department_Add.vue')
    },
    {
        path: '/client',
        name: 'client',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/client/client.vue')
    },
    {
        path: '/client_add/:id',
        name: 'client_add',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/client/client_Add.vue')
    },
    {
        path: '/webcam',
        name: 'webcam',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/webcam/webcam.vue')
    },
    {
        path: '/client_controler_add/:id',
        name: 'client_controler_add',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/client/client_controler_Add.vue')
    },
    {
        path: '/client_controler',
        name: 'client_controler',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/client/client_controler.vue')
    },
    
       
    {
        path: '/authorization/:id',
        name: 'authorization',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/user/authorization.vue')
    },
    


    // <----    Tegirmon  ---->

    {
        path: '/getProduct',
        name: 'getProduct',
        meta: { layout: 'navbar' },
        component: () =>
            import ('../views/mainPage/getProduct.vue')
    },
    {
        path: '/changeProduct',
        name: 'changeProduct',
        meta: { layout: 'navbar' },
        component: () =>
            import ('../views/mainPage/changeProduct.vue')
    },
    {
        path: '/buy',
        name: 'buy',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/buy/buy.vue')
    },
    {
        path: '/buy_add/:id',
        name: 'buy_add',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/buy/buy_Add.vue')
    },
    
    {
        path: '/changing',
        name: 'changing',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/changing/changing.vue')
    },
    {
        path: '/changing_add/:id',
        name: 'changing_add',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/changing/changing_Add.vue')
    },
    {
        path: '/tarozi',
        name: 'tarozi',
        meta: { layout: 'navbar' },
        component: () =>
            import ('../views/mainPage/tarozi.vue')
    },
    {
        path: '/today_comingList',
        name: 'today_comingList',
        meta: { layout: 'navbar' },
        component: () =>
            import ('../views/mainPage/today_comingList.vue')
    },
    {
        path: '/changeScore/:id',
        name: 'changeScore',
        meta: { layout: 'navbar' },
        component: () =>
            import ('../views/mainPage/changeScore.vue')
    },
    {
        path: '/zaxiraniAlmashtirish/',
        name: 'zaxiraniAlmashtirish',
        meta: { layout: 'navbar' },
        component: () =>
            import ('../views/mainPage/zaxiraniAlmashtirish.vue')
    },
    {
        path: '/sell',
        name: 'sell',
        meta: { layout: 'empty' },
        component: () =>
            import ('../views/sell/sell.vue')
    },
    {
        path: '/setting',
        name: 'setting',
        meta: { layout: 'empty' },
        component: () =>
            import ('../views/setting/setting.vue')
    },
    {
        path: '/today_groups',
        name: 'today_groups',
        meta: { layout: 'navbar' },
        component: () =>
            import ('../views/mainPage/today_groups.vue')
    },
    {
        path: '/showGroupDetail/:id',
        name: 'showGroupDetail',
        meta: { layout: 'navbar' },
        component: () =>
            import ('../views/mainPage/showGroupDetail.vue')
    },
    {
        path: '/showGroupDetailAccept/:id',
        name: 'showGroupDetailAccept',
        meta: { layout: 'navbar' },
        component: () =>
            import ('../views/mainPage/showGroupDetailAccept.vue')
    },
    {
        path: '/showRuyxatItem/:id',
        name: 'showRuyxatItem',
        meta: { layout: 'navbar' },
        component: () =>
            import ('../views/mainPage/showRuyxatItem.vue')
    },
    {
        path: '/getProductFromGroup',
        name: 'getProductFromGroup',
        meta: { layout: 'navbar' },
        component: () =>
            import ('../views/mainPage/getProductFromGroup.vue')
    },
    {
        path: '/groupsAccepted',
        name: 'groupsAccepted',
        meta: { layout: 'navbar' },
        component: () =>
            import ('../views/mainPage/groupsAccepted.vue')
    },
    {
        path: '/rasxod',
        name: 'rasxod',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/report/rasxod.vue')
    },
    {
        path: '/getProduct_report',
        name: 'getProduct_report',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/report/getProduct_report.vue')
    },
    {
        path: '/zaxiraSend',
        name: 'zaxiraSend',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/report/zaxiraSend.vue')
    },
    {
        path: '/zaxiraList',
        name: 'zaxiraList',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/report/zaxiraList.vue')
    },
    {
        path: '/chiqarilPulOlish',
        name: 'chiqarilPulOlish',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/report/chiqarilPulOlish.vue')
    },
    {
        path: '/changeWithoutReg',
        name: 'changeWithoutReg',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/report/changeWithoutReg.vue')
    },
    {
        path: '/millUndo',
        name: 'millUndo',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/report/millUndo.vue')
    },
    



]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    console.log(from)
    if (to.path != '/') {
        if (localStorage.Login != '') {
            if (localStorage.AccessType == 1) {
                if (to.path == '/rasxod' || to.path == '/getProduct_report' || to.path == '/zaxiraSend'
                 || to.path == '/changeWithoutReg' || to.path == '/millUndo' || to.path == '/zaxiraList' ) {
                    next('/zaxiraniAlmashtirish')
                }
            } else if (localStorage.AccessType == 0) {
                next()
            } else if (localStorage.AccessType == 2) {
                if (to.path == '/sell' || to.path == '/zaxiraniAlmashtirish' || to.path == '/product' || to.path == '/zaxiraList') {
                    next('/tarozi')
                }
            }
             else {
                next()
            }

            next()

        } else {
            next('/')
        }
    } else {
        next()
    }
})

export default router