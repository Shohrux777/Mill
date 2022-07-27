<template>
  <div class="webcamPLY">
    <div class="district_add p-5">
        <div id="app" class="web-camera-container">
          <div class="camera-button">
              <mdb-btn type="button" class="button is-rounded" :class="{ 'is-primary' : !isCameraOpen, 'is-danger' : isCameraOpen}" @click="toggleCamera">
                <span v-if="!isCameraOpen">Open Camera</span>
                <span v-else>Close Camera</span>
            </mdb-btn>
          </div>
          <div class="px-5 w-100">
            <erpSelectAdd
                class="bg-white rounded"
                :options="deviceList"  
                @select="selectDevice"
                :selected="device_name"
                :label="$t('client_controler')"
              />
          </div>
          
          
          <div v-show="isCameraOpen && isLoading" class="camera-loading">
            <ul class="loader-circle">
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
          
          <div v-if="isCameraOpen" v-show="!isLoading" class="camera-box" :class="{ 'flash' : isShotPhoto }">
            
            <div class="camera-shutter" :class="{'flash' : isShotPhoto}"></div>
              
            <video v-show="!isPhotoTaken" ref="camera" :width="600" :height="420.5" autoplay></video>
            
            <canvas v-show="isPhotoTaken" id="photoTaken" ref="canvas" :width="600" :height="420.5"></canvas>
          </div>
          
          <div v-if="isCameraOpen && !isLoading" class="camera-shoot">
            <mdb-btn type="button" class="button" @click="takePhoto">
              <img src="https://img.icons8.com/material-outlined/50/000000/camera--v2.png">
            </mdb-btn>
          </div>
          
          <div v-if="isPhotoTaken && isCameraOpen" class="camera-download">
            <a id="downloadPhoto" download="my-photo.jpg" style="font-size: 12px;" class="button bg-primary py-2 px-3 rounded text-white" role="button" @click="downloadImage">
              Download
            </a>
          </div>
        </div>
         
      <massage_box :hide="modal_status" :detail_info="modal_info"
      :m_text="$t('Failed_to_add')" @to_hide_modal="modal_status= false"/>

      <Toast ref="message"></Toast>
    </div>
  </div>
</template>

<script>
import erpSelectAdd from "../../components/erpSelect.vue";
import { mdbInput, mdbRow, mdbCol, mdbIcon, mdbBtn, } from "mdbvue"
import {mapMutations, mapGetters} from 'vuex'
import { required } from 'vuelidate/lib/validators'
export default {
  naem: "webcam_Add",
  
  data(){
    return{
      modal_info: '',
      modal_status: false,
      loading: false,
      id: this.$route.params.id,
      isCameraOpen: false,
      isPhotoTaken: false,
      isShotPhoto: false,
      isLoading: false,
      link: '#',
      constraints: {},

      deviceList: [],
      device_name: ''
    }
  },
  components: {
    mdbInput, mdbRow, mdbCol, mdbIcon, mdbBtn, erpSelectAdd
  },
  validations: {
      name: {
        required
      }
    },
   computed: mapGetters(['deviceId']),
  methods:{
    ...mapMutations(['update_deviceId']),
    async selectDevice(option){
      console.log(option)
      this.device_name = option.name
      localStorage.device = option.id;
      await this.update_deviceId(option.id)
      console.log(localStorage.device)
      const constraints = (window.constraints = {
				audio: false,
				video: { facingMode: "user", deviceId : { exact: option.id }}
			});


			await navigator.mediaDevices
				.getUserMedia(constraints)
				.then(stream => {
          this.isLoading = false;
					this.$refs.camera.srcObject = stream;
				})
				.catch(error => {
          this.isLoading = false;
					alert("May the browser didn't support or there is some errors.");
				});
    },


      toggleCamera() {
      if(this.isCameraOpen) {
        this.isCameraOpen = false;
        this.isPhotoTaken = false;
        this.isShotPhoto = false;
        this.stopCameraStream();
      } else {
        this.isCameraOpen = true;
        this.createCameraElement();
      }
    },
    
    async createCameraElement() {
      this.deviceList = [];
      console.log('dasdas ')
      const devices = await navigator.mediaDevices.enumerateDevices();
      devices.forEach( ( device ) => {
          console.log( "Found device: " + JSON.stringify( device ) );
          if(device.kind == 'videoinput'){
            let temp = {
              id : device.deviceId,
              name: device.label || "Camera"
            }
            this.deviceList.push(temp);
          }
          
      });
      console.log(this.deviceList)
      this.isLoading = true;
      if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
      }
      // Some browsers partially implement mediaDevices. We can't just assign an object
      // with getUserMedia as it would overwrite existing properties.
      // Here, we will just add the getUserMedia property if it's missing.
      if (navigator.mediaDevices.getUserMedia === undefined) {
        console.log('husadasuduaidh')

        navigator.mediaDevices.getUserMedia = function(constraints) {

          // First get ahold of the legacy getUserMedia, if present
          var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

          // Some browsers just don't implement it - return a rejected promise with an error
          // to keep a consistent interface
          if (!getUserMedia) {
            return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
          }

          // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
          return new Promise(function(resolve, reject) {
            getUserMedia.call(navigator, constraints, resolve, reject);
          });
        }
      }
      if(localStorage.device == ''){
        console.log('ddddddddddddddddd')
        console.log(localStorage.device)

        this.constraints = (window.constraints = {
          audio: false,
          video: { facingMode: "user"}
        });
      }
      else{
        console.log('ffffffffffffffff')
        console.log(localStorage.device)
        this.constraints = (window.constraints = {
          audio: false,
          video: { facingMode: "user", deviceId : { exact: localStorage.device }}
        });
      }
      


			await navigator.mediaDevices
				.getUserMedia(this.constraints)
				.then(stream => {
          this.isLoading = false;
					this.$refs.camera.srcObject = stream;
				})
				.catch(error => {
          this.isLoading = false;
					alert("May the browser didn't support or there is some errors.");
				});
    },
    
    stopCameraStream() {
      let tracks = this.$refs.camera.srcObject.getTracks();

			tracks.forEach(track => {
				track.stop();
			});
    },
    
    takePhoto() {
      if(!this.isPhotoTaken) {
        this.isShotPhoto = true;

        const FLASH_TIMEOUT = 50;

        setTimeout(() => {
          this.isShotPhoto = false;
        }, FLASH_TIMEOUT);
      }
      
      this.isPhotoTaken = !this.isPhotoTaken;
      
      const context = this.$refs.canvas.getContext('2d');
      context.drawImage(this.$refs.camera, 0, 0, 600, 420.5);
    },
    
    async downloadImage() {
    //   const download = document.getElementById("downloadPhoto");
      const canvas = document.getElementById("photoTaken").toDataURL("image/jpeg");

    console.log('canvas')
    console.log(canvas)
    this.isCameraOpen = false;
    this.isPhotoTaken = false;
    this.isShotPhoto = false;
    this.stopCameraStream();

    try{

      const requestOptions = {
        method : "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify({
          "image_base_64" : canvas,
        })
      };

      const response = await fetch(this.$store.state.hostname + "/TegirmonClient/getSaveBase64ImageToFolderAndGetImageUrl", requestOptions);
      // console.log(response)
      const data = await response.json();
      console.log(data)
      if(response.status == 201 || response.status == 200)
      {
        this.$refs.message.success('Added_successfully')
        this.$emit('getPhotosub', data.image_url_str)
        return true;
      }
      else{
        this.loading = false;
        this.modal_info = this.$i18n.t('network_ne_connect'); 
        this.modal_status = true;
      }
    }
    catch{
      this.loading = false;
      this.modal_info = this.$i18n.t('network_ne_connect'); 
      this.modal_status = true;
    }
    //   download.setAttribute("href", canvas);
    },
    cls_wnd()
      {

      },
    save_data :  async function(){
         if(this.$v.$invalid )
        {
          this.$v.$touch();
          this.$refs.message.warning('please_fill')
          return false;
        }
        const requestOptions = {
            method : "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify({

              "id" : this.id,
            })
          };
          try{
            this.loading = true;
            const response = await fetch(this.$store.state.hostname + "/TegirmonDistrict", requestOptions);
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
    },
    async submit()
      {
        if(await this.save_data())
        {
          this.$store.state.alert = true;
          this.$router.push("/webcam");
        }

      },
    async submit_continue()
      {
        if(await this.save_data())
        {
          if(this.id != 0){
            this.$router.push('/webcam_add/0')
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

<style lang="scss" scoped>
    body {
  display: flex;
  justify-content: center;
}
.webcamPLY{
  position: fixed;
  top:0; 
  left:0;
  right: 0;
  bottom:0;
  background: rgba(19, 19, 19,0.7);
  z-index: 111;
  display: flex;
  justify-content: center;
  align-items: center;
}

.web-camera-container {
  margin-top: 2rem;
  margin-bottom: 2rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 700px;

  
  .camera-button {
    margin-bottom: 2rem;
  }
  
  .camera-box {    
    .camera-shutter {
      opacity: 0;
      width: 450px;
      height: 337.5px;
      background-color: #fff;
      position: absolute;
      
      &.flash {
        opacity: 1;
      }
    }
  }
  
  .camera-shoot {
    margin: 1rem 0;
    
    button {
      height: 60px;
      width: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 100%;
      
      img {
        height: 35px;
        object-fit: cover;
      }
    }
  }
  
  .camera-loading {
    overflow: hidden;
    height: 100%;
    position: absolute;
    width: 100%;
    min-height: 150px;
    margin: 3rem 0 0 -1.2rem;
    
    ul {
      height: 100%;
      position: absolute;
      width: 100%;
      z-index: 999999;
      margin: 0;
    }
    
    .loader-circle {
      display: block;
      height: 14px;
      margin: 0 auto;
      top: 50%;
      left: 100%;
      transform: translateY(-50%);
      transform: translateX(-50%);
      position: absolute;
      width: 100%;
      padding: 0;
      
      li {
        display: block;
        float: left;
        width: 10px;
        height: 10px;
        line-height: 10px;
        padding: 0;
        position: relative;
        margin: 0 0 0 4px;
        background: #999;
        animation: preload 1s infinite;
        top: -50%;
        border-radius: 100%;
        
        &:nth-child(2) {
          animation-delay: .2s;
        }
        
        &:nth-child(3) {
          animation-delay: .4s;
        }
      }
    }
  }

  @keyframes preload {
    0% {
      opacity: 1
    }
    50% {
      opacity: .4
    }
    100% {
      opacity: 1
    }
  }
}
</style>>
    
