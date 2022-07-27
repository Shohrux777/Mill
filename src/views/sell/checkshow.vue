<template>
  <div class="checkShow " style="z-index: 1000;" v-on:click.self="close"> 
    <div style="position: absolute; top:5px; right:10px;" >
      <mdb-btn color="info" style="font-size:11px; padding: 8px 25px;" @click="checkPrint" class="m-0  mt-1 w-100" > {{'print'}}</mdb-btn>
    </div>
    <div  id="printForm"  class="ckeck_main_sell  border bg-white"  style="width:400px; height: 100%;">
      <div  style="text-align:center; margin: 10px 0; padding: 5px 7px; font-size:12px;">
        <h6 style="font-size:12.5px;" class="paymentCheckPrintCheck">ООО «OQQO'RG'ON TEGIRMON» 
          Таш. обл., Аккурганский р-н, Дустлик КФЙ</h6>
      </div>
      <div class="infoHeader" style="width:100%;">
        <div style="margin: 5px 0px;">
          <div  style=" display:flex; flex-wrap: wrap; justify-content: space-between;  margin-top:3px;">
            <span style="font-size:11px;" class="paymentCheckPrintCheck">Кассир </span>
            <span style="font-size: 11.5px;" class="paymentCheckPrintCheck">{{kassir}}</span>
          </div>
        </div>
        <div style="margin: 5px 0px;">
          <div  style=" display:flex; flex-wrap: wrap; justify-content: space-between;  margin-top:3px;">
            <span style="font-size:11px;" class="paymentCheckPrintCheck">Напечатан </span>
            <span style="font-size: 11.5px;" class="paymentCheckPrintCheck">{{dateTime}} <span class="ml-1">{{time}}</span></span>
          </div>
        </div>
      </div>
      <div class="infoList">
        <table style=" width:100%;">
          <thead>
              <tr style="border-bottom: 0.5px solid #CED4DA;">
                <th class="paymentCheckPrintCheck" style="font-weight: bold; font-size:11px; ">{{$t('name')}}</th>
                <th class="paymentCheckPrintCheck" style="font-weight: bold; font-size:11px;  text-align: center">{{$t('soni')}}</th>
                <th class="paymentCheckPrintCheck" style="font-weight: bold; font-size:11px; text-align: right">{{$t('price')}}</th>
                <th class="paymentCheckPrintCheck" style="font-weight: bold; font-size:11px; text-align: right">{{$t('total')}}</th>
              </tr>
          </thead>
          <tbody>
            <tr v-for="(item,i) in get_zakaz_product_all_list[get_page_savat]" :key="i" style="border-bottom: 0.5px solid #CED4DA;">
              <td class="paymentCheckPrintCheck" style="text-align: left; font-size:11px;">{{item.name}}</td>
              <td class="paymentCheckPrintCheck" style="text-align: center; font-size:11px;">{{item.qty}}</td>
              <td class="paymentCheckPrintCheck" style="text-align: center; font-size:11px;">{{item.real_sum}}</td>
              <td class="paymentCheckPrintCheck" style="text-align: right; font-size:11px;">{{item.summ}}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style="border-bottom: 1px dashed black;">
        <!-- ******************************************************************************************** -->
      </div>

      <div style="margin: 5px 0px;">
        <div  style=" display:flex; flex-wrap: wrap; justify-content: space-between;  margin-top:3px;">
          <span style="font-size:11px;" class="paymentCheckPrintCheck">{{$t('total')}} </span>
          <span style="font-size: 10.5px; font-weight: bold;" class="paymentCheckPrintCheck ">{{get_all_summa[get_page_savat]}}</span>
        </div>
      </div>
      <div style="border-bottom: 1px dashed black;">
        <!-- ******************************************************************************************** -->
      </div>
      <div style="margin: 5px 0px;">
        <div  style=" display:flex; flex-wrap: wrap; justify-content: space-between;  margin-top:3px;">
          <span style="font-size: 11px;" class="paymentCheckPrintCheck">Итого к оплате: </span>
          <span style="font-size: 10.5px; font-weight: bold;" class="paymentCheckPrintCheck">{{get_all_summa[get_page_savat]}}</span>
        </div>
      </div>
      <div style="border-bottom: 1px dashed black;">
        <!-- ******************************************************************************************** -->
      </div>

      <div style="margin: 10px 10px 0px 10px; display:flex; justify-content:center;">
          <span style="font-size: 11px;">****************************************** </span>
      </div>
      <div style="margin: 0px 10px; display:flex; justify-content:center;">
          <span style="font-size: 11px;" class="paymentCheckPrintCheck">Контакты:  </span>
      </div>
      <div style="margin: 5px 10px; display:flex; justify-content:center;">
          <span style="font-size: 11px;" class="paymentCheckPrintCheck">+998 97 9999945 </span>
      </div>
      <div style="margin: 5px 10px; display:flex; justify-content:center;">
          <span style="font-size: 11px;" class="paymentCheckPrintCheck">+998 99 6005555 </span>
      </div>
      <div style="margin: 5px 10px; display:flex; justify-content:center;">
          <span style="font-size: 11px; font-weight:bold;" class="paymentCheckPrintCheck">+998 97 3855555 </span>
      </div>
      <div style="margin: 5px 10px 0px 10px; display:flex; justify-content:center;">
          <span style="font-size: 11px;">****************************************** </span>
      </div>
      
      

      

      <div style="margin-top:15px; border:1px solid black;"></div>
     
    </div>
  </div>
</template>

<script>
import {
  
  mdbBtn
} from "mdbvue";
import {mapGetters, mapMutations} from 'vuex'
export default {
  components: {
    mdbBtn
  },
  data(){
    return{
      printBtn: true,
      comp_name: localStorage.CompName,
      kassir : localStorage.fio,
      dateTime: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    }
  },
  mounted(){
  },

  computed: mapGetters(['get_zakaz_product_all_list','get_page_savat', 'get_all_summa','get_page_savat']),
  methods: {
   ...mapMutations(['clear_order']),
   close(){
    this.$emit('close')
   },
   checkPrint(){
    window.print();
    this.close();
   }
  }
}
</script>

<style lang="scss">
@font-face{
  font-family: "Ubuntu";
  src: url("../../font/Ubuntu/Ubuntu-Bold.ttf")
}
.paymentCheckPrintCheck{
  font-family: 'Ubuntu';  
}
span, h6 {
  font-family: 'Ubuntu';
  font-weight: bold; 

}
td, th {
  font-family: 'Ubuntu'; 
  font-weight: bold; 
}
.checkShow {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(47, 47, 47, 0.9);
  display: flex;
  justify-content: center;

  .ckeck_main{
    width: 403px;
    max-height: 100vh;
    overflow-y: scroll;

    .infoHeader{
      border-bottom: 1px dashed black;
      padding: 0 10px 10px 10px; 
    }
    .infoList{
      padding: 10px 10px 15px 10px; 
    }
    .totalInfo{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 10px 20px 10px; 

    }
  }
}
</style>