<template>
  <div class="zaxira">
    <checkzaxira v-if="show_check" @close="show_check = false"/>
    <checkgetProduct v-else-if="show_check_get" @close="show_check_get = false"/>
    <checkZaxiraInvoice v-else-if="show_check_zaxira_invoice" @close="show_check_zaxira_invoice = false"/>
    <div v-else class="getProduct  my-4" >
      <div class="row px-4 pt-3" :class="{'bg_red_color': oshibka_client == 1}">
        <div class="col-3">
          <div class="" >
            <erpSelect
            :options="allClient.rows"
            @select="selectOptionUser"
            :selected="user_name"
            size="sm"
            class="bg-white"
            url="/TegirmonClient/getPaginationSearchByFioOrPassportSerailNumberOrHomeOrMobilePhoneNumber?page=0&size=100&fio_or_serial_number="
            :label="$t('client')"
            />
            <small style="position:absolute; top:-7px; left:20px; font-size: 11px;" class="bg-white px-2 py-0">{{$t('client')}}</small>
            <small v-if="$v.user_name.$dirty && user_id == null" class="invalid-text mt-0 ml-2" >
              {{$t('select_item')}}
            </small>
          </div>
        </div>


        <!-- <div class="col-3">
          <mdb-input class="m-0 p-0" v-model="passport_number" size="md"  outline  group type="text" validate error="wrong" success="right"/>
          <small style="position:absolute; top:-7px; left:20px; font-size: 11px;" class="bg-white px-2 py-0">{{$t('passport_number')}}</small>
      
        </div> -->
        <div class="col-3">
          <input-search  @select="selectClientPassport" :label="$t('passport_number')" :selected="passport_number"
            url="/TegirmonClient/getPaginationSearchByFioOrPassportSerailNumberOrHomeOrMobilePhoneNumber?page=0&size=100&fio_or_serial_number="
            ref="search_client"  style="height:32px;">
          </input-search>
        </div>

        <div class="col-3">
          <input-search  @select="selectClientBorn" type="text" :label="$t('born_date')" :selected="born_date" placeholder="yyyy-mm-dd"
            url="/TegirmonClient/getPaginationByBornDate?page=0&size=100&born_date_str="
            ref="search_client_born_date" style="height:32px;">
          </input-search>
        </div>
        <div class="col-3">
          <input-search  @select="selectClientPhone" :label="$t('note')" :selected="phone_number"
            url="/TegirmonClient/getPaginationByNote?page=0&size=100&note_str="
            ref="search_client_phone" style="height:32px;">
          </input-search>
        </div>

      </div>
      <div class="davernos_info px-4 mt-2" v-if="davernost_name" >
        <div class="row">
          <div class="col-3">
            <mdb-input class="m-0 p-0" v-model="davernost_name" size="sm"  outline  group type="text" validate error="wrong" success="right"/>
          </div>
          <div class="col-3">
            <mdb-input class="m-0 p-0" v-model="davernost_password" size="sm"  outline  group type="text" validate error="wrong" success="right"/>
          </div>
          <div class="col-3">
            <mdb-input class="m-0 p-0" v-model="davernost_phone" size="sm"  outline  group type="text" validate error="wrong" success="right"/>
          </div>
          <div class="col-3">
            <mdb-btn
              class="mr-1 px-3 py-1 text-white"
              style="font-size: 12px"
              color="info"
              darkWaves
              tag="a"
              floating
              size="sm"
              @click="show_davernis_info = true"
              >{{ $t("show_davernis") }}</mdb-btn
            >
          </div>
          
        </div>
      </div>


      <div class="davernistTable" v-if="davernost_list.length>0" :class="{'bg_red_color': oshibka_client == 1}">
        <table class="myTablezaxiradanAlmashtrish mt-4">
            <thead>
              <tr class="header py-3" style="background: #ffbda9;">
                <th  width="40" class="text-left">№</th>
                <th>{{$t('client_name')}}</th>
                <th>{{$t('passport_number')}}</th>
                <th>{{$t('phone_number')}}</th>
                <th>{{$t('date')}}</th>
                <th>{{$t('photo')}}</th>
                <th>{{$t('passport_image_base_64')}}</th>
                <th width="80">{{$t('Action')}}</th>   
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row,indexs) in davernost_list" :key="indexs" @click="getdavernostClient(row)">
                <td> <span >{{indexs+1}}</span> </td>
                <td> <span >{{row.fio}}</span> </td>
                <td> <span >{{row.passport_number}}</span></td>
                <td> <span >{{row.phone_number}}</span></td>
                <td> <span >{{row.updated_date_time.slice(0,10)}}</span> <span class="ml-2">{{row.updated_date_time.slice(11,16)}}</span> </td>
                <td><img :src="hostname + row.image_url" width="40" alt=""></td>
                <td>
                  <img :src="row.passport_image_base_64" width="40" height="30" alt="">
                </td>
                <td>
                  <i class="fas fa-pen text-success mask waves-effect m-0 pl-2 mr-2" style="font-size: 14px;"  @click="editRow(row)" ></i>
                  <i class="fas fa-trash delIcon mask waves-effect m-0 pl-2" style="font-size: 14px;" @click="deleteRow(row)" ></i>
                </td>

                <!-- <td> <span>{{row.address}}</span> </td> -->

                <!-- <td> <span >{{row.lessons_cout}}</span> </td> -->  
              </tr>
            </tbody>
          </table>
      </div>

    

      <div class="mainWorkChange m-0" :class="{'bg_red_color': oshibka_client == 1}">
        <div class="row px-4 m-0" :class="{'bg_red_color': oshibka_client == 1}">
          <div class="col-3 mt-4   main_hover_info"  v-for="(item,i) in OstatkaList" :key="i" 
            style="position:relative;">
            <div v-if="item.real_qty>=1" class=" card pt-2 pr-3" style="position:relative;" @click="getProductId(item.product.id,item.real_qty, item.product.name, item)">
              <div class=" text-right">
                <h6 class="pro_name_color text-left ml-3">{{item.client.fio}}</h6>
                <div class="d-flex justify-content-between align-items-center">
                  <h6 class="pro_name_color text-left ml-3 mt-2">{{item.product.name}}</h6>
                  <h4 class="mt-2 ">{{item.real_qty.toFixed(1)}} <small>кг</small></h4>
                </div>
              </div>
            </div>
            <div class="hover_info shadow">
              <div class="addDavernis d-flex justify-content-center border-bottom pb-2 mb-2">
                <mdb-btn
                  class="mr-1 px-3 py-2 text-white"
                  style="font-size: 12px"
                  color="success"
                  darkWaves
                  tag="a"
                  floating
                  size="sm"
                  @click="addDavernis(item.client.id)"
                  >{{ $t("add_davernis") }}</mdb-btn
                >
                <mdb-btn
                  class="mr-1 px-3 py-2 text-white"
                  style="font-size: 12px"
                  color="primary"
                  darkWaves
                  tag="a"
                  floating
                  size="sm"
                  @click="showDavernis(item.client.id)"
                  >{{ $t("show_davernis") }}</mdb-btn
                >
                  <!--  -->
              </div>
              <div class="d-flex justify-content-between border_dashed mb-2" @click="show_client_info_func">
                <span style="color: #757575; font-size: 13.5px;">{{$t('client_name')}}</span>
                <span style="color: #757575; font-size: 13.5px;">{{item.client.fio}}</span>
              </div>
              <div class="d-flex justify-content-between border_dashed mb-2" @click="show_client_info_func">
                <span style="color: #757575; font-size: 13.5px;">{{$t('passport_number')}}</span>
                <span style="color: #757575; font-size: 13.5px;">{{item.client.passport_number}}</span>
              </div>
              <div class="d-flex justify-content-between border_dashed mb-2" @click="show_client_info_func">
                <span style="color: #757575; font-size: 13.5px;">{{$t('phone_number')}}</span>
                <span style="color: #757575; font-size: 13.5px;">{{item.client.phone_number}}</span>
              </div>
              <div class="d-flex justify-content-between border_dashed mb-2" @click="show_client_info_func">
                <span style="color: #757575; font-size: 13.5px;">{{$t('note')}}</span>
                <span style="color: #757575; font-size: 13.5px;">{{item.client.note}}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="row px-4 pb-3 bg-warning mt-3" v-if="showObyom">
          <div class="px-3 w-100">
            <div class="row w-100">
              <div class="col-4 mt-3">
                <mdb-input class="m-0 p-0 bg-white" disabled v-model="product_name" size="md"   outline  group type="text" validate error="wrong" success="right"/>
                    <small style="position:absolute; top:-7px; left:20px; font-size: 11px;" class="bg-white px-2 py-0">{{$t('product')}}</small>
              </div>
              <div class="col-4 mt-3">
                <mdb-input class="m-0 p-0 bg-white" disabled v-model="product_real_qty_fix" size="md"   outline  group type="text" validate error="wrong" success="right"/>
                    <small style="position:absolute; top:-7px; left:20px; font-size: 11px;" class="bg-white px-2 py-0">{{$t('kg_ves')}}</small>
              </div>
              <div class="col-4 mt-3">
                <mdb-input class="m-0 p-0 bg-white"  v-model="note" size="md" :rows="rowsNum"  outline  group type="textarea" validate error="wrong" success="right"/>
                    <small style="position:absolute; top:-7px; left:20px; font-size: 11px;" class="bg-white px-2 py-0">{{$t('note')}}</small>
              </div>
            </div>
          </div>
          
          <div class="col-sm-4 col-md-3 col-lg-2 col-4 mt-4  px-3" v-for="(item,index) in changeProduct" :key="index">
            <div class="card pt-2 pr-3" style="position:relative;" :class="{'bg_red_color': item.auth_user_updator_id == 1}">
              <div class="product_name_price text-right ">
                <div class="d-flex justify-content-between">
                  <div style="height:40px; overflow: hidden; ">
                    <h6 class="pro_name_color text-left ml-3">{{item.product_name}}</h6>
                  </div>
                  <h6 class="pro_name_color text-left ml-3">{{item.ostatka_qty.toFixed(1)}}</h6>
                </div>
                <h4 class="mb-2">{{item.qty}} <small>{{item.measure}}</small></h4>
              </div>
              <div class="clickItem border-top mt-2 mx-2">
                <div class="mt-2">
                  <div style="position: relative;">
                    <mdb-input class="m-0 p-0" v-model="item.real_qty" size="md" @input="changeRealQty(index)" @blur="blurchangeRealQty(index)" @click="enterchangeRealQty(index)" outline  group type="text" validate error="wrong" success="right"/>
                    <small style="position:absolute; top:-7px; left:10px; font-size: 11px;" class="bg-white px-2 py-0">{{$t('kg_ves')}}</small>
                  </div>
                </div>
              </div>
            </div>
          </div> 
          <div class="col-2  mt-4 px-3">
            <div class=" card pt-2 pr-3" style="position:relative;">
              <div class="product_name_price text-right">
                <h6 class="pro_name_color text-left ml-3">{{product_name_buy}}</h6>
                <h4 class="mt-2">{{summ_buy.toFixed()}} <small>сум</small></h4>
              </div>
              <div class="clickItem border-top mx-2">
                <div class="mt-2">
                  <div style="position: relative;">
                    <mdb-input class="m-0 p-0" v-model="product_buy" size="md" @input="changeSumma()" @blur="blurchangeSumma" @click="enterchangeSumma" outline  group type="text" validate error="wrong" success="right"/>
                    <small style="position:absolute; top:-7px; left:10px; font-size: 11px;" class="bg-white px-2 py-0">{{$t('kg_ves')}}</small>
                  </div>
                  <div style="position: relative;">
                    <mdb-input class="m-0 p-0" v-model="product_price_buy" size="md" @input="changeSumma()"  outline  group type="text" validate error="wrong" success="right"/>
                    <small style="position:absolute; top:-7px; left:10px; font-size: 11px;" class="bg-white px-2 py-0">{{$t('price')}}</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="photo w-100 mt-4 d-flex justify-content-center " v-if="image_url_str">
          <img :src="hostname + image_url_str" width="240" alt="" class="shadow border">
        </div>
        
        <webcam  v-show="showPhoto" @getPhotosub="takePhoto"/>

      <hr class="mt-4 mb-3 gradint" />
        <div class="d-flex justify-content-end">
          <mdb-btn 
            v-if="user_name"
            class="mr-1 px-3 py-2 text-white"
            style="font-size: 12px"
            color="info"
            darkWaves
            tag="a"
            floating
            @click="show_client_info_func"
            size="sm"
            >{{ $t("info_client") }}</mdb-btn
          >
          <mdb-btn
            class="mr-1 px-3 py-2 text-white"
            style="font-size: 12px"
            color="success"
            darkWaves
            tag="a"
            floating
            @click="getPhoto"
            size="sm"
            >{{ $t("photo") }}</mdb-btn
          >
          <!-- v-if="image_url_str" -->
          <mdb-btn 
            v-if="image_url_str"
            class="mr-1 px-3 py-2 text-white"
            style="font-size: 12px"
            color="success"
            darkWaves
            tag="a"
            floating
            @click="saveChanging"
            size="sm"
            >{{ $t("save") }}</mdb-btn
          >

          
        </div>
    

      <div>
        <div class="px-0 ZaxiradanAlmashtrish">
          <loader v-if="loading"/>
          <table class="myTablezaxiradanAlmashtrish mt-4">
            <thead>
              <tr class="header py-3" style="background: #ffbda9;">
                <th  width="40" class="text-left">№</th>
                <th>{{$t('client_name')}}</th>
                <th>{{$t('passport_number')}}</th>
                <th>{{$t('product')}}</th>
                <th>{{$t('measure')}}</th>
                <th>{{$t('client_name')}}</th>
                <th>{{$t('photo')}}</th>
                <th>{{$t('date')}}</th>
                <!-- <th >{{$t('lessons_cout')}}</th> -->
                <!-- <th width="80" class="text-center">{{$t('Action')}}</th> -->
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row,rowIndex) in allList" :key="rowIndex" @click="selectInvoiceItem(row)">
                <td> <small >{{rowIndex+1}}</small> </td>
                <td> <small >{{row.client.fio}}</small> </td>
                <td> <small >{{row.client.passport_number}}</small> </td>
                <td> <small >{{row.product.name}}</small> </td>
                <td>
                  <small v-if="row.status_inv_type_name == 'INVOICE_BUGDOY_ZAXIRADAN_NARSALARGA_ALMASHTRISH'"><mdb-icon class="mr-2 text-danger" fas icon="caret-up"></mdb-icon></small> 
                  <small v-if="row.status_inv_type_name == 'INVOICE_BUGDOY_NARSALARGA_ALMASHTRISH_UCHUN_ZAXIRAGA_OLIB_QOLISH'"> <mdb-icon fas class="mr-2 text-success" icon="caret-down"></mdb-icon></small> 
                  <small>{{row.qty_real.toFixed(1)}}</small> </td>
                <td><small>{{row.user_name}}</small></td>
                <td>
                  <img :src="hostname + row.image_str_url" width="50" alt="">
                </td>
                <td> <small >{{row.updated_date_time.slice(0,10)}}</small> <small class="ml-2">{{row.updated_date_time.slice(11,16)}}</small> </td>
                <!-- <td> <span >{{row.lessons_cout}}</span> </td> -->  
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <modal-train  :show="davernist_show" headerbackColor="white"  titlecolor="black" :title="$t('add_davernis')" 
        @close="davernist_show = false" width="60%">
          <template v-slot:body>
            <add-davernis @close="davernist_show = false"  :client_id="client_id_for_davernist" >
            </add-davernis>
          </template>
      </modal-train>
      <modal-train  :show="edit_davernost" headerbackColor="white"  titlecolor="black" :title="$t('add_davernis')" 
        @close="edit_davernost = false" width="60%">
          <template v-slot:body>
            <edit-davernis @close="edit_davernost = false" ref="editDavRef"  >
            </edit-davernis>
          </template>
      </modal-train>
      <modal-train  :show="show_davernis_info" headerbackColor="white"  titlecolor="black" :title="$t('show_davernis')" 
        @close="show_davernis_info = false" width="85%">
          <template v-slot:body>
            <info-davernis @close="show_davernis_info = false"  :option="davernis_info" >
            </info-davernis>
          </template>
      </modal-train>
      <modal-train  :show="invoice_show" headerbackColor="white"  titlecolor="black" :title="$t('show_davernis')" 
        @close="invoice_show = false" width="85%">
          <template v-slot:body>
            <info-invoice @close="invoice_show = false" @printed="printedCheckZaxira" v-if="invoice_show"  :option="invoice_list" >
            </info-invoice>
          </template>
      </modal-train>
      <modal-train  :show="invoice_show_input" headerbackColor="white"  titlecolor="black" :title="$t('show_davernis')" 
        @close="invoice_show_input = false" width="85%">
          <template v-slot:body>
            <info-invoice-get @close="invoice_show_input = false" @printed="printedCheck" v-if="invoice_show_input"  :option="invoice_list" >
            </info-invoice-get>
          </template>
      </modal-train>
      <modal-train  :show="client_info_show" headerbackColor="white"  titlecolor="black" :title="$t('info_client')" 
        @close="client_info_show = false" width="95%">
          <template v-slot:body>
            <info-client @close="client_info_show = false" v-if="client_info_show"  :option="client_info" >
            </info-client>
          </template>
      </modal-train>
       <mdb-modal :show="confirm" @close="confirm = false" size="sm" class="text-center" danger>
        <mdb-modal-header center :close="false">
          <p class="heading">{{$t('Are_you_sure')}}</p>
        </mdb-modal-header>
        <mdb-modal-body>
          <mdb-icon icon="times" size="4x" class="animated rotateIn"/>
        </mdb-modal-body>
        <mdb-modal-footer center>
          <mdb-btn outline="danger" @click="promise">{{$t('Yes')}}</mdb-btn>
          <mdb-btn color="danger" @click="confirm = false">{{$t('No')}}</mdb-btn>
        </mdb-modal-footer>
      </mdb-modal>
      <Toast ref="message"></Toast>
    </div>
  </div>
</template>

<script>
import checkzaxira from '../sell/checkzaxira.vue'
import checkZaxiraInvoice from '../sell/checkzaxiraInvoice.vue'
import checkgetProduct from '../sell/checkGetProduct.vue'
import webcam from '../webcam/webcam_Add.vue'
import addDavernis from './addDavernis.vue'
import editDavernis from './editDavernis.vue'
import infoDavernis from './infoDavernis.vue'
import infoInvoice from './infoInvoice.vue'
import infoInvoiceGet from './infoInvoiceGet.vue'
import { mdbInput,  mdbBtn, mdbIcon, mdbModal, mdbModalHeader, mdbModalBody, mdbModalFooter,mdbBadge,mdbBtnGroup, mdbDropdown, mdbDropdownMenu, mdbDropdownItem, } from "mdbvue"
import erpSelect from "../../components/erpSelectFioSearch.vue";
import erpSelectAdd from "../../components/erpSelectAdd.vue";
import { required } from 'vuelidate/lib/validators'
import {mapActions,mapGetters, mapMutations} from 'vuex'
import InputSearch from '../../components/inputSearch.vue'
import infoClient from '../client/clientInfo.vue'

export default {
data(){
    return{
      hostname: this.$store.state.server_ip,
      modal_info: '',
      modal_status: false,  
      loading: false,
      id: this.$route.params.id,
      comenList: [],
      OstatkaList: [],
      changeProduct: [],
      bugdoy_send: 0,
      bugdoy_kg: 0,
      rowsNum: 1,

      confirm: false,

      name: '',
      user_name: "",
      user_id: null,
      passport_number: '',
      main_client_id: null,
      note: '',

      client_id_for_davernist: null,
      davernist_show: false,
      davernost_list: [],

      show_davernis_info: false,
      davernis_info: {},


      davernost_name: '',
      davernost_phone: '',
      davernost_password: '',

      born_date: '',
      phone_number: '',

      clientList: [],

      product_qty: 0,
      product_real_qty_fix: 0,
      product_name: '',
      product_id: null,
      product_real_qty: 0,
      showObyom: false,
      allList: [],
      olib_ketuvchi: '',

      showPhoto: false,
      image_url_str: '',

      product_name_buy: '',
      product_buy: 0,
      summ_buy: 0,
      product_id_buy: null,
      product_price_buy: 0,
      product_real_qty_buy: 0,

      select_invoice_id: null,
      invoice_show: false,
      invoice_list: [],

      show_check: false,

      invoice_show_input: false,
      client_info_show: false,
      client_info: {},

      oshibka_client: 0,
      davernost_client_id: 0,
      show_check_get: false,

      show_check_zaxira_invoice: false,
      edit_davernost: false,
      edit_davernost_obj: {},

    }
  },
  components: {
    webcam,mdbIcon,addDavernis,infoDavernis,infoInvoice,
    mdbInput,  mdbBtn, erpSelect, erpSelectAdd, InputSearch,
    checkzaxira, infoInvoiceGet, infoClient, checkgetProduct,
    mdbModal, mdbModalHeader, mdbModalBody, mdbModalFooter,
    mdbBadge,mdbBtnGroup, mdbDropdown, mdbDropdownMenu, mdbDropdownItem,
    editDavernis,
    checkZaxiraInvoice
  },
  validations: {
      bugdoy_send: {
        required
      },
      user_name: {
        required
      }
    },
    async mounted() {
      await this.fetchClient();
    },
   computed: mapGetters(['all_district_t', 'all_client_controler', 'allClient', 'all_contragent_t', 'allCompany', 'all_product_t']),
    
  methods: {
    ...mapActions(['fetch_district_t', 'fetch_client_controler', 'fetchClient', 'fetch_contragent_t', 'fetchCompany', 'fetch_product_t']),
    ...mapMutations(['zaxiraCheckList', 'get_ostatka_check', 'get_invoice_for_invoice','get_ostatka_check_for_get', 'check_invoice_zaxira']),
    show_client_info_func(){
      this.client_info_show = true;
      console.log('dasdasdasdasoerqneqwe ')
    },
    async selectInvoiceItem(data){
      console.log(data)
      console.log(data.id)
      this.select_invoice_id = data.id;
      try{
        this.loading = true;
        const response = await fetch(this.$store.state.hostname + "/TegirmonInvoice/getAnyInvoiceFullInfoById?invoice_id=" + this.select_invoice_id);
        const data = await response.json();
        console.log('weqeqw')
        console.log(data)
        this.loading = false;
        if(response.status == 201 || response.status == 200)
        {
          this.invoice_list = data;
          if(data.status_inv_type_name == "INVOICE_BUGDOY_NARSALARGA_ALMASHTRISH_UCHUN_ZAXIRAGA_OLIB_QOLISH"){
            this.invoice_show_input = true;
          }
          else{
            this.invoice_show = true;
          }
          this.$refs.message.success('Added_successfully')
          return true;
        }
        else{
          this.modal_info = this.$i18n.t('network_ne_connect');
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
    async printedCheck(option){
      this.invoice_show_input = false;
      await this.fetchOstatkaCheck(option.client_id);
      await this.selectInvoiceItemCkeck(option);
      console.log(option);
    },
    async printedCheckZaxira(option){
      this.invoice_show = false;
      await this.fetchOstatkaCheck(option.tegirmonClientid);
      await this.check_invoice_zaxira(option);
      this.show_check_zaxira_invoice = true;

    },
    async selectInvoiceItemCkeck(data){
      console.log(data)
      console.log(data.id)
      let select_invoice_id = data.id;
      try{
        this.loading = true;
        const response = await fetch(this.$store.state.hostname + "/TegirmonInvoice/getAnyInvoiceFullInfoById?invoice_id=" + select_invoice_id);
        const data = await response.json();
        console.log('weqeqw')
        console.log(data)
        this.loading = false;
        if(response.status == 201 || response.status == 200)
        {
          this.get_invoice_for_invoice(data)
          this.show_check_get = true;
          this.$refs.message.success('Added_successfully')
          return true;
        }
        else{
          this.modal_info = this.$i18n.t('network_ne_connect');
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
    async fetchOstatkaCheck(id){
      try{
        // this.loading = true;
        const response = await fetch(this.$store.state.hostname + "/TegirmonClientOstatkas/getPaginationGetByClientClientIdList?page=0&size=100&client_id=" + id);
        const data = await response.json();
        console.log('weqeqw')
        console.log(data)
        // this.loading = false;
        if(response.status == 201 || response.status == 200)
        {
          this.get_ostatka_check_for_get(data.items_list);
          // this.$refs.message.success('Added_successfully')
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
        // this.loading = false;
        this.modal_info = this.$i18n.t('network_ne_connect');
        this.modal_status = true;
      }
    },
    addDavernis(id){
      this.client_id_for_davernist = id;
      this.davernist_show = true;
    },
    takePhoto(img){
      console.log('img')
      console.log(img)
      this.image_url_str = img;
      this.showPhoto = false;
      console.log('this.showPhoto')
      console.log(this.showPhoto)
    },
    async selectClientPassport(option){
      this.client_info = option;
      this.user_name = option.fio;
      this.olib_ketuvchi = option.fio;
      this.user_id = option.id;
      this.passport_number = option.passport_number
      this.phone_number = option.note
      this.born_date = option.addiotionala_information;
      this.oshibka_client = option.auth_user_updator_id;
      this.fetchOstatka(option.id);
      this.davernost_list = [];
      this.davernost_name = '';
      this.showObyom = false;
      console.log(option)
    },
    async selectClientPhone(option){
      this.client_info = option;
      this.user_name = option.fio;
      this.olib_ketuvchi = option.fio;
      this.user_id = option.id;
      this.passport_number = option.passport_number;
      this.phone_number = option.note;
      this.born_date = option.addiotionala_information;
      this.oshibka_client = option.auth_user_updator_id;
      this.fetchOstatka(option.id);
      this.davernost_list = [];
      this.showObyom = false;
      this.davernost_name = '';

    },
    async selectClientBorn(option){
      this.client_info = option;
      this.user_name = option.fio;
      this.olib_ketuvchi = option.fio;
      this.user_id = option.id;
      this.passport_number = option.passport_number
      this.phone_number = option.note
      this.born_date = option.addiotionala_information;
      this.oshibka_client = option.auth_user_updator_id;
      this.fetchOstatka(option.id);
      this.davernost_list = [];
      this.showObyom = false;
      this.davernost_name = '';

    },

    async selectOptionUser(option){
      this.client_info = option;
      console.log(option)
      this.user_name = option.fio;
      this.olib_ketuvchi = option.fio;
      this.user_id = option.id;
      this.passport_number = option.passport_number
      this.phone_number = option.note
      this.born_date = option.addiotionala_information;
      this.oshibka_client = option.auth_user_updator_id;
      this.fetchOstatka(option.id);
      this.davernost_list = [];
      this.showObyom = false;
      this.davernost_name = '';
    },
    async fetchOstatka(id){
      try{
        this.loading = true;
        const response = await fetch(this.$store.state.hostname + "/TegirmonClientOstatkas/getPaginationGetByClientClientIdList?page=0&size=100&client_id=" + id);
        const data = await response.json();
        console.log('weqeqw')
        console.log(data)
        this.loading = false;
        if(response.status == 201 || response.status == 200)
        {
          this.OstatkaList = data.items_list;
          this.bugdoy_send = 0;
          console.log('data.items_list')
          console.log(data.items_list)
          if(data.items_list.length>0){
            this.main_client_id = data.items_list[0].TegirmonClientid
            this.bugdoy_kg = data.items_list[0].real_qty;
            this.fetchOldList(this.main_client_id);
          }
          else{
            this.fetchOldList(this.user_id)
            this.bugdoy_kg = 0;
          }
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


    async getProductId(id, qty, name,data){
      this.product_name_buy = name,
      this.product_id_buy = id,
      this.product_price_buy = data.product.price;
      this.main_client_id = data.TegirmonClientid;
      this.product_id = data.TegirmonProductid;
      this.product_buy = 0;
      this.summ_buy = 0;
      // console.log(data.product)
      try{
        this.loading = true;
        const response = await fetch(this.$store.state.hostname + "/TegirmonProductToProductPersentage/getPaginationByProductId?page=0&size=100&product_id=" + id);
        const data = await response.json();
        console.log('dasdasd');
            console.log(data);
        this.loading = false;
        if(response.status == 201 || response.status == 200)
        {
          if(data.items_list.length>0){
            this.showObyom = true;
            this.changeProduct = [];
            console.log(data.items_list[0].item_list)
            for(let i=0; i<data.items_list[0].item_list.length; i++){
              let temp = {
                product_name: data.items_list[0].item_list[i].product_name,
                product_id: data.items_list[0].item_list[i].TegirmonProductid,
                qty: (data.items_list[0].item_list[i].persantage*qty).toFixed(1),
                persantage: data.items_list[0].item_list[i].persantage,
                measure: data.items_list[0].item_list[i].sub_product.unitMeasurment.name,
                ostatka_qty:data.items_list[0].item_list[i].ostatkaList[0].real_qty,
                real_qty:0,
                auth_user_updator_id: data.items_list[0].item_list[i].auth_user_updator_id,
              }
              this.changeProduct.push(temp)
            }
            this.product_name = name;
            this.product_qty = qty;
            this.product_real_qty_fix = this.product_qty.toFixed(1)
            this.product_real_qty = qty;
            this.product_real_qty_buy = qty;
          }
          else{
            this.showObyom = false;
            this.changeProduct = [];
            this.product_qty = qty;
            this.product_real_qty_fix = this.product_qty.toFixed(1)
            this.product_real_qty = qty;
            this.product_real_qty_buy = qty;
            this.product_name = name;
          }
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
    changeSumma(){
      let test_buy_qty = this.product_real_qty_buy;
      if(this.product_buy == null || this.product_buy == ''){
        this.product_real_qty = test_buy_qty - 0;
        this.summ_buy = this.product_price_buy * 0;
      }
      else{
        this.product_real_qty = test_buy_qty - parseFloat(this.product_buy);
        this.summ_buy = this.product_price_buy * this.product_buy;
      }
      this.changeRealQty(0);
    },
    blurchangeSumma(){
      if(this.product_buy == null || this.product_buy == ''){
        this.product_buy = 0;
      }
    },
    enterchangeSumma(){
      if(this.product_buy == 0){
        this.product_buy = null;
      }
    },
    blurchangeRealQty(i){
      console.log(this.changeProduct[i])
      if(this.changeProduct[i].real_qty == '' || this.changeProduct[i].real_qty == null){
        this.changeProduct[i].real_qty = 0;
      }
    },
    enterchangeRealQty(i){
      if(this.changeProduct[i].real_qty == 0){
        this.changeProduct[i].real_qty = null;
      }
    },
    changeRealQty(index){
      console.log(this.changeProduct[index])
      let test_qty = this.product_real_qty;

      for(let i=0; i<this.changeProduct.length; i++){
        if(this.changeProduct[i].real_qty != ''){
          test_qty = parseFloat(test_qty) - (parseFloat(this.changeProduct[i].real_qty) / parseFloat(this.changeProduct[i].persantage))
          // console.log( this.product_qty - parseFloat(this.changeProduct[i].real_qty) / parseFloat(this.changeProduct[i].persantage))
        }
        else{
          test_qty = parseFloat(test_qty) - (0 / parseFloat(this.changeProduct[i].persantage))
        }
      }
      this.product_qty = test_qty;
      this.product_real_qty_fix = this.product_qty.toFixed(1)
      console.log(this.product_qty)

      this.fetchChangeSubPro(this.product_qty)
    },

    fetchChangeSubPro(qty){
      let tempArray = []
      for(let i=0; i<this.changeProduct.length; i++){
        let temp = {
          product_name: this.changeProduct[i].product_name,
          product_id: this.changeProduct[i].product_id,
          qty: (this.changeProduct[i].persantage*qty).toFixed(1),
          persantage: this.changeProduct[i].persantage,
          measure: this.changeProduct[i].measure,
          ostatka_qty: this.changeProduct[i].ostatka_qty,
          auth_user_updator_id: this.changeProduct[i].auth_user_updator_id,
          real_qty: 0,
        }
        if(this.changeProduct[i].real_qty == '' && this.changeProduct[i].real_qty != 0){
          // console.log(' bu update qilib yuborayabdi')
          temp.real_qty = null;
        }
        else{
          temp.real_qty = this.changeProduct[i].real_qty;
        }
        tempArray.push(temp)
      }
      this.changeProduct = tempArray;
      this.zaxiraCheckList({list: this.changeProduct, product_name: this.product_name, buy_qty: this.product_buy, buy_sum: this.summ_buy, client_name: this.olib_ketuvchi})
    },
    

    async saveChanging(){
      let sendList = []
      let sendQty = 0;
      this.get_ostatka_check(this.product_qty)
      sendQty = parseFloat(this.product_real_qty - this.product_qty);
      for(let i=0; i<this.changeProduct.length; i++){
        console.log('this.changeProduct[i].real_qty')
        console.log(this.changeProduct)
          if(this.changeProduct[i].real_qty > 0){
            let sendTemp = {
            qty: this.changeProduct[i].real_qty,
            real_qty: this.changeProduct[i].real_qty,
            tegirmonProductid: this.changeProduct[i].product_id,
            real_sum: this.changeProduct[i].persantage,
          }
          sendList.push(sendTemp)
        }
        
      }
      if(this.product_buy >0){
        // let buy_temp = {
        //   qty: this.product_buy,
        //   real_qty: this.product_buy,
        //   tegirmonProductid: this.product_id_buy,
        //   sum: this.summ_buy,
        //   real_sum: this.summ_buy,
        // }
        sendQty+=parseFloat(this.product_buy);
        // console.log('buy_temp', buy_temp)
        // sendList.push(buy_temp)
      }
      console.log('sendList')
      console.log(sendList)
      if(this.$v.$invalid)
      {
        this.$v.$touch();
        this.$refs.message.warning('please_fill')
        return false;
      }
      if(sendQty<=0){
        this.$refs.message.warning('please_fill')
        return false;
      }
      console.log(this.image_url_str)
      const requestOptions = {
          method : "POST",
          headers: { "Content-Type" : "application/json" },
          body: JSON.stringify({
            "note" : this.note,
            "summ": this.summ_buy,
            "tegirmonClientid" : this.main_client_id,
            "tegirmonProductid" : this.product_id,
            "tegirmonAuthid": localStorage.AuthId,
            "image_str_url": this.image_url_str,
            "user_name": this.olib_ketuvchi,
            // "note": this.user_id,
            "qty_real" : sendQty,
            'item_list': sendList,
            "auth_user_creator_id": parseInt(this.product_buy),
            "dolg_summ": this.product_buy,
            "id" : 0,
          })
        };
        console.log(requestOptions.body)
        try{
          this.loading = true;
          const response = await fetch(this.$store.state.hostname + "/TegirmonInvoice/postInvoiceBugdoyniZaxiradanNarsalargaAlmashtrish", requestOptions);
          const data = await response.json();
          console.log('data')
          console.log(data)
          this.loading = false;
          if(response.status == 201 || response.status == 200)
          {
            this.fetchOstatka(this.user_id)
            this.show_check = true;
            this.$refs.message.success('Added_successfully')
            this.showObyom = false;
            this.image_url_str = '';
          }
          else{
            this.modal_info = data;
            this.modal_status = true;
            
          }
        }
        catch{
          this.loading = false;
          this.modal_info = this.$i18n.t('network_ne_connect'); 
          this.modal_status = true;
        }
    },
    getPhoto(){
      this.showPhoto = true;
    },
    async fetchOldList(id){
      try{
        this.loading = true;
        const response = await fetch(this.$store.state.hostname + "/TegirmonInvoice/getPaginationByClientId?page=0&size=100&client_id=" + id);
        const data = await response.json();
        this.loading = false;
        if(response.status == 201 || response.status == 200)
        {
          this.allList = data.items_list;
          // console.log('data')
          // console.log(data)
          // this.$refs.message.success('Added_successfully')
          // console.log('dasdasdasdasdasdasd')
          return true;
        }
        else{
          // const data = await response.text();
          this.modal_info = this.$i18n.t('network_ne_connect');
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

    async showDavernis(id){
      try{
        this.loading = true;
        const response = await fetch(this.$store.state.hostname + "/TegirmonClientDavennosts/getPaginationByClientId?page=0&size=100&client_id=" + id);
        const data = await response.json();
        this.loading = false;
        if(response.status == 201 || response.status == 200)
        {
          this.davernost_list = data.items_list;
          console.log('data')
          console.log(data)
          this.$refs.message.success('Added_successfully')
          return true;
        }
        else{
          // const data = await response.text();
          this.modal_info = this.$i18n.t('network_ne_connect');
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
    getdavernostClient(option){
      this.davernis_info = option
      this.davernost_name = option.fio;
      this.olib_ketuvchi = option.fio;
      this.davernost_phone = option.phone_number;
      this.davernost_password = option.passport_number;
    },
    deleteRow(data){
      console.log(data)
      this.confirm = true;
      this.davernost_client_id = data.id;
    },
    editRow(data){
      this.edit_davernost = true;
      this.edit_davernost_obj = data;
      this.$refs.editDavRef.mountedFunc(data);
      console.log(data)
    },
    async promise(){
       const requestOptions = {
          method : "delete",
        };
        const response = await fetch(this.$store.state.hostname + "/TegirmonClientDavennosts/" + this.davernost_client_id, requestOptions);
        const data = await response.text();

        if(response.status == 201 || response.status == 200)
        {
          this.$refs.message.success('Successfully_removed')
          this.alert_success = true;
          this.davernost_client_id = 0;
          this.davernis_info = {};
          this.davernost_name = '';
          this.olib_ketuvchi = '';
          this.davernost_phone = '';
          this.davernost_password = '';
          await this.showDavernis(this.user_id);
          this.confirm = false;
          // this.measurment_delete_row(index);
        }
        else{
          this.modal_info = data;
          this.modal_status = true;
        }
    }


  },
}
</script>

<style lang="scss" >
  /* for scroll */
  /* width */
  
::-webkit-scrollbar {
  width: 5.5px;
  height: 2px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 2px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
/* ! for scroll */
  .product_name_price{
    height: 55px;
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
.ZaxiradanAlmashtrish{
  height: 300px;
  overflow: hidden;
  overflow-y: scroll;
  // border: 1px solid #757575;
}
.myTablezaxiradanAlmashtrish {
  /* border-collapse: collapse; */
  table-layout:fixed;
  width: 100%;
  overflow: hidden;
  // border: 1px solid #ddd;
  font-size: 18px;
  max-height:80px; overflow-x:auto
}
.myTablezaxiradanAlmashtrish th{
  font-weight: 600;
  font-size:11px;
}
.myTablezaxiradanAlmashtrish td{
  font-size:11.5px;
  
}
.myTablezaxiradanAlmashtrish tbody td small{
  font-size:11px;
}
.myTablezaxiradanAlmashtrish td {
  text-align: left;
  padding: 7px 10px;
}
.myTablezaxiradanAlmashtrish th{
  text-align: left;
  padding: 8px 10px;
}

.myTablezaxiradanAlmashtrish tr {
  border-bottom: 1px dashed rgb(240, 240, 240);
  &:hover{
    background: #afd1fd;
  }
}

.myTablezaxiradanAlmashtrish tr.header, .myTablezaxiradanAlmashtrish tr:hover {
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
.mainWorkChange{
  margin:0 !important;
  // border: 1px solid black;
  min-height: calc(100vh - 500px);
}
.hover_info{
  display: none;
}
.main_hover_info:hover{
  .hover_info{
    display: block;
    background: #fff;
    width: 120%;
    border: 1px solid rgb(227, 227, 227);
    position: absolute;
    z-index: 111;
    box-shadow: 2px 2px 5px #ddd;
    top: 80px;
    left:15px;
    padding: 10px;  
  }
}
.border_dashed{
  border-bottom: 1px dashed #ddd;
}
.davernistTable{
  max-height: 200px;
  overflow: hidden;
  overflow-y: scroll;

}
.bg_red_color{
  background: #ff937d !important;
}
</style>