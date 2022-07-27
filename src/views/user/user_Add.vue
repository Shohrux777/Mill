<template>
  <div>
    <loader v-if="loading"/>
    <div class="border-bottom ">
      <router-link to="/user">
         <h5 class="m-0 ml-3 d-flex" style="padding: 16px 0px">
           <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left mr-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2.5" stroke="#007BFF" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <polyline points="15 6 9 12 15 18" />
            </svg>
            {{$t('Add_user')}}</h5>
      </router-link>
     
    </div>
    <div class="user_add p-5">
      <form @submit.prevent="submit">
        <mdb-row>
          <mdb-col col="3">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('user')}}</p>
          </mdb-col>
          <mdb-col col="5">
            <mdb-input class="m-0 p-0" v-model="name" size="md"  outline  group type="text" validate error="wrong" success="right"/>
            <small class="invalid-text pt-4" style="margin-left:5px; "  v-if="$v.name.$dirty && !$v.name.required" >
              {{$t('name_invalid_text')}}
            </small>
            <small class="p-0" style="margin-left:5px; font-size: 12px; color: gray;"  v-else >
              {{$t('write_user_name_full')}}
            </small>
          </mdb-col>
        </mdb-row> 
         <mdb-row class="mt-4">
          <mdb-col col="3">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('phoneNumber')}}</p>
          </mdb-col>
          <mdb-col col="5">
            <mdb-input class="m-0 p-0" v-model="phoneNumber" placeholder="+998" size="md" outline  group type="text" validate error="wrong" success="right"/>
            <!-- <small class="invalid-text pt-4" style="margin-left:5px; "  v-if="$v.phoneNumber.$dirty && !$v.phoneNumber.required" >
              {{$t('name_invalid_text')}}
            </small>
            <small class="p-0" style="margin-left:5px; font-size: 12px; color: gray;"  v-else >
              {{$t('write_company_name_to_chek')}}
            </small> -->
          </mdb-col>
        </mdb-row>
        <mdb-row class="mt-4">
          <mdb-col col="3">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('address')}}</p>
          </mdb-col>
          <mdb-col col="5">
            <mdb-input class="m-0 p-0" v-model="address" size="md" outline  group type="text" validate error="wrong" success="right"/>

          </mdb-col>
        </mdb-row>
        <!-- <mdb-row>
          <mdb-col col="3">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('login')}}</p>
          </mdb-col>
          <mdb-col col="5"> 
            <mdb-input class="m-0 p-0" v-model="login" size="md"  outline  group type="text" validate error="wrong" success="right"/>
          </mdb-col>
        </mdb-row>
        <mdb-row class="mt-4">
          <mdb-col col="3" >
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('password')}}</p>
          </mdb-col>
          <mdb-col col="5" style="position: relative;">
              <mdb-input class="m-0 p-0" v-model="password" outline size="md"  v-show="!showPass" group type="password"  validate error="wrong" success="right"/>
              <mdb-input class="m-0 p-0" v-model="password" outline size="md"  v-show="showPass" group type="text" validate error="wrong" success="right"/>
                <small class="invalid-text mt-0 ml-2"  v-if="alert_danger" >
                {{$t('invalid_password')}}
                </small>
            <span @click="showPass = !showPass">
              <i class="fas fa-eye" v-show="!showPass" style="position: absolute; top: 12px; right: 25px; cursor: pointer;"></i>
              <i class="fas fa-eye-slash" v-show="showPass" style="position: absolute; top: 12px; right: 25px; cursor: pointer;"></i>
            </span>
          </mdb-col>
        </mdb-row>

        <mdb-row class="mt-4">
          <mdb-col col="3">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('confirm_p')}}</p>
          </mdb-col>
          <mdb-col col="5" style="position: relative;">
              <mdb-input class="m-0 p-0" v-model="password_m" outline size="md"   v-show="!showPasss" group type="password" validate error="wrong" success="right"/>
              <mdb-input class="m-0 p-0" v-model="password_m" outline size="md"   v-show="showPasss" group type="text" validate error="wrong" success="right"/>
                <small class="invalid-text mt-0 ml-2"  v-if="alert_danger" >
                {{$t('invalid_password')}}
                </small>
            <span @click="showPasss = !showPasss">
              <i class="fas fa-eye" v-show="!showPasss" style="position: absolute; top: 12px; right: 25px; cursor: pointer;"></i>
              <i class="fas fa-eye-slash" v-show="showPasss" style="position: absolute; top: 12px; right: 25px; cursor: pointer;"></i>
            </span>
          </mdb-col>
        </mdb-row> -->
        <mdb-row class="mt-4">
          <mdb-col col="3">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('department')}}</p>
          </mdb-col>
          <mdb-col col="5" style="position: relative;">
              <erpSelect
                :options="allDepartment.rows"  
                @select="selectOption"
                :selected="dept_name"
                :label="$t('department')"

              />
              <small v-if="$v.dept_name.$dirty && dept_id == null" class="invalid-text mt-0 ml-2" >
                  {{$t('select_item')}}
                </small>
          </mdb-col>
        </mdb-row>

        <mdb-row class="mt-4">
          <mdb-col col="3">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('born_date')}}</p>
          </mdb-col>
          <mdb-col col="5" style="position: relative; bottom: 20px;">
              <mdb-input type="date" v-model="born_date" outline/>
          </mdb-col>
        </mdb-row>
        
        <mdb-row class="mt-1">
          <mdb-col col="3">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('picture')}}</p>
          </mdb-col>
          <mdb-col col="5" style="position: relative;">
            <div class="d-flex justify-content-start align-items-center">
              <!-- v-show="!PicShow" -->
              <div class="user_img" v-show="!PicShow" style="position: relative;">
                <img  :src="image" id="prewImage" style="height: 150px;" class="img-fluid img-thumbnail img-responsive shadow" alt="">
                <div @click="delImage">
                  <svg xmlns="http://www.w3.org/2000/svg"  class="icon icon-tabler icon-tabler-x border p-1" style="border-radius:50%;
                    position: absolute; top:8px; right: 8px; cursor:pointer;" width="25" height="25" viewBox="0 0 24 24" stroke-width="2.5" stroke="#ff2825" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </div>
              </div>
            </div>
            <input hidden  id="inputFileToLoad" @change="previewFile()" accept="image/png, image/gif, image/jpeg" type="file" ref="file_Img" class="shadow text-right ml-2"  />
              <label for="inputFileToLoad" class="download">
                <span>{{$t('download...')}}</span>
              </label>
          </mdb-col>
        </mdb-row>

                           

        <div class="blue-gradient">
          <hr class="mt-5 "/>
        </div>
        <mdb-row class="mt-4">
          <mdb-col col="8">
            <div class="mt-2 text-right">
          <mdb-btn  @click="submit_continue" color="primary" m="r3" style="font-size: 10.5px"
            p="r4 l4 t2 b2">  {{$t('Add_and_continue')}}
          </mdb-btn>
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
// import md5 from 'js-md5'
import erpSelect from "../../components/erpSelect.vue";
import { mdbInput, mdbRow, mdbCol, mdbIcon, mdbBtn, } from "mdbvue"
import { required } from 'vuelidate/lib/validators'
import {mapActions,mapGetters} from 'vuex'

export default {
  naem: "companyAdd",
  
  data(){
    return{
      modal_info: '',
      modal_status: false,
      loading: false,
      id: this.$route.params.id,

      name: '',
      phoneNumber: '',
      address: '',
      born_date: '',
      showPasss: false,
      showPass: false,
      alert_danger: false,
      PicShow: true,
      base64: '',
      image: '',

      login: '',
      password: '',
      password_m: '',
      emp_number: null,
      md: '',
      md_1: '',
      dept_name: '',
      dept_id: null,
      access_name: '',
      access_id: null,
      AcsessType: [
        {
          id: 0,
          name: 'Aдмин'
        },
        {
          id: 1,
          name: 'Сотрудники'
        }
      ]
    }
  },
  components: {
    mdbInput, mdbRow, mdbCol, mdbIcon, mdbBtn, erpSelect
  },
  validations: {
      name: {
        required
      },
      dept_name : {required},
    },
     props :
    {
      props_name : {
        type : String,
        default : ''
      },
      
    },
    async created()
    {
      if(this.props_name.length > 0)
      {
          this.name = this.props_name; 
          this.id = 0;
          this.PicShow = true;
         return 
      }
      if(this.id > 0)
      {
        const res = await fetch(this.$store.state.hostname + '/TegirmonUser/' + this.id);
        const data = await res.json();
        console.log('this is by id')
        console.log(data)
        this.name = data.fio,
        this.login = data.login,
        this.phoneNumber = data.phone_number,
        this.address = data.address,
        this.dept_id = data.tegirmonDepartmentid,
        this.dept_name = data.department_name,
        this.born_date = data.born_date,
        this.image = this.$store.state.server_ip +  data.image_base_64,
        this.base64 = data.image_base_64,
        this.PicShow = false;
      }

    },
    mounted(){
      this.fetchDepartment();
    },
    computed: mapGetters(['allDepartment']),

  methods:{
    ...mapActions(['fetchDepartment']),
    selectOption(option){
      this.dept_name = option.name
      this.dept_id = option.id
    },
    delImage(){
      this.base64 = ''
      this.PicShow = true
      this.image = ''
    },
    async previewFile(){
      const preview = document.getElementById('prewImage');
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
    cls_wnd()
      {
        this.name = '';
        this.phoneNumber = '';
        this.address = '';
        this.dept_name = '';
        this.dept_id = null;
        this.born_date = '';
        this.base64 = '';
        this.image_base_64 = '';
        this.PicShow = true;
        // this.login = ''
        // this.password = ''
        // this.password_m = ''
        // this.access_name = ''
        // this.access_id = null
        // this.emp_number = null
      },
    save_data :  async function(){
      var img = document.getElementById('prewImage');
        if(img.src.slice(0,4) != 'http'){
          this.base64 = img.src;
        }
        console.log(this.born_date)
        if(this.$v.$invalid)
          {
            this.$v.$touch();
            this.$refs.message.warning('please_fill')
            return false;
          }
        // if(this.password != ''){
        //   this.md = await md5(this.password)
        //   this.md_1 = await md5(this.password_m)
        // }
        // // console.log(this.md)
        // if(this.md_1 !== this.md || this.login == ''){
        //   this.$refs.message.error('Error_password')
        //   this.alert_danger = true;
        //   return
        // }
        else{ 
          this.alert_danger = false;
          const requestOptions = {
              method : "POST",
              headers: { "Content-Type" : "application/json" },
              body: JSON.stringify({
                "fio" : this.name,
                "phone_number": this.phoneNumber,
                "address": this.address,
                "tegirmonDepartmentid": this.dept_id,
                "born_date": this.born_date,
                "image_base_64": this.base64,
                // "image_url": this.image_url,
                // "passport_image_base_64": passport_image_base_64,
                // "passport_image_url": passport_image_url,
                // // "login": this.login,
                // "password": this.md,
                "id" : this.id,
              })
            };
            try{
              this.loading = true;
              const response = await fetch(this.$store.state.hostname + "/TegirmonUser", requestOptions);
              const data = await response.text();
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
        }
    },
    async submit()
      {
        if(await this.save_data())
        {
          this.$store.state.alert = true;
          this.$router.push("/user");
        }

      },
    async submit_continue()
      {
        if(await this.save_data())
        {
          if(this.id != 0){
            this.$router.push('/user_add/0')
            this.cls_wnd();
          }
          else{
            this.cls_wnd();
          }
        }
      },
  }
}
</script>

<style lang="scss">
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
</style>