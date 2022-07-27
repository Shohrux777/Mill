<template>
 <div class="mainShowGroup">
    <checkgroup v-if="checkShow" @close="closeAllGroup"/>
    <div v-else class="groupList">
      <div class="row  py-4 backColor px-2 border mx-2 shadow rounded mt-4" v-for="(item,indexRow) in invoice_list" :key="indexRow">
        <div class="col-3 appleid">
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
          <mdb-input class="m-0 p-0" disabled v-model="item.client_new_name" size="md" @input="changeClient(indexRow)"  outline  group type="text" validate error="wrong" success="right"/>
            <!-- <small class="invalid-text mt-0" style="margin-left:5px; "  v-if="$v.client_new_name.$dirty && !$v.client_new_name.required" >
              {{$t('name_invalid_text')}}
            </small> -->
            <small
              style="position: absolute; top: -7px; left: 20px; font-size: 11px"
              class="bg-white px-2 py-0"
              >{{ $t("client") }}</small
            >
        </div>
        <div class="col-3 appleid">
          <erpSelect
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
          <mdb-input class="m-0 p-0" disabled v-model="item.qty" size="md"  outline  group type="number" validate error="wrong" success="right"/>
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
        <div class="col-1 mt-3">
          <mdb-input class="m-0 p-0 bg-warning text-white" :value="item.skidka" size="md" disabled outline group type="text" validate error="wrong" success="right"/>
          <small
            style="position: absolute; top: -7px; left: 15px; font-size: 11px"
            class="bg-warning px-2 py-0"
            >{{ $t("skidka") }}</small>
        </div>
        <div class="col-3 mt-3">
          <mdb-input class="m-0 p-0 bg_success" :value="(item.invoice_note).toFixed(1)" size="md" disabled outline group type="text" validate error="wrong" success="right"/>
          <small
            style="position: absolute; top: -7px; left: 15px; font-size: 11px"
            class="bg_success px-2 py-0"
            >{{ $t("kg_ves") }}</small>
        </div>
        <div class="col-3 mt-3">
          <mdb-input class="m-0 p-0 bg_success" v-model="item.summ" size="md" disabled outline group type="text" validate error="wrong" success="right"/>
          <small
            style="position: absolute; top: -7px; left: 15px; font-size: 11px"
            class="bg_success px-2 py-0"
            >{{ $t("summ") }}</small>
        </div>
        
        <div class="col-2">
          <div class="mt-3 text-right ">
            <!-- <mdb-btn   @click="Refresh" color="warning" m="r2" style="font-size: 10.5px"
              p="r4 l4 t2 b2"> <mdb-icon fas class="mr-2"  icon="sync"></mdb-icon>  {{$t('rasxod')}}
            </mdb-btn> -->
            <!-- <mdb-btn   @click="saveAddRow(indexRow)" color="success" m="r2" style="font-size: 8.5px"
              p="r3 l3 t2 b2"> <mdb-icon fas class="mr-1"  icon="plus"></mdb-icon>  {{$t('add')}}
            </mdb-btn> -->
            <!-- <mdb-btn    @click="sendZaxira(item,indexRow)" color="success" m="r2" style="font-size: 8.5px"
              p="r3 l3 t2 b2"> <mdb-icon fas class="mr-1"  icon="share-square"></mdb-icon>  {{$t('zaxira')}}
            </mdb-btn> -->
            <mdb-btn v-show="item.ruyxat_id>0"  @click="changingAdd(item,indexRow)" color="info" m="r2" style="font-size: 8.5px"
              p="r3 l3 t2 b2"> <mdb-icon fas class="mr-2"  icon="sync"></mdb-icon>  {{$t('changing')}}
            </mdb-btn>
          </div>
        </div>
    
        <div class="col-12  p-0" style="background: rgb(237, 237, 237);">
          <table class="myTablegroupList " v-if="item.changeProduct.length>0">
            <thead>
              <tr class="header py-3" style="background: #b4d3fa;">
                <th  width="40" class="text-left">№</th>
                <th>{{$t('product')}}</th>
                <th>{{$t('measure')}}</th>
                <th>{{$t('summ')}}</th>
                <th>{{$t('persantage')}}</th>
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
      <div class="d-flex justify-content-center">
        <h4>{{$t('zaxira')}}</h4>
      </div>
      <div class="row py-2 mx-2 mb-3 shadow bg_success_zaxira" v-for="(item,i) in zaxiraInvoiceList" :key="i+100">
        <div class="col-4 mt-3">
          <mdb-input class="m-0 p-0" :value="item.client.fio" size="md"  outline group type="text" validate error="wrong" success="right"/>
          <small
            style="position: absolute; top: -15px; left: 15px; font-size: 11px"
            class="bg-white px-2 py-0"
            >{{ $t("client") }}</small>
        </div>
        <div class="col-4 mt-3">
          <mdb-input class="m-0 p-0" :value="item.product.name" size="md" disabled outline group type="text" validate error="wrong" success="right"/>
          <small
            style="position: absolute; top: -15px; left: 15px; font-size: 11px"
            class="bg-white px-2 py-0"
            >{{ $t("product") }}</small>
        </div>
        <div class="col-4 mt-3">
          <mdb-input class="m-0 p-0" :value="item.qty_real" size="md" disabled outline group type="text" validate error="wrong" success="right"/>
          <small
            style="position: absolute; top: -15px; left: 15px; font-size: 11px"
            class="bg-white px-2 py-0"
            >{{ $t("qty") }}</small>
        </div>
        <div class="col-4 mt-3">
          <mdb-input class="m-0 p-0" :value="item.note" size="md" disabled outline group type="text" validate error="wrong" success="right"/>
          <small
            style="position: absolute; top: -15px; left: 15px; font-size: 11px"
            class="bg-white px-2 py-0"
            >{{ $t("note") }}</small>
        </div>
        <div class="col-4 mt-3">
          <mdb-input class="m-0 p-0" :value="item.client.passport_number" size="md"  outline group type="text" validate error="wrong" success="right"/>
          <small
            style="position: absolute; top: -15px; left: 15px; font-size: 11px"
            class="bg-white px-2 py-0"
            >{{ $t("client_name") }}</small>
        </div>
        <div class="col-4 mt-3">
          <mdb-input class="m-0 p-0" :value="item.auth.user.fio" size="md" disabled outline group type="text" validate error="wrong" success="right"/>
          <small
            style="position: absolute; top: -15px; left: 15px; font-size: 11px;"
            class="bg-white px-2 py-0"
            >Кассир</small>
        </div>
      </div>

      <div class="blue-gradient">
        <hr class="mt-5 "/>
      </div>
      <mdb-row class="mt-1 mx-2">
        <mdb-col col="12">
          <div class="mt-1 mr-3 text-right">
            <!-- <mdb-btn color="success"  @click="sendAll" style="font-size: 10.5px"
              p="r4 l4 t2 b2">
            <mdb-icon  />{{$t('add')}}</mdb-btn> -->
            <mdb-btn color="success"  @click="getCheck" style="font-size: 10.5px"
              p="r4 l4 t2 b2">
            <mdb-icon  />{{$t('check')}}</mdb-btn>
      </div>
        </mdb-col>
      </mdb-row>

      <modal-train  :show="change_pro" headerbackColor="white"  titlecolor="black" :title="$t('change_product')" 
        @close="change_pro = false" width="80%">
          <template v-slot:body>
            <changeProduct @close="change_pro = false" ref="changer" @addNewData="GetChangeProduct" :row="rowIndex" :product_name="itemForChange.product_name"
              :product_qty="itemForChange.qty" :product_id="itemForChange.product_id" :product_price ="itemForChange.product_price">
            </changeProduct>
          </template>
      </modal-train>
      <massage_box :hide="modal_status" :detail_info="modal_info"
        :m_text="$t('Failed_to_add')" @to_hide_modal="modal_status= false"/>

      <Toast ref="message"></Toast>
    </div>
 </div>
</template>

<script>
import checkgroup from '../sell/checkgroup.vue'
import changeProduct from './changeComponent.vue'
import erpSelectFio from "../../components/erpSelectFioSearchRow.vue";
import erpSelect from "../../components/erpSelectRow.vue";
import {mapActions,mapGetters, mapMutations} from 'vuex'
import {mdbInput, mdbRow, mdbCol, mdbBtn, mdbIcon} from 'mdbvue'
export default {
  components: {
    erpSelect,mdbInput,erpSelectFio,checkgroup,
     mdbRow, mdbCol, mdbBtn,mdbIcon,changeProduct
  },
  data() {
    return {
      id: this.$route.params.id,
      modal_info: '',
      modal_status: false,
      loading: false,
      change_pro: false,

      rowIndex: null,
      itemForChange: {},

      checkShow: false,

      invoice_list: [],
      changeInvoice_id: 0,

      invoiceForReturn: {},
      invoiceListForReturn: [],
      zaxiraInvoiceList: [],
    }
  },
  async created()
  {
    if(this.id > 0)
    {
      const res = await fetch(this.$store.state.hostname + '/TegirmonTortilganBugdoyRoyxatiGroupDetails/getPaginationByGroupId?page=0&size=100&group_id=' + this.id);
      const data = await res.json();
      console.log(data)
      // this.invoice_list = data.items_list;
      if(data.items_list == 0){
        console.log('this is by id created')
        // await this.fetchAcceptGroup();
        
      }
      else{
      this.fetchInvoice(data.items_list);
      }
      await this.fetchZaxiraList();
    }
  },
  async mounted(){
    await this.fetchClient();
    await this.fetch_product_t();
    // await this.updateList()
    console.log(this.allClient);
  },
  computed: mapGetters([ 'allClient', 'all_product_t']),
  methods: {

    ...mapActions(['fetchClient', 'fetch_product_t']),
    ...mapMutations(['getAllCheck', 'zaxiragaUtkazishList']),
    sendZaxira(data, index){
      console.log(data)
      console.log(index)
      this.zaxiragaUtkazishList(data);
      this.$router.push('/getProductFromGroup')
    },
    async fetchZaxiraList(){
      this.zaxiraInvoiceList = [];
      let string = localStorage.UseIdListInvoice;
      let arrayList = string.split(",");
      console.log(arrayList)
      console.log('arrayList')
      for(let i=0; i<arrayList.length-1; i++){
        let Invoice_Id = parseFloat(arrayList[i])
        try{
          this.loading = true;
          const response = await fetch(this.$store.state.hostname + "/TegirmonInvoice/getAnyInvoiceFullInfoById?invoice_id=" + Invoice_Id);
          const data = await response.json();
          console.log('invoice')
          console.log(data)
          this.loading = false;
          if(response.status == 201 || response.status == 200)
          {
            this.zaxiraInvoiceList.push(data);
            this.$refs.message.success('Added_successfully')
          }
          else{
            this.modal_info = this.$i18n.t('network_ne_connect');
            this.modal_status = true;
          }
        }
        catch{
          this.loading = false;
          this.modal_info = this.$i18n.t('network_ne_connect');
          this.modal_status = true;
        }
      }
      console.log('this.zaxiraInvoiceList')
      console.log(this.zaxiraInvoiceList)
    },
    async fetchInvoice(data){
      console.log('dasdasdasda fetch')
      console.log(data)
      this.invoiceListForReturn = data;
      this.invoice_list = [];
      for(let i=0; i<data.length;i++){
        let info = {
          client_name: '',
          client_id: 0,
          client_new_name: '',
          product_id: null,
          product_name: '',
          product_price: 0,
          ruyxat_id: 0,
          note: '',
          qty: '0',
          real_qty: 0,
          check_qty: 0,
          summ:0,
          invoice_id: 0,
          group_detail_id: 0,
          group_id: this.id,
          skidka: 0,
          changeProduct: [
          ],
          invoice_note: 0,
        }
        if(data[i].invoice.note == null || data[i].invoice.note == ''){
          info.invoice_note = 0;
        }
        else{
          info.invoice_note = parseFloat(data[i].invoice.note)
        }
        info.group_detail_id = data[i].id;
        info.ruyxat_id = data[i].TegirmonTortilganBugdoyRoyxatiid;
        info.invoice_id = data[i].TegirmonInvoiceid;
        info.client_new_name = data[i].royxati.client_name;
        info.client_id = data[i].TegirmonClientid;
        if(data[i].TegirmonClientid != null){
          info.client_name = data[i].royxati.client_name;
        }
        info.product_id = data[i].royxati.TegirmonProductid;
        info.product_name = data[i].royxati.product.name;
        info.product_price = data[i].royxati.product.price;
        info.qty = data[i].royxati.qty;
        info.real_qty = data[i].royxati.real_qty;
        info.note = data[i].royxati.note;
        
        let tempInvoiceId = data[i].TegirmonInvoiceid;
        // console.log(data[i].TegirmonInvoiceid)
        try{
          const resp = await fetch(this.$store.state.hostname + '/TegirmonInvoice/getAnyInvoiceFullInfoById?invoice_id=' + tempInvoiceId);
          console.log('resp')
          console.log(resp)
          const data = await resp.json();
          if(resp.status == 201 || resp.status == 200){
            console.log('this is by id')
            console.log(data)
            info.summ = data.summ;
            if(data.image_str_url == null || data.image_str_url == ''){
              info.skidka = 0;
              info.check_qty += 0;
            }
            else{
              info.skidka = data.image_str_url;
              info.check_qty += parseFloat(data.image_str_url);
            }
            info.changeProduct = []
            if(data.note == null || data.note == ''){
              info.check_qty += 0;
            }
            else{
              info.check_qty += parseFloat(data.note);
            }
            for(let j=0; j<data.item_list.length; j++){
              let rpoTP = {
                persantage: (data.item_list[j].qty/data.item_list[j].real_sum).toFixed(1),
                product_id: data.item_list[j].tegirmonProductid,
                product_name: data.item_list[j].product.name,
                qty: data.item_list[j].qty,
                real_qty: data.item_list[j].real_qty,
                summ: data.item_list[j].sum,
                id: data.item_list[j].id
              }
              info.changeProduct.push(rpoTP);
            }
          }
        }
        catch{
          this.modal_info = this.$i18n.t('network_ne_connect');
          this.modal_status = true;
        }
        this.invoice_list.push(info)
        this.getAllCheck(this.invoice_list)
      }
    },


    selectOptionUser(option) {
      console.log(option)
      this.invoice_list[option.row].client_name = option.data.fio;
      this.invoice_list[option.row].client_id = option.data.id;
      this.invoice_list[option.row].client_new_name = option.data.fio;
    },
    selectOptionProduct(option){
      this.invoice_list[option.row].product_name = option.data.name;
      this.invoice_list[option.row].product_id = option.data.id;
      this.invoice_list[option.row].product_price = option.data.price;
    },
    changingAdd(data,i){
      this.invoiceForReturn = this.invoiceListForReturn[i];
      console.log(this.invoiceForReturn)
      console.log('bu invoicedan olinadigan api')
      console.log(data)
      this.changeInvoice_id = data.invoice_id;
      this.change_pro = true;
      this.rowIndex = i;
      this.itemForChange = data;
      this.$refs.changer.updateChanger(data);
      this.itemForChange.qty = this.itemForChange.qty.toString();
    },
    async GetChangeProduct(option){
      console.log("invoice ichidan chiqadigan dalniylar bizga")
      console.log(option)
      this.change_pro = false;
      this.invoice_list[option.index].changeProduct = option.data;
      console.log('invoice_list')
      console.log(this.invoice_list)
      let summ_all = 0;
      let item_list_change = [];
      let skidkaItem = 0;
      console.log(option.data)
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
            real_sum: option.data[i].persantage,
            id: option.data[i].id,
          }
          item_list_change.push(item);
          console.log('item_list_change')
          console.log(item_list_change)
        }
        else if(parseFloat(option.data[i].summ)>0){
          console.log('dashbord ham yasash kerak')
          console.log(option.data[i].real_qty)
          this.change_unit_qty = option.data[i].real_qty;
        }
        summ_all += parseFloat(option.data[i].summ)
      }
      console.log('this.change_unit_qty', this.change_unit_qty)
      const requestOptions = {
        method : "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify({
          "qty_real": this.invoice_list[this.rowIndex].qty,
          "tegirmonProductid": this.invoice_list[this.rowIndex].product_id,
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
        const response = await fetch(this.$store.state.hostname + "/TegirmonInvoice/postInvoiceBugdoyniClientniRegistratsiyaQilmasdanNarsalargaAlmashtribYuborish", requestOptions);
        this.loading = false;
        if(response.status == 201 || response.status == 200)
        { 
          await this.fetchReturnIncoice()
          const dataInvoice = await response.json()
          console.log('dataInvoice')
          console.log(dataInvoice)
          this.invoice_list[this.rowIndex].invoice_id = dataInvoice.id;
        
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

      console.log('this.invoice_list[this.rowIndex].group_detail_id  23  60 120 16')
      console.log(this.invoice_list[this.rowIndex].group_detail_id)
      console.log(this.invoice_list[this.rowIndex].ruyxat_id)
      console.log(this.invoice_list[this.rowIndex].invoice_id)
      console.log(this.id)
      if(this.invoice_list[this.rowIndex].group_detail_id > 0){
        const requestOptions = {
          method : "POST",
          headers: { "Content-Type" : "application/json" },
          body: JSON.stringify({
            "tegirmonTortilganBugdoyRoyxatiGroupid": this.id,
            "tegirmonTortilganBugdoyRoyxatiid": this.invoice_list[this.rowIndex].ruyxat_id,
            "tegirmonInvoiceid": this.invoice_list[this.rowIndex].invoice_id,
            "id" : 0,
            // "name": this.shafyor_name,
            
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
            this.invoice_list[this.rowIndex].group_detail_id = dataGR.id;
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

      await this.updateFull();

    },

    async updateFull(){
      if(this.id>0){
        const res = await fetch(this.$store.state.hostname + '/TegirmonTortilganBugdoyRoyxatiGroupDetails/getPaginationByGroupId?page=0&size=100&group_id=' + this.id);
        const data = await res.json();
        console.log('this is by id weqweqwe')
        console.log(data)
        // this.invoice_list = data.items_list;
        this.fetchInvoice(data.items_list);
      }
    },

    async fetchReturnIncoice(){
      const response = await fetch(this.$store.state.hostname + "/TegirmonInvoice/deAcceptpostInvoiceBugdoyniClientniRegistratsiyaQilmasdanNarsalargaAlmashtribYuborishByInvoiecId?invoice_id=" + this.invoiceForReturn.invoice.id);
      const data = await response.text();
      if(response.status == 201 || response.status == 200)
      {
        // this.$refs.message.warning('Successfully_removed')
        await this.fetchDeleteIncoice(this.invoiceForReturn.invoice.id);
      }
      else{
        this.modal_info = data;
        this.modal_status = true;
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
    async sendAll(){
      console.log('send check')
      this.getAllCheck(this.invoice_list)
      this.checkShow = true;
    },
    getCheck(){
      this.checkShow = true;
    },
    closeAllGroup(){
      this.checkShow = false;
      // this.fetchAcceptGroup()
    },

    async fetchAcceptGroup(){
      try{
        const response = await fetch(this.$store.state.hostname + "/TegirmonInvoice/acceptTegirmonTortilganBugdoyRoyxatiGroupFromInvoice?id=" + this.id);
        const data = await response.text();
        if(response.status == 201 || response.status == 200)
        {
          this.$refs.message.success('Added_successfully')
          this.$router.push('/groupsAccepted')
        }
        else{
          this.modal_info = data;
          this.modal_status = true;
        }
      }
      catch{
        this.modal_info = data;
        this.modal_status = true;
      }
      
    },
  }
}
</script>

<style lang="scss" scoped>
.myTablegroupList {
  /* border-collapse: collapse; */
  table-layout:fixed;
  width: 100%;
  overflow: hidden;
  // border: 1px solid #ddd;
  font-size: 18px;
  max-height:80px; overflow-x:auto
}
.myTablegroupList th{
  font-weight: 600;
  font-size:11px;
}
.myTablegroupList td{
  font-size:11.5px;
  
}
.myTablegroupList td {
  text-align: left;
  padding: 7px 10px;
}
.myTablegroupList th{
  text-align: left;
  padding: 8px 10px;
}

.myTablegroupList tr {
  border-bottom: 0.1px solid rgb(224, 224, 224);
  &:hover{
    background: #afd1fd;
  }
}

.myTablegroupList tr.header, .myTablegroupList tr:hover {
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
.bg_success{
  background: #a5ffc9;
}
.appleid{
  pointer-events: none;
}
.bg_success_zaxira{
  background: rgb(94, 242, 97);
}
</style>