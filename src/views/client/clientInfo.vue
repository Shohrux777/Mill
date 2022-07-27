<template>
  <div class="info_davernost p-4" v-if="option">
    <div class="row mt-2">
      <div class="col-3">
        <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('fio')}}</p>
      </div>
      <div class="col-9 border-bottom">
        <p class="p-0 m-0 mt-2 text-danger" style="font-size: 14px;">{{option.fio}}</p>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-3">
        <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('address')}}</p>
      </div>
      <div class="col-9 border-bottom">
        <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{option.adddress}}</p>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-3">
        <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('date_born')}}</p>
      </div>
      <div class="col-9 border-bottom">
        <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{option.addiotionala_information}}</p>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-3">
        <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('phone_number')}}</p>
      </div>
      <div class="col-9 border-bottom">
        <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{option.phone_number}}</p>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-3">
        <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('passport_number')}}</p>
      </div>
      <div class="col-9 border-bottom">
        <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{option.passport_number}}</p>
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
    <!-- <div class="px-0 ">
      <table class="myTableInvoicelist mt-4">
        <thead>
          <tr class="header py-3" style="background: #afd1fd;">
            <th  width="40" class="text-left">№</th>
            <th>{{$t('product')}}</th>
            <th>{{$t('qty')}}</th>
            <th>{{$t('real_qty')}}</th>
            <th>{{$t('summ')}}</th>
            <th>{{$t('date')}}</th>
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
          </tr>
        </tbody>
      </table>
    </div> -->
    
    <div class="row mt-5">
      <div class="col-3">
        <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('photo')}}</p>
      </div>
      <div class="col-9 border-bottom">
        <img :src="hostname + option.image_url" style="width:100%" alt="">
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-3">
        <p class="p-0 m-0 mt-2" style="font-size: 14px;">Изображение паспорта</p>
      </div>
      <div class="col-9 border-bottom">
        <img :src="option.passport_image_base_64" style="width:100%" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
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