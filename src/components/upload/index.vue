<template>
  <div class="vui-upload">
    <input
      v-if="multiple"
      type="file"
      id="vui-upload-input"
      ref="vuiFileInput"
      @change="fileSelected"
      :accept="accept"
      :capture="capture"
      multiple
    />
    <input
      v-else
      type="file"
      id="vui-upload-input"
      ref="vuiFileInput"
      @change="fileSelected"
      :accept="accept"
      :capture="capture"
    />
    <div v-if="!dragAndDrop" class="vui-upload-content" @click="changeFile">
      <slot></slot>
    </div>
    <div
      v-else
      :class="[dragStatus === 'dragging'?'hover':'','vui-upload-content','dragDropArea']"
      @click="changeFile"
      @drop="dropFile"
      @dragover="dragOver"
      @dragend="dragEnd"
    >
      <slot></slot>
    </div>
    <div class="vui-upload-list" v-if="showUploadList">
      <div :class="[file.status,'vui-upload-item']" v-for="file in fileList" :key="file.key">
        <div class="vui-upload-item-info">
          <span>{{file.name}}</span>
          <svg
            @click="remove(file)"
            class="vui-upload-item-remove"
            fill="currentColor"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1973"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="200"
            height="200"
          >
            <path
              d="M810.666667 273.493333L750.506667 213.333333 512 451.84 273.493333 213.333333 213.333333 273.493333 451.84 512 213.333333 750.506667 273.493333 810.666667 512 572.16 750.506667 810.666667 810.666667 750.506667 572.16 512z"
              p-id="1974"
            />
          </svg>
        </div>
        <div class="progress" v-show="+file.progress<1">
          <div class="progress-bar" :style="{width:`${file.progress*100}%`}"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.vui-upload #vui-upload-input {
  display: none;
}
.vui-upload-content.dragDropArea {
  &:hover,
  &.hover {
    cursor: pointer;
    background: #f1f1f1;
  }
}
.vui-upload-item {
  border-bottom: 1px solid #eaeaea;
  position: relative;
  &:last-child {
    border-bottom: none;
  }
  .vui-upload-item-info {
    position: relative;
    padding: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 1;
    &:hover {
      cursor: pointer;
      .vui-upload-item-remove {
        display: inline-block;
      }
    }
  }
  .vui-upload-item-remove {
    position: relative;
    display: none;
    background-size: 100%;
    width: 64px;
    height: 64px;
    color: #666;
    &:hover {
      color: #000;
    }
  }
  &.success {
    color: #456fff;
  }
  &.error {
    color: red;
  }
  .progress {
    position: absolute;
    height: 100%;
    overflow: hidden;
    border-radius: 0;
    top: 0;
  }
  .progress-bar {
    position: absolute;
    height: 100%;
    left: 0;
    top: 0;
    background: olivedrab;
    opacity: 0.2;
  }
}
</style>

<script>
const FILE_STATUS = {
  WAIT: 'init',
  PROGRESS: 'upload',
  SUCCESS: 'success',
  ERROR: 'error'
}
export default {
  name: 'upload',
  props: {
    action: {
      type: String,
      default: ''
    },
    accept: {
      type: String,
      default: '*'
    },
    capture: String,
    multiple: {
      type: Boolean,
      default: false
    },
    dragAndDrop: {
      type: Boolean,
      default: false
    },
    trunkSize: {
      type: Number,
      default: 4 * 1024 * 1024
    },
    limitSize: {
      type: Number,
      default: 100 * 1024 * 1024
    },
    showUploadList: {
      type: Boolean,
      default: true
    },
    autoUpload: {
      type: Boolean,
      default: true
    },
    customRequest: Function,
    onChange: {
      type: Function,
      default: () => { }
    },
    onProgress: {
      type: Function,
      default: () => { }
    },
    onSuccess: {
      type: Function,
      default: () => { }
    },
    beforeUpload: {
      type: Function,
      default: () => { }
    },
    onError: {
      type: Function,
      default: () => { }
    },
    onRemove: Function
  },
  data () {
    return {
      fileList: [],
      dragStatus: undefined
    }
  },
  methods: {
    checkFile (file) {
      if (file.size > this.limitSize) {
        this.onError(file, this.fileList, '文件大小超限')
        return false
      }
    },
    changeFile () {
      const { vuiFileInput } = this.$refs
      vuiFileInput.value = ''
      vuiFileInput.click()
    },
    fileSelected (e) {
      const files = e.target.files
      this.uploadStart(files)
    },
    dropFile (e) {
      e.preventDefault()
      this.dragStatus = undefined
      this.uploadStart(e.dataTransfer.files)
    },
    dragOver (e) {
      e.preventDefault()
      this.dragStatus = 'dragging'
      return false
    },

    dragEnd (e) {
      e.preventDefault()
      this.dragStatus = undefined
      return false
    },
    uploadStart (files) {
      if (this.customRequest) return this.customRequest(files)
      Array.from(files).forEach(file => {
        const fileObj = {
          key: `${file.name}_${Date.now()}`,
          name: file.name,
          size: file.size,
          status: FILE_STATUS.WAIT,
          progress: 0,
          raw: file
        }
        if (this.beforeUpload(file) === false || this.checkFile(file) === false) return
        this.fileList.push(fileObj)
        this.autoUpload && this.uploadForm(fileObj)
      })
    },
    uploadForm (file) {
      if (!this.action) return
      const formData = new FormData()
      const xhr = new XMLHttpRequest()
      formData.append('file', file.raw, file.name)
      xhr.upload.onprogress = e => {
        let progress = 0
        if (e.lengthComputable) {
          progress = e.loaded / file.size
          if (progress > 0 && progress <= 1) {
            file.status = FILE_STATUS.PROGRESS
          };
          file.progress = progress
          this.onProgress(file, this.fileList)
          this.onChange(file, this.fileList)
        }
      }
      xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) return
        if (xhr.status && xhr.status === 200) {
          file.status = FILE_STATUS.SUCCESS
          try {
            file.response = JSON.parse(xhr.response)
          } catch (e) {
            file.response = xhr.response
          }
          delete this.reqs[file.key]
          this.onSuccess(file, this.fileList)
          this.onChange(file, this.fileList)
        }
      }
      xhr.onerror = () => {
        file.status = FILE_STATUS.ERROR
        this.onError(file, this.fileList, xhr.response)
        delete this.reqs[file.key]
      }
      xhr.open('POST', this.action)
      xhr.send(formData)
      this.reqs = Object.assign(this.reqs || {}, { [file.key]: xhr })
    },
    // 手动上传
    submit () {
      this.fileList && this.fileList.forEach(file => {
        file.status !== FILE_STATUS.SUCCESS && this.uploadForm(file)
      })
    },
    remove (file) {
      const { key } = file
      if (this.reqs && this.reqs[key]) this.reqs[key].abort()
      for (const [index, item] of this.fileList.entries()) {
        if (item.key === key) {
          this.fileList.splice(index, 1)
          this.onRemove(file, this.fileList)
          return
        }
      }
    }
  }
}
</script>
