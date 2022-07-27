<template>
  <div class="rasxod_list_add p-4">
    <loader v-if="loading"/>
    <div v-else class="row">
      <div class="col-12 mt-3">
        <mdb-input class="m-0 p-0" v-model="rasxod"  outline group type="input" validate error="wrong" success="right"/>
        <small
          style="position: absolute; top: -7px; left: 20px; font-size: 11px"
          class="bg-white px-2 py-0"
          >{{ $t("price") }}</small>
           <small class="invalid-text pt-4" style="margin-left:5px; "  v-if="$v.rasxod.$dirty && !$v.rasxod.required" >
              {{$t('name_invalid_text')}}
            </small>
      </div>
      <div class="col-12 mt-3">
        <mdb-input class="m-0 p-0" v-model="note"  outline group type="textarea" validate error="wrong" success="right"/>
        <small
          style="position: absolute; top: -7px; left: 20px; font-size: 11px"
          class="bg-white px-2 py-0"
          >{{ $t("reason") }}</small>
          <small class="invalid-text pt-4" style="margin-left:5px; "  v-if="$v.note.$dirty && !$v.note.required" >
              {{$t('name_invalid_text')}}
            </small>
      </div>
      <div class="col-12 mt-3 text-right">
        <mdb-btn   @click="saveRasxod()" color="success" m="r2" style="font-size: 9.5px"
          p="r3 l3 t2 b2"> <mdb-icon fas class="mr-1"  icon="plus"></mdb-icon>  {{$t('save')}}
        </mdb-btn>
      </div>
    </div>
    <massage_box :hide="modal_status" :detail_info="modal_info"
      :m_text="$t('Failed_to_add')" @to_hide_modal="modal_status= false"/>
      <Toast ref="message"></Toast>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import {mdbInput, mdbBtn, mdbIcon } from 'mdbvue'
export default {
  components: {
    mdbInput, mdbBtn,mdbIcon,
  },
  data() {
    return {
      modal_info: '',
      modal_status: false,
      loading: false,

      rasxod: 0,
      note: '',
    }
  },
  validations: {
    rasxod: {
      required
    },
    note: {
      required
    }
  },
  
  methods: {
    clw_rw(){
      this.rasxod = 0;
      this.note = '';
    },
    async saveRasxod(){
       if(this.$v.$invalid )
        {
          this.$v.$touch();
          this.$refs.message.warning('please_fill')
          return false;
        }
      console.log('dadas')
      const requestOptions = {
        method : "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify({
          "tegirmonAuthid": localStorage.AuthId,
          "uz_card" : this.rasxod,
          "image_base_64": this.note
          // "uz_card": 0,     for skidka uchun ishlataman
        })
      };
      console.log('requestOptions.body')
      console.log(requestOptions.body)
      try{
        this.loading = true;
        const response = await fetch(this.$store.state.hostname + "/TegirmonCheck", requestOptions);
        // const data = await response.json();
        console.log(response)
        if(response.status == 201 || response.status == 200)
        {
          this.clw_rw();
          this.$emit('close');
          this.loading = false;
          return true;
        }
        else{
          this.modal_info = this.$i18n.t('network_ne_connect');
          this.modal_status = true;
          this.loading = false;
          return false;
        }
      }
      catch{
        this.loading = false;
        this.modal_info = this.$i18n.t('network_ne_connect');
        this.modal_status = true;
        return false;
      }
      
    }
  },
}
</script>

<style>

</style>