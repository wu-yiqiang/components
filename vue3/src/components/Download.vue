<template>
    <a-button
        type="primary"
        size="middle"
        :loading="loading"
        @click="handleExport"
    >
        <template #icon>
            <DownloadOutlined />
        </template>
        {{ title ? title : $t('导出报表') }}
    </a-button>
</template>

<script setup lang="ts">
import { DownloadOutlined } from '@ant-design/icons-vue';
import { Export } from '@/api/public';
import axios from 'axios';
const { t: $t } = useI18n();
const props = defineProps({
    url: {
        type: String,
        required: true,
        default: '',
    },
    title: {
        type: String,
        required: false,
        default: '',
    },
    parmas: {
        type: Object,
        required: false,
        default: () => {},
    },
    data: {
        type: Object,
        required: false,
        default: () => {},
    },
    method: {
        type: String,
        required: false,
        default: 'get',
    },
    header: {
        type: Object,
        require: false,
        default: { 'Content-Type': 'application/x-www-form-urlencoded' },
    },
    responseType: {
        type: String,
        required: false,
        default: 'blob',
    },
});
let loading = ref<boolean>(false);
const handleExport = debounce(async () => {
    const responseType = 'blob'; // 设置响应类型为blob
    await Export(props.url, props.method, props.parmas, props.data, {
        headers: props.header,
        responseType: props.responseType,
    }).then((res) => {
        let params = res.headers;
        let name = params['content-disposition'];
        let filename = name.split('=');
        const blob = new Blob([res.data], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename[1]; // 设置下载文件名
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    });
}, 1000);
</script>
<style scoped lang="scss"></style>
