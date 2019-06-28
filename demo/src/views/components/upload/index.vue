<template>
<div>
  <div class="field">
    <h5 :style="{marginBottom:'20px'}">1、点击按钮上传。</h5>
    <upload 
      :action='host'
      :onSuccess='onSuccess'
      :onProgress='onProgress'
      :onError='onError'
    >
        <vui-button >上传文件</vui-button>
    </upload>
  </div>
  <div class='field'>
    <h5 :style="{marginBottom:'20px'}">2、拖拽上传。</h5>
    <upload 
      :action='host'
      :onSuccess='onSuccess'
      :onProgress='onProgress'
      :onError='onError'
      :dragAndDrop='Boolean(true)'
    >
      <div :style="{
        border:'1px dashed #c9c9c9',
        textAlign:'center',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        height:'240px',
        width:'100%',
      }">
        <Icon type='download' />
        <p :style='{ margin: 0 }'>点击或拖动文件至此上传</p>
      </div>
    </upload>
  </div>
</div>
  
</template>
<script>
import {Upload,Button,Icon} from 'vui';

export default {
  data(){
    return{
      host:'/mockApi/vui/api/upload/file',
    }
  },
  components:{
    Upload,
    VuiButton:Button,
    Icon,
  },
  methods:{
    beforeUpload(file){

    },
    onChange(file,fileList){
      
    },
    onSuccess(file,fileList){
      console.log('success',file.status);
    },
    onProgress(file,fileList){
      console.log('progress',file.progress);
    },
    onError(file,fileList,error){
      console.log('error',file);
    },
  }
}
</script>

