<template>
  <div>
    <div class="border-bottom d-flex justify-content-between">
      <router-link to="/client">
         <h5 class="m-0 ml-4 d-flex" style="padding: 16px 0px">
            {{$t('client')}}</h5>
      </router-link>
      <div>
         <router-link to="/client_Add/0">
            <mdb-btn color="success mt-3" m="r3" size="sm" p="r4 l4 t2 b2"><mdb-icon icon="plus" class="mr-2"/>{{$t('add')}}</mdb-btn>
          </router-link>
      </div>
    </div>
    <div class="search px-3 pt-3 pb-1 border-bottom">
      <div class="row">
        <div class="col-3">
          <mdb-input
            class="m-0 p-0"
            v-model="client_name"
            @input="SearchClientNamePass($event)"
            size="sm"
            outline
            group
            type="text"
            validate
            error="wrong"
            success="right"
          />
          <small
            style="position: absolute; top: -10px; left: 20px; font-size: 11px"
            class="bg-white px-2 py-0"
            >{{ $t("client") }}</small
          >
        </div>
        <div class="col-3">
          <mdb-input
            class="m-0 p-0"
            v-model="passport_number"
            @input="SearchClientNamePass($event)"
            size="sm"
            outline
            group
            type="text"
            validate
            error="wrong"
            success="right"
          />
          <small
            style="position: absolute; top: -10px; left: 20px; font-size: 11px"
            class="bg-white px-2 py-0"
            >{{ $t("passport_number") }}</small
          >
        </div>
        <div class="col-3">
          <mdb-input
            class="m-0 p-0"
            v-model="phone_number"
            @input="SearchClientBornDate($event)"
            size="sm"
            outline
            group
            type="text"
            validate
            error="wrong"
            success="right"
          />
          <small
            style="position: absolute; top: -10px; left: 20px; font-size: 11px"
            class="bg-white px-2 py-0"
            >{{ $t("born_date") }}</small
          >
        </div>
        <div class="col-3">
          <mdb-input
            class="m-0 p-0"
            v-model="note"
            @input="SearchClientNote($event)"
            size="sm"
            outline
            group
            type="text"
            validate
            error="wrong"
            success="right"
          />
          <small
            style="position: absolute; top: -10px; left: 20px; font-size: 11px"
            class="bg-white px-2 py-0"
            >{{ $t("note") }}</small
          >
        </div>
      </div>
    </div>
    <loaderTable v-if="loading"/>
    <anyTable v-else
      :datasource="client_list"
      @for_delete="for_delete"
      @for_edit="for_edit"
    />
    <massage_box :hide="modal_status" :detail_info="modal_info"
      :m_text="$t('Failed_to_add')" @to_hide_modal="modal_status= false"/>
      <Toast ref="message"></Toast>
  </div>
</template>

<script>
import {
  mdbIcon,
  mdbBtn,mdbInput
} from "mdbvue";
import {mapActions, mapGetters, mapMutations} from 'vuex'
import anyTable from "../../components/clientTable"
export default {
  data(){
    return {
      modal_info: '',
      modal_status: false,
      loading: false,
      auth_id: localStorage.AuthId,
      client_list: {
        rows: [],
        columns: ['fio','adddress','phone_number','passport_number','addiotionala_information','note'],
        col: []
      },
      default_list: {},
      client_name: '',
      client_id: null,
      passport_number: '',
      phone_number: '',
      note: '',
    }
  },
  components: {
    anyTable, mdbIcon,
    mdbBtn, mdbInput
  },
  computed: mapGetters(['allClient']),
  methods: {
    async SearchClientNamePass(search){
      console.log('search')
      console.log(search)
      this.passport_number = '';
      this.phone_number = '';
      this.note="";
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
            this.$refs.message.error('not_client')
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
      this.passport_number = '';
      this.phone_number = '';
      this.client_name= "";
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
            this.$refs.message.error('not_client')
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
      this.passport_number = ' ';
      this.note = '';
      this.client_name= "";
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
            this.$refs.message.error('not_client')
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
    ...mapActions(['fetchClient', ]),
    ...mapMutations(['client_delete_row']),
  
      for_edit(edit_data)
      {
        this.$router.push("/client_add/" + edit_data.id);
      },
      async for_delete(del_data,index)
      {
         const requestOptions = {
            method : "delete",
          };
          const response = await fetch(this.$store.state.hostname + "/TegirmonClient/" + del_data.id, requestOptions);
          const data = await response.text();

          if(response.status == 201 || response.status == 200)
          {
            this.$refs.message.success('Successfully_removed')
            this.alert_success = true;
            this.client_delete_row(index);
          }
          else{
            this.modal_info = data;
            this.modal_status = true;
          }
      },
  },
  async mounted(){
    this.loading = true;
    await this.fetchClient();
    this.client_list = this.allClient;
    this.loading = false;
    console.log(this.allClient)
    if(this.$store.state.alert){
      this.$refs.message.success('Added_successfully')
      this.$store.state.alert = false
    }
  }
}
</script>

<style>

</style>