<template>
  <div class="">
    <mdb-navbar  class="p-1 navbarTegirmon" expand="small" size="sm"  >
      <!-- Navbar brand -->
      <mdb-navbar-brand  >
        <div class="d-flex align-items-center text-white">
          <div style="width:30px; height:32px;" class="mx-1">
            <!-- <img src="../assets/windmill.png" class="img-fluid" alt=""> -->
          </div>
          <a href="/product" style="text-align: justify;letter-spacing: 3px; color:white;">
            Тегирмон
          </a>
        </div>
        <!-- activeItem -->
      </mdb-navbar-brand>
      <mdb-navbar-toggler class="ml-5">
          <mdb-navbar-nav> 
            <router-link v-for="(item,i) in option" :key="i" :class="{'activeItem': item.active}" :to="item.url" 
            >
              <mdb-nav-item @click="selectActive(i)"
               class="px-2 navbarItems" >{{item.name}}</mdb-nav-item>
            </router-link>
            <mdb-nav-item 
               class="px-2 navbarItems" >{{kassir}}</mdb-nav-item>
          </mdb-navbar-nav>
      </mdb-navbar-toggler>
    </mdb-navbar>
    <div style="" class="mt-4">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import { mdbNavbar, mdbNavbarBrand, mdbNavbarToggler, mdbNavbarNav, mdbNavItem } from 'mdbvue';
  export default {
    name: 'NavbarPage',
    components: {
      mdbNavbar,
      mdbNavbarBrand,
      mdbNavbarToggler,
      mdbNavbarNav,
      mdbNavItem
    },
    data() {
      return {
        kassir: localStorage.user_name,
        option:[
          {name: 'Получить продукт', url: '/getProduct', active: false,},
          {name: 'Захира', url: '/zaxiraniAlmashtirish', active: false,},
          {name: 'Тароз', url: '/tarozi', active: false,},
          {name: 'Тароз список', url: '/today_groups', active: false,},
          {name: 'Продажа', url: '/sell', active: false,},
          {name: 'Остатка', url: '/changeProduct', active: false,},
          {name: 'Выйти', url: '/', active: false,},
        ]
      }
    },
    methods: {
      selectActive(k){
        console.log('hiy girls')
        this.option[k].active = true;
        for(let i=0; i<this.option.length; i++){
          if(i!=k){
            this.option[i].active = false;
          }
        }
        console.log( this.option)
      }
    },
  }
</script>
<style lang="scss">
  .navbarTegirmon{
    background: #1B3446 ;
    box-sizing: border-box;
  }
  .navbarItems{
    font-size:12.5px; 
    color:white !important;
  }
  .navbar .nav-item .nav-link{
    color:white !important;
  }
  .navbarItems:hover{
    border-bottom: 1px solid orange;
  }
  .activeItem{
    border-bottom: 1px solid orange;
  }
</style>


