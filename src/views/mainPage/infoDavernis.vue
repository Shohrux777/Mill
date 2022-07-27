<template>
  <div class="info_davernost p-4">
    <div class="row mt-2">
      <div class="col-3">
        <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('fio')}}</p>
      </div>
      <div class="col-9 border-bottom">
        <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{option.fio}}</p>
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
        <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('address')}}</p>
      </div>
      <div class="col-9 border-bottom">
        <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{option.address}}</p>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-3">
        <p class="p-0 m-0 mt-2" style="font-size: 14px;">Изображение паспорта</p>
      </div>
      <div class="col-9 border-bottom">
         <img :src="option.passport_image_base_64" style="width:100%" alt="">
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-3">
        <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('photo')}}</p>
      </div>
      <div class="col-9 border-bottom">
        <img :src="hostname + option.image_url" style="width:100%" alt="">
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

<style>

</style>