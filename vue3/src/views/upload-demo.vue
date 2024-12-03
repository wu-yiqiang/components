<template>
  <section class="upload-demo">
   <input
          type="file"
          accept="*"
          @change="handleFileChange"
        />
  </section>
</template>
<script lang="ts" setup>
import { reactive, watch, computed, ref } from 'vue'
import Upload from '@/utils/upload'
const handleFileChange = (e: Event) => {
  const file = e?.target?.files[0]
  const data = new Upload(file)
}
</script>
<style lang="scss" scoped>
.upload-demo{}
</style>
