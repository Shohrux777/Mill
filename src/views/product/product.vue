<template>
  <div>
    <div class="border-bottom d-flex justify-content-between">
      <router-link to="/product">
         <h5 class="m-0 ml-4 d-flex" style="padding: 16px 0px">
            {{$t('product')}}</h5>
      </router-link>
      <div>
         <router-link to="/product_Add/0">
            <mdb-btn color="success mt-3" m="r3" size="sm" p="r4 l4 t2 b2"><mdb-icon icon="plus" class="mr-2"/>{{$t('add')}}</mdb-btn>
          </router-link>
      </div>
     
    </div>
    <div class="row px-4">
      <div class="col-4 mt-3">
        <div style="position: relative; margin-top:0px;" class="m-0 p-0"> 
          <small class="bg-white" style="position: absolute; z-index:1; left:10px; top: -10px; color: #757575;">
            {{$t('search_here')}}
          </small>
          <mdb-input type="text" size="sm" class="m-0 p-0" @input="searchClick" v-model="search" outline/>
        </div>
      </div>
    </div>
    <loaderTable v-if="loading"/>
    <anyTable v-else
      :datasource="product_list"
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
  mdbBtn,
  mdbInput
} from "mdbvue";
import {mapActions, mapGetters, mapMutations} from 'vuex'
import anyTable from "../../components/anyTable"
export default {
  data(){
    return {
      modal_info: '',
      search: '',
      modal_status: false,
      loading: false,
      auth_id: localStorage.AuthId,
      product_list: {
        rows: [],
        columns: ['name','price','code'],
        col: []
      }
    }
  },
  components: {
    anyTable, mdbIcon,
    mdbBtn,mdbInput
  },
  computed: mapGetters(['all_product_t']),
  methods: {
    ...mapActions(['fetch_product_t', ]),
    ...mapMutations(['product_t_delete_row']),
  
      for_edit(edit_data)
      {
        this.$router.push("/product_add/" + edit_data.id);
      },
      async for_delete(del_data,index)
      {
         const requestOptions = {
            method : "delete",
          };
          const response = await fetch(this.$store.state.hostname + "/TegirmonProduct/" + del_data.id, requestOptions);
          const data = await response.text();

          if(response.status == 201 || response.status == 200)
          {
            this.$refs.message.success('Successfully_removed')
            this.alert_success = true;
            this.product_t_delete_row(index);
          }
          else{
            this.modal_info = data;
            this.modal_status = true;
          }
      },
      searchClick(){
        this.product_list.rows = this.all_product_t.rows;
          this.loading = true;
          if(this.search != ''){
            let userSearchList = [];
            for(let i=0; i<this.product_list.rows.length;i++){
              console.log(this.product_list.rows[i].name)
              if(this.product_list.rows[i].name.toLowerCase().includes(this.search.toLowerCase()) || this.product_list.rows[i].price.toString().includes(this.search.toLowerCase()) || this.product_list.rows[i].code.toLowerCase().includes(this.search.toLowerCase())){
                userSearchList.push(this.product_list.rows[i])
              }
            }
            this.product_list.rows = userSearchList;
          }
          else{
            this.product_list.rows = this.all_product_t.rows;
          }
          this.loading = false;
      }
  },
  async mounted(){
    this.loading = true;
    await this.fetch_product_t();
    this.product_list.rows = this.all_product_t.rows;
    this.loading = false;
    if(this.$store.state.alert){
      this.$refs.message.success('Added_successfully')
      this.$store.state.alert = false
    }
  }
}
</script>

<style>

</style>