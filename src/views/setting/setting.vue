<template>
  <div class="setting px-3 mt-5">
    <div class="row">
      <div class="col-3">
          <erpSelect
            :options="all_client_controler.rows"
            @select="selectOption"
            :selected="client_group_name"
            :label="$t('company')"
          />
          <small
            style="position: absolute; top: -7px; left: 20px; font-size: 11px"
            class="bg-white px-2 py-0"
            >{{ $t("client_group") }}</small
          >
        </div>
        <div class="col-3">
          <mdb-btn
            color="success"
            type="submit"
            style="font-size: 10.5px"
            p="r4 l4 t2 b2"
            m="t0 b0"
            @click="save"
          >
            {{ $t("add") }}</mdb-btn
          >
        </div>
    </div>
    <Toast ref="message"></Toast>
  </div>
</template>

<script>
import erpSelect from "../../components/erpSelect.vue";
import {mapActions,mapGetters} from 'vuex'
import { mdbBtn } from "mdbvue";

export default {
components: {
    mdbBtn,
    erpSelect,
  },
  data() {
    return {
      client_group_name: '',
      client_group_id: null,
    }
  },
  mounted(){
    this.fetch_client_controler();
  },
   computed: mapGetters(['all_client_controler']),
  methods: {
    ...mapActions([ 'fetch_client_controler',]),
    selectOption(option){
      this.client_group_name = option.name;
      this.client_group_id = option.id;
      console.log( this.client_group_id)
    },
    async save(){
      try{
          const response = await fetch(this.$store.state.hostname + "/TegirmonClientGroupControler/disableGroupNotPublic?id=" + this.client_group_id);
          const data = await response.text();
          if(response.status == 201 || response.status == 200)
          {
            this.$refs.message.success('Added_successfully')
            // console.log('fire' + i)
          }
          else{
            console.log(data)
            this.$refs.message.success('network_ne_connect')
            
          }
        }
        catch{
          console.log(data)
          this.$refs.message.success('network_ne_connect')
        }
    }
  },

}
</script>

<style>

</style>