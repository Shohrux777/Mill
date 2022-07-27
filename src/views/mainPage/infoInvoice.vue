<template>
  <div class="info_davernost p-4" v-if="option">
    <div class="row mt-2">
      <div class="col-3">
        <p class="p-0 m-0 mt-2" style="font-size: 14px;">Забрал клиента</p>
      </div>
      <div class="col-9 border-bottom">
        <p class="p-0 m-0 mt-2 text-danger" style="font-size: 14px;">{{option.user_name}}</p>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-3">
        <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('product')}}</p>
      </div>
      <div class="col-9 border-bottom">
        <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{option.product.name}}</p>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-3">
        <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('qty')}}</p>
      </div>
      <div class="col-9 border-bottom">
        <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{option.qty_real.toFixed(1)}}</p>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-3">
        <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('summ')}}</p>
      </div>
      <div class="col-9 border-bottom">
        <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{option.summ}}</p>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-3">
        <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('date')}}</p>
      </div>
      <div class="col-9 border-bottom">
        <p class="p-0 m-0 mt-2" style="font-size: 14px;"><span >{{option.updated_date_time.slice(0,10)}}</span> <span class="ml-2">{{option.updated_date_time.slice(11,16)}}</span></p>
      </div>
    </div>
     <div class="row mt-2">
      <div class="col-3">
        <p class="p-0 m-0 mt-2" style="font-size: 14px;">Кассир</p>
      </div>
      <div class="col-9 border-bottom">
        <p class="p-0 m-0 mt-2 text-success" style="font-size: 14px;">{{option.auth.user.fio}}</p>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-3">
        <p class="p-0 m-0 mt-2" style="font-size: 14px;">Основной клиент</p>
      </div>
      <div class="col-9 border-bottom">
        <p class="p-0 m-0 mt-2 text-danger" style="font-size: 14px;">{{option.client.fio}}</p>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-3">
        <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('phone_number')}}</p>
      </div>
      <div class="col-9 border-bottom">
        <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{option.client.phone_number}}</p>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-3">
        <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('passport_number')}}</p>
      </div>
      <div class="col-9 border-bottom">
        <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{option.client.passport_number}}</p>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-3">
        <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('note')}}</p>
      </div>
      <div class="col-9 border-bottom">
        <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{option.note}}</p>
      </div>
    </div>


    <div class="px-0 ">
      <table class="myTableInvoicelist mt-4">
        <thead>
          <tr class="header py-3" style="background: #afd1fd;">
            <th  width="40" class="text-left">№</th>
            <th>{{$t('product')}}</th>
            <th>{{$t('qty')}}</th>
            <th>{{$t('real_qty')}}</th>
            <th>{{$t('summ')}}</th>
            <th>{{$t('date')}}</th>
            <!-- <th >{{$t('lessons_cout')}}</th> -->
            <!-- <th width="80" class="text-center">{{$t('Action')}}</th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row,rowIndex) in option.item_list" :key="rowIndex">
            <td> <span >{{rowIndex+1}}</span> </td>
            <td> <span >{{row.product.name}}</span> </td>
            <td> <span >{{row.qty}}</span> </td>
            <td> <span >{{row.real_qty}}</span> </td>
            <td><span>{{row.sum}}</span></td>
            <td> <span >{{row.updated_date_time.slice(0,10)}}</span> <span class="ml-2">{{row.updated_date_time.slice(11,16)}}</span> </td>
            <!-- <td> <span >{{row.lessons_cout}}</span> </td> -->  
          </tr>
        </tbody>
      </table>
    </div>
    
    <div class="row mt-5">
      <div class="col-3">
        <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('photo')}}</p>
      </div>
      <div class="col-9 border-bottom">
        <img :src="hostname + option.image_str_url" style="width:100%" alt="">
      </div>
    </div>
    <div class="fixed" style="position:fixed; top: 50px; right:10px;">
      <mdb-btn color="info"  @click="printInfo" style="font-size: 10.5px"
        p="r4 l4 t2 b2">
      <mdb-icon  />{{$t('print')}}</mdb-btn>
    </div>
  </div>
</template>

<script>
import {mdbBtn, mdbIcon} from 'mdbvue'
export default {
  components:{
    mdbBtn, mdbIcon
  },
  data() {
    return {
      hostname: this.$store.state.server_ip,
    }
  },
props:{
  option:{
    type: Object,
    default() {
      return {}
    }
  }
},
methods:{
  printInfo(){
    this.$emit('printed', this.option)
  }
}
}
</script>

<style lang="scss" scoped>
.myTableInvoicelist {
  /* border-collapse: collapse; */
  table-layout:fixed;
  width: 100%;
  overflow: hidden;
  // border: 1px solid #ddd;
  font-size: 18px;
  max-height:80px; overflow-x:auto
}
.myTableInvoicelist th{
  font-weight: 600;
  font-size:11px;
}
.myTableInvoicelist td{
  font-size:11.5px;
  
}
.myTableInvoicelist td {
  text-align: left;
  padding: 7px 10px;
}
.myTableInvoicelist th{
  text-align: left;
  padding: 8px 10px;
}

.myTableInvoicelist tr {
  border-bottom: 1px dashed rgb(240, 240, 240);
  &:hover{
    background: #afd1fd;
  }
}

.myTableInvoicelist tr.header, .myTableInvoicelist tr:hover {
  // background-color: #f1f1f1;
}
</style>