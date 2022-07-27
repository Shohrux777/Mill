<template>
  <div>
    <loader v-if="loading"/>
    <div class="border-bottom ">
      <router-link to="/changing">
         <h5 class="m-0 ml-3 d-flex" style="padding: 16px 0px">
           <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left mr-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2.5" stroke="#007BFF" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <polyline points="15 6 9 12 15 18" />
            </svg>
            {{$t('Add_changing')}}</h5>
      </router-link>
     
    </div>
    <div class="changing_add p-5">
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
          <div class="w-25 ml-4 ">
            <erpSelect class=""
              :options="all_product_t.rows"
              @select="selectOptionProduct"
              :selected="product_name"
              :label="$t('client')"
            />
            <small
              v-if="$v.product_name.$dirty && product_id == null"
              class="invalid-text ml-2"
              style="margin-top: 0px;"
            >
              {{ $t("select_item") }}
            </small>
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
                <td
                  style=" font-size: 13px"
                >
                  {{ $t(datasource.columns[4]) }}
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
                    v-model="row.qty_subProduct"
                    type="text"
                    class="form-control form-control-sm"
                  />
                  
                </th>
                <th>
                  <input
                    v-model="row.qty_product"
                    type="text"
                    class="form-control form-control-sm"
                    @input="changePersantage(rowIndex)"
                  />
                  
                </th>

                <th>
                  <input
                    v-model="row.persantage"
                    type="text"
                    class="form-control form-control-sm"
                  />
                  <small
                    class="invalid-text"
                    style="
                      margin: 0;
                      margin-top: 26px;
                      position: relative;
                    "
                    v-if="($v.datasource.rows.$each[rowIndex].persantage.$dirty &&
                        !$v.datasource.rows.$each[rowIndex].persantage.required)
                    "
                  >
                    {{ $t("minValue") }}
                  </small>
                </th>
                <th>
                  <input
                    v-model="row.color"
                    type="checkbox"
                    class="mt-1"
                    style="width: 18px; height: 18px;"
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
import erpSelect from "../../components/erpSelect.vue";
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

      producKg: 1,
      subproducKg: 0,
      percanteg: 0,
      datasource: {
        rows: [],
        // real_time
        columns: [
          "product",
          "qty_subProduct",
          "qty_product",
          "persantage",
          "point"
          
        ],
      },
    }
  },
  components: {
    mdbInput, mdbRow, mdbCol, mdbIcon, mdbBtn,erpSelect, mdbTbl, mdbBtnGroup,
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
          persantage: {  required },
          product_name: { required },
        },
      },
    },
    product_name: {required},
  },
  async created()
  {
    if(this.id > 0)
    {
      const res = await fetch(this.$store.state.hostname + '/TegirmonProductToProductPersentage/' + this.id);
      const data = await res.json();
      console.log('data');
      console.log(data);
      this.product_name = data.product.name;
      this.product_id = data.product.id;
      for(let i=0; i<data.item_list.length; i++){
        this.datasource.rows.push({
          tegirmonProductid: 0,
          product_name: "",
          persantage: 0,
          auth_user_updator_id: 0,
          color: false,
          id: 0,
        });
        if(data.item_list[i].auth_user_updator_id == 1){
          console.log('dasdasdas dsad')
          this.datasource.rows[i].color = true;
        }
        this.datasource.rows[i].tegirmonProductid = data.item_list[i].tegirmonProductid;
        this.datasource.rows[i].product_name = data.item_list[i].sub_product.name;
        this.datasource.rows[i].persantage = data.item_list[i].persantage;
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
      this.name = ''
      this.phone_number = ''
    },
    selectOptionProduct(option){
      this.product_name = option.name;
      this.product_id = option.id;0
    },
    selectproduct(option) {
      console.log(option);
      this.datasource.rows[option.row].product_name = option.data.name;
      this.datasource.rows[option.row].tegirmonProductid = option.data.id;
    },
    changePersantage(index){
      console.log('dasdas')
       this.datasource.rows[index].persantage = parseFloat(this.datasource.rows[index].qty_product/this.datasource.rows[index].qty_subProduct)
    },
    // changeColor(index){
    //   console.log(index)
    //   console.log(this.datasource.rows[index].color)
    //   if(this.datasource.rows[index].color == false){
    //     this.datasource.rows[index].auth_user_updator_id = 1;
    //     console.log('bu true buldi')
    //   }
    //   else{
    //     this.datasource.rows[index].auth_user_updator_id = 0;
    //   }
    // },
     addRow(){
      this.datasource.rows.unshift({
        tegirmonProductid: 0,
        product_name: "",
        persantage: 0,
        qty_subProduct:1,
        qty_product:0,
        auth_user_updator_id: 0,
        color: false,
        id: 0,
      });
      console.log(this.datasource)
    },
    save_data :  async function(){
      for(let i=0; i<this.datasource.rows.length; i++){
        if(this.datasource.rows[i].color == true){
          this.datasource.rows[i].auth_user_updator_id = 1;
        }
        else{
          this.datasource.rows[i].auth_user_updator_id = 0;
        }
      }
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
              "tegirmonProductid" : this.product_id,
              "item_list": this.datasource.rows,
              "id" : this.id,
            })
          };
          try{
            this.loading = true;
            const response = await fetch(this.$store.state.hostname + "/TegirmonProductToProductPersentage", requestOptions);
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
          this.$router.push("/changing");
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