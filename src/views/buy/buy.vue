<template>
  <div>
    <div class="border-bottom d-flex justify-content-between">
      <router-link to="/buy">
         <h5 class="m-0 ml-4 d-flex" style="padding: 16px 0px">
            {{$t('buy')}}</h5>
      </router-link>
      <div>
         <router-link to="/buy_add/0">
            <mdb-btn color="success mt-3" m="r3" size="sm" p="r4 l4 t2 b2"><mdb-icon icon="plus" class="mr-2"/>{{$t('add')}}</mdb-btn>
          </router-link>
      </div>
     
    </div>
    <loaderTable v-if="loading"/>
    <anyTable v-else
      :datasource="m_buy"
      @for_delete="for_delete"
      @for_edit="for_edit"
      :buy_prixod="buy_prixod"
      @accept="acceptId"
      @showItem="showItem"
      @page="page"
      @size="size"
    />
    <modal-train  :show="item_status" headerbackColor="white"  titlecolor="black" :title="$t('show_davernis')" 
        @close="item_status = false" width="85%">
          <template v-slot:body>
            <div class="TablePatientDocId p-3">
              <table class="myTable">
                <thead>
                  <tr class="header ">
                    <th  width="40" class="text-left">№</th>
                    <th >{{$t('product')}}</th>
                    <th >{{$t('qty')}}</th>
                    <th >{{$t('price')}}</th>
                    <th >{{$t('summ')}}</th>
                    <th >{{$t('date')}}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row,rowIndex) in invoice_item_list" :key="rowIndex">
                    <td> <small style="font-size: 12.5px;">{{rowIndex+1}}</small> </td>
                    <td> <small style="font-size: 12.5px;">{{row.product.name}}</small> </td>
                    <td> <small style="font-size: 12.5px;">{{row.qty}}</small> </td>
                    <td> <small style="font-size: 12.5px;">{{row.product.price}}</small> </td> 
                    <td> <small style="font-size: 12.5px;">{{row.sum}}</small> </td> 
                    <td> <small style="font-size: 12.5px;">{{row.updated_date_time}}</small> </td> 
                  </tr>
                </tbody>
              </table>
            </div>
          </template>
      </modal-train>
    <massage_box :hide="modal_status" :detail_info="modal_info"
      :m_text="$t('Failed_to_add')" @to_hide_modal="modal_status= false"/>
      <Toast ref="message"></Toast>
  </div>
</template>

<script>
import {
  mdbIcon,
  mdbBtn,
} from "mdbvue";
import {mapActions, mapGetters, mapMutations} from 'vuex'
import anyTable from "../../components/erpTable"
export default {
  data(){
    return {
      modal_info: '',
      modal_status: false,
      loading: false,
      auth_id: localStorage.AuthId,
      buy_prixod: true,
      item_status: false,
      invoice_item_list: [],
      m_buy: {
          rows: [],
          columns: ['user_name', 'summ','note', 'created_date_time'],
          col: []
      },
    }
  },
  components: {
    anyTable, mdbIcon,
    mdbBtn,
  },
  computed: mapGetters(['allBuy', 'get_pagination']),
  methods: {
    ...mapActions(['fetchBuy', ]),
    ...mapMutations(['buy_delete_row', 'update_pagination_first']),
  
      for_edit(edit_data)
      {
        this.$router.push("/buy_add/" + edit_data.id);
      },
      async for_delete(del_data,index)
      {
         const requestOptions = {
            method : "delete",
          };
          const response = await fetch(this.$store.state.hostname + "/TegirmonInvoice/" + del_data.id, requestOptions);
          const data = await response.text();

          if(response.status == 201 || response.status == 200)
          {
            this.$refs.message.success('Successfully_removed')
            this.alert_success = true;
            this.buy_delete_row(index);
          }
          else{
            this.modal_info = data;
            this.modal_status = true;
          }
      },
      async acceptId(id){
        console.log(id)
        try{
          const response = await fetch(this.$store.state.hostname + "/TegirmonInvoice/acceptTovarlardiPrixodQilish?id=" + id);
          const data = await response.text();
          if(response.status == 201 || response.status == 200)
          {
            await this.refresh();
            this.$refs.message.success('Successfully_removed')
          }
          else{
            this.modal_info = data;
            this.modal_status = true;
          }
        }
        catch{
          this.modal_info = this.$i18n.t('network_ne_connect'); 
          this.modal_status = true;
        }
      },
      async showItem(id){
        try{
          const response = await fetch(this.$store.state.hostname + "/TegirmonInvoice/getAnyInvoiceFullInfoById?invoice_id=" + id);
          if(response.status == 201 || response.status == 200)
          {
            const data = await response.json();
            this.invoice_item_list = data.item_list;
            console.log('id 123')
            console.log(data.item_list)
            this.$refs.message.success('Successfully_removed')
          }
          else{
            const data = await response.text();
            this.modal_info = data;
            this.modal_status = true;
          }
        }
        catch{
          this.modal_info = this.$i18n.t('network_ne_connect'); 
          this.modal_status = true;
        }
        this.item_status = true;
      },
      page(){
        this.refresh();
      },
      size(){
        this.refresh();
      },
      async refresh(){
        const res = await fetch(this.$store.state.hostname + '/TegirmonInvoice/getPaginationBugdoyPrixodQilinganTovarlarListiVaqtsz?page=' + this.get_pagination.page + '&size=' + this.get_pagination.size);
        const res_data = await res.json();
        // await this.update_column();
        this.update_pagination_first({current_item_count: res_data.current_item_count, current_page: res_data.current_page+1, items_count: res_data.items_count});
        this.m_buy.rows = res_data.items_list;
        this.loading = false;
      }
  },
  async mounted(){
    this.loading = true;
    // await this.fetchBuy();
    await this.refresh();
    this.loading = false;
    if(this.$store.state.alert){
      this.$refs.message.success('Added_successfully')
      this.$store.state.alert = false
    }
  }
}
</script>

<style lang="scss">
.TablePatientDocId{
    height: 400px;
    overflow: hidden;
    overflow-y: auto;
    // border: 1px solid #ddd;
  }
  .myTable {
  /* border-collapse: collapse; */
  table-layout:fixed;
  width: 100%;
  overflow: hidden;
  // border: 1px solid #ddd;
  font-size: 18px;
  max-height:80px; overflow-x:auto
}
.myTable th{
  font-weight: 600;
  font-size:12px;
}
.myTable td{
  font-size:13px;
}
.myTable th, .myTable td {
  text-align: left;
  padding: 10px;
}

.myTable tr {
  border-bottom: 1px solid rgb(240, 240, 240);
}

.myTable tr.header, .myTable tr:hover {
  // background-color: #f1f1f1;
}
.delIcon{
  color: rgb(251, 70, 70);
  font-size: 13px;
}
</style>