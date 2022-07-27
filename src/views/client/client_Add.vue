<template>
<div class="px-3">
  <div class="border-bottom ">
    <router-link to="/client">
        <h5 class="m-0 ml-3 d-flex" style="padding: 16px 0px">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left mr-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2.5" stroke="#007BFF" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <polyline points="15 6 9 12 15 18" />
          </svg>
          {{$t('Add_client')}}</h5>
    </router-link>
  </div>
  <div class="row mt-4">
    <div class="col-8">
      <div class="add_davernis p-4">
        <mdb-row>
          <mdb-col col="4">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('fio')}}</p>
          </mdb-col>
          <mdb-col col="8">
            <mdb-input class="m-0 p-0" v-model="name" @input="SearchClientNamePass($event)" size="md"  outline  group type="text" validate error="wrong" success="right"/>
            <small class="invalid-text pt-4" style="margin-left:5px; "  v-if="$v.name.$dirty && !$v.name.required" >
              {{$t('name_invalid_text')}}
            </small>
          </mdb-col>
        </mdb-row>

        <mdb-row class="mt-3">
          <mdb-col col="4">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('phone_number')}}</p>
          </mdb-col>
          <mdb-col col="8">
            <mdb-input class="m-0 p-0" v-model="phone_number" @input="SearchClientNamePass($event)" size="md" outline  group type="text" validate error="wrong" success="right"/>
            <!-- <small class="invalid-text pt-4" style="margin-left:5px; "  v-if="$v.phone_number.$dirty && !$v.phone_number.required" >
              {{$t('name_invalid_text')}}
            </small> -->
            <!-- <small class="p-0" style="margin-left:5px; font-size: 12px; color: gray;"  v-else >
              {{$t('write_company_name_to_chek')}}
            </small> -->
          </mdb-col>
        </mdb-row>
        <mdb-row class="mt-3">
          <mdb-col col="4">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('passport_number')}}</p>
          </mdb-col>
          <mdb-col col="8">
            <mdb-input class="m-0 p-0" v-model="passport_number" @input="SearchClientNamePass($event)" size="md" outline  group type="text" validate error="wrong" success="right"/>
            <small class="invalid-text pt-4" style="margin-left:5px; "  v-if="$v.passport_number.$dirty && !$v.passport_number.required" >
              {{$t('name_invalid_text')}}
            </small>
          </mdb-col>
        </mdb-row>
        <mdb-row class="mt-3">
          <mdb-col col="4">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('address')}}</p>
          </mdb-col>
          <mdb-col col="8">
            <mdb-input class="m-0 p-0" v-model="address" size="md" outline  group type="text" validate error="wrong" success="right"/>
          </mdb-col>
        </mdb-row>
        <mdb-row class="mt-3">
          <mdb-col col="4">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('born_date')}}</p>
          </mdb-col>
          <mdb-col col="8">
            <mdb-input class="m-0 p-0" v-model="born_date" size="md" outline  group type="date" validate error="wrong" success="right"/>
          </mdb-col>
        </mdb-row>
        <mdb-row class="mt-3">
          <mdb-col col="4">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('client_group')}}</p>
          </mdb-col>
          <mdb-col col="8">
             <erpSelect
              :options="all_client_controler.rows"
              @select="selectOption"
              :selected="client_group_name"
              :label="$t('company')"
            />
          </mdb-col>
        </mdb-row>
        <mdb-row class="mt-3">
          <mdb-col col="4">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('picture')}}</p>
          </mdb-col>
          <mdb-col col="8" style="position: relative;">
            <div class="d-flex justify-content-start align-items-center">
              <!-- v-show="!PicShow" -->
              <div class="client_img" v-show="!PicShow" style="position: relative;">
                <img  :src="image" id="prewImageClientAdd" style="height: 150px;" class="img-fluid img-thumbnail img-responsive shadow" alt="">
                <div @click="delImage"> 
                  <svg xmlns="http://www.w3.org/2000/svg"  class="icon icon-tabler icon-tabler-x border p-1" style="border-radius:50%;
                    position: absolute; top:8px; right: 8px; cursor:pointer;" width="25" height="25" viewBox="0 0 24 24" stroke-width="2.5" stroke="#ff2825" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </div>
              </div>
                <img  :src="hostname + photo_url" v-if="photo_url" style="height: 150px;" class="img-fluid img-thumbnail img-responsive shadow" alt="">
            </div>
            <input hidden  id="inputFileToLoad" @change="previewFile()" accept="image/png, image/gif, image/jpeg" type="file" ref="file_Img" class="shadow text-right ml-2"  />
              <div class="d-flex">
                <label for="inputFileToLoad" class="download">
                  <span>Изображение паспорта</span>
                </label>
                  
                  <label @click="showPhoto = true" class="download ml-2">
                    <span>{{$t('photo')}}</span>  
                  </label>
                  
              </div>



          </mdb-col>
        </mdb-row>
        <mdb-row class="mt-3">
            <mdb-col col="4">
              <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('note')}}</p>
            </mdb-col>
            <mdb-col col="8">
              <mdb-input class="m-0 p-0" v-model="note" @input="SearchClientNote($event)" size="md" outline group type="textarea" validate error="wrong" success="right"/>
            </mdb-col>
          </mdb-row>
          <mdb-row class="mt-3">
            <mdb-col col="4">
              <p class="p-0 m-0 mt-2 text-danger" style="font-size: 14px;">{{$t('oshibka')}}</p>
            </mdb-col>
            <mdb-col col="8">
              <input
                v-model="oshibka"
                type="checkbox"
                class="mt-1"
                style="width: 22px; height: 22px;"
              />  
              <!-- <mdb-input class="m-0 p-0" v-model="oshibka"  size="sm" outline group type="checkbox" validate error="wrong" success="right"/> -->
            </mdb-col>
          </mdb-row>
          <div class=" bg-white" style="position:sticky; bottom:0px;">
            <div class="blue-gradient">
              <hr class="mt-5 "/>
            </div>
            <mdb-row class="mt-4 ">
              <mdb-col col="12">
                <div class="mt-2 text-right">
                  <!-- <mdb-btn color="primary" v-if="client_id" @click="next_data" style="font-size: 10.5px"
                    p="r4 l4 t2 b2">
                  <mdb-icon  />Продолжить</mdb-btn> -->
                  <mdb-btn color="success"  @click="save_data" style="font-size: 10.5px"
                    p="r4 l4 t2 b2">
                  <mdb-icon  />{{$t('add')}}</mdb-btn>
                </div>
              </mdb-col>
            </mdb-row>
          </div>
          
          <webcam  v-if="showPhoto" @getPhotosub="takePhoto"/>
        <Toast ref="message"></Toast>
      </div>
    </div>
    <div class="col-4">
      <div class="user_illSendPatient py-1 border-bottom  px-3" v-show="id==0">
        <div  v-for="(item,i) in client_list.rows" :key="i" class="item px-3" 
          @click="getBemorId(i,item)" :class="{'activeUser' : active_bemor == i }">
          <div>
            <div class="d-flex">
              <div class=" user_photo">
                <img src="../../assets/wheat.png" style="height: 45px; overflow: none; " class="img-fluid" alt="">
              </div>
              <div class="px-3">
                <p class="m-0 p-0" >{{item.fio}}</p>
                <p class="m-0 rang" style="font-size:10px;">Год: <span class="px-2">{{item.addiotionala_information}}</span> 
                  Тел: <span class="px-2">{{item.phone_number}}</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  
</template>

<script>
import erpSelect from "../../components/erpSelect.vue";
import {mdbRow, mdbCol, mdbInput, mdbBtn, mdbIcon} from 'mdbvue'
import { required } from 'vuelidate/lib/validators'
import webcam from '../webcam/webcam_Add.vue'
import {mapActions,mapGetters} from 'vuex'
export default {
  components:{
    mdbRow, mdbCol, mdbInput, mdbBtn, mdbIcon, webcam, erpSelect
  },
  validations: {
      name: {required},
      // phone_number: {required},
      passport_number: {required},
      // district_name : {required},
      // clientgroup_name : {required},
    },
  data() {
    return {
      hostname: this.$store.state.server_ip,
      name: '',
      id: this.$route.params.id,
      phone_number: '',
      passport_number: '',
      client_group_name: '',
      client_group_id:null,
      born_date: '',
      address: '',
      note: '',
      active_bemor:'',
      showPhoto: false,
      photo_url: '',
      loading: false,
      client_id : null,
      client_data : {},

      PicShow: true,
      base64: '',
      image: '',
      client_list: {
        rows:[]
      },

      oshibka: false,
      auth_user_updator_id: 0,

    }
  },
  // props:{
  //   client_id: {
  //     type: Number,
  //     default: null,
  //   }
  // },
   computed: mapGetters(['all_district_t', 'all_client_controler', 'allClient']),
  async mounted(){
      // this.fetch_district_t();
      this.fetch_client_controler();
      await this.fetchClient();
      this.client_list = this.allClient;
      this.active_bemor = -1;
    },
  async created()
  {
    if(this.id > 0)
    {
      const res = await fetch(this.$store.state.hostname + '/TegirmonClient/' + this.id);
      const data = await res.json();
      console.log(data)
      this.name = data.fio,
      this.phone_number = data.phone_number,
      this.passport_number = data.passport_number,
      this.district_id = data.tegirmonDepartmentid,
      this.district_name = data.district_name,
      this.clientgroup_id = data.tegirmonClientGroupid,
      this.clientgroup_name = data.clientgroup_name,
      this.photo_url = data.image_url,
      this.base64 = data.image_base_64,
      this.born_date = data.addiotionala_information;
      this.car_number = data.car_number,
      this.address = data.adddress,
      this.note = data.note,
      this.addiotionala_information = data.addiotionala_information,
      this.PicShow = false;
       let preview = document.getElementById('prewImageClientAdd');
      preview.src = data.passport_image_base_64;

      if(data.auth_user_updator_id == 1){
        this.oshibka = true;
      }
      else{
        this.oshibka = false;
      }
    }

  },
  methods: {
    ...mapActions(['fetch_district_t', 'fetch_client_controler', 'fetchClient']),
    delImage(){
      this.base64 = ''
      this.PicShow = true
      this.image = ''
    },
    selectOption(option){
      this.client_group_name = option.name;
      this.client_group_id = option.id;
    },

    async previewFile(){
      const preview = document.getElementById('prewImageClientAdd');
        const file = document.querySelector('input[type=file]').files[0];
        this.PicShow = true;
      var reader = new FileReader();
      reader.addEventListener("load", function () {
        this.image =  reader.result;
        preview.src = reader.result;
      }, true);
      if (file) {
          this.PicShow = false
        reader.readAsDataURL(file);
      }
    },
    takePhoto(img){
      console.log(img)
      this.photo_url = img;
      this.showPhoto = false;
    },
    MountedFunc(){
      this.id = 0;
      this.clv_ws();
      this.active_bemor = -1;
    },
    getBemorId(i, data){
      console.log(data)
      this.client_data = data;
      this.active_bemor = i;
      this.name = data.fio;
      this.id = data.id;
      this.phone_number = data.phone_number;
      this.passport_number = data.passport_number;
      this.address = data.adddress;
      this.note = data.note;
      this.client_id = data.id;
      // this.base64 = '';
      this.born_date = data.addiotionala_information;
      if(data.group){
        this.client_group_name = data.group.name;
        this.client_group_id = data.group.id;
      }
      let preview = document.getElementById('prewImageClientAdd');
      preview.src = data.passport_image_base_64;
      this.photo_url = data.image_url;
    },
    clv_ws(){
      this.name = '';
      this.id = 0;
      this.phone_number = '';
      this.passport_number = '';
      this.address = '';
      this.note = '';
      this.base64 = '';
      this.born_date = '';
      this.client_group_name = '';
      this.client_group_id = null,
      this.image = '';
      this.photo_url = '';
      this.showPhoto = false;
      let preview = document.getElementById('prewImageClientAdd');
      preview.src = '';

    },

    next_data(){
      this.id = 0;
      this.$emit('close_data', this.client_data)
    },


    save_data :  async function(){
      if(this.oshibka == false){
        this.auth_user_updator_id = 0;
      }
      else{
        this.auth_user_updator_id = 1;
      }
      var img = document.getElementById('prewImageClientAdd');
      if(img.src.slice(0,4) != 'http'){
        this.base64 = img.src;
      }
      console.log('this.base64')
      // console.log(this.base64)
      if(this.$v.$invalid)
      {
        this.$v.$touch();
        this.$refs.message.warning('please_fill')
        return false;
      }
      const requestOptions = {
        method : "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify({
          "fio" : this.name,
          "adddress" : this.address,
          "passport_number" : this.passport_number,
          "phone_number": this.phone_number,
          "addiotionala_information": this.born_date,
          "tegirmonClientGroupid" : this.client_group_id,
          "note" : this.note,
          // "tegirmonDistrictid" : this.district_id,
          "image_url": this.photo_url,
          // "passport_image_base_64": passport_image_base_64,
          "passport_image_base_64": this.base64,
          "id" : this.id,
          "auth_user_updator_id": this.auth_user_updator_id
        })
      };
      try{
        this.loading = true;
        const response = await fetch(this.$store.state.hostname + "/TegirmonClient", requestOptions);
        console.log(response)
        this.loading = false;
        if(response.status == 201 || response.status == 200)
        {
        console.log('dasdas')
          const tryjson = await response.json();
          console.log(tryjson)
          this.clv_ws();
          this.$router.push('/client')
          this.$refs.message.success('Added_successfully')
          // console.log('fire' + i)
        }
        else{
          const data = await response.text();
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

    async SearchClientNamePass(search){
      console.log('search')
      console.log(search)
      if(search == ''){
      await this.fetchClient();
      this.client_list = this.allClient;
        return
      }
      // /TegirmonClient/getPaginationSearchByFioOrPassportSerailNumberOrHomeOrMobilePhoneNumber?page=0&size=100&fio_or_serial_number=
      try{
        // this.loading = true;
        const response = await fetch(this.$store.state.hostname + "/TegirmonClient/getPaginationSearchByFioOrPassportSerailNumberOrHomeOrMobilePhoneNumber?page=0&size=100&fio_or_serial_number=" + search);
        const data = await response.json();
        console.log('weqeqw')
        console.log(data)
        // this.loading = false;
        if(response.status == 201 || response.status == 200)
        {
          this.client_list.rows = data.items_list;
          if(data.items_list == 0){
            // this.$refs.message.error('not_client')
          }
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
        this.client_list = this.allClient;
        this.modal_info = this.$i18n.t('network_ne_connect');
        this.modal_status = true;
      }
      
    },
    async SearchClientNote(search){
      console.log('search')
      console.log(search)
      if(search == ''){
      await this.fetchClient();
      this.client_list = this.allClient;
        return
      }
      // /TegirmonClient/getPaginationSearchByFioOrPassportSerailNumberOrHomeOrMobilePhoneNumber?page=0&size=100&fio_or_serial_number=
      try{
        // this.loading = true;
        const response = await fetch(this.$store.state.hostname + "/TegirmonClient/getPaginationByNote?page=0&size=100&note_str=" + search);
        const data = await response.json();
        console.log('weqeqw')
        console.log(data)
        // this.loading = false;
        if(response.status == 201 || response.status == 200)
        {
          this.client_list.rows = data.items_list;
          if(data.items_list == 0){
            // this.$refs.message.error('not_client')
          }
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
        this.client_list = this.allClient;
        this.modal_info = this.$i18n.t('network_ne_connect');
        this.modal_status = true;
      }
      
    },
    async SearchClientBornDate(search){
      console.log('search')
      console.log(search)
      if(search == ''){
      await this.fetchClient();
      this.client_list = this.allClient;
        return
      }
      // /TegirmonClient/getPaginationSearchByFioOrPassportSerailNumberOrHomeOrMobilePhoneNumber?page=0&size=100&fio_or_serial_number=
      try{
        // this.loading = true;
        const response = await fetch(this.$store.state.hostname + "/TegirmonClient/getPaginationByBornDate?page=0&size=100&born_date_str=" + search);
        const data = await response.json();
        console.log('weqeqw')
        console.log(data)
        // this.loading = false;
        if(response.status == 201 || response.status == 200)
        {
          this.client_list.rows = data.items_list;
          if(data.items_list == 0){
            // this.$refs.message.error('not_client')
          }
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
        this.client_list = this.allClient;
        this.modal_info = this.$i18n.t('network_ne_connect');
        this.modal_status = true;
      }
      
    },
  },
}
</script>

<style lang="scss" scoped>
.download{
  width: 35%;
  height: 33px;
  border: 0.5px solid #4285F4;
  border-radius: 4px;
  margin-top: 7px;
  display: flex;
  align-items: center;
  color: gray; 
  font-size: 13px;
  cursor:pointer;
}
.download span{
    margin-left: 10px;
}
.user_illSendPatient{
   overflow: hidden;
  overflow-y: scroll;
  height: 75vh;
  width: 100%;
  // background-color: rgba(32, 32, 32,0.75);
  .item{
      .user_photo{
        background-color: #fff;
          border-radius: 50%;
          width: 45px;
          height: 45px;
          overflow: hidden;
          

        // img{
        //   border-radius: 50%;
        //   overflow: hidden;          
        // }
      }
      width:100%;
      box-shadow: 2px 2px 8px rgb(224, 224, 224), -1px -1px 2px rgb(224, 224, 224);
      height: 62px;
      margin: 5px auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      // background-color: #fff;
      transition: all 0.5s ease-in-out;
      .rang{
        color: rgb(66, 167, 255);
        font-weight: bold;
      }
      &:hover{
        cursor: pointer;
        box-shadow: 2px 2px 5px rgb(224, 224, 224);
        background-color: rgb(215, 242, 255);
        transform: translate(6px, 0px);
        transition: all 0.1s ease-in-out;
      }
    }
  
}
.activeUser{
  cursor: pointer;
  box-shadow: 2px 2px 5px rgb(224, 224, 224);
  background-color: rgb(179, 230, 255);
  transform: translate(6px, 0px);
  transition: all 0.1s ease-in-out;
}
</style>