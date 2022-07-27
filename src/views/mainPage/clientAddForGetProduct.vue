<template>
  <div >
    <div class="getProduct mx-3 mt-4">

      <div
        v-show="datarows.length > 0"
        class="AddClient pt-2 pb-2 px-2 mt-4 rounded"
        style="border: 0.1px solid green; position: relative"
      >
        <div class="row pb-2 mt-3" v-for="(item, i) in datarows" :key="i" style="position:relative;">
          <svg xmlns="http://www.w3.org/2000/svg" @click="datarows.splice(i,1)"
            style="position:absolute; top:-22px; right:10px; cursor:pointer;" 
            class="icon icon-tabler icon-tabler-x" width="20" height="20" viewBox="0 0 24 24" 
            stroke-width="1.5" stroke="#ff2825" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
          <div class="col-3" @click="tabGetIndex(i)" style="position:relative;">
            <mdb-input
              class="m-0 p-0"
              v-model="item.client_name"
              size="md"
              outline
              group
              type="text"
              validate
              error="wrong"
              success="right"
              @click="EnterSearch(i)"
              @input="searchUrl(i)"
            />
            <small
              style="position: absolute; top: -7px; left: 20px; font-size: 11px"
              class="bg-white px-2 py-0"
              >{{ $t("client_name") }}</small
            >

            <small
              class="invalid-text "
              style="margin-left: 5px; margin-top:-7px;"
              v-if="$v.datarows.$each[i].client_name.$dirty && !$v.datarows.$each[i].client_name.required"
            >
              {{ $t("name_invalid_text") }}
            </small>


            <div v-if="item.client_show" 
              style="position:absolute; top:40px; left:0px; width:100%; z-index: 111555; background: white;" 
              class="border  down_list shadow rounded py-2 ">
              <div >
                <p @click="selectClientSearch(user, i)" class="m-0 px-2 py-1 bg_hover" style="font-size: 14px;" v-for="(user,i) in search_info " :key="i">{{user.fio}}</p>
              </div>
            </div>
          </div>

              
          <div class="col-3" @click="tabGetIndex(i)">
            <mdb-input
              class="m-0 p-0"
              v-model="item.passport_number"
              size="md"
              outline
              group
              type="text"
              validate
              error="wrong"
              success="right"
              @click="EnterSearchPassword(i)"
              @input="searchUrlPassword(i)"

            />
            <small
              style="position: absolute; top: -7px; left: 20px; font-size: 11px"
              class="bg-white px-2 py-0"
              >{{ $t("passport_number") }}</small
            >

            <small
              class="invalid-text "
              style="margin-left: 5px; margin-top:-7px;"
              v-if="$v.datarows.$each[i].passport_number.$dirty && !$v.datarows.$each[i].passport_number.required"
            >
              {{ $t("name_invalid_text") }}
            </small>

            <div v-if="item.client_password" 
              style="position:absolute; top:40px; left:0px; width:100%; z-index: 111555; background: white;" 
              class="border  down_list1 shadow rounded py-2 ">
              <div >
                <p @click="selectClientSearch(user, i)" class="m-0 px-2 py-1 bg_hover" style="font-size: 14px;" v-for="(user,i) in search_info " :key="i">{{user.fio}}</p>
              </div>
            </div>
            
          </div>
          <div class="col-3" @click="SelectClientGroupINdex(i)">
            <erpSelectAdd
              :options="all_client_controler.rows"
              @select="selectOption"
              :selected="item.client_group_name"
              :label="$t('company')"
              @addTag="addGroupclient"
            />
            <small
              style="position: absolute; top: -7px; left: 20px; font-size: 11px"
              class="bg-white px-2 py-0"
              >{{ $t("client_group") }}</small
            >
          </div>

          <div class="col-3">
            <mdb-input
              class="m-0 p-0"
              v-model="item.phoneNumber"
              @click="tabGetIndex(i)"
              size="md"
              outline
              group
              type="text"
              validate
              error="wrong"
              success="right"
            />
            <small
              style="position: absolute; top: -7px; left: 20px; font-size: 11px"
              class="bg-white px-2 py-0"
              >{{ $t("phoneNumber") }}</small
            >

            <!-- <small
              class="invalid-text pt-4"
              style="margin-left: 5px"
              v-if="$v.name.$dirty && !$v.name.required"
            >
              {{ $t("name_invalid_text") }}
            </small> -->
          </div>

          <div class="col-3 mt-3" @click="GetIndexForDistrict(i)">
                <erpSelectAdd
                  :options="all_district_t.rows"  
                  @select="selectOptionDistrict"
                  :selected="item.district_name"
                  :label="$t('district')"

                />
                <small v-if="$v.datarows.$each[i].district_name.$dirty && item.district_id == null" class="invalid-text  ml-2"
                style=" margin-top:-7px;" >
                  {{$t('select_item')}}
                </small>
                <small
              style="position: absolute; top: -7px; left: 20px; font-size: 11px"
              class="bg-white px-2 py-0"
              >{{ $t("district") }}</small
            >

            <!-- <small
              class="invalid-text pt-4"
              style="margin-left: 5px"
              v-if="$v.address.$dirty && !$v.address.required"
            >
              {{ $t("name_invalid_text") }}
            </small> -->
          </div>

          <div class="col-3 mt-3">
            <mdb-input
              class="m-0 p-0"
              v-model="item.address"
              size="md"
              outline
              group
              type="text"
              validate
              error="wrong"
              success="right"
            />
            <small
              style="position: absolute; top: -7px; left: 20px; font-size: 11px"
              class="bg-white px-2 py-0"
              >{{ $t("address") }}</small
            >

            <!-- <small
              class="invalid-text pt-4"
              style="margin-left: 5px"
              v-if="$v.address.$dirty && !$v.address.required"
            >
              {{ $t("name_invalid_text") }}
            </small> -->
          </div>
          <div class="col-3 mt-3">
            <mdb-input
              class="m-0 p-0"
              v-model="item.date"
              size="md"
              outline
              group
              type="date"
              validate
              error="wrong"
              success="right"
            />
            <small
              style="position: absolute; top: -7px; left: 20px; font-size: 11px"
              class="bg-white px-2 py-0"
              >{{ $t("born_date") }}</small
            >

            <!-- <small
              class="invalid-text pt-4"
              style="margin-left: 5px"
              v-if="$v.address.$dirty && !$v.address.required"
            >
              {{ $t("name_invalid_text") }}
            </small> -->
          </div>

          <div class="col-3 mt-3">
            <mdb-input
              class="m-0 p-0"
              v-model="item.note"
              size="md"
              outline
              group
              type="text"
              validate
              error="wrong"
              success="right"
            />
            <small
              style="position: absolute; top: -7px; left: 20px; font-size: 11px"
              class="bg-white px-2 py-0"
              >{{ $t("note") }}</small
            >

            <!-- <small
              class="invalid-text pt-4"
              style="margin-left: 5px"
              v-if="$v.name.$dirty && !$v.name.required"
            >
              {{ $t("name_invalid_text") }}
            </small> -->
          </div>

          <div class="col-12 d-flex mt-3 justify-content-center">
            <div class="border-bottom w-100"></div>
          </div>
        </div>

        <div
          @click="addClient"
          class="
            circle
            d-flex
            align-items-center
            justify-content-center
            bg-primary
            text-white
          "
          style="
            width: 35px;
            height: 35px;
            border-radius: 50%;
            position: absolute;
            bottom: 45px;
            left: 25px;
            cursor: pointer;
          "
        >
          +
        </div>
        <div class="d-flex justify-content-end mt-3">
          <mdb-btn
            color="success"
            type="submit"
            style="font-size: 10.5px"
            p="r4 l4 t2 b2"
            m="t0 b0"
            @click="saveClient"
          >
            {{ $t("add") }}</mdb-btn
          >
        </div>
      </div>

     
    </div>
     <massage_box :hide="modal_status" :detail_info="modal_info"
        :m_text="$t('Failed_to_add')" @to_hide_modal="modal_status= false"/>

      <Toast ref="message"></Toast>
  </div>
</template>

<script>
import { mdbInput, mdbBtn } from "mdbvue";
import erpSelect from "../../components/erpSelect.vue";
import erpSelectAdd from "../../components/erpSelectAdd.vue";
import { required } from "vuelidate/lib/validators";
import {mapActions,mapGetters} from 'vuex'

export default {
  data() {
    return {
      name_search: false,
      passport_search: false,
      num:0,
      num1: 0,
      search_info: [],
      search_client_index: null,

      modal_info: "",
      modal_status: false,
      loading: false,
      id: this.$route.params.id,
      
      name: "",
      showPage: false,
      comp_name: "",
      comp_id: null,
      user_name: "",
      user_id: null,
      kg_ves: '',
      indexDis: -1,
      indexClintGroup: -1,
      allUsers: [
        {
          name: "Hamdamov Bahodir",
          id: 1,
        },
        {
          name: "Hamdamov Yunus",
          id: 2,
        },
      ],
      allProduct: [
        {
          name: "Bugdoy",
          id: 1,
        },
        {
          name: "Un",
          id: 2,
        },
      ],
      datarows: [],
    };
  },
  components: {
    mdbInput,
    mdbBtn,
    erpSelect,
    erpSelectAdd,
  },
  validations: {
   
    datarows: {
      $each : {
        district_name: {required},
        client_name: {required},
        passport_number: {required},

      }
    }

  },
  mounted(){
      this.fetch_district_t();
      this.fetch_client_controler();
    },
   computed: mapGetters(['all_district_t', 'all_client_controler']),
  methods: {
    ...mapActions(['fetch_district_t', 'fetch_client_controler', 'fetchClient']),
    EnterSearch(i){
      this.search_client_index = i;
      for(let j=0; j<this.datarows.length; j++){
          this.datarows[j].client_password = false;
        if(j==i){
          this.datarows[j].client_show = true;
        }
        else{
          this.datarows[j].client_show = false;
        }
      }
      this.datarows[i].client_show = true;
      this.num = 0;
      document.addEventListener("click", this.add_fun);
    },
    add_fun (e){
      if(this.num!=0){
        if(e.target.closest(".down_list")) return
        this.datarows[this.search_client_index].client_show = false;
        document.removeEventListener("click", this.add_fun)
      }
      this.num++
    },

    async searchUrl(i){
      this.search_client_index = i;
        console.log(this.datarows[i].client_name)
      try{
        const response = await fetch(this.$store.state.hostname + '/TegirmonClient/getPaginationSearchByFioOrPassportSerailNumberOrHomeOrMobilePhoneNumber?page=0&size=100&fio_or_serial_number=' + this.datarows[i].client_name);
        const data = await response.json();
        console.log(data);
        this.search_info = data.items_list
      }
      catch{
        console.log('oshibka')
      }
    },
    selectClientSearch(option, i){
      console.log(option, i)
      this.$emit('select', option)
      this.datarows[i].client_show = false;
      this.datarows[i].client_password = false;
    },
    // ---> Search with name <---


    EnterSearchPassword(i){
      this.search_client_index = i;
      for(let j=0; j<this.datarows.length; j++){
        this.datarows[j].client_show = false;
        if(j==i){
          this.datarows[j].client_password = true;
        }
        else{
          this.datarows[j].client_password = false;
        }
      }
      this.datarows[i].client_password = true;
      this.num1 = 0;
      document.addEventListener("click", this.add_fun1);
    },
    add_fun1 (e){
      if(this.num1!=0){
        if(e.target.closest(".down_list1")) return
        this.datarows[this.search_client_index].client_password = false;
        document.removeEventListener("click", this.add_fun1)
      }
      this.num1++
    },
    async searchUrlPassword(i){
      this.search_client_index = i;
        console.log(this.datarows[i].passport_number)
      try{
        const response = await fetch(this.$store.state.hostname + '/TegirmonClient/getPaginationSearchByFioOrPassportSerailNumberOrHomeOrMobilePhoneNumber?page=0&size=100&fio_or_serial_number=' + this.datarows[i].passport_number);
        const data = await response.json();
        console.log(data);
        this.search_info = data.items_list
      }
      catch{
        console.log('oshibka')
      }
    },

    
    tabGetIndex(i){
      this.indexClintGroup = i;
      this.indexDis = i;
      console.log('i' +  i + 'hiyyy')
    },
    SelectClientGroupINdex(i){
      this.indexClintGroup = i;
    },
    selectOption(option) {
      console.log(option)
      this.datarows[this.indexClintGroup].client_group_name = option.name;
      this.datarows[this.indexClintGroup].client_group_id = option.id;
    },
    GetIndexForDistrict(i){
      this.indexDis = i;
    },
    selectOptionDistrict(option){
      console.log(this.indexDis);
      console.log(option);
      this.datarows[this.indexDis].district_name = option.name;
      this.datarows[this.indexDis].district_id = option.id;
    },
    openClientAdd(){
      this.showPage = true;
      this.addClient();
    },
    

    addClient() {
      console.log('add')
      var a = {
        client_name: '',
        passport_number: '',
        client_group_name: '',
        client_group_id: null,
        phoneNumber: '',
        date: '',
        note: '',
        address: '',
        district_name: '',
        district_id: null,
        client_show: false,
        client_password: false,
      };
      this.datarows.push(a);
    },
    async saveClient(){
      if(this.$v.$invalid)
      {
        this.$v.$touch();
        this.$refs.message.warning('please_fill')
        return false;
      }
      for(let i=0; i<this.datarows.length; i++){
        const requestOptions = {
          method : "POST",
          headers: { "Content-Type" : "application/json" },
          body: JSON.stringify({
            "fio" : this.datarows[i].client_name,
            "adddress" : this.datarows[i].address,
            "passport_number" : this.datarows[i].passport_number,
            "phone_number": this.datarows[i].phoneNumber,
            "addiotionala_information": this.datarows[i].date,
            "tegirmonClientGroupid" : this.datarows[i].client_group_id,
            "tegirmonDistrictid" : this.datarows[i].district_id,
            "note" : this.datarows[i].note,
            // "image_url": image_url,
            // "passport_image_base_64": passport_image_base_64,
            // "passport_image_url": passport_image_url,
            "id" : 0,
          })
        };
        try{
          this.loading = true;
          const response = await fetch(this.$store.state.hostname + "/TegirmonClient", requestOptions);
          const data = await response.text();
          this.loading = false;
          if(response.status == 201 || response.status == 200)
          {
            this.$refs.message.success('Added_successfully')
            // console.log('fire' + i)
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

      }
        this.datarows= []
        await this.fetchClient()
    },

    async addGroupclient(data){
      const requestOptions = {
        method : "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify({
          "name" : data,
          "id" : this.id,
        })
      };
      try{
        this.loading = true;
        const response = await fetch(this.$store.state.hostname + "/TegirmonClientGroupControler", requestOptions);
        const data = await response.text();
        this.loading = false;
        if(response.status == 201 || response.status == 200)
        {
          this.fetch_client_controler();
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
    }
  },
};
</script>

<style lang="scss" scoped>
.bg_hover:hover{
  background: rgb(187, 219, 255);
}
.down_list, .down_list1{
  max-height: 400px;
  overflow: hidden;
  overflow-y: scroll;
}
</style>