<template>
  <div class="getProduct mx-3 mt-4">
    <div class="row px-4">
      <div class="col-4">
        <div style="position: relative; margin-top:0px;" class="m-0 p-0"> 
          <small class="bg-white" style="position: absolute; z-index:1; left:10px; top: -10px; color: #757575;">
            {{$t('search_here')}}
          </small>
          <mdb-input type="text" size="sm" class="m-0 p-0" @input="searchClick" v-model="search" outline/>
        </div>
      </div>
    </div>

    <div>
      <div class="px-0">
        <loader v-if="loading"/>
        <table class="myTableDebitorList ">
          <thead>
            <tr class="header py-3" style="background: #afd1fd;">
              <th  width="40" class="text-left">№</th>
              <th>{{$t('product')}}</th>
              <th>{{$t('price')}}</th>
              <th>Общие</th>
              <th>{{$t('measure_old')}}</th>
              <th>{{$t('measurment')}}</th>
              <th>{{$t('date')}}</th>
              <!-- <th >{{$t('lessons_cout')}}</th> -->
              <!-- <th width="80" class="text-center">{{$t('Action')}}</th> -->
            </tr>
          </thead>  
          <!-- v-show="adminStatus == 0 && row.product.inv_accepted_status == false" -->
          <tbody v-if="adminStatus == 0">
            <tr v-for="(row,rowIndex) in searchlist" :key="rowIndex" >
              <td> <span >{{rowIndex+1}}</span> </td>
              <td> <span >{{row.product.name}}</span> </td>
              <td> <span >{{row.product.price}}</span> </td>
              <td> <span >{{row.qty.toFixed(1)}}</span> </td>
              <td> <span >{{row.real_qty.toFixed(1)}}</span> </td>
              <td> <span >{{row.measurment.name}}</span> </td>
              <td> <span >{{row.updated_date_time.slice(0,10)}}</span> <span class="ml-2">{{row.updated_date_time.slice(11,16)}}</span> </td>
              <!-- <td> <span >{{row.lessons_cout}}</span> </td> -->  
            </tr>
          </tbody>
          <tbody v-else>
            <tr v-for="(row,rowIndex) in searchlist" :key="rowIndex" v-show="row.product.inv_accepted_status == false">
              <td> <span >{{rowIndex+1}}</span> </td>
              <td> <span >{{row.product.name}}</span> </td>
              <td> <span >{{row.product.price}}</span> </td>
              <td> <span >{{row.qty.toFixed(1)}}</span> </td>
              <td> <span >{{row.real_qty.toFixed(1)}}</span> </td>
              <td> <span >{{row.measurment.name}}</span> </td>
              <td> <span >{{row.updated_date_time.slice(0,10)}}</span> <span class="ml-2">{{row.updated_date_time.slice(11,16)}}</span> </td>
              <!-- <td> <span >{{row.lessons_cout}}</span> </td> -->  
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div>
      <div class="px-0" v-show="false">
        <loader v-if="loading"/>
        <table class="myTableDebitorList mt-4">
          <thead>
            <tr class="header py-3" style="background: #ffbda9;">
              <th  width="40" class="text-left">№</th>
              <th>{{$t('client_name')}}</th>
              <th>{{$t('passport_number')}}</th>
              <th>{{$t('phone_number')}}</th>
              <th>{{$t('product')}}</th>
              <th>{{$t('measure')}}</th>
              <th>{{$t('date')}}</th>
              <!-- <th >{{$t('lessons_cout')}}</th> -->
              <!-- <th width="80" class="text-center">{{$t('Action')}}</th> -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row,rowIndex) in comenList" :key="rowIndex" >
              <td> <span >{{rowIndex+1}}</span> </td>
              <td> <span >{{row.client.fio}}</span> </td>
              <td> <span >{{row.client.passport_number}}</span> </td>
              <td> <span >{{row.client.phone_number}}</span> </td>
              <td> <span >{{row.product.name}}</span> </td>
              <td> <span >{{row.real_qty.toFixed(1)}}</span> </td>
              <td> <span >{{row.updated_date_time.slice(0,10)}}</span> <span class="ml-2">{{row.updated_date_time.slice(11,16)}}</span> </td>
              <!-- <td> <span >{{row.lessons_cout}}</span> </td> -->  
            </tr> 
          </tbody>
        </table>
      </div>
    </div>

    
    <div>
    </div>

    <!-- <div class="row px-4 ">
      
      <div class="col-3 mt-5 px-3">
        <div class=" card pt-2 pr-3" style="position:relative;">
          <div class="product_name_price text-right">
            <div style="position:absolute; top: -15px; left: 20px; width: 85px; height:85px; background:#42a5f5;"
                 class="border card  d-flex justify-content-center align-items-center" >
                 <div style="width:45px; height: 45px;">
                  <img src="../../assets/wheat.png" class="img-fluid" alt=""> 
                 </div>
            </div>
            <h6 class="pro_name_color">Bug'doy</h6>
            <h4 class="mt-2">556 <span>кг</span></h4>
          </div>
          <div class="clickItem border-top mx-2">
            <small>Click product kg</small>
          </div>
        </div>
      </div>
      <div class="col-3 mt-5 px-3">
        <div class=" card pt-2 pr-3" style="position:relative;">
          <div class="product_name_price text-right">
            <div style="position:absolute; top: -15px; left: 20px; width: 85px; height:85px; "
                 class="border card bg-warning d-flex justify-content-center align-items-center">
              <div style="width:45px; height: 45px;">
                  <img src="../../assets/flour.png" class="img-fluid" alt=""> 
                 </div>
            </div>
            <h6 class="pro_name_color">Un</h6>
            <h4 class="mt-2">210 <span>кг</span></h4>
          </div>
          <div class="clickItem border-top mx-2">
            <small>Click product kg</small>
          </div>
        </div>
      </div>
      <div class="col-3 mt-5 px-3">
        <div class=" card pt-2 pr-3" style="position:relative;">
          <div class="product_name_price text-right">
            <div style="position:absolute; top: -15px; left: 20px; width: 85px; height:85px; background:#ba68c8;"
                 class="border card d-flex justify-content-center align-items-center">
              <div style="width:45px; height: 45px;">
                  <img src="../../assets/wheat.png" class="img-fluid" alt=""> 
                 </div>
            </div>
            <h6 class="pro_name_color">Makron</h6>
            <h4 class="mt-2">95 <span>кг</span></h4>
          </div>
          <div class="clickItem border-top mx-2">
            <small>Click product kg</small>
            <div class="mt-2">
              <div style="position: relative;">
                <mdb-input class="m-0 p-0" v-model="kg_ves" size="md"  outline  group type="text" validate error="wrong" success="right"/>
                <small style="position:absolute; top:-7px; left:10px; font-size: 11px;" class="bg-white px-2 py-0">{{$t('kg_ves')}}</small>
              </div>
            </div>
          </div>
          
        </div>
      </div>
       <div class="col-3 mt-5 px-3">
        <div class=" card pt-2 pr-3" style="position:relative;">
          <div class="product_name_price text-right">
            <div style="position:absolute; top: -15px; left: 20px; width: 85px; height:85px; background:#4db6ac;"
                 class="border card  d-flex justify-content-center align-items-center">
              <div style="width:45px; height: 45px;">
                  <img src="../../assets/sunflower-oil.png" class="img-fluid" alt=""> 
                 </div>
            </div>
            <h6 class="pro_name_color">Yo'g</h6>
            <h4 class="mt-2">30 <span>шт</span></h4>
          </div>
          <div class="clickItem border-top mx-2">
            <small>Click product kg</small>
          </div>
        </div>
      </div>
       <div class="col-3 mt-5 px-3">
        <div class=" card pt-2 pr-3" style="position:relative;">
          <div class="product_name_price text-right">
            <div style="position:absolute; top: -15px; left: 20px; width: 85px; height:85px; "
                 class="border card bg-warning d-flex justify-content-center align-items-center">
              <div style="width:45px; height: 45px;">
                  <img src="../../assets/flour.png" class="img-fluid" alt=""> 
                 </div>
            </div>
            <h6 class="pro_name_color">Un</h6>
            <h4 class="mt-2">210 <span>кг</span></h4>
          </div>
          <div class="clickItem border-top mx-2">
            <small>Click product kg</small>
          </div>
        </div>
      </div>
      <div class=" px-3 mt-5">
        <table  class="myTable">
        <thead>
          <tr  class="header ">
          <th style="width: 40px;">Ид</th>
          <th>{{$t('fio')}}</th>
          <th>{{$t('product')}}</th>
          <th>{{$t('date')}}</th>
          <th>{{$t('kg_ves')}}</th>
          <th>{{$t('type')}}</th>
          </tr>
        </thead>
        <tbody>
          <tr >
            <td>1</td>
            <td>Hamdamov Bahodir</td>
            <td>Bugdoy</td>
            <td>11.12.2022</td>
            <td>556  <i class="ml-2 fas fa-caret-down text-success"></i></td>
            <td class="text-success">Qabul qilingan</td>
          </tr>
          <tr >
            <td>2</td>
            <td>Hamdamov Bahodir</td>
            <td>Un</td>
            <td>14.12.2022</td>
            <td>30  <i class="ml-2 fas fa-caret-up text-danger"></i></td>
            <td class="text-danger">Olib ketilgan</td>
          </tr>
          <tr >
            <td>1</td>
            <td>Hamdamov Bahodir</td>
            <td>Yog'</td>
            <td>11.12.2022</td>
            <td>10  <i class="ml-2 fas fa-caret-up text-danger"></i></td>
            <td class="text-danger">Olib ketilgan</td>
          </tr>
          <tr >
            <td>1</td>
            <td>Hamdamov Bahodir</td>
            <td>Bugdoy</td>
            <td>11.12.2022</td>
            <td>100  <i class="ml-2 fas fa-caret-down text-success"></i></td>
            <td class="text-success">Qabul qilingan</td>
          </tr>
         
        </tbody>
      </table>
    </div>
      
    </div> -->
  </div>
</template>

<script>
import { mdbInput,  mdbBtn, } from "mdbvue"
import erpSelect from "../../components/erpSelectFio.vue";
import erpSelectAdd from "../../components/erpSelectAdd.vue";
import { required } from 'vuelidate/lib/validators'
import {mapActions,mapGetters} from 'vuex'
export default {
data(){
    return{
      modal_info: '',
      modal_status: false,  
      loading: false,
      id: this.$route.params.id,
      comenList: [],
      OstatkaList: [],

      name: '',
      user_name: "",
      user_id: null,
      passport_number: '',
      kg_ves: '',
      search: '',
      searchlist: [],

      adminStatus: localStorage.AccessType,

    }
  },
  components: {
    mdbInput,  mdbBtn, erpSelect, erpSelectAdd
  },
  validations: {
      name: {
        required
      },
      user_name:{
        required
      }
    },
    async mounted() {
      await this.fetchClient();
      await this.updateOstatka();
    },
   computed: mapGetters(['all_district_t', 'all_client_controler', 'allClient', 'all_contragent_t', 'allCompany', 'all_product_t']),
    
  methods: {
    ...mapActions(['fetch_district_t', 'fetch_client_controler', 'fetchClient', 'fetch_contragent_t', 'fetchCompany', 'fetch_product_t']),
    async selectOptionUser(option){
      console.log(option)
      this.user_name = option.name
      this.user_id = option.id
      this.fetchOstatka();
    },
    async fetchOstatka(){
      try{
        this.loading = true;
        const response = await fetch(this.$store.state.hostname + "/TegirmonClientOstatkas/getPaginationClientOstatkaByClientId?page=0&size=1000&client_id=" + this.user_id);
        const data = await response.json();
        this.loading = false;
        if(response.status == 201 || response.status == 200)
        {
          console.log('data');
          console.log(data);
          this.comenList = data.items_list;
          // const tre = response.json()
          // console.log(tre)
          this.$refs.message.success('Added_successfully')
          return true;
        }
        else{
          // const data = await response.text();
          this.modal_info = data;
          this.modal_status = true;
          return false;
        }
      }
      catch{
        this.loading = false;
        this.modal_info = this.$i18n.t('network_ne_connect');
        this.modal_status = true;
      }
    },
    async updateOstatka(){
      try{
        // this.loading = true;
        const response = await fetch(this.$store.state.hostname + "/TegirmonOstatka/getPagination?page=0&size=100");
        const data = await response.json();
        this.loading = false;
        if(response.status == 201 || response.status == 200)
        {
          console.log('datwa');
          console.log(data);
          this.OstatkaList = data.items_list;
          this.searchlist = data.items_list;
          // const tre = response.json()
          // console.log(tre)
          this.$refs.message.success('Added_successfully')
          return true;
        }
        else{
          // const data = await response.text();
          this.modal_info = data;
          this.modal_status = true;
          return false;
        }
      }
      catch{
        this.loading = false;
        this.modal_info = this.$i18n.t('network_ne_connect');
        this.modal_status = true;
      }
    },
    searchClick(){
    console.log('search_here')
    this.searchlist = this.OstatkaList;
      this.loading = true;
      if(this.search != ''){
        let userSearchList = [];
        for(let i=0; i<this.searchlist.length;i++){
          if(this.searchlist[i].product.name.toLowerCase().includes(this.search.toLowerCase()) || this.searchlist[i].product.price.toString().includes(this.search.toLowerCase()) ){
            userSearchList.push(this.searchlist[i])
          }
        }
        this.searchlist = userSearchList;
      }
      else{
        this.searchlist = this.OstatkaList;
      }
      this.loading = false;
  }
  },
}
</script>

<style lang="scss">
  
  .product_name_price{
    height: 90px;
  }
  .pro_name_color{
    color: #757575;
  }

  .myTable {
  /* border-collapse: collapse; */
  table-layout:fixed;
  width: 100%;
  overflow: hidden;
  // border: 1px solid #ddd;
  font-size: 18px;
  max-height:80px; overflow-x:auto
}
.myTable th{
  font-weight: 600;
  font-size:12px;
}
.myTable td{
  font-size:13px;
}
.myTable th, .myTable td {
  text-align: left;
  padding: 10px;
}

.myTable tr {
  border-bottom: 1px solid rgb(240, 240, 240);
}

.myTable tr.header, .myTable tr:hover {
  // background-color: #f1f1f1;
}
.delIcon{
  color: rgb(251, 70, 70);
  font-size: 13px;
}
.myTableDebitorList {
  /* border-collapse: collapse; */
  table-layout:fixed;
  width: 100%;
  overflow: hidden;
  // border: 1px solid #ddd;
  font-size: 18px;
  max-height:80px; overflow-x:auto
}
.myTableDebitorList th{
  font-weight: 600;
  font-size:11px;
}
.myTableDebitorList td{
  font-size:11.5px;
  
}
.myTableDebitorList td {
  text-align: left;
  padding: 7px 10px;
}
.myTableDebitorList th{
  text-align: left;
  padding: 8px 10px;
}

.myTableDebitorList tr {
  border-bottom: 1px dashed rgb(240, 240, 240);
  &:hover{
    background: #afd1fd;
  }
}

.myTableDebitorList tr.header, .myTableDebitorList tr:hover {
  // background-color: #f1f1f1;
}
.delIcon{
  color: rgb(251, 70, 70);
  font-size: 13px;
}
.editIcon{
  color:#01b348;
  font-size: 13px;
}
</style>