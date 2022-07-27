<template>
  <div>
    <loader v-if="loading"/>
    <div class="border-bottom ">
      <router-link to="/buy">
         <h5 class="m-0 ml-3 d-flex" style="padding: 16px 0px">
           <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left mr-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2.5" stroke="#007BFF" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <polyline points="15 6 9 12 15 18" />
            </svg>
            {{$t('new_buy')}}</h5>
      </router-link>
    </div>
    <div class="changing_add px-3 pt-4 pb-5">
      <div class="row mb-3">
        <div class="col-3">
          <mdb-input class="m-0 p-0" disabled v-model="user_name" size="md"  outline  group type="text" validate error="wrong" success="right"/>
          <small
            style="position: absolute; top: -7px; left: 20px; font-size: 11px"
            class="bg-white px-2 py-0"
            >{{ $t("user_name") }}</small
          >
        </div>
        <div class="col-3">
          <mdb-input class="m-0 p-0" disabled v-model="all_sum" size="md"  outline  group type="text" validate error="wrong" success="right"/>
          <small
            style="position: absolute; top: -7px; left: 20px; font-size: 11px"
            class="bg-white px-2 py-0"
            >{{ $t("summ") }}</small
          >
        </div>
        <div class="col-6">
          <mdb-input class="m-0 p-0" v-model="note" size="md"  outline  group type="text" validate error="wrong" success="right"/>
          <small
            style="position: absolute; top: -7px; left: 20px; font-size: 11px"
            class="bg-white px-2 py-0"
            >{{ $t("note") }}</small
          >
        </div>
      </div>
      <form @submit.prevent="submit">
        <div class="d-flex w-100">
          <div class=" " >
            <mdb-btn
              class="mr-1"
              style="font-size: 12px"
              outline="orange"
              darkWaves
              tag="a"
              floating
              @click="addRow"
              icon="plus"
              size="sm"
              >{{ $t("Add_product") }}</mdb-btn
            >

            <mdb-btn-group style="margin-top: -14px">
              <mdb-dropdown>
                <mdb-btn
                  style="font-size: 12px"
                  outline="primary"
                  darkWaves
                  tag="a"
                  floating
                  icon="bars"
                  size="sm"
                  slot="toggle"
                ></mdb-btn>
                <mdb-dropdown-menu>
                  <mdb-dropdown-item
                    style="font-size: 12px"
                    >{{ $t("") }}</mdb-dropdown-item
                  >
                  <!-- <mdb-dropdown-item style="font-size:12px"  >{{'Export_to_PDF'|locolize}}</mdb-dropdown-item> -->
                </mdb-dropdown-menu>
              </mdb-dropdown>
            </mdb-btn-group>
          </div>
          
        </div>
        
        <div class="d_table">
          <mdb-tbl class="fixed-column">
            <mdb-tbl-head>
              <tr>
                <td></td>
                <!-- product -->
                <td style="width:570px; font-size: 13px">
                  {{ $t(datasource.columns[0]) }}
                </td>
                <td
                  style=" font-size: 13px"
                >
                  {{ $t(datasource.columns[1]) }}
                </td>
                <td
                  style=" font-size: 13px"
                >
                  {{ $t(datasource.columns[2]) }}
                </td>
                <td
                  style=" font-size: 13px"
                >
                  {{ $t(datasource.columns[3]) }}
                </td>
               
                
                <!-- ed_izm -->
              </tr>
            </mdb-tbl-head>
            <mdb-tbl-body>
              <tr
                scope="row"
                v-for="(row, rowIndex) in datasource.rows"
                :key="rowIndex"
      
              >
                <th>
                  <i
                    class="
                      fas
                      fa-trash
                      delIcon
                      mask
                      waves-effect
                      m-0
                      pl-2
                    "
                    @click="datasource.rows.splice(parseInt(rowIndex), 1)"
                  ></i>
                </th>
                <th>
                  <lineSelect
                    :options="all_product_t.rows"
                    :row_index="rowIndex"
                    :searchshow="true"
                    @select="selectproduct"
                    :selected="row.product_name"
                  
                    :label="$t('product')"
                  />
                  <small
                    class="invalid-text"
                    style="
                      margin: 0;
                      margin-top: 26px;
                      position: relative;
                    "
                    v-if="
                      $v.datasource.rows.$each[rowIndex].product_name
                        .$dirty &&
                      !$v.datasource.rows.$each[rowIndex].product_name
                        .required
                    "
                  >
                    {{ $t("Select_product") }}
                  </small>
                </th>

                <th>
                  <input
                    v-model="row.qty"
                    type="text"
                    class="form-control form-control-sm"
                    @input="changeSumma(rowIndex)"
                  />
                  <small
                    class="invalid-text"
                    style="
                      margin: 0;
                      margin-top: 26px;
                      position: relative;
                    "
                    v-if="($v.datasource.rows.$each[rowIndex].qty.$dirty &&
                        !$v.datasource.rows.$each[rowIndex].qty.required)
                    "
                  >
                    {{ $t("minValue") }}
                  </small>
                </th>
                <th>
                  <input
                    v-model="row.price"
                    disabled
                    type="text"
                    class="form-control form-control-sm"
                  />
                </th>
                <th>
                  <input
                    v-model="row.sum"
                    disabled
                    type="text"
                    class="form-control form-control-sm"
                  />
                </th>
                
                
              </tr>
            </mdb-tbl-body>
          </mdb-tbl>
          
        </div>
         
         
        
        <div class="blue-gradient">
          <hr class="mt-5 "/>
        </div>
        <mdb-row class="mt-4">
          <mdb-col col="8">
            <div class="mt-2 text-right">
          
          <mdb-btn color="success"  type="submit" style="font-size: 10.5px"
            p="r4 l4 t2 b2">
            <mdb-icon  />{{$t('add')}}</mdb-btn>
        </div>
          </mdb-col>
        </mdb-row>
        
      </form>
      <massage_box :hide="modal_status" :detail_info="modal_info"
      :m_text="$t('Failed_to_add')" @to_hide_modal="modal_status= false"/>

      <Toast ref="message"></Toast>
    </div>
  </div>
</template>

<script>
import { mdbInput, mdbRow, mdbCol, mdbIcon, mdbBtn,  mdbTbl,
  mdbTblHead,
  mdbTblBody,
   mdbBtnGroup,
  mdbDropdown,
  mdbDropdownItem,
  mdbDropdownMenu,} from "mdbvue"
import { required } from 'vuelidate/lib/validators'
import lineSelect from "../../components/lineSelect.vue";
import {mapActions,mapGetters} from 'vuex'
export default {
  naem: "changingAdd",
  
  data(){
    return{
      modal_info: '',
      modal_status: false,
      loading: false,
      id: this.$route.params.id,
      name: '',
      phone_number: '',

      product_name: '',
      product_id: null,
      subproduct_name: '',
      subproduct_id: null,

      user_name: localStorage.user_name,
      all_sum:0,
      note: '',


      producKg: 1,
      subproducKg: 0,
      percanteg: 0,
      datasource: {
        rows: [],
        // real_time
        columns: [
          "product",
          "kg_ves",
          "price",
          "summ"
        ],
      },
    }
  },
  components: {
    mdbInput, mdbRow, mdbCol, mdbIcon, mdbBtn, mdbTbl, mdbBtnGroup,
  mdbDropdown, lineSelect,
  mdbDropdownItem,
  mdbDropdownMenu,
  mdbTblHead,
  mdbTblBody,
  },
  validations: {
    datasource: {
      rows: {
        $each: {
          qty: {  required },
          product_name: { required },
        },
      },
    },
  },
  async created()
  {
    if(this.id > 0)
    {
      const res = await fetch(this.$store.state.hostname + '/TegirmonInvoice/getAnyInvoiceFullInfoById?invoice_id=' + this.id);
      const data = await res.json();
      console.log('data');
      console.log(data);
      this.user_name = data.user_name;
      this.all_sum = data.summ;
      this.note = data.note;
      for(let i=0; i<data.item_list.length; i++){
        this.datasource.rows.push({
          tegirmonProductid: 0,
          product_name: "",
          qty: 0,
          price: 0,
          sum:0,
          id: 0,
        });

        this.datasource.rows[i].tegirmonProductid = data.item_list[i].tegirmonProductid;
        this.datasource.rows[i].product_name = data.item_list[i].product.name;
        this.datasource.rows[i].price = data.item_list[i].product.price;
        this.datasource.rows[i].qty = data.item_list[i].qty;
        this.datasource.rows[i].sum = data.item_list[i].sum;
        this.datasource.rows[i].id = data.item_list[i].id;  
      }
      console.log(this.datasource.rows)
    }
  },
  async mounted() {
    await this.fetch_product_t();
  },
  computed: mapGetters([ 'allClient', 'all_product_t',]),
  methods:{
    ...mapActions(['fetchClient', 'fetch_product_t']),
    cls_wnd()
    {
      
    },
    selectOptionProduct(option){
      this.product_name = option.name;
      this.product_id = option.id;0
    },
    selectproduct(option) {
      console.log(option);
      this.datasource.rows[option.row].product_name = option.data.name;
      this.datasource.rows[option.row].tegirmonProductid = option.data.id;
      this.datasource.rows[option.row].price = option.data.price;
      // this.datasource.rows[option.row].price = option.data.price;
    },
     addRow(){
      this.datasource.rows.unshift({
        tegirmonProductid: 0,
        product_name: "",
        qty: 0,
        price: 0,
        sum:0,
        id: 0,
      });
      console.log(this.datasource)
    },
    changeSumma(i){
      this.datasource.rows[i].sum = parseFloat(this.datasource.rows[i].price) * parseFloat(this.datasource.rows[i].qty) 
    },
    save_data :  async function(){
        this.all_sum = this.datasource.rows.reduce((total, item)=>total + item.sum, 0)
        console.log(this.all_sum)
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
              // "tegirmonProductid" : this.product_id,
              "summ": this.all_sum,
              "note": this.note,
              "user_name": this.user_name,
              "item_list": this.datasource.rows,
              "id" : this.id,
              "tegirmonAuthid": localStorage.AuthId
            })
          };
          try{
            this.loading = true;
            const response = await fetch(this.$store.state.hostname + "/TegirmonInvoice/addTovarlardiPrixodQilish", requestOptions);
            const data = await response.json();
            console.log('data')
            console.log(data)
            this.loading = false;
            if(response.status == 201 || response.status == 200)
            {
              this.$refs.message.success('Added_successfully')
              return true;
            }
            else{
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
    async submit()
      {
        if(await this.save_data())
        {
          this.$store.state.alert = true;
          this.$router.push("/buy");
        }

      },
  }
}
</script>

<style>
.delIcon:hover {
  color: #000;
}
.delIcon {
  padding-top: 8px;
  color: red;
}
</style>