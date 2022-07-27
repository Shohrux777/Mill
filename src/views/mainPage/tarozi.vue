<template>
  <div class="taroziPage ">
    <loader v-if="loading" />
    <div v-else class="main_operation">
      <div class="header_shafyor ">
        <div class="mx-3">
          <div class="row px-2 py-3"> 
            <div class="col-3">
              <mdb-input class="m-0 p-0" v-model="header.shafyor_name" size="md"   outline  group type="text" validate error="wrong" success="right"/>
              <small
                style="position: absolute; top: -7px; left: 20px; font-size: 11px"
                class="bg-white px-2 py-0"
                >{{ $t("shafyor_name") }}</small
              >
            </div>
            <div class="col-3">
              <mdb-input class="m-0 p-0" v-model="header.car_number" size="md"   outline  group type="text" validate error="wrong" success="right"/>
              <small
                style="position: absolute; top: -7px; left: 20px; font-size: 11px"
                class="bg-white px-2 py-0"
                >{{ $t("car_number") }}</small
              >
            </div>
            <div class="col-3">
              <mdb-input class="m-0 p-0" v-model="header.note" size="md" :rows="1"  outline  group type="textarea" validate error="wrong" success="right"/>
              <small
                style="position: absolute; top: -7px; left: 20px; font-size: 11px"
                class="bg-white px-2 py-0"
                >{{ $t("note") }}</small
              >
            </div>
            <div class="col-3">
              <div class="text-right">
                <mdb-btn   @click="show_rasxod = true" color="danger" m="r2" style="font-size: 8.5px"
                  p="r3 l3 t2 b2"> <mdb-icon fas class="mr-1"  icon="sync"></mdb-icon>  Расход
                </mdb-btn>
                <mdb-btn color="primary"  @click="addClientRow" style="font-size: 8.5px"
                p="r3 l3 t2 b2">
                <mdb-icon fas class="mr-2"  icon="user"/>{{$t('add_client')}}</mdb-btn>

                  <mdb-btn color="success"  @click="addRows" style="font-size: 8.5px"
                  p="r3 l3 t2 b2">
                  <mdb-icon fas class="mr-2"  icon="users"/>{{$t('add_group')}}</mdb-btn>
              </div>
            </div>
          </div>
          
        </div>
      </div>




      <div class="row  py-2 backColor px-2 border mx-2" v-for="(item,indexRow) in clients_info" :key="indexRow">
        <div class="col-3">
          <erpSelectFio
            :options="allClient.rows"
            @select="selectOptionUser"
            :selected="item.client_name"
            :row="indexRow"
            :label="$t('client')"
             url="/TegirmonClient/getPaginationSearchByFioOrPassportSerailNumberOrHomeOrMobilePhoneNumber?page=0&size=100&fio_or_serial_number="
          />
          <small
            style="position: absolute; top: -7px; left: 20px; font-size: 11px"
            class="bg-white px-2 py-0"
            >{{ $t("client") }}</small
          >
        </div>
        <div class="col-3">
          <mdb-input class="m-0 p-0" v-model="item.client_new_name" size="md" @input="changeClient(indexRow)"  outline  group type="text" validate error="wrong" success="right"/>
            <!-- <small class="invalid-text mt-0" style="margin-left:5px; "  v-if="$v.client_new_name.$dirty && !$v.client_new_name.required" >
              {{$t('name_invalid_text')}}
            </small> -->
            <small
              style="position: absolute; top: -7px; left: 20px; font-size: 11px"
              class="bg-white px-2 py-0"
              >{{ $t("client") }}</small
            >
        </div>
        <div class="col-3">
          <erpSelectOnlyBugdoy
            :options="all_product_t.rows"
            @select="selectOptionProduct"
            :selected="item.product_name"
            :row="indexRow"
            :label="$t('client')"
          />
          <small
            style="position: absolute; top: -7px; left: 20px; font-size: 11px"
            class="bg-white px-2 py-0"
            >{{ $t("product") }}</small
          >
          <!-- <small
            v-if="$v.item.product_name.$dirty && item.product_id == null"
            class="invalid-text ml-2"
            style="margin-top: 0px;"
          >
            {{ $t("select_item") }}
          </small> -->
        </div>
        <div class="col-3">
          <input class="m-0 p-0 px-2 form-control" v-model="item.qty" size="md"  type="number" step="0.01" style="width:100%; height:35px;" />
            <!-- <small class="invalid-text mt-0" style="margin-left:5px; "  v-if="$v.item.qty.$dirty && !$v.item.qty.required" >
              {{$t('name_invalid_text')}}
            </small> -->
            <small
              style="position: absolute; top: -7px; left: 20px; font-size: 11px"
              class="bg-white px-2 py-0"
              >{{ $t("measure") }}</small
            >
        </div>
        <div class="col-3 mt-3">
          <mdb-input class="m-0 p-0" v-model="item.note" size="sm" outline group type="textarea" validate error="wrong" success="right"/>
          <small
            style="position: absolute; top: -7px; left: 20px; font-size: 11px"
            class="bg-white px-2 py-0"
            >{{ $t("reason") }}</small>
        </div>
        <div class="col-3 mt-3">
          <mdb-input class="m-0 p-0" disabled v-model="item.skidka" size="md"  outline  group type="number" validate error="wrong" success="right"/>
            <!-- <small class="invalid-text mt-0" style="margin-left:5px; "  v-if="$v.item.qty.$dirty && !$v.item.qty.required" >
              {{$t('name_invalid_text')}}
            </small> -->
            <small
              style="position: absolute; top: -7px; left: 20px; font-size: 11px"
              class="bg-white px-2 py-0"
              >{{ $t("skidka") }}</small
            >
        </div>
        <div class="col-6">
          <div class="mt-4 text-right ">
            <!-- <mdb-btn   @click="Refresh" color="warning" m="r2" style="font-size: 10.5px"
              p="r4 l4 t2 b2"> <mdb-icon fas class="mr-2"  icon="sync"></mdb-icon>  {{$t('rasxod')}}
            </mdb-btn> -->
            <mdb-btn   @click="saveAddRow(indexRow)" color="success" m="r2" style="font-size: 8.5px"
              p="r3 l3 t2 b2"> <mdb-icon fas class="mr-1"  icon="plus"></mdb-icon>  {{$t('add')}}
            </mdb-btn>
            <mdb-btn    @click="deleteRowInvoice(item,indexRow)" color="danger" m="r2" style="font-size: 8.5px"
              p="r3 l3 t2 b2"> <mdb-icon fas class="mr-1"  icon="trash"></mdb-icon>  {{$t('trash')}}
            </mdb-btn>
            <mdb-btn v-show="item.ruyxat_id>0"  @click="changingAdd(item,indexRow)" color="secondary" m="r2" style="font-size: 8.5px"
              p="r3 l3 t2 b2"> <mdb-icon fas class="mr-2"  icon="sync"></mdb-icon>  {{$t('changing')}}
            </mdb-btn>
            <!-- <mdb-btn   @click="rasxodFunc" color="danger" m="r2" style="font-size: 10.5px"
              p="r4 l4 t2 b2"> <mdb-icon far class="mr-2"  icon="hand-point-up"></mdb-icon>  {{$t('rasxod')}}
            </mdb-btn>
            <mdb-btn color="success"  @click="prixodFunc" style="font-size: 10.5px"
              p="r4 l4 t2 b2">
              <mdb-icon far class="mr-2"  icon="hand-point-down"/>{{$t('prixod')}}</mdb-btn> -->
          </div>
        </div>
        

        <div class="col-12 bg-light p-0">
          <table class="myTableDebitorListItem " v-if="item.changeProduct.length>0">
            <thead>
              <tr class="header py-3" style="background: #b4d3fa;">
                <th  width="40" class="text-left">№</th>
                <th>{{$t('product')}}</th>
                <th>{{$t('measure')}}</th>
                <th>{{$t('summ')}}</th>
                <th>{{$t('persantage')}}</th>
                <!-- <th >{{$t('lessons_cout')}}</th> -->
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row,index) in item.changeProduct" :key="index" v-show="row.real_qty != 0">
                <td> <span >{{index+1}}</span> </td>
                <td> <span >{{row.product_name}}</span> </td>
                <td> <span >{{row.real_qty}}</span> </td>
                <td> <span >{{row.summ}}</span> </td>
                <td> <span >{{row.persantage}}</span> </td>
              </tr>
            </tbody>
          </table>
        </div>
        
      </div>
    </div>
    <div class="text-right mr-4 mt-2">
      <mdb-btn   @click="clearAll" color="success" m="r2" style="font-size: 8.5px"
          p="r3 l3 t2 b2"> <mdb-icon fas class="mr-1"  icon="save"></mdb-icon>  {{$t('save')}}
        </mdb-btn>
    </div>

    <!-- <div class="for_table mt-4">
      <div class="px-3 py-2 pt-3">
        <div class="d-flex justify-content-start align-items-center">
          <div class="row w-100">
            <div class="col-4">
              <mdb-input class="m-0 p-0" v-model="search" size="md" @input="searchClick"  outline  group type="text" validate error="wrong" success="right"/>
              <small
                style="position: absolute; top: -7px; left: 20px; font-size: 11px"
                class="bg-white px-2 py-0"
                >{{ $t("search_here") }}</small
              >
            </div>
          </div>
        </div>
      </div>

      <div class="px-0">
        <loader v-if="loading"/>
        <table class="myTableDebitorListItemDownAll " >
          <thead>
            <tr class="header py-3" style="background: #affddb;">
              <th  width="40" class="text-left">№</th>
              <th>{{$t('client_name')}}</th>
              <th>{{$t('product')}}</th>
              <th>{{$t('measure')}}</th>
              <th>{{$t('note')}}</th>
              <th>{{$t('date')}}</th>
              <th width="80" class="text-center">{{$t('Action')}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row,rowIndex) in comenList" :key="rowIndex" >
              <td> <span >{{rowIndex+1}}</span> </td>
              <td> <span >{{row.client_name}}</span> </td>
              <td> <span >{{row.product.name}}</span> </td>
              <td> <span >{{row.qty}}</span> </td>
              <td> <span >{{row.note}}</span> </td>
              
              <td> <span >{{row.updated_date_time.slice(0,10)}}</span> <span class="ml-2">{{row.updated_date_time.slice(11,16)}}</span> </td>

              
              <td class="text-center">
                <i class="fas fa-pen editIcon mask waves-effect  m-0 pr-2"  v-on:click="editRow" :data-row="rowIndex"></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div> -->
 
    <modal-train  :show="change_pro" headerbackColor="white"  titlecolor="black" :title="$t('change_product')" 
      @close="change_pro = false" width="80%">
        <template v-slot:body>
          <changeProduct @close="change_pro = false" @addNewData="GetChangeProduct" ref="changer" :row="rowIndex" :product_name="itemForChange.product_name"
            :product_qty="itemForChange.qty" :product_id="itemForChange.product_id" :product_price ="itemForChange.product_price">
          </changeProduct>
        </template>
    </modal-train>

    <modal-train  :show="show_rasxod" headerbackColor="white"  titlecolor="black" title="Расход продукт" 
      @close="show_rasxod = false" width="50%">
        <template v-slot:body>
          <div class="row m-4" >
            <div class="col-12">
              <erpSelect
                :options="all_product_t.rows"
                @select="selectOptionRasxod"
                :selected="rasxod_product_name"
                :label="$t('client')"
              />
              <small
                style="position: absolute; top: -7px; left: 20px; font-size: 11px"
                class="bg-white px-2 py-0"
                >{{ $t("product") }}</small
              >
            </div>
            <div class="col-12 mt-3">
              <mdb-input class="m-0 p-0" v-model="rasxod_product_qty" size="md"  outline  group type="number" validate error="wrong" success="right"/>
                <!-- <small class="invalid-text mt-0" style="margin-left:5px; "  v-if="$v.item.qty.$dirty && !$v.item.qty.required" >
                  {{$t('name_invalid_text')}}
                </small> -->
                <small
                  style="position: absolute; top: -7px; left: 20px; font-size: 11px"
                  class="bg-white px-2 py-0"
                  >{{ $t("measure") }}</small
                >
            </div>
            <div class="col-12 mt-3">
              <mdb-input class="m-0 p-0" v-model="rasxod_product_note" size="sm" outline group type="textarea" validate error="wrong" success="right"/>
              <small
                style="position: absolute; top: -7px; left: 20px; font-size: 11px"
                class="bg-white px-2 py-0"
                >{{ $t("reason") }}</small>
            </div>

            <div class="col-12 mt-3 text-right">
              <mdb-btn   @click="saveRasxod()" color="success" m="r2" style="font-size: 8.5px"
                p="r3 l3 t2 b2"> <mdb-icon fas class="mr-1"  icon="plus"></mdb-icon>  {{$t('add')}}
              </mdb-btn>
            </div>
          </div>
        </template>
    </modal-train>
    <massage_box :hide="modal_status" :detail_info="modal_info"
      :m_text="$t('Failed_to_add')" @to_hide_modal="modal_status= false"/>

    <Toast ref="message"></Toast>
    
  </div>
</template>

<script>
import changeProduct from './changeComponent.vue'
import erpSelectFio from "../../components/erpSelectFioSearchRow.vue";
import erpSelect from "../../components/erpSelectRow.vue";
import erpSelectOnlyBugdoy from "../../components/erpSelectOnlyBugdoy.vue";
import { required } from "vuelidate/lib/validators";
import {mapActions,mapGetters} from 'vuex'
import {mdbInput, mdbRow, mdbCol, mdbBtn, mdbIcon} from 'mdbvue'
export default {
  components: {
    erpSelect,mdbInput,erpSelectFio, erpSelectOnlyBugdoy,
     mdbRow, mdbCol, mdbBtn,mdbIcon,changeProduct
  },
  validations: {
    test: {required},
    // rasxod_product_name: {required},
    // rasxod_product_qty: {required},
    // client_new_name: {required},
    // product_name: {required},
    // measure: {required}
  },
  data() {
    return {
      test: 'sdsad',

      modal_info: '',
      modal_status: false,
      loading: false,
      change_pro: false,
      id: 0,

      client_name: '',
      client_id: 0,
      client_new_name: '',
      product_name: '',
      product_id: null,
      measure: '',
      note: "",

      search: '',
      comenList: [],
      getListSearch: [],
      header: {
        shafyor_name: '',
        car_number: '',
        note: '',
        qty: 0,
        real_qty: 0,
      },
      clients_info: [
        
      ],

      rowIndex: null,
      itemForChange: {},

      shafyorGroup_id: null,
      ruyxats_id: null,


      show_rasxod: false,

      rasxod_product_name: '',
      rasxod_product_id: null,
      rasxod_product_qty: 0,
      rasxod_product_note: '',
      change_unit_qty: 0,
    }
  },
  async mounted(){
    await this.fetchClient();
    await this.fetch_product_t();
    // await this.updateList()
    console.log(this.allClient)
  },
  computed: mapGetters([ 'allClient', 'all_product_t']),
  methods: {
    ...mapActions(['fetchClient', 'fetch_product_t']),
    selectOptionRasxod(option){
      console.log(option)
      this.rasxod_product_name = option.data.name;
      this.rasxod_product_id = option.data.id;
    },
    selectOptionUser(option) {
      console.log(option)
      this.clients_info[option.row].client_name = option.data.fio;
      this.clients_info[option.row].client_id = option.data.id;
      this.clients_info[option.row].client_new_name = option.data.fio;
    },
    selectOptionProduct(option){
      this.rowIndex = option.row;
      this.clients_info[option.row].product_name = option.data.name;
      this.clients_info[option.row].product_id = option.data.id;
      this.clients_info[option.row].product_price = option.data.price;
    },
    changeClient(i){
      this.clients_info[i].client_name = '';
      this.clients_info[i].client_id = null;
    },

    async addClientRow(){
      if(this.header.shafyor_name == '' || this.clients_info.length>=1){
        return false;
      }
      let info = {
        client_name: '',
        client_id: null,
        client_new_name: '',
        product_id: null,
        product_name: '',
        product_price: 0,
        ruyxat_id: 0,
        note: '',
        skidka: 0,
        qty: '0',
        real_qty: 0,
        invoice_id: 0,
        group_detail_id: 0,
        skidka: 0,
        changeProduct: [
        ]
      }
      
      // if(await this.all_product_t.rows.length>0){
      //   this.rowIndex = 0;
      //   info.product_name = this.all_product_t.rows[0].name;
      //   info.product_id = this.all_product_t.rows[0].id;
      //   info.product_price = this.all_product_t.rows[0].price;
      // }
      console.log('bu tuliq info from infodan ', info)


      this.clients_info.unshift(info);
      this.clients_info[0].client_new_name = this.header.shafyor_name;
      if(this.header.shafyor_name != ''  || this.header.car_number != ''){
        if(this.clients_info.length<2){
          const requestOptions = {
            method : "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify({
              "shafyor_name": this.header.shafyor_name,
              "car_number": this.header.car_number,
              "note": this.header.note,
              "name": '',
              "id": 0
            })
          };
          try{
            this.loading = true;
            const response = await fetch(this.$store.state.hostname + "/TegirmonTortilganBugdoyRoyxatiGroups", requestOptions);
            this.loading = false;
            if(response.status == 201 || response.status == 200)
            {
              const tre = await response.json();
              console.log('tre')
              console.log(tre)
              this.shafyorGroup_id = tre.id;
              this.$refs.message.success('Added_successfully')
              return true;
            }
            else{
              const data = await response.text();
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
        }
      }
    },

    async addRows(){
      if(this.header.shafyor_name == ''){
        return false;
      }
      let info = {
        client_name: '',
        client_id: null,
        client_new_name: '',
        product_id: null,
        product_name: '',
        product_price: 0,
        ruyxat_id: 0,
        note: '',
        skidka: 0,
        qty: '0',
        real_qty: 0,
        invoice_id: 0,
        group_detail_id: 0,
        changeProduct: [
        ]
      }
      // if(await this.all_product_t.rows.length>0){
      //   this.rowIndex = 0;
      //   info.product_name = this.all_product_t.rows[0].name;
      //   info.product_id = this.all_product_t.rows[0].id;
      //   info.product_price = this.all_product_t.rows[0].price;
      // }
      this.clients_info.unshift(info);
      if(this.header.shafyor_name != ''  || this.header.car_number != ''){
        if(this.clients_info.length<2){
          const requestOptions = {
            method : "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify({
              "shafyor_name": this.header.shafyor_name,
              "car_number": this.header.car_number,
              "note": this.header.note,
              "name": '',
              "id": 0
            })
          };
          try{
            this.loading = true;
            const response = await fetch(this.$store.state.hostname + "/TegirmonTortilganBugdoyRoyxatiGroups", requestOptions);
            this.loading = false;
            if(response.status == 201 || response.status == 200)
            {
              const tre = await response.json();
              console.log('tre')
              console.log(tre)
              this.shafyorGroup_id = tre.id;
              this.$refs.message.success('Added_successfully')
              return true;
            }
            else{
              const data = await response.text();
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
        }
      }
      
    },
    async deleteRowInvoice(item, i){
      let invId = item.invoice_id
      if(item.invoice_id>0){
        const requestOptions = {
          method : "delete",
        };
        const response = await fetch(this.$store.state.hostname + "/TegirmonInvoice/" + invId, requestOptions);
        const data = await response.text();
        if(response.status == 201 || response.status == 200)
        {
          this.$refs.message.success('Successfully_removed')
          this.clients_info.splice(i,1);
        }
        else{
          this.modal_info = data;
          this.modal_status = true;
        }
      }
      else{
        this.clients_info.splice(i,1);
        this.$refs.message.success('Successfully_removed')
      }
     
    },
    async saveAddRow(i){
      if(this.clients_info[i].product_id == null ||  this.clients_info[i].qty<=0){
        return false;
      }
      console.log(i)
      if(this.$v.$invalid )
      {
        this.$v.$touch();
        this.$refs.message.warning('please_fill')
        return false;
      }
      const requestOptions = {
        method : "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify({
          "tegirmonProductid": this.clients_info[i].product_id,
          "qty": this.clients_info[i].qty,
          "real_qty": this.clients_info[i].qty,
          "tegirmonClientid": this.clients_info[i].client_id,
          "note": this.clients_info[i].note,
          "info": this.clients_info[i].note,
          "client_name": this.clients_info[i].client_new_name,
          "id": this.clients_info[i].ruyxat_id,
          
          // "auth_user_creator_id": localStorage.AuthId,
          // "auth_user_updator_id": localStorage.AuthId,
          // "tegirmonAuthid": localStorage.AuthId,
        })
      };
       console.log('response')
        console.log(requestOptions.body)
      try{
        this.loading = true;
        const response = await fetch(this.$store.state.hostname + "/TegirmonTortilganBugdoyRoyxatis", requestOptions);
       
        this.loading = false;
        if(response.status == 201 || response.status == 200)
        {
          const dataJosn = await response.json()
          console.log(dataJosn)
          this.clients_info[i].ruyxat_id = dataJosn.id;
          this.ruyxats_id = dataJosn.id;
          await this.GetChangeProductEmpty();
          this.$refs.message.success('Added_successfully')
          return true;
        }
        else{
          const data = await response.text();
          this.modal_info = data;
          this.modal_status = true;
          return false;
        }
      }
      catch{
        this.loading = false;
        console.log('Jam parrot');
        this.modal_info = this.$i18n.t('network_ne_connect');
        this.modal_status = true;
      }

    },
    changingAdd(data,i){
      console.log('bu biz yuboradigan dat ashuni ichida bormikan kimadas')
      console.log(data)
      this.change_pro = true;
      this.rowIndex = i;
      this.itemForChange = data;
      this.$refs.changer.updateChanger(data);
    },
    async GetChangeProduct(option){
      this.change_unit_qty = 0;
      console.log('get optionslar')
      console.log(option)
      this.change_pro = false;
      this.clients_info[option.index].changeProduct = option.data;
      console.log('clients_info')
      console.log(this.clients_info)
      let summ_all = 0;
      let item_list_change = [];
      let skidkaItem = 0;
      console.log(option.data);
      for(let i = 0; i<option.data.length; i++){
        if(parseFloat(option.data[i].skidka) > 0){
          skidkaItem += parseFloat(option.data[i].skidka);
        }
        if(parseFloat(option.data[i].real_qty) > 0 && parseFloat(option.data[i].summ) == 0){
          let item = {
            tegirmonProductid: option.data[i].product_id,
            qty: option.data[i].real_qty,
            real_qty: option.data[i].real_qty,
            sum: option.data[i].summ,
            real_sum: option.data[i].persantage
          }
          item_list_change.push(item);
          console.log('item_list_change')
          console.log(item_list_change)
        }
        else if(parseFloat(option.data[i].summ)>0){
          this.change_unit_qty = option.data[i].real_qty;
        }
        summ_all += parseFloat(option.data[i].summ)
      }
      this.clients_info[option.index].skidka = skidkaItem;

      console.log('item_list_change')
      console.log(this.change_unit_qty)
      if(this.change_unit_qty == null){
        this.change_unit_qty = 0;
      }
      const requestOptions = {
        method : "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify({
          "qty_real": this.clients_info[this.rowIndex].qty,
          "tegirmonProductid": this.clients_info[this.rowIndex].product_id,
          "id": 0,
          "item_list": item_list_change,
          "summ": summ_all,
          "note": this.change_unit_qty,
          "tegirmonAuthid": localStorage.AuthId,
          "user_name": localStorage.user_name,
          "image_str_url": skidkaItem
        })
      };
      try{
        this.loading = true;
        const response = await fetch(this.$store.state.hostname + "/TegirmonInvoice/addChangeBugdoyProductsWithoutRegistartion", requestOptions);
        this.loading = false;
        if(response.status == 201 || response.status == 200)
        {
          if(this.clients_info[this.rowIndex].invoice_id>0){
            console.log('this.clients_info[this.rowIndex].invoice_id')
            console.log(this.clients_info[this.rowIndex].invoice_id)
            await this.fetchDeleteIncoice(this.clients_info[this.rowIndex].invoice_id)
          }
          const dataInvoice = await response.json();
          console.log('dataInvoice')
          console.log(dataInvoice)
          this.clients_info[this.rowIndex].invoice_id = dataInvoice.id;
          // this.$refs.message.success('Added_successfully')
          // return true;
        }
        else{
          const data = await response.text();
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


      if(this.shafyorGroup_id > 0){

        console.log('this.shafyorGroup_id')
        console.log(this.shafyorGroup_id)
        console.log(this.clients_info[this.rowIndex].ruyxat_id)
        console.log(this.clients_info[this.rowIndex].invoice_id)
        const requestOptions = {
          method : "POST",
          headers: { "Content-Type" : "application/json" },
          body: JSON.stringify({
            "tegirmonTortilganBugdoyRoyxatiGroupid": this.shafyorGroup_id,
            "tegirmonTortilganBugdoyRoyxatiid": this.clients_info[this.rowIndex].ruyxat_id,
            "tegirmonInvoiceid": this.clients_info[this.rowIndex].invoice_id,
            "id":0,
            "name": this.header.shafyor_name,
            "note": ''
            // "auth_user_updator_id": '1,2',
            
            // "auth_user_creator_id": localStorage.AuthId,
            // "auth_user_updator_id": localStorage.AuthId,
          })
        };
        try{
          this.loading = true;
          const response = await fetch(this.$store.state.hostname + "/TegirmonTortilganBugdoyRoyxatiGroupDetails", requestOptions);
          this.loading = false;
          if(response.status == 201 || response.status == 200)
          {
            const dataGR = await response.json()
            console.log('dataGR')
            console.log(dataGR)
            this.clients_info[this.rowIndex].group_detail_id = dataGR.id;
            this.$refs.message.success('Added_successfully')
            // return true;
          }
          else{
            const data = await response.text();
            this.modal_info = data;
            this.modal_status = true;
            // return false;
          }
        }
        catch{
          this.loading = false;
          this.modal_info = this.$i18n.t('network_ne_connect');
          this.modal_status = true;
        }
      }

    },
     async GetChangeProductEmpty(){
      this.change_pro = false;
      let summ_all = 0;
      let item_list_change = [];
      console.log('clients_info ++')

      console.log(this.clients_info[this.rowIndex].product_id)
      // console.log(this.clients_info[this.rowIndex].qty)

      // let item11 = {
      //   tegirmonProductid: this.clients_info[this.rowIndex].product_id,
      //   qty: this.clients_info[this.rowIndex].qty,
      //   real_qty: this.clients_info[this.rowIndex].qty,
      //   sum: 0,
      //   real_sum: 0
      // }
      // // console.log('clients_info ++')

      // item_list_change.push(item11)

      console.log('item_list_change')
      console.log(item_list_change)
      const requestOptions = {
        method : "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify({
          "qty_real": this.clients_info[this.rowIndex].qty,
          "tegirmonProductid": this.clients_info[this.rowIndex].product_id,
          "id": 0,
          // "item_list": item_list_change,
          "summ": summ_all,
          // "auth_user_creator_id": localStorage.AuthId,
          // "auth_user_updator_id": localStorage.AuthId,
          // "tegirmonAuthid": localStorage.AuthId,
        })
      };
      try{
        this.loading = true;
        const response = await fetch(this.$store.state.hostname + "/TegirmonInvoice/addChangeBugdoyProductsWithoutRegistartion", requestOptions);
        this.loading = false;
        if(response.status == 201 || response.status == 200)
        {
          if(this.clients_info[this.rowIndex].invoice_id>0){
            console.log('this.clients_info[this.rowIndex].invoice_id')
            console.log(this.clients_info[this.rowIndex].invoice_id)
            await this.fetchDeleteIncoice(this.clients_info[this.rowIndex].invoice_id)
          }
          const dataInvoice = await response.json()
          console.log(dataInvoice)
          this.clients_info[this.rowIndex].invoice_id = dataInvoice.id;
          // this.$refs.message.success('Added_successfully')
          // return true;
        }
        else{
          const data = await response.text();
          this.modal_info = data;
          this.modal_status = true;
          return false;
        }
      }
      catch{
        console.log('shu yerda oshibka bulayabdimi deymanda')
        this.loading = false;
        this.modal_info = this.$i18n.t('network_ne_connect');
        this.modal_status = true;
      }


      if(this.shafyorGroup_id > 0){

        console.log('this.shafyorGroup_id ++++')
        // console.log(this.shafyorGroup_id)
        // console.log(this.clients_info[this.rowIndex].ruyxat_id)
        // console.log(this.clients_info[this.rowIndex].invoice_id)
        const requestOptions = {
          method : "POST",
          headers: { "Content-Type" : "application/json" },
          body: JSON.stringify({
            "tegirmonTortilganBugdoyRoyxatiGroupid": this.shafyorGroup_id,
            "tegirmonTortilganBugdoyRoyxatiid": this.clients_info[this.rowIndex].ruyxat_id,
            "tegirmonInvoiceid": this.clients_info[this.rowIndex].invoice_id,
            "id":0,
            "name": this.header.shafyor_name,
            "note": ''
            // "auth_user_creator_id": localStorage.AuthId,
            // "auth_user_updator_id": localStorage.AuthId,
          })
        };
        try{
          this.loading = true;
          const response = await fetch(this.$store.state.hostname + "/TegirmonTortilganBugdoyRoyxatiGroupDetails", requestOptions);
          this.loading = false;
          if(response.status == 201 || response.status == 200)
          {
            const dataGR = await response.json()
            console.log('dataGR')
            console.log(dataGR)
            this.clients_info[this.rowIndex].group_detail_id = dataGR.id;
            this.$refs.message.success('Added_successfully')
            // return true;
          }
          else{
            const data = await response.text();
            this.modal_info = data;
            this.modal_status = true;
            // return false;
          }
        }
        catch{
          this.loading = false;
          this.modal_info = this.$i18n.t('network_ne_connect');
          this.modal_status = true;
        }
      }

    },
    
    async fetchDeleteIncoice(id){
      const requestOptions = {
        method : "delete",
      };
      const response = await fetch(this.$store.state.hostname + "/TegirmonInvoice/" + id, requestOptions);
      const data = await response.text();

      if(response.status == 201 || response.status == 200)
      {
        this.$refs.message.success('Successfully_removed')
      }
      else{
        this.modal_info = data;
        this.modal_status = true;
      }
    },
    

    clearAll(){
      for(let i=0; i<this.clients_info.length; i++){
        if(this.clients_info[i].invoice_id == 0){
          this.modal_info = (i+1) + ' - Не добавлять клиента'; 
          this.modal_status = true;
          return;
        }
      }
      console.log(localStorage.AuthId)
      this.header = {
        shafyor_name: '',
        car_number: '',
        note: '',
        qty: 0,
        real_qty: 0,
      };
      this.clients_info = [];
      this.shafyorGroup_id = null;
      this.rowIndex = null;
      this.itemForChange = {};
    },

    async saveRasxod(){
      if(this.$v.$invalid )
        {
          this.$v.$touch();
          this.$refs.message.warning('please_fill')
          return false;
        }
      const requestOptions = {
        method : "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify({
          "tegirmonProductid": this.rasxod_product_id,
          // "qty": this.rasxod_product_qty,
          "qty_real": this.rasxod_product_qty,
          // "tegirmonClientid": this.client_id,
          "note": this.rasxod_product_note,
          // "info": this.rasxod_product_note,
          // "client_name": this.client_new_name,
          // "inv_accepted_status": true,
          "id": 0,
          // "auth_user_creator_id": localStorage.AuthId,
          // "auth_user_updator_id": localStorage.AuthId,
          "tegirmonAuthid": localStorage.AuthId,
        })
      };
      console.log(requestOptions)
      try{
        this.loading = true;
        const response = await fetch(this.$store.state.hostname + "/TegirmonInvoice/postInvoiceBugdoyniTegirmongaUnQilibTortish", requestOptions);
        this.loading = false;
        if(response.status == 201 || response.status == 200)
        {
          const tre = await response.json()
          console.log(tre)
          await this.clear();
          this.show_rasxod = false;
          this.$refs.message.success('Added_successfully')
          return true;
        }
        else{
          const data = await response.text();
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
    clear(){
      this.rasxod_product_name = '';
      this.rasxod_product_id = null;
      this.rasxod_product_qty = 0;
      this.rasxod_product_note = '';
    },
    searchClick(){
      console.log('hiy')
    }
  },

}
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
  width: 5.5px;

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


.myTableDebitorListItem {
  /* border-collapse: collapse; */
  table-layout:fixed;
  width: 100%;
  overflow: hidden;
  // border: 1px solid #ddd;
  font-size: 18px;
  max-height:80px; overflow-x:auto
}
.myTableDebitorListItem th{
  font-weight: 600;
  font-size:11px;
}
.myTableDebitorListItem td{
  font-size:11.5px;
  
}
.myTableDebitorListItem td {
  text-align: left;
  padding: 7px 10px;
}
.myTableDebitorListItem th{
  text-align: left;
  padding: 8px 10px;
}

.myTableDebitorListItem tr {
  border-bottom: 1px dashed rgb(240, 240, 240);
  &:hover{
    background: #afd1fd;
  }
}

.myTableDebitorListItem tr.header, .myTableDebitorListItem tr:hover {
  // background-color: #f1f1f1;
}
// ikkichi pastdagi tabletsa

.myTableDebitorListItemDownAll {
  /* border-collapse: collapse; */
  table-layout:fixed;
  width: 100%;
  overflow: hidden;
  // border: 1px solid #ddd;
  font-size: 18px;
  max-height:80px; overflow-x:auto
}
.myTableDebitorListItemDownAll th{
  font-weight: 600;
  font-size:11px;
}
.myTableDebitorListItemDownAll td{
  font-size:11.5px;
  
}
.myTableDebitorListItemDownAll td {
  text-align: left;
  padding: 7px 10px;
}
.myTableDebitorListItemDownAll th{
  text-align: left;
  padding: 8px 10px;
}

.myTableDebitorListItemDownAll tr {
  border-bottom: 1px dashed rgb(240, 240, 240);
  &:hover{
    background: #affddb;
  }
}

.myTableDebitorListItemDownAll tr.header, .myTableDebitorListItemDownAll tr:hover {
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
.header_shafyor{
  background: #ffffff;
  border-bottom: 1px solid rgb(78, 54, 174);
  margin-bottom: 15px;
}
.for_table{
  height: 250px;
  overflow: hidden;
  overflow-y: scroll;
}
.main_operation{
  // min-height: calc(100vh - 330px);
}
</style>